import React, { useRef, useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import { FaPaperPlane, FaUserCircle } from 'react-icons/fa';
import './Chat.css'; // Import your CSS file

const Chat = () => {
  const socketRef = useRef();
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const user = JSON.parse(localStorage.getItem('user'));
  const messagesEndRef = useRef(null); // Reference to the end of messages container

  useEffect(() => {
    const socketURL = import.meta.env.VITE_SOCKET_URL || 'http://localhost:5000'; // Fallback for local development
    socketRef.current = io(socketURL);

    // Listen for incoming chat messages
    socketRef.current.on('chat-message', (message) => {
      setMessages((prevMessages) => [...prevMessages, message]); // Add new messages at the end
    });

    // Cleanup on component unmount
    return () => {
      socketRef.current.off('chat-message'); // Remove specific listener
      socketRef.current.disconnect();
    };
  }, []);

  // Scroll to the bottom of the chat whenever messages change
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const sendMessage = () => {
    if (inputMessage.trim()) { // Prevent sending empty or whitespace-only messages
      const timeStamp = new Date().toLocaleTimeString(); // Get the current time
      const messageData = {
        text: inputMessage.trim(), // Use trimmed input value
        sender: user.name,
        role: user.role,
        time: timeStamp,
      };
      socketRef.current.emit('chat-message', messageData); // Send the message to the server
      setInputMessage(''); // Clear the input field
    }
  };

  return (
    <div className="chat-container">
      <div className="messages-container">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`messages`}
          >
            <strong className="message-text">{msg.text}</strong>
            <div className="message-info">
              <span>{msg.sender} ({msg.role})</span>
              <span className="message-time">[{msg.time}]</span>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} /> {/* Reference for scrolling */}
      </div>
      <div className="input-container">
        <FaUserCircle className="user-icon" />
        <input
          type="text"
          className="input-message"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
          placeholder="Type a message..."
          aria-label="Message input" // Accessibility
        />
        <button
          className="send-button"
          onClick={sendMessage}
          aria-label="Send message" // Accessibility
        >
          <FaPaperPlane className="send-icon" />
        </button>
      </div>
    </div>
  );
};

export default Chat;
