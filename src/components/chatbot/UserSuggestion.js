import React from 'react';
import PropTypes from 'prop-types';

// Styles
import '../../styles/chatbot/UserSuggestion.scss';

const UserSuggestion = ({ suggestions, onSuggestionClick }) => {
  if (!suggestions || suggestions.length === 0) {
    return null;
  }

  const handleSuggestionClick = (suggestion) => {
    onSuggestionClick(suggestion);
  };

  return (
    <div className="user-suggestion">
      {suggestions.map((suggestion, index) => (
        <div
          key={index}
          className="suggestion"
          onClick={() => handleSuggestionClick(suggestion)}
        >
          {suggestion}
        </div>
      ))}
    </div>
  );
};

UserSuggestion.propTypes = {
  suggestions: PropTypes.arrayOf(PropTypes.string),
  onSuggestionClick: PropTypes.func.isRequired,
};

export default UserSuggestion;
