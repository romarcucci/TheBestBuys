import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';

// Components
import BotMessage from './BotMessage';
import BotRecommendations from './BotRecommendations';
import ChatInput from './ChatInput';
import LoadingSpinner from './LoadingSpinner';
import RobotAvatar from './RobotAvatar';
import ScrollBackButton from './ScrollBackButton';
import UserSuggestion from './UserSuggestion';
import CategoriesGrid from './CategoriesGrid';

// Icons
import {
  FaMobileAlt,
  FaTv,
  FaLaptop,
  FaRegClock,
  FaHeadphones,
  FaHeadphonesAlt,
  FaCamera,
  FaBluetooth,
  FaVolumeUp,
  FaProjectDiagram,
  FaDesktop,
  FaGamepad,
} from 'react-icons/fa';

// Styles
import '../../styles/chatbot/ChatbotInterface.scss';

// Main Chatbot Interface Component
const ChatbotInterface = () => {
  // State Variables
  const [chatLog, setChatLog] = useState([]); // The log of all chat messages
  const [currentInput, setCurrentInput] = useState(''); // Current text input from the user
  const [isLoading, setIsLoading] = useState(false); // Loading state for async operations
  const [showScrollBackButton, setShowScrollBackButton] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [categoriesList, setCategoriesList] = useState([
    { label: 'Smartphone', icon: <FaMobileAlt /> },
    { label: 'TV', icon: <FaTv /> },
    { label: 'Laptop', icon: <FaLaptop /> },
    { label: 'Smartwatch', icon: <FaRegClock /> },
    { label: 'Headphones', icon: <FaHeadphones /> },
    { label: 'Earbuds', icon: <FaHeadphonesAlt /> },
    { label: 'Camera', icon: <FaCamera /> },
    { label: 'Wireless speaker', icon: <FaBluetooth /> },
    { label: 'Soundbar', icon: <FaVolumeUp /> },
    { label: 'Video projector', icon: <FaProjectDiagram /> },
    { label: 'Monitor', icon: <FaDesktop /> },
    { label: 'Video game console', icon: <FaGamepad /> },
  ]);
  const [userId, setUserId] = useState('');

  // Ref to keep track of the chat log for auto-scrolling
  const chatLogRef = useRef(null); // Reference to the chat log container

  // Effect to scroll to the bottom of the chat log when new messages are added
  useEffect(() => {
    if (chatLogRef.current) {
      chatLogRef.current.scrollTop = chatLogRef.current.scrollHeight; // Scroll to the latest message
    }
  }, [chatLog, suggestions]); // Effect depends on chatLog

  useEffect(() => {
    const initialMessage = `Hello, what kind of product are you looking for ?`; // Initial bot message
    setChatLog([{ type: 'bot', content: initialMessage }]); // Set initial message in chat log

    // Generate a random userId (you can replace this with your own logic)
    const generatedUserId = Math.random().toString(36).substr(2, 9);
    setUserId(generatedUserId);

    const handleScroll = () => {
      const element = chatLogRef.current;
      const offset = 300; // Small offset to account for minor discrepancies
      const isAtBottom =
        element.scrollHeight - element.scrollTop - element.clientHeight <=
        offset;

      setShowScrollBackButton(!isAtBottom);
    };

    const currentChatLog = chatLogRef.current;
    if (currentChatLog) {
      currentChatLog.addEventListener('scroll', handleScroll);
      return () => currentChatLog.removeEventListener('scroll', handleScroll);
    }
  }, []);

  const sendMessage = async (userMessage) => {
    try {
      setCategoriesList([]);

      // Send the user message to the server
      const response = await axios.post('http://localhost:3000/chat', {
        message: userMessage,
        userId: userId,
      });

      // Remove the loading spinner after receiving the response
      setChatLog((prev) => prev.filter((msg) => msg.type !== 'loading'));

      // Check for a valid bot response
      if (
        response.data &&
        response.data.message &&
        typeof response.data.message === 'string'
      ) {
        const botMessage = response.data.message;
        // const suggestionResponse = response.data.suggestions || [];
        const suggestionResponse = response.data.suggestions || ['Yes', 'No'];
        const recommendations = response.data.message.recommendations || [];
        // const recommendations = response.data.message.recommendations || [
        //   '<a class="affiliated-link" href="https://amzn.eu/d/8gqaqCV"><div class="image-affiliated-link"><img alt="Apple iPhone 15 (128 Go) - Noir" src="https://m.media-amazon.com/images/I/61eEYLATF9L._AC_SY110_.jpg" /></div><span class="test-affiliated-link">Apple iPhone 15 (128 Go) - Noir</span></a>',
        //   '<a class="affiliated-link" href="https://amzn.eu/d/8gqaqCV"><div class="image-affiliated-link"><img alt="Apple iPhone 15 (128 Go) - Noir" src="https://m.media-amazon.com/images/I/61eEYLATF9L._AC_SY110_.jpg" /></div><span class="test-affiliated-link">Apple iPhone 15 (128 Go) - Noir</span></a>',
        //   '<a class="affiliated-link" href="https://amzn.eu/d/8gqaqCV"><div class="image-affiliated-link"><img alt="Apple iPhone 15 (128 Go) - Noir" src="https://m.media-amazon.com/images/I/61eEYLATF9L._AC_SY110_.jpg" /></div><span class="test-affiliated-link">Apple iPhone 15 (128 Go) - Noir</span></a>',
        // ];

        setChatLog((prev) => [
          ...prev,
          {
            type: 'bot', // Indicate this is a bot message
            content: botMessage, // Bot's message content
            recommendations: recommendations,
          },
        ]);

        setTimeout(() => {
          setSuggestions(suggestionResponse);
        }, 300);
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

  // Function to send a user message to the server and handle the response
  const addUserMessage = (message) => {
    const userMessage = message || currentInput.trim(); // Use passed message or currentInput

    if (userMessage === '') {
      return; // Don't send empty messages
    }

    setIsLoading(true); // Set loading state to true
    setSuggestions([]); // Set loading state to true

    setChatLog((prev) => [
      ...prev,
      { type: 'user', content: userMessage }, // Add user message to chat log
      { type: 'loading', content: '' }, // Add loading spinner to indicate a process
    ]);

    setCurrentInput(''); // Clear the input field

    sendMessage(userMessage);
  };

  const handleSuggestionClick = (suggestion) => {
    setSuggestions((prevSuggestions) =>
      prevSuggestions.map((s) =>
        s === suggestion ? { content: s, slideOut: true } : s
      )
    );

    setTimeout(() => {
      addUserMessage(suggestion); // Pass the suggestion directly to sendMessage
      setSuggestions([]); // Clear suggestions after delay for animation
    }, 300); // 300ms to match SCSS animation
  };

  const handleCategoryClick = (category) => {
    const userMessage = category.label || currentInput.trim(); // Use passed message or currentInput

    if (userMessage === '') {
      return; // Don't send empty messages
    }

    setIsLoading(true); // Set loading state to true
    setCategoriesList([]);

    setChatLog((prev) => [
      ...prev,
      { type: 'category', content: category }, // Add user message to chat log
      { type: 'loading', content: '' }, // Add loading spinner to indicate a process
    ]);

    setCurrentInput(''); // Clear the input field

    sendMessage(userMessage);
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

          if (msg.type === 'category') {
            // Render loading spinner when loading
            return (
              <div
                key={index} // Unique key for each category
                className="chat-msg category" // Class for styling the product category
              >
                <div className="icon-wrapper">{msg.content.icon}</div>
                <span className="category-label">{msg.content.label}</span>
              </div>
            );
          }
          if (msg.type === 'loading') {
            // Render loading spinner when loading
            return (
              <div key={index} className="chat-msg bot">
                <LoadingSpinner />
              </div>
            );
          }

          return (
            <div key={index} className={`chat-msg ${msg.type}`}>
              {msg.content}
            </div>
          );
        })}
        <UserSuggestion
          suggestions={suggestions.map((s) =>
            typeof s === 'string' ? s : s.content
          )}
          onSuggestionClick={handleSuggestionClick}
        />
        <CategoriesGrid
          onCategoryClick={handleCategoryClick}
          categoriesList={categoriesList}
        />
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
        currentInput={currentInput}
        setCurrentInput={setCurrentInput}
        addUserMessage={() => addUserMessage()} // Call sendMessage without argument
        isLoading={isLoading}
        // disabled={suggestions.length > 0} // Disable if there are suggestions
      />
    </div>
  );
};

export default ChatbotInterface; /* Export the component for use in other parts of the application */
