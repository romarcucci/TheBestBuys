import React from 'react';
import robotImage from '../../assets/robot.png';
import '../../styles/chatbot/RobotAvatar.scss';

const RobotAvatar = () => {
  return (
    <div className="robot-avatar">
      <img src={robotImage} alt="Robot" className="robot-image" />
      <div className="robot-label">Robot Advisor</div> {/* Add label under avatar */}
    </div>
  );
};

export default RobotAvatar;
