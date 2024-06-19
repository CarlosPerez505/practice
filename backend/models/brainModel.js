import { Architect } from 'synaptic';

const net = new Architect.Perceptron(2, 3, 1);

// Sample training data
const trainingData = [
    { input: [35, 5.1], output: [1] },
    { input: [28, 5.7], output: [0] },
    // Add more training data
];

trainingData.forEach(data => {
    net.activate(data.input);
    net.propagate(0.3, data.output);
});

const predict = (input) => {
    return net.activate(input);
};

export { net, predict };