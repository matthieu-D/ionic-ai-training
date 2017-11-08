import { Component } from '@angular/core';

declare var require;
var synaptic = require('synaptic');

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  output = [true,true,true,true,true];
  perceptron;

  constructor() {
    this.train();
  }

  train() {
    var  Architect = synaptic.Architect;

    this.perceptron = new Architect.Perceptron(3,60,5);

    const data = [
      { input: [0, 0, 0], output:[0, 0, 0, 0, 0]},
      { input: [1, 0, 0], output:[1, 0, 0, 0, 0]},
      { input: [1, 1, 0], output:[1, 1, 0, 0, 0]},
      { input: [0, 1, 0], output:[0, 0, 1, 0, 0]},
      { input: [0, 1, 1], output:[0, 0, 0, 1, 1]},
      { input: [0, 0, 1], output:[0, 0, 0, 0, 1]}
    ];

    for(let x=0;x< 1000; x++) {
      data.forEach(this.trainPerceptron);
    }
  }

  trainPerceptron = (info) => {
    this.perceptron.activate(info.input);
    this.perceptron.propagate(0.01, info.output);
  }

  changeButtons(up, middle, down) {
    const input = [down >>> 0 , middle >>> 0 , up >>> 0];
    const output = this.perceptron.activate(input);
    this.output = this.formatOutput(output);
  }

  formatOutput(output): boolean[] {
    output.forEach(function(value, i) {
      output[i] = (Math.round(value) === 1);
    });
    return output;
  }
}
