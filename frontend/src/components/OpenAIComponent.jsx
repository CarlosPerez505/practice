// src/components/OpenAIComponent.jsx
import React, { useState } from 'react';
import axios from 'axios';

const OpenAIComponent = () => {
    const [response, setResponse] = useState('');
    const [prompt, setPrompt] = useState('');

    const fetchOpenAIResponse = async () => {
        try {
            const result = await axios.get('/api/openai', { params: { prompt } });
            setResponse(result.data.choices[0].text);
        } catch (error) {
            console.error('Error fetching OpenAI response:', error);
        }
    };

    return (
        <div className="bg-gray-800 text-white p-8 rounded-lg shadow-lg w-full lg:w-full mx-auto mt-16 mb-16">
            <h1 className="text-5xl text-center font-bold mb-4">OpenAI Response</h1>
            <textarea
                className="w-full p-4 mb-4 bg-gray-900 text-white rounded"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Enter your prompt here..."
            />
            <button
                className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-full shadow-lg transition duration-300 transform hover:scale-105"
                onClick={fetchOpenAIResponse}
            >
                Get Response
            </button>
            {response && <p className="text-2xl p-3 leading-relaxed mt-4">{response}</p>}
        </div>
    );
};

export default OpenAIComponent;
