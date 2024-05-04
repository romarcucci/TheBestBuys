import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { FaPaperPlane } from 'react-icons/fa';
import '../styles/ChatbotInterface.scss';

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

  const sendMessage = async () => {
    if (currentInput.trim() === '') {
      return; // Exit if the input is empty
    }

    setIsLoading(true);

    setChatLog((prev) => [...prev, { type: 'user', content: currentInput }]);
    const userMessage = currentInput;
    setCurrentInput('');

    try {
      const response = await axios.post('http://localhost:3000/chat', {
        message: userMessage,
      });

      if (
        response.data &&
        response.data.message &&
        typeof response.data.message.content === 'string'
      ) {
        setChatLog((prev) => [
          ...prev,
          { type: 'bot', content: response.data.message.content },
        ]);

        const recommendations = response.data.productRecommendations || [];
        onRecommendations(recommendations); // Pass recommendations to parent
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

  useEffect(() => {
    if (chatLogRef.current) {
      chatLogRef.current.scrollTop = chatLogRef.current.scrollHeight;
    }
  }, [chatLog]);

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

export default ChatbotInterface;
