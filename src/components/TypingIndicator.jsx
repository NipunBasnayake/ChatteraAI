import React from 'react';
import aiAvatar from '../assets/images/AIAvatar.png';

const TypingIndicator = () => {
  return (
    <div className="d-flex align-items-start w-100 my-3 fade-in">
      <img 
        src={aiAvatar} 
        className="rounded-circle me-2 avatar-ai" 
        width="45" 
        height="45" 
        alt="ChatterAI" 
      />
      <div className="text-white p-3 rounded-3 message-bubble-ai">
        <div className="fw-bold">ChatterAI</div>
        <div className="typing-indicator my-1">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    </div>
  );
};

export default TypingIndicator;