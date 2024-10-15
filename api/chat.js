const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios/dist/node/axios.cjs');
// const cors = require('cors');
const app = express();
const cors = require('cors');
const { v4: uuidv4 } = require('uuid'); // For generating unique user IDs

const openaiChatUrl = 'https://api.openai.com/v1/chat/completions';
const openaiImageUrl = 'https://api.openai.com/v1/images/generations';
const openaiApiKey = 'sk-proj-ZQpGexrIrVRHxP3w5MQWT3BlbkFJQF0elqQCJGjkCPtUzVwS';

const conversations = {};
const corsOptions = {
  origin: 'https://your-vercel-domain.vercel.app', // Replace with your Vercel domain
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
// Middleware pour parser le corps des requêtes POST
// app.use(cors());
// app.use(bodyParser.json());

// app.post('/chat', async (req, res) => {
export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  const userMessage = req.body.message;
  const userId = req.body.userId || uuidv4(); // Extract userId from request or generate a new one

  // console.log('userMessage = ' + userMessage + ', userId = ' + userId);

  // Check if conversation exists for the user
  if (!conversations[userId]) {
    conversations[userId] = [];
  }

  const conversationHistory = conversations[userId];

  // Build conversation prompt
  conversationHistory.push({ role: 'user', content: userMessage });
  // console.log('conversationHistory = ' + JSON.stringify(conversationHistory));

  const queryParams = {
    headers: {
      Authorization: `Bearer ${openaiApiKey}`,
      'Content-Type': 'application/json',
    },
  };

  const bodyChat = {
    model: 'gpt-4-turbo',
    messages: [
      {
        role: 'system',
        content:
          'You are an expert of this item and you are chatting with me. \
        Ask me short closed questions (in one sentence), one question at the time, to find the item i am looking for, and suggest me 3 possible answers. \
        Asnwer me with a json: {"message":"your question here","suggestions":["proposal 1","proposal 2","proposal 3"]} \
        Make me a proposal of 3 items every 3 questions, and ask me if i am satisfied. \
        For item proposal, answer me with a json: {"message":"your question here","items":["item 1","item 2","item 3"]}',
      },
      ...conversationHistory, // Include previous conversation history
    ],
  };

  // const bodyImage = {
  //   model: 'dall-e-3',
  //   prompt:
  //     'Generate an image (png file please) of a product that will look like what the user is describing in this conversation (with a transparent background):' +
  //     JSON.stringify([
  //       {
  //         role: 'system',
  //         content:
  //           'You are an expert of this item and you are chatting with me. \
  //       Ask me short closed questions (in one sentence), one question at the time, to find the item i am looking for, and suggest me 3 possible answers. \
  //       Asnwer me with a json: {"message":"your question here","suggestions":["proposal 1","proposal 2","proposal 3"]} \
  //       Make me a proposal of 3 items every 3 questions, and ask me if i am satisfied. \
  //       For item proposal, answer me with a json: {"message":"your question here","items":["item 1","item 2","item 3"]}',
  //       },
  //       ...conversationHistory, // Include previous conversation history
  //     ]),
  //   n: 1,
  //   size: '1024x1024',
  // };

  try {
    const gptResponse = await axios.post(openaiChatUrl, bodyChat, queryParams);
    // console.log(gptResponse.data);

    const assistantResponse = gptResponse.data.choices[0].message;
    // console.log("assistantResponse = " + JSON.stringify(assistantResponse));

    var assitantMessage = JSON.parse(assistantResponse.content);
    // console.log("assitantMessage = " + JSON.stringify(assitantMessage));
    if (assitantMessage.items) {
      // console.log("items detected => transform to affiliation links");
    }
    conversationHistory.push(assistantResponse);
    conversations[userId] = conversationHistory;

    // CALL TO DALLE API
    // const dalleResponse = await axios.post(
    //   openaiImageUrl,
    //   bodyImage,
    //   queryParams
    // );
    // const assistantImage = dalleResponse.data.data[0].url;
    // assitantMessage.url = assistantImage;
    res.json(assitantMessage);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: 'Erreur lors de la communication avec GPT-3.5 Turbo' });
  }
}
// });

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
