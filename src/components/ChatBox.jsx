import React, { useRef, useEffect } from 'react';
import MessageItem from './MessageItem';
import TypingIndicator from './TypingIndicator';

const ChatBox = ({ messages, isTyping }) => {
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  return (
    <div className="row justify-content-center mt-0 px-3 px-md-0">
      <div className="col-12 col-md-8 col-lg-6">
        <div className="custom-chatbox">
          {messages.map((msg, index) => (
            <MessageItem
              key={index}
              sender={msg.sender}
              message={msg.message}
              time={msg.time}
            />
          ))}
          {isTyping && <TypingIndicator />}
          <div ref={messagesEndRef} />
        </div>
      </div>
    </div>
  );
};

export default ChatBox;