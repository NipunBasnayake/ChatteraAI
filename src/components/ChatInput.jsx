import React, { useState, useRef, useEffect } from 'react';

const ChatInput = ({ onSendMessage }) => {
  const [message, setMessage] = useState('');
  const inputRef = useRef(null);
  
  useEffect(() => {
    inputRef.current.focus();
  }, []);

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
    <div className="custom-footer py-3 position-fixed bottom-0 w-100">
      <div className="container mb-4">
        <div className="row justify-content-center">
          <div className="col-12 col-md-10 col-lg-8">
            <form onSubmit={handleSubmit} className="d-flex align-items-center">
              <div className="input-group">
                <input
                  ref={inputRef}
                  type="text"
                  className="custom-input flex-grow-1"
                  placeholder="Message ChatterAI..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyDown={handleKeyDown}
                />
                <button 
                  type="submit" 
                  className="custom-button d-flex align-items-center justify-content-center"
                  disabled={!message.trim()}
                >
                  <i className="bi bi-send-fill"></i>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatInput;