import React from 'react';
import aiAvatar from '../assets/images/AIAvatar.png';

const TypingIndicator = () => {
  return (
    <div className="d-flex align-items-start w-100 my-2">
      <img 
        src={aiAvatar} 
        className="rounded-circle me-2" 
        width="40" 
        height="40" 
        alt="ChatterAI" 
      />
      <div 
        className="bg-white text-dark p-3 rounded-3" 
        style={{ maxWidth: '75%' }}
      >
        <div className="fw-bold">ChatterAI</div>
        <p className="mb-1"><em>Typing...</em></p>
      </div>
    </div>
  );
};

export default TypingIndicator;