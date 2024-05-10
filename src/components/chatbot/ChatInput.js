import React from 'react';

// Icons
import { FaPaperPlane } from 'react-icons/fa';

// Styles
import '../../styles/chatbot/ChatInput.scss';

// ChatInput component for user input and sending messages
const ChatInput = ({
  currentInput,
  setCurrentInput,
  sendMessage,
  isLoading,
  disabled,
}) => {
  // Handle input changes and prevent interaction if disabled
  const handleInputChange = (e) => {
    if (!disabled) {
      setCurrentInput(e.target.value);
    }
  };

  // Handle key presses (send message on Enter, prevent new line)
  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey && !isLoading && !disabled) {
      sendMessage(); // Only send if not disabled and not loading
      e.preventDefault(); // Prevent default Enter behavior
    }
  };

  return (
    <div className="input-container">
      <textarea
        rows="1" // Default row count
        value={currentInput}
        onChange={handleInputChange} // Only update if not disabled
        onKeyPress={handleKeyPress} // Only send if not disabled
        className={`chat-input ${disabled ? 'disabled' : ''}`} // Apply disabled styling
        placeholder="Type your message..." // Placeholder text
        disabled={disabled || isLoading} // Disable when required
      />
      <div
        className={`send-button ${isLoading || disabled ? 'disabled' : ''}`} // Disable if loading or disabled
        onClick={!isLoading && !disabled ? sendMessage : null} // Only allow click if not loading or disabled
      >
        <FaPaperPlane />
      </div>
    </div>
  );
};

export default ChatInput; /* Export component for use in other parts of the application */
