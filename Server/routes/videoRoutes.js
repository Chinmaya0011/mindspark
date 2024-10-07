// routes/videoRoutes.js
const express = require('express');
const multer = require('multer');
const path = require('path');
const File = require('../models/videoModel'); // Import the File model

const router = express.Router();

// Configure storage and file naming
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`);
  },
});

// Middleware for handling file uploads
const upload = multer({ storage }).single('file');

// POST: Upload file and save its path
router.post('/upload', (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      return res.status(500).json({ message: 'File upload failed', error: err.message });
    }
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    // Ensure the title and instructorName are provided in the request body
    const { title, instructorName } = req.body;

    if (!title || !instructorName) {
      return res.status(400).json({ message: 'Title and instructor name are required' });
    }

    // Save file information to MongoDB
    try {
      const video = new File({
        title: title,
        instructorName: instructorName,
        videoUrl: `/uploads/${req.file.filename}`,
      });

      await video.save(); // Save to database
      res.status(200).json({ fileUrl: video.videoUrl }); // Respond with the file URL
    } catch (dbError) {
      res.status(500).json({ message: 'Error saving file info to database', error: dbError.message });
    }
  });
});

// GET: Retrieve list of uploaded files
router.get('/', async (req, res) => {
  try {
    const videos = await File.find(); // Fetch all videos from the database
    res.status(200).json(videos); // Respond with the list of videos
  } catch (dbError) {
    res.status(500).json({ message: 'Error retrieving videos', error: dbError.message });
  }
});

// Export the router
module.exports = router;
