const Gemini = require('gemini-api');

// Replace with your Gemini API key
const apiKey = 'YOUR_GEMINI_API_KEY';

const callGeminiApi = async (message) => {
  // Create a Gemini API client
  const client = new Gemini(apiKey);

  // Send the message to Gemini and handle the response
  try {
    const response = await client.query(message);
    console.log('Gemini response:', response);
  } catch (error) {
    console.error('Error calling Gemini API:', error);
  }
};

// Example usage
(async () => {
  const message = 'Quel temps fait-il aujourd\'hui à Paris ?';
  await callGeminiApi(message);
})();
