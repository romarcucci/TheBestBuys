import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';

// Components
import BotMessage from './BotMessage';
import BotRecommendations from './BotRecommendations';
import ChatInput from './ChatInput';
import LoadingSpinner from './LoadingSpinner';
import RobotAvatar from './RobotAvatar';
import ScrollBackButton from './ScrollBackButton';

// Styles
import '../../styles/chatbot/ChatbotInterface.scss';

// Main Chatbot Interface Component
const ChatbotInterface = ({ selectedCategory }) => {
  // State Variables
  const [chatLog, setChatLog] = useState([]); // The log of all chat messages
  const [currentInput, setCurrentInput] = useState(''); // Current text input from the user
  const [isLoading, setIsLoading] = useState(false); // Loading state for async operations
  const [showScrollBackButton, setShowScrollBackButton] = useState(false);

  // Ref to keep track of the chat log for auto-scrolling
  const chatLogRef = useRef(null); // Reference to the chat log container

  // Effect to scroll to the bottom of the chat log when new messages are added
  useEffect(() => {
    if (chatLogRef.current) {
      chatLogRef.current.scrollTop = chatLogRef.current.scrollHeight; // Scroll to the latest message
    }
  }, [chatLog]); // Effect depends on chatLog

  // Effect to add an initial message when a category is selected
  useEffect(() => {
    if (selectedCategory) {
      const initialMessage = `Hello, can you describe shortly what kind of ${selectedCategory} you're looking for?`; // Initial bot message
      setChatLog([{ type: 'bot', content: initialMessage }]); // Set initial message in chat log
    }
  }, [selectedCategory]); // Effect depends on selectedCategory

  useEffect(() => {
    const handleScroll = () => {
      const element = chatLogRef.current;
      const tolerance = 300; // Small tolerance to account for minor discrepancies
      const isAtBottom =
        element.scrollHeight - element.scrollTop - element.clientHeight <=
        tolerance;

      setShowScrollBackButton(!isAtBottom);
    };

    const currentChatLog = chatLogRef.current;
    if (currentChatLog) {
      currentChatLog.addEventListener('scroll', handleScroll);
      return () => currentChatLog.removeEventListener('scroll', handleScroll);
    }
  }, []);

  // Function to send a user message to the server and handle the response
  const sendMessage = async () => {
    if (currentInput.trim() === '') {
      return; // Don't send empty messages
    }

    setIsLoading(true); // Set loading state to true

    setChatLog((prev) => [
      ...prev,
      { type: 'user', content: currentInput }, // Add user message to chat log
      { type: 'loading', content: '' }, // Add loading spinner to indicate a process
    ]);

    const userMessage = currentInput; // Save current user input
    setCurrentInput(''); // Clear the input field

    try {
      // Send the user message to the server
      const response = await axios.post('http://localhost:3000/chat', {
        message: userMessage,
      });

      // Remove the loading spinner after receiving the response
      setChatLog((prev) => prev.filter((msg) => msg.type !== 'loading'));

      // Check for a valid bot response
      if (
        response.data &&
        response.data.message &&
        typeof response.data.message.content === 'string'
      ) {
        setChatLog((prev) => [
          ...prev,
          {
            type: 'bot', // Indicate this is a bot message
            content: response.data.message.content, // Bot's message content
            // recommendations: response.data.message.recommendations || [], // Add recommendations if any
            recommendations: [
              '<a class="affiliated-link" href="https://amzn.eu/d/8gqaqCV"><div class="image-affiliated-link"><img alt="Apple iPhone 15 (128 Go) - Noir" src="https://m.media-amazon.com/images/I/61eEYLATF9L._AC_SY110_.jpg" /></div><span class="test-affiliated-link">Apple iPhone 15 (128 Go) - Noir</span></a>',
              '<a class="affiliated-link" href="https://amzn.eu/d/8gqaqCV"><div class="image-affiliated-link"><img alt="Apple iPhone 15 (128 Go) - Noir" src="https://m.media-amazon.com/images/I/61eEYLATF9L._AC_SY110_.jpg" /></div><span class="test-affiliated-link">Apple iPhone 15 (128 Go) - Noir</span></a>',
              '<a class="affiliated-link" href="https://amzn.eu/d/8gqaqCV"><div class="image-affiliated-link"><img alt="Apple iPhone 15 (128 Go) - Noir" src="https://m.media-amazon.com/images/I/61eEYLATF9L._AC_SY110_.jpg" /></div><span class="test-affiliated-link">Apple iPhone 15 (128 Go) - Noir</span></a>',
            ],
          },
        ]);
      } else {
        throw new Error('Invalid response structure'); // Handle unexpected response
      }
    } catch (error) {
      console.error('Error sending message:', error); // Log the error
      setChatLog((prev) => [
        ...prev,
        {
          type: 'bot', // Error message from bot
          content:
            'Sorry, there was an error processing your request. Please try again later.', // Error content
        },
      ]); // Add error message to chat log
    } finally {
      setIsLoading(false); // Reset loading state
    }
  };

  return (
    <div className="chatbot-interface">
      {/* Conditional class based on expansion state */}
      <div className="chat-log" ref={chatLogRef}>
        {/* Chat log container with auto-scroll reference */}
        <RobotAvatar /> {/* Display the chatbot's avatar */}
        {chatLog.map((msg, index) => {
          if (msg.type === 'bot') {
            // Render bot messages
            return (
              <div key={index}>
                {/* Use unique key for React to track items */}
                <BotMessage content={msg.content} />
                {/* Display the bot message */}
                {msg.recommendations /* Display recommendations if provided */ && (
                  <BotRecommendations links={msg.recommendations} />
                )}
              </div>
            );
          }

          if (msg.type === 'loading') {
            // Render loading spinner when loading
            return (
              <div key={index} className="chat-msg bot">
                {/* Loading spinner for bots */}
                <LoadingSpinner /> {/* Display the loading spinner */}
              </div>
            );
          }

          return (
            <div key={index} className={`chat-msg ${msg.type}`}>
              {/* Render user messages */}
              {msg.content} {/* Display the user message content */}
            </div>
          );
        })}
        {showScrollBackButton && (
          <ScrollBackButton
            onScrollToBottom={() =>
              chatLogRef.current.scrollTo({
                top: chatLogRef.current.scrollHeight,
                behavior: 'smooth',
              })
            }
          />
        )}
      </div>
      <ChatInput
        currentInput={
          currentInput
        } /* Pass current user input to the input component */
        setCurrentInput={setCurrentInput} /* Set the current user input */
        sendMessage={sendMessage} /* Pass the send message function */
        isLoading={isLoading} /* Indicate if loading is active */
      />
    </div>
  );
};

export default ChatbotInterface; /* Export the component for use in other parts of the application */
