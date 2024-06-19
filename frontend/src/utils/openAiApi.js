// src/utils/openAiApi.js
export const fetchOpenAiPrediction = async (lat, lng, apiKey) => {
    const response = await fetch('https://api.openai.com/v1/engines/davinci-codex/completions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
            prompt: `Given the latitude ${lat} and longitude ${lng}, predict the next possible location.`,
            max_tokens: 50
        })
    });

    if (!response.ok) {
        throw new Error(`OpenAI API error: ${response.statusText}`);
    }

    const data = await response.json();
    return data.choices[0].text.trim();
};
