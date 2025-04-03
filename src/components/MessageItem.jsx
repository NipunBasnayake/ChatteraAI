import React from 'react';
import userAvatar from '../assets/images/UserAvatar.jpg';
import aiAvatar from '../assets/images/AIAvatar.png';

const MessageItem = ({ sender, message, time }) => {
  if (sender === "Me") {
    return (
      <div className="d-flex justify-content-end align-items-start w-100 my-2">
        <div className="d-flex">
          <div 
            className="bg-secondary text-white p-3 rounded-3" 
            style={{ maxWidth: '75%', borderTopRightRadius: 0 }}
          >
            <div className="fw-bold">{sender}</div>
            <p className="">{message}</p>
            <small className="text-muted">{time}</small>
          </div>
          <img 
            src={userAvatar} 
            className="rounded-circle ms-2" 
            width="40" 
            height="40" 
            alt="Me" 
          />
        </div>
      </div>
    );
  } else {
    return (
      <div className="d-flex justify-content-start align-items-start w-100 my-2">
        <div className="d-flex">
          <img 
            src={aiAvatar} 
            className="rounded-circle me-2" 
            width="40" 
            height="40" 
            alt="ChatterAI" 
          />
          <div 
            className="bg-white text-dark p-3 rounded-3" 
            style={{ maxWidth: '75%', width: 'auto', whiteSpace: 'normal' }}
          >
            <div className="fw-bold">{sender}</div>
            <p className="">{message}</p>
            <small className="text-muted">{time}</small>
          </div>
        </div>
      </div>
    );
  }
};

export default MessageItem;