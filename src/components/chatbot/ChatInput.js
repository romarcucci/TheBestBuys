import React, { useEffect, useRef } from 'react';

// Icons
import { FaPaperPlane } from 'react-icons/fa';

// Styles
import '../../styles/chatbot/ChatInput.scss';

// ChatInput component for user input and sending messages
const ChatInput = ({
  currentInput,
  setCurrentInput,
  addUserMessage,
  isLoading,
  disabled,
}) => {
  const chatInputRef = useRef(null); // Reference to the chat log container

  // Effect to scroll to the bottom of the chat log when new messages are added
  useEffect(() => {
    if (!isLoading) {
      if (chatInputRef) {
        if (chatInputRef.current) {
          // chatInputRef.current.querySelector('textarea').focus();
        }
      }
    }
  }, [isLoading]); // Effect depends on chatLog

  // Handle input changes and prevent interaction if disabled
  const handleInputChange = (e) => {
    if (!disabled) {
      setCurrentInput(e.target.value);
    }
  };

  // Handle key presses (send message on Enter, prevent new line)
  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey && !isLoading && !disabled) {
      addUserMessage(); // Only send if not disabled and not loading
      e.preventDefault(); // Prevent default Enter behavior
    }
  };

  return (
    <div className="input-container" ref={chatInputRef}>
      <textarea
        rows="1" // Default row count
        value={currentInput}
        onChange={handleInputChange} // Only update if not disabled
        onKeyPress={handleKeyPress} // Only send if not disabled
        className={`chat-input ${isLoading ? 'disabled' : ''}`} // Apply disabled styling
        // className={`chat-input ${disabled ? 'disabled' : ''}`} // Apply disabled styling
        placeholder="Message Robot Advisor" // Placeholder text
        disabled={isLoading} // Disable when required
        // disabled={disabled || isLoading} // Disable when required
      />
      <div
        className={`send-button ${isLoading ? 'disabled' : ''}`} // Disable if loading or disabled
        onClick={!isLoading ? addUserMessage : null} // Only allow click if not loading or disabled
        // className={`send-button ${isLoading || disabled ? 'disabled' : ''}`} // Disable if loading or disabled
        // onClick={!isLoading && !disabled ? addUserMessage : null} // Only allow click if not loading or disabled
      >
        <FaPaperPlane />
      </div>
    </div>
  );
};

export default ChatInput; /* Export component for use in other parts of the application */
