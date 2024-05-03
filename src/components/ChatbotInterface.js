import React, { useState, useEffect } from 'react';

const ChatbotInterface = ({ selectedCategory, onRecommendations }) => {
  const [chatLog, setChatLog] = useState([]);
  const [currentInput, setCurrentInput] = useState('');

  const sendMessage = () => {
    if (currentInput.trim() === '') {
      return;
    }

    const userMessage = {
      type: 'user',
      content: currentInput,
    };

    setChatLog((prev) => [...prev, userMessage]);
    setCurrentInput('');

    // Simulate a chatbot response
    setTimeout(() => {
      const botMessage = {
        type: 'bot',
        content: `Looking for recommendations for ${selectedCategory}. Please wait...`,
      };

      setChatLog((prev) => [...prev, botMessage]);

      // Simulate product recommendations
      setTimeout(() => {
        const productRecommendations = [
          { name: 'Product 1', link: 'https://www.amazon.com/product1' },
          { name: 'Product 2', link: 'https://www.amazon.com/product2' },
          { name: 'Product 3', link: 'https://www.amazon.com/product3' },
        ];

        onRecommendations(productRecommendations);
      }, 1000); // Simulate a delay for the bot response
    }, 1000);
  };

  return (
    <div className="chatbot-interface">
      <div className="chat-log">
        {chatLog.map((msg, index) => (
          <div key={index} className={`chat-msg ${msg.type}`}>
            {msg.content}
          </div>
        ))}
      </div>
      <input
        type="text"
        value={currentInput}
        onChange={(e) => setCurrentInput(e.target.value)}
        onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
        placeholder="Type your message..."
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
};

export default ChatbotInterface;
