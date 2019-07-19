import * as mobilenet from '@tensorflow-models/mobilenet';
import * as knnClassifier from '@tensorflow-models/knn-classifier';
import * as tf from '@tensorflow/tfjs';


export default class Teach{
    constructor(webcamElement, fnForUp, fnForDown){        
        this.webcamElement = document.getElementById(webcamElement);
        this.classifier = knnClassifier.create();
        this.net;
        this.runningStatus = true;
        this.fnForUp = fnForUp;
        this.fnForDown = fnForDown;
    }

    async setupWebcam() {
        return new Promise((resolve, reject) => {
          const navigatorAny = navigator;
          navigator.getUserMedia = navigator.getUserMedia ||
              navigatorAny.webkitGetUserMedia || navigatorAny.mozGetUserMedia ||
              navigatorAny.msGetUserMedia;
          if (navigator.getUserMedia) {

            // Permission and open the channel
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

      // Reads an image from the webcam and associates it with a specific class
      // index.
      addExample = classId => {
        // Get the intermediate activation of MobileNet 'conv_preds' and pass that
        // to the KNN classifier.
        const activation = this.net.infer(this.webcamElement, 'conv_preds');

        // Pass the intermediate activation to the classifier.
        this.classifier.addExample(activation, classId);
      };


      async init() {
        console.log('Loading mobilenet..');
  
        // Load the model.
        this.net = await mobilenet.load();
        console.log('Sucessfully loaded model');
  
        await this.setupWebcam();
        this.addExample(0);

        while (this.runningStatus) {
          if (this.classifier.getNumClasses() > 0) {
            // Get the activation from mobilenet from the webcam.
            const activation = this.net.infer(this.webcamElement, 'conv_preds');
            // Get the most likely class and confidences from the classifier module.
            this.result = await this.classifier.predictClass(activation);
  
            var classes = ['default','up', 'down'];
            document.getElementById('console').innerText = `
              Console:\n
              Prediction: ${classes[this.result.classIndex]}\n
              Probability: ${this.result.confidences[this.result.classIndex]}
            `;
          }

          if(classes[this.result.classIndex] === 'up'){
            this.fnForUp()
          }

          if(classes[this.result.classIndex] === 'down'){
            this.fnForDown()
          }

          //Returns a promise that resolve when a requestAnimationFrame has completed.
          await tf.nextFrame();
        }
      }


    destroy(){
      this.runningStatus = false
    }
}