// Import required packages
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const http = require('http');
const { Server } = require('socket.io');
const connectDB = require('./config/db');
const assignmentRoutes = require('./routes/assignmentRoutes');
const videoRoutes = require('./routes/videoRoutes');
const liveStreamRoutes = require('./routes/liveStreamRoutes');

// Load environment variables
dotenv.config();

// Connect to the database
connectDB();

// Create an Express application
const app = express();

// Middleware for CORS and JSON parsing
app.use(cors({
  origin: [
    'https://mindspark-flax.vercel.app', // Your Vercel frontend URL
    'http://localhost:5173', // Local development URL
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Allowed methods
  credentials: true, // Include credentials in the requests
}));

app.use(express.json()); // For parsing application/json

// Serve static files from the uploads directory
app.use('/uploads', express.static('uploads'));

// Define your routes
app.use('/api/auth', require('./routes/authRoutes')); // Authentication routes
app.use('/api/users', require('./routes/userRoutes')); // User routes
app.use('/api/assignments', assignmentRoutes); // Assignment routes
app.use('/api/videos', videoRoutes); // Video routes
app.use('/api/livestream', liveStreamRoutes); // Live stream routes

// Create HTTP server and integrate with Socket.IO
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: [
      'https://mindspark-flax.vercel.app', // Your Vercel frontend URL
      'http://localhost:5173', // Local development URL
    ],
    methods: ['GET', 'POST'],
    credentials: true,
  },
});

// Live Stream Namespace
const liveStreamNamespace = io.of('/livestream');

liveStreamNamespace.on('connection', (socket) => {
  console.log('User connected to Live Stream:', socket.id);

  // Handle WebRTC signaling events
  socket.on('offer', (offer) => {
    console.log(`Received offer from ${socket.id}`);
    socket.broadcast.emit('offer', offer); // Broadcast the offer to other clients
  });

  socket.on('answer', (answer) => {
    console.log(`Received answer from ${socket.id}`);
    socket.broadcast.emit('answer', answer); // Broadcast the answer to other clients
  });

  socket.on('ice-candidate', (candidate) => {
    console.log(`Received ICE candidate from ${socket.id}`);
    socket.broadcast.emit('ice-candidate', candidate); // Broadcast ICE candidates to other clients
  });

  socket.on('broadcast-started', () => {
    console.log(`Broadcast started by ${socket.id}`);
    liveStreamNamespace.emit('broadcast-status', true); // Notify all clients that broadcasting has started
  });

  socket.on('end-broadcast', () => {
    console.log(`Broadcast ended by ${socket.id}`);
    liveStreamNamespace.emit('broadcast-status', false); // Notify all clients that broadcasting has ended
  });

  socket.on('chat-message', (message) => {
    console.log(`Received chat message from ${socket.id}: ${message}`);
    liveStreamNamespace.emit('chat-message', message); // Broadcast the chat message to all clients
  });

  socket.on('disconnect', () => {
    console.log('User disconnected from Live Stream:', socket.id);
  });
});

// Server Listening
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
