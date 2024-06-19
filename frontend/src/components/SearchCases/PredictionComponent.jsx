// src/components/SearchCases/PredictionComponent.jsx
import React, { useState } from 'react';
import { makePrediction } from '../../utils/brainSetup';

const PredictionComponent = () => {
    const [lat, setLat] = useState('');
    const [lng, setLng] = useState('');
    const [prediction, setPrediction] = useState(null);

    const handlePredict = () => {
        const result = makePrediction(parseFloat(lat), parseFloat(lng));
        setPrediction(result);
    };

    return (
        <div className="p-4 bg-gray-800 text-white rounded shadow-md">
            <h2 className="text-2xl mb-4">Predict Next Possible Location</h2>
            <p className="mb-4">Enter the last known latitude and longitude to predict the next likely location:</p>
            <div className="mb-4">
                <label className="block mb-2">Latitude:</label>
                <input
                    type="number"
                    value={lat}
                    onChange={(e) => setLat(e.target.value)}
                    className="p-2 w-full bg-gray-700 rounded"
                />
            </div>
            <div className="mb-4">
                <label className="block mb-2">Longitude:</label>
                <input
                    type="number"
                    value={lng}
                    onChange={(e) => setLng(e.target.value)}
                    className="p-2 w-full bg-gray-700 rounded"
                />
            </div>
            <button
                onClick={handlePredict}
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
                Predict
            </button>
            {prediction && (
                <div className="mt-4">
                    <h3 className="text-xl">Prediction:</h3>
                    <p>Latitude: {prediction.lat.toFixed(4)}</p>
                    <p>Longitude: {prediction.lng.toFixed(4)}</p>
                </div>
            )}
        </div>
    );
};

export default PredictionComponent;


