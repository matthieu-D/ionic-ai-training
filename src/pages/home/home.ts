import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

declare var require;
var synaptic = require('synaptic');
var brain = require('brain');

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  net;
  output = [true,true,true,true,true];

  constructor(public navCtrl: NavController) {
    this.train();
  }

  train() {

    this.net = new brain.NeuralNetwork();

    const data = [
      { input: [0, 0, 0], output:[0, 0, 0, 0, 0]},
      { input: [1, 0, 0], output:[1, 0, 0, 0, 0]},
      { input: [1, 1, 0], output:[1, 1, 0, 0, 0]},
      { input: [0, 1, 0], output:[0, 0, 1, 0, 0]},
      { input: [0, 1, 1], output:[0, 0, 0, 1, 1]},
      { input: [0, 0, 1], output:[0, 0, 0, 0, 1]}
    ];

    this.net.train(data, {
      errorThresh: 0.005,  // error threshold to reach
      iterations: 2000000,   // maximum training iterations
      log: true,           // console.log() progress periodically
      logPeriod: 1000,       // number of iterations between logging
      learningRate: 0.1    // learning rate
    });

  }

  changeButtons(up, middle, down) {
    const input = [down >>> 0 , middle >>> 0 , up >>> 0];
    const output = this.net.run(input);
    this.output = this.formatOutput(output);
  }

  formatOutput(output): boolean[] {
    output.forEach(function(value, i) {
      output[i] = (Math.round(value) === 1);
    });
    return output;
  }

  trainDetection() {
    // var Neuron = synaptic.Neuron,
    // Layer = synaptic.Layer,
    // Network = synaptic.Network,
    // Trainer = synaptic.Trainer,
    // Architect = synaptic.Architect;

    // var trainingSet = this.createTrainingSet();

    // let perceptron = new Architect.Perceptron(1,20,1);
    // var trainer = new Trainer(perceptron);

    // const results = trainer.train(trainingSet,{
		// 	rate: .1,
    //   iterations: 2000,
    //   error: .001,
    //   shuffle: true,
    //   log: 1000,
    //   cost: Trainer.cost.CROSS_ENTROPY
    // });
    // console.log('done')
  }

  go() {
    // var Neuron = synaptic.Neuron,
    // Layer = synaptic.Layer,
    // Network = synaptic.Network,
    // Trainer = synaptic.Trainer,
    // Architect = synaptic.Architect;


    // let perceptron = new Architect.Perceptron(1,60,1);
    // var trainer = new Trainer(perceptron);
    // const topRightData = this.getData(document.getElementById('top_right'));
    // for(let x=0; x<2; x++) {
    //   for(let y=0; y<2; y++) {
    //     console.log(x,y, this.pixel(topRightData, x, y));
    //     perceptron.activate([x/ 2, y / 2]);
    //     perceptron.propagate(0.01, this.pixel(topRightData, x, y));
    //     // console.log(perceptron.activate([x/2,y/2]));
    //   }
    // }
  }

  createTrainingSet() {
    // let trainingSet = [];

    // for(let r=1; r<255; r++) {
    //   for (let g = 1; g < 255; g++) {
    //     for (let b = 1; b < 255; b++) {
    //       trainingSet.push({
    //         input: [r/255, g/255, b/255],
    //         output: [1]
    //       });
    //     }
    //   }
    // }

    // return trainingSet;
  }

  getData (imageObj){
    let context = null;
    let canvas = document.getElementById('canvas-demo4');

    context = context || (<any> canvas).getContext('2d');

    context.drawImage(imageObj, 0, 0);

    var imageData = context.getImageData(0, 0, 125, 125);
    return imageData.data;
  }

  pixel(data, x, y) {
    var red = data[((2 * y) + x) * 4];
    var green = data[((2 * y) + x) * 4 + 1];
    var blue = data[((2 * y) + x) * 4 + 2];
    console.log(red, green, blue);

    return [red / 255, green / 255, blue / 255];
  }

  // stringToBinary(str) {
  //   let output = "";
  //   for (var i = 0; i < str.length; i++) {
  //     output += str[i].charCodeAt(0).toString(2);
  //   }
  //   let arrayOutput = output.split('');
  //   let finalOutput = [];

  //   for (var i = 0; i < arrayOutput.length; i++) {
  //     finalOutput.push(parseInt(arrayOutput[i]));
  //   }

  //   return finalOutput;
  // }

  // binaryToString(binary) {
  //   var binString = '';

  //   binary.split(' ').map(function(bin) {
  //       binString += String.fromCharCode(parseInt(bin, 2));
  //     });
  //   return binString;
  // }


}

    // var net = new brain.NeuralNetwork();
    // const data = [
    //   { input: [0,0], output:[0]},
    //   { input: [0,1], output:[1]},
    //   { input: [1,0], output:[1]},
    //   { input: [1,1], output:[0]}
    // ];

    // net.train(data, {
    //   errorThresh: 0.005,  // error threshold to reach
    //   iterations: 200000,   // maximum training iterations
    //   log: true,           // console.log() progress periodically
    //   logPeriod: 1000,       // number of iterations between logging
    //   learningRate: 0.1    // learning rate
    // });

    // const result = net.run([1,1]);
    // console.log(result);

    // net.train([{input: { r: 0.03, g: 0.7, b: 0.5 }, output: { black: 1 }},
    //            {input: { r: 0.16, g: 0.09, b: 0.2 }, output: { white: 1 }},
    //            {input: { r: 0.5, g: 0.5, b: 1.0 }, output: { white: 1 }}]);

    // var output = net.run({ r: 0.99, g: 0.99, b: 0.99 });  // { white: 0.99, black: 0.002 }
    // console.log(output)

    // // let perceptron = new Architect.Perceptron(1,20,1);
    // var trainingSet = [
    //   {
    //     input: [0],
    //     output: [0]
    //   },
    //   {
    //     input: [0.25],
    //     output: [0.25]
    //   },
    //   {
    //     input: [0.5],
    //     output: [0.5]
    //   },
    //   {
    //     input: [0.75],
    //     output: [0.75]
    //   },
    //   {
    //     input: [1],
    //     output: [1]
    //   }
    // ];

    // const results = trainer.train(trainingSet,{
		// 	rate: .1,
    //   iterations: 200000,
    //   error: .001,
    //   shuffle: true,
    //   log: 1000,
    //   cost: Trainer.cost.CROSS_ENTROPY
    // });
    // const res = perceptron.activate([0.24][0]);
    // console.log('done', res);

    // const res2 = perceptron.activate([0.74][0]);
    // console.log('done', res2);
    // const converted = this.stringToBinary('hello');
    // console.log(converted);
    // const answer = this.binaryToString(converted);
    // console.log(answer);
