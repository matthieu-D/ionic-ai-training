import { Component } from '@angular/core';

declare var require;
var brain = require('brain');

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  net;
  output = [true,true,true,true,true];

  constructor() {
    // this.trainXOR();
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

  trainXOR() {

    this.net = new brain.NeuralNetwork();

    const data = [
      { input: [0,0], output: [0]},
      { input: [0,1], output: [1]},
      { input: [1,0], output: [1]},
      { input: [1,1], output: [0]}
    ];

    this.net.train(data, {
      errorThresh: 0.005,  // error threshold to reach
      iterations: 200000,   // maximum training iterations
      log: true,           // console.log() progress periodically
      logPeriod: 1000,       // number of iterations between logging
      learningRate: 0.1    // learning rate
    });

    console.log(this.net.run([0,0]));
    console.log(this.net.run([0,1]));
    console.log(this.net.run([1,0]));
    console.log(this.net.run([1,1]));
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
}
