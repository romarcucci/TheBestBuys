// Function to translate text using Google Translate API
export async function translateText(text) {
  // Get browser's language
  const browserLanguage = navigator.language || navigator.userLanguage;

  // API endpoint
  const apiUrl = `https://translation.googleapis.com/language/translate/v2?key=YOUR_API_KEY`;

  // Target language (browser's language)
  const targetLanguage = browserLanguage.split('-')[0]; // Extract language code

  try {
    // Fetch translation from Google Translate API
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        q: text,
        source: 'en', // Source language (English)
        target: targetLanguage, // Target language (browser's language)
      }),
    });

    // Parse response
    const data = await response.json();

    // Check if translation is successful
    if (
      data &&
      data.data &&
      data.data.translations &&
      data.data.translations[0]
    ) {
      return data.data.translations[0].translatedText;
    } else {
      throw new Error('Translation failed');
    }
  } catch (error) {
    console.error('Error translating text:', error);
    return text; // Return original text if translation fails
  }
}
