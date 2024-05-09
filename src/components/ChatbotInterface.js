import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import BotMessage from './BotMessage';
import BotRecommendations from './BotRecommendations';
import LoadingSpinner from './LoadingSpinner'; // Import the LoadingSpinner component
import { FaPaperPlane } from 'react-icons/fa';
import '../styles/ChatbotInterface.scss';

const ChatbotInterface = ({ selectedCategory }) => {
  const [chatLog, setChatLog] = useState([]);
  const [currentInput, setCurrentInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const chatLogRef = useRef(null);

  useEffect(() => {
    if (chatLogRef.current) {
      chatLogRef.current.scrollTop = chatLogRef.current.scrollHeight;
    }
  }, [chatLog]);

  useEffect(() => {
    if (selectedCategory) {
      const initialMessage = `Can you describe shortly what kind of ${selectedCategory} you're looking for?`;
      setChatLog([{ type: 'bot', content: initialMessage }]);
    }
  }, [selectedCategory]);

  const sendMessage = async () => {
    if (currentInput.trim() === '') {
      return;
    }

    setIsLoading(true);

    setChatLog((prev) => [
      ...prev,
      { type: 'user', content: currentInput },
      { type: 'loading', content: '' }, // Add loading spinner
    ]);

    const userMessage = currentInput;
    setCurrentInput('');

    try {
      const response = await axios.post('http://localhost:3000/chat', {
        message: userMessage,
      });

      setChatLog((prev) => prev.filter((msg) => msg.type !== 'loading'));

      if (
        response.data &&
        response.data.message &&
        typeof response.data.message.content === 'string'
      ) {
        setChatLog((prev) => [
          ...prev,
          {
            type: 'bot',
            content: response.data.message.content,
            // recommendations: recommendations,
            recommendations: [
              '<a class="affiliated-link" href="https://amzn.eu/d/8gqaqCV"><div class="image-affiliated-link"><img alt="Apple iPhone 15 (128 Go) - Noir" src="https://m.media-amazon.com/images/I/61eEYLATF9L._AC_SY110_.jpg" /></div><span class="test-affiliated-link">Apple iPhone 15 (128 Go) - Noir</span></a>',

              // '<a class="affiliated-link" href="https://amzn.eu/d/8gqaqCV"><div class="image-affiliated-link"><img alt="Apple iPhone 15 (128 Go) - Noir" src="https://m.media-amazon.com/images/I/61eEYLATF9L._AC_SY110_.jpg" /></div><span class="test-affiliated-link">Apple iPhone 15 (128 Go) - Noir</span></a>',
            ],
          },
        ]); // Add bot response
      } else {
        throw new Error('Invalid response structure');
      }
    } catch (error) {
      console.error('Error sending message:', error);
      setChatLog((prev) => [
        ...prev,
        {
          type: 'bot',
          content:
            'Sorry, there was an error processing your request. Please try again later.',
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="chatbot-interface">
      <div className="chat-log" ref={chatLogRef}>
        {chatLog.map((msg, index) => {
          if (msg.type === 'bot') {
            return (
              <div key={index}>
                <BotMessage content={msg.content} />
                {msg.recommendations && (
                  <BotRecommendations links={msg.recommendations} />
                )}
              </div>
            );
          }

          if (msg.type === 'loading') {
            return (
              <div key={index} className="chat-msg bot">
                <LoadingSpinner /> {/* Display the loading spinner */}
              </div>
            );
          }

          return (
            <div key={index} className={`chat-msg ${msg.type}`}>
              {msg.content}
            </div>
          );
        })}
      </div>

      <div className="input-container">
        <textarea
          rows="1"
          value={currentInput}
          onChange={(e) => setCurrentInput(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === 'Enter' && !e.shiftKey && !isLoading) {
              sendMessage();
              e.preventDefault();
            }
          }}
          className="chat-input"
          placeholder="Type your message..."
        />
        <div
          className={`send-button ${isLoading ? 'disabled' : ''}`}
          onClick={!isLoading ? sendMessage : null}
        >
          <FaPaperPlane />
        </div>
      </div>
    </div>
  );
};

export default ChatbotInterface;
