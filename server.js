const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const app = express();

// Middleware pour parser le corps des requêtes POST
app.use(bodyParser.json());


app.post('/chat', async (req, res) => {
    const userMessage = req.body.message;

    // Configuration de l'API OpenAI GPT-3.5 Turbo
    const openaiUrl = 'https://api.openai.com/v1/chat/completions';
    const openaiApiKey = 'sk-proj-ZQpGexrIrVRHxP3w5MQWT3BlbkFJQF0elqQCJGjkCPtUzVwS';
    const queryParams = {
        headers: {
            'Authorization': `Bearer ${openaiApiKey}`,
            'Content-Type': 'application/json'
        }
    };
    var body = {
        "model": "gpt-4-turbo",
        "messages": [
            {
                "role": "system",
                "content": "You are a helpful assistant."
            },
            {
                "role": "user",
                "content": userMessage
            }
        ]
    }
    
    try {
        const gptResponse = await axios.post(openaiUrl, body, queryParams);
        console.log(gptResponse.data);
        res.json({message: gptResponse.data.choices[0].message })

        // res.json({ message: gptResponse.data.choices[0].text.trim() });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erreur lors de la communication avec GPT-3.5 Turbo' });
    }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));