export default class JoeyLib{
    constructor(webcamElement, btnElement1, btnElement2){
        this.btnElement1 = btnElement1;
        this.btnElement2 = btnElement2;
        
        this.webcamElement = document.getElementById(webcamElement);
        this.classifier = knnClassifier.create();

        this.net;
        
    }

    async setupWebcam() {
        return new Promise((resolve, reject) => {
          const navigatorAny = navigator;
          navigator.getUserMedia = navigator.getUserMedia ||
              navigatorAny.webkitGetUserMedia || navigatorAny.mozGetUserMedia ||
              navigatorAny.msGetUserMedia;
          if (navigator.getUserMedia) {
            navigator.getUserMedia({video: true},
              stream => {
                this.webcamElement.srcObject = stream;
                this.webcamElement.addEventListener('loadeddata',  () => resolve(), false);
              },
              error => reject());
          } else {
            reject();
          }
        });
      }

      async init() {
        console.log('Loading mobilenet..');
  
        // Load the model.
        this.net = await mobilenet.load();
        console.log('Sucessfully loaded model');
  
        await this.setupWebcam();
  
        // Reads an image from the webcam and associates it with a specific class
        // index.
        const addExample = classId => {
          // Get the intermediate activation of MobileNet 'conv_preds' and pass that
          // to the KNN classifier.
          const activation = this.net.infer(this.webcamElement, 'conv_preds');
  
          // Pass the intermediate activation to the classifier.
          this.classifier.addExample(activation, classId);
        };
  
        // When clicking a button, add an example for that class.
        for (var x = 0; x<20; x++){
            addExample(0);
        }
        document.getElementById(this.btnElement1).addEventListener('click', () => addExample(1));
        document.getElementById(this.btnElement2).addEventListener('click', () => addExample(2));
        
        var elmnt = document.getElementById("longsheet");

        while (true) {
          if (this.classifier.getNumClasses() > 0) {
            // Get the activation from mobilenet from the webcam.
            const activation = this.net.infer(this.webcamElement, 'conv_preds');
            // Get the most likely class and confidences from the classifier module.
            this.result = await this.classifier.predictClass(activation);
  
            var classes = ['default','up', 'down'];
            document.getElementById('console').innerText = `
              prediction: ${classes[this.result.classIndex]}\n
              probability: ${this.result.confidences[this.result.classIndex]}
            `;
          }

          if(classes[this.result.classIndex] === 'up'){
            elmnt.scrollTop += 1;
            console.log('uping')
          }
          if(classes[this.result.classIndex] === 'down'){
            elmnt.scrollTop -= 1;
            console.log('downing')
          }
          await tf.nextFrame();
        }
      }

    test(){
        console.log(this.output)
    }

    getResult(){
        return this.result
    }

    //  createTag(){
    //     var script = document.createElement('script');
    //     script.type = 'text/javascript';
    //     script.src = 'https://unpkg.com/@tensorflow/tfjs';
    //     console.log(script)
    //     document.body.appendChild(script);
    // }
}