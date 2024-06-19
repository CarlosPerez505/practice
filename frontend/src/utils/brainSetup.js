// src/utils/brainSetup.js
import { NeuralNetwork } from 'brain.js';

const net = new NeuralNetwork();

const trainingData = [
    { input: { lat: 36.7281, lng: -108.2187 }, output: { lat: 36.8222, lng: -107.9917 } },
    { input: { lat: 36.8222, lng: -107.9917 }, output: { lat: 36.7857, lng: -108.6877 } },
    // Add more training data...
];

net.train(trainingData);

export const makePrediction = (lat, lng) => {
    const prediction = net.run({ lat, lng });
    return prediction;
};
