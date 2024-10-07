import React, { useRef, useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import style from "../Styles/Chat.module.css"; // Ensure the path is correct

const Chat = () => {
  const socketRef = useRef();
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const user = JSON.parse(localStorage.getItem('user'));
  const messagesEndRef = useRef(null); // Reference to the end of messages container

  useEffect(() => {
    // Use the socket URL from the .env file
    const socketURL = import.meta.env.VITE_SOCKET_URL; // Import from .env file
    socketRef.current = io(socketURL); // Use the imported URL

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

  useEffect(() => {
    // Scroll to the bottom of messages when a new message is added
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]); // Runs every time messages change

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
    <div className={style.chatContainer}>
      <div className={style.messages}>
        {messages.map((msg, index) => (
          <div
            key={index}
            className={style.message}
            style={{ backgroundColor: msg.role === 'student' ? '#c8e6c9' : '#ffccbc' }}
          >
            <strong>{msg.sender} ({msg.role})</strong>: {msg.text}
            <span className={style.timestamp}> [{msg.time}]</span>
          </div>
        ))}
        {/* Reference for scrolling */}
        <div ref={messagesEndRef} />
      </div>
      <div className={style.inputContainer}>
        <input
          type="text"
          className={style.input}
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
          placeholder="Type a message..."
        />
        <button className={style.sendButton} onClick={sendMessage}>
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;
