<template>
  <div id="app">
    <div id="console"></div>
      <video autoplay playsinline muted id="webcam" width="600" height="600"></video>
    <div>
      <button id="class-a">Add A</button>
      <button id="class-b">Add B</button>
      <button id="class-c">Add C</button>
    </div>
  </div>
</template>

<script>
import JoeyLib from "./lib/JoeyLib"

export default {
  name: 'app',
  mounted(){
    let net;
    //6. Run MobileNet Inference in Browser through Webcam images
    const webcamElement = document.getElementById('webcam');
    //7. Add a custom classifier on top of the MobileNet predictions
    const classifier = knnClassifier.create();


    async function setupWebcam() {
      return new Promise((resolve, reject) => {
        const navigatorAny = navigator;
        navigator.getUserMedia = navigator.getUserMedia ||
            navigatorAny.webkitGetUserMedia || navigatorAny.mozGetUserMedia ||
            navigatorAny.msGetUserMedia;
        if (navigator.getUserMedia) {
          navigator.getUserMedia({video: true},
            stream => {
              webcamElement.srcObject = stream;
              webcamElement.addEventListener('loadeddata',  () => resolve(), false);
            },
            error => reject());
        } else {
          reject();
        }
      });
    }

    async function app() {
      console.log('Loading mobilenet..');

      // Load the model.
      net = await mobilenet.load();
      console.log('Sucessfully loaded model');

      await setupWebcam();

      // Reads an image from the webcam and associates it with a specific class
      // index.
      const addExample = classId => {
        // Get the intermediate activation of MobileNet 'conv_preds' and pass that
        // to the KNN classifier.
        const activation = net.infer(webcamElement, 'conv_preds');

        // Pass the intermediate activation to the classifier.
        classifier.addExample(activation, classId);
      };

      // When clicking a button, add an example for that class.
      document.getElementById('class-a').addEventListener('click', () => addExample(0));
      document.getElementById('class-b').addEventListener('click', () => addExample(1));
      document.getElementById('class-c').addEventListener('click', () => addExample(2));

      while (true) {
        if (classifier.getNumClasses() > 0) {
          // Get the activation from mobilenet from the webcam.
          const activation = net.infer(webcamElement, 'conv_preds');
          // Get the most likely class and confidences from the classifier module.
          const result = await classifier.predictClass(activation);

          console.log(result)
          const classes = ['A', 'B', 'C'];
          document.getElementById('console').innerText = `
            prediction: ${classes[result.classIndex]}\n
            probability: ${result.confidences[result.classIndex]}
          `;
        }

        await tf.nextFrame();
      }
    }
    var newInstance = new JoeyLib('aa','output22')
    newInstance.test()
    //app();
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;

  margin-top: 60px;
}
</style>
