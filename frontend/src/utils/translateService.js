// src/utils/translateService.js
import axios from 'axios';

const OPENAI_API_KEY = 'sk-proj-JN19JBhslnLyt3o54L0ST3BlbkFJgv8OF65XaxVCyOu4ToXc';

export const translateText = async (text) => {
    try {
        const response = await axios.post(
            'https://api.openai.com/v1/engines/davinci-codex/completions',
            {
                prompt: `Translate the following text to Navajo: "${text}"`,
                max_tokens: 100,
                n: 1,
                stop: null,
                temperature: 0.7,
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${OPENAI_API_KEY}`,
                },
            }
        );

        const translatedText = response.data.choices[0].text.trim();
        return translatedText;
    } catch (error) {
        console.error('Translation error:', error);
        throw new Error('Failed to translate text');
    }
};

export const translateMultipleTexts = async (texts) => {
    const translatedTexts = {};
    for (const key in texts) {
        if (texts.hasOwnProperty(key)) {
            translatedTexts[key] = await translateText(texts[key]);
        }
    }
    return translatedTexts;
};

