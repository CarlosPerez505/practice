// src/components/TranslateToNavajo.jsx
import React, { useState } from 'react';
import { translateMultipleTexts } from '../utils/translateService';

const TranslateToNavajo = ({ texts }) => {
    const [translatedTexts, setTranslatedTexts] = useState({});
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleTranslate = async () => {
        setLoading(true);
        setError(null);
        try {
            const translations = await translateMultipleTexts(texts);
            setTranslatedTexts(translations);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const speakText = (text) => {
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = 'nv'; // Navajo language code
        speechSynthesis.speak(utterance);
    };

    return (
        <div className="p-4 bg-gray-800 text-white rounded shadow-md mt-4">
            <h2 className="text-2xl mb-4">Translate to Navajo</h2>
            <button
                onClick={handleTranslate}
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                disabled={loading}
            >
                {loading ? 'Translating...' : 'Translate'}
            </button>
            {error && (
                <div className="mt-4 text-red-500">
                    {error}
                </div>
            )}
            <div className="mt-4">
                {Object.entries(translatedTexts).map(([key, text]) => (
                    <div key={key} className="mb-4">
                        <h3 className="text-xl">{key}:</h3>
                        <p>{text}</p>
                        <button
                            onClick={() => speakText(text)}
                            className="mt-2 bg-green-600 hover:bg-green-700 text-white font-bold py-1 px-3 rounded"
                        >
                            Speak
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TranslateToNavajo;



