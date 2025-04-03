import React, { useState } from 'react';

const ChatInput = ({ onSendMessage }) => {
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim()) {
      onSendMessage(message);
      setMessage('');
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <div className="custom-footer bg-dark py-3 position-fixed bottom-0 w-100">
      <div className="container mb-5">
        <div className="row justify-content-center">
          <div className="col-12 col-md-10 col-lg-8">
            <form onSubmit={handleSubmit} className="d-flex align-items-center">
              <input
                type="text"
                className="custom-input flex-grow-1 me-2"
                placeholder="Message ChatterAI"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={handleKeyDown}
              />
              <button type="submit" className="custom-button">
                <i className="bi bi-arrow-up"></i>
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatInput;