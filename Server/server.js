// Import required packages
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const http = require('http');
const path = require('path'); // Import path for serving static files
const fs = require('fs'); // Import fs for logging
const { Server } = require('socket.io');
const connectDB = require('./config/db');
const assignmentRoutes = require('./routes/assignmentRoutes');
const videoRoutes = require('./routes/videoRoutes');
const liveStreamRoutes = require('./routes/liveStreamRoutes'); // Ensure this is defined if needed
const requestLogger = require('./middleware/requestLogger'); // Import the request logger

// Load environment variables
dotenv.config();

// Connect to the database
connectDB();

// Create an Express application
const app = express();

// CORS options
const corsOptions = {
  origin: ['http://localhost:5173', 'https://mindspark-flax.vercel.app'], // Allow both local and production URLs
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  credentials: true,
};

// Middleware for CORS and JSON parsing
app.use(cors(corsOptions));
app.use(express.json()); // For parsing application/json

// Middleware for logging requests
const logsDir = path.join(__dirname, 'logs');
if (!fs.existsSync(logsDir)) {
  fs.mkdirSync(logsDir);
}

app.use(requestLogger); // Use the logging middleware

// Serve static files from the uploads directory
app.use('/uploads', express.static('uploads'));

// Define your routes
app.use('/api/auth', require('./routes/authRoutes')); // Authentication routes
app.use('/api/users', require('./routes/userRoutes')); // User routes
app.use('/api/assignments', assignmentRoutes); // Assignment routes
app.use('/api/videos', videoRoutes); // Video routes
app.use('/api/livestream', liveStreamRoutes); // Use this if you have RESTful routes for live streams

// Serve frontend static files if in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'client/build')));

  // Serve the frontend for any unknown route
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

// Create HTTP server and integrate with Socket.IO
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: ['http://localhost:5173', 'https://mindspark-flax.vercel.app'], // Allow both local and production URLs
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

// Catch-all route for unknown API routes
app.use((req, res) => {
  res.status(404).json({ message: 'API route not found' });
});

// Server Listening
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
