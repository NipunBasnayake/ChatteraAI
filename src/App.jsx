import { useState } from 'react';
import './App.css';
import Header from './components/Header';
import ChatBox from './components/ChatBox';
import ChatInput from './components/ChatInput';
import { GEMINI_API_KEY } from './config';

function App() {
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);

  const getTime = () => {
    const date = new Date();
    let hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12 || 12;
    return `${hours}:${minutes < 10 ? '0' : ''}${minutes} ${ampm}`;
  };

  const getAIResponse = async (userMessage) => {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: userMessage }] }],
      }),
    };

    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${GEMINI_API_KEY}`,
        requestOptions
      );

      if (!response.ok) {
        throw new Error('Failed to fetch AI response');
      }

      const result = await response.json();
      return result.candidates[0].content.parts[0].text;
    } catch (error) {
      console.error('Error fetching AI response:', error);
      return 'Sorry, I encountered an error. Please try again.';
    }
  };

  const handleSendMessage = async (message) => {
    const currentTime = getTime();
    
    setMessages((prevMessages) => [
      ...prevMessages,
      { sender: 'Me', message, time: currentTime },
    ]);

    setIsTyping(true);

    try {
      const aiResponse = await getAIResponse(message);
      
      setIsTyping(false);
      setMessages((prevMessages) => [
        ...prevMessages,
        { sender: 'ChatterAI', message: aiResponse, time: getTime() },
      ]);
    } catch (error) {
      console.error('Error handling message:', error);
      setIsTyping(false);
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          sender: 'ChatterAI',
          message: 'Sorry, I encountered an error. Please try again.',
          time: getTime(),
        },
      ]);
    }
  };

  return (
    <div className="custom-body bg-dark">
      <div className="container-fluid p-0">
        <Header />
        <ChatBox messages={messages} isTyping={isTyping} />
        <ChatInput onSendMessage={handleSendMessage} />
      </div>
    </div>
  );
}

export default App;