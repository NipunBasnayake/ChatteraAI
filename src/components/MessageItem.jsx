import React, { useEffect, useState } from 'react';
import userAvatar from '../assets/images/UserAvatar.jpg';
import aiAvatar from '../assets/images/AIAvatar.png';

const MessageItem = ({ sender, message, time }) => {
  const [visible, setVisible] = useState(false);
  
  useEffect(() => {
    setVisible(true);
  }, []);

  if (sender === "Me") {
    return (
      <div className={`d-flex justify-content-end align-items-start w-100 my-3 ${visible ? 'fade-in' : ''}`}>
        <div className="d-flex">
          <div className="text-white p-3 rounded-3 message-bubble-user">
            <div className="fw-bold d-flex justify-content-between">
              <span>{sender}</span>
              <span className="text-light opacity-75" style={{fontSize: '0.8rem'}}>{time}</span>
            </div>
            <p className="my-1">{message}</p>
          </div>
          <img 
            src={userAvatar} 
            className="rounded-circle ms-2 avatar-user" 
            width="45" 
            height="45" 
            alt="Me" 
          />
        </div>
      </div>
    );
  } else {
    return (
      <div className={`d-flex justify-content-start align-items-start w-100 my-3 ${visible ? 'fade-in' : ''}`}>
        <div className="d-flex">
          <img 
            src={aiAvatar} 
            className="rounded-circle me-2 avatar-ai" 
            width="45" 
            height="45" 
            alt="ChatterAI" 
          />
          <div className="text-white p-3 rounded-3 message-bubble-ai">
            <div className="fw-bold d-flex justify-content-between">
              <span>{sender}</span>
              <span className="text-light opacity-75" style={{fontSize: '0.8rem'}}>{time}</span>
            </div>
            <p className="my-1">{message}</p>
          </div>
        </div>
      </div>
    );
  }
};

export default MessageItem;