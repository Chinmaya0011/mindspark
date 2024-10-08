import React, { useRef, useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import { FaPaperPlane, FaUserCircle } from 'react-icons/fa';

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
    <div className="flex flex-col p-4 rounded-lg w-full h-full bg-white shadow-2xl">
      <div className="flex-grow overflow-y-auto p-2 rounded-lg shadow-inner h-full">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`p-2 mb-2 rounded-lg ${
              msg.role === 'student' ? 'bg-gradient-to-r from-green-600 to-black' : 'bg-gradient-to-r from-red-600 to-black'
            }`}
          >
            <strong className="text-white font-bold">{msg.text}</strong>
            <div className="text-xs text-gray-300">
              <span>{msg.sender} ({msg.role})</span>
              <span className="ml-2">[{msg.time}]</span>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} /> {/* Reference for scrolling */}
      </div>
      <div className="flex mt-2 w-full">
        <div className="flex items-center border border-gray-300 rounded-l-md w-9/12">
          <FaUserCircle className="text-gray-400 ml-2" />
          <input
            type="text"
            className="flex-grow p-2 focus:outline-none"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
            placeholder="Type a message..."
            aria-label="Message input" // Accessibility
          />
        </div>
        <button
          className="w-3/12 p-2 bg-blue-500 text-white rounded-r-md hover:bg-blue-600 transition duration-200 flex items-center justify-center"
          onClick={sendMessage}
          aria-label="Send message" // Accessibility
        >
          <FaPaperPlane className="mr-1" />
        </button>
      </div>

      {/* Webkit scrollbar styles */}
      <style jsx>{`
        .overflow-y-auto {
          overflow-y: scroll; /* Enable scrolling */
          scrollbar-width: none; /* For Firefox */
        }

        .overflow-y-auto::-webkit-scrollbar {
          display: none; /* For Chrome, Safari, and Edge */
        }
      `}</style>
    </div>
  );
};

export default Chat;
