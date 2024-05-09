import React from 'react';

// Assets
import robotImage from '../../assets/images/robot.png';

// Styles
import '../../styles/chatbot/RobotAvatar.scss';

const RobotAvatar = () => {
  return (
    <div className="robot-avatar">
      <img src={robotImage} alt="Robot" className="robot-image" />
      <div className="robot-label">Robot Advisor</div>
    </div>
  );
};

export default RobotAvatar;
