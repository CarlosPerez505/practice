import React, { useState } from 'react';
import { fetchOpenAiPrediction } from '../utils/openAiApi';

const PredictLocation = () => {
    const [latitude, setLatitude] = useState('');
    const [longitude, setLongitude] = useState('');
    const [prediction, setPrediction] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handlePrediction = async () => {
        setLoading(true);
        setError(null);
        try {
            const result = await fetchOpenAiPrediction(parseFloat(latitude), parseFloat(longitude));
            setPrediction(result);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col items-center bg-gray-800 text-white p-6 rounded-lg shadow-lg mt-8">
            <h2 className="text-2xl font-bold mb-4">Predict Next Location</h2>
            <input
                type="text"
                value={latitude}
                onChange={(e) => setLatitude(e.target.value)}
                placeholder="Latitude"
                className="p-2 mb-4 bg-gray-900 text-white rounded-lg"
            />
            <input
                type="text"
                value={longitude}
                onChange={(e) => setLongitude(e.target.value)}
                placeholder="Longitude"
                className="p-2 mb-4 bg-gray-900 text-white rounded-lg"
            />
            <button
                onClick={handlePrediction}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4"
            >
                Predict Location
            </button>
            {loading && <p>Loading...</p>}
            {error && <p className="text-red-500">{error}</p>}
            {prediction && (
                <div className="text-center mt-4">
                    <p className="text-lg">Predicted Next Location: <span className="font-semibold">{prediction}</span></p>
                </div>
            )}
        </div>
    );
};

export default PredictLocat
