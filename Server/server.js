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

const app = express();

// Middleware
app.use(cors({
  origin: 'https://mindspark-bice.vercel.app', // Your Vercel frontend URL
}));
app.use(express.json()); // For parsing application/json

// Serve static files from the uploads directory
app.use('/uploads', express.static('uploads'));

// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/assignments', assignmentRoutes);
app.use('/api/videos', videoRoutes);
app.use('/api/livestream', liveStreamRoutes);

// Create HTTP server and integrate with Socket.IO
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*', // Update this for production if necessary
    methods: ['GET', 'POST'],
  },
});

// Live Stream Namespace
const liveStreamNamespace = io.of('/livestream');

liveStreamNamespace.on('connection', (socket) => {
  console.log('User connected to Live Stream:', socket.id);

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
