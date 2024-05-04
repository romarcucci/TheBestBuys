import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { FaPaperPlane } from 'react-icons/fa';
import PropTypes from 'prop-types';
import '../styles/ChatbotInterface.css';

const ChatbotInterface = ({ selectedCategory, onRecommendations }) => {
  const [chatLog, setChatLog] = useState([]);
  const [currentInput, setCurrentInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const chatLogRef = useRef(null);

  useEffect(() => {
    if (selectedCategory) {
      const initialMessage = `Can you describe shortly what kind of ${selectedCategory} you're looking for?`;
      setChatLog([{ type: 'bot', content: initialMessage }]);
    }
  }, [selectedCategory]);

  useEffect(() => {
    if (chatLogRef.current) {
      chatLogRef.current.scrollTop = chatLogRef.current.scrollHeight;
    }
  }, [chatLog]);

  const sendMessage = async () => {
    if (currentInput.trim() === '') {
      return; // Exit if the input is empty
    }

    setIsLoading(true);

    // Add the user's message to the chat log
    setChatLog((prev) => [...prev, { type: 'user', content: currentInput }]);
    const userMessage = currentInput; // Save the message
    setCurrentInput(''); // Clear the input field

    try {
      const response = await axios.post('http://localhost:3000/chat', {
        message: userMessage,
      });

      if (
        response.data &&
        response.data.message &&
        typeof response.data.message.content === 'string'
      ) {
        // Add the bot's response to the chat log
        setChatLog((prev) => [
          ...prev,
          { type: 'bot', content: response.data.message.content },
        ]);

        const recommendations = response.data.productRecommendations || [];
        onRecommendations(recommendations);
      } else {
        throw new Error('Invalid response structure');
      }
    } catch (error) {
      console.error('Error sending message:', error);

      // Add error message to the chat log
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
        {chatLog.map((msg, index) => (
          <div key={index} className={`chat-msg ${msg.type}`}>
            {msg.content}
          </div>
        ))}
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

// Set default props
ChatbotInterface.defaultProps = {
  onRecommendations: () => {}, // Default to a no-op function if not provided
};

// Define prop types
ChatbotInterface.propTypes = {
  selectedCategory: PropTypes.string.isRequired,
  onRecommendations: PropTypes.func, // Should be a function if provided
};

export default ChatbotInterface;
