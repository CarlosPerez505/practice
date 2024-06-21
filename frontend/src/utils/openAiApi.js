// utils/openAiApi.js
import axios from 'axios';

export const fetchOpenAiPrediction = async (latitude, longitude) => {
    const apiKey = import.meta.env.VITE_OPENAI_API_KEY; // Ensure your API key is stored in a .env file

    const data = {
        prompt: `Predict the next location based on latitude: ${latitude} and longitude: ${longitude}.`,
        max_tokens: 100,
    };

    try {
        const response = await axios.post('https://api.openai.com/v1/engines/davinci-codex/completions', data, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`,
            },
        });
        return response.data.choices[0].text.trim();
    } catch (error) {
        throw new Error('Failed to fetch prediction from OpenAI');
    }
};
