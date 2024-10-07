// models/videoModel.js
const mongoose = require('mongoose');

const videoSchema = new mongoose.Schema({
  title: { type: String, required: true },
  instructorName: { type: String, required: true },
  videoUrl: { type: String, required: true }, // This can either be a link or a local file path
  createdAt: { type: Date, default: Date.now },
});

// Create the Video model
module.exports = mongoose.model('File', videoSchema);
