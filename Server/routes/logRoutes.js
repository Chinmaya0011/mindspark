// routes/logRoutes.js
const express = require('express');
const Log = require('../models/Log'); // Import the Log model

const router = express.Router();

// GET all logs
router.get('/', async (req, res) => {
  try {
    const logs = await Log.find().sort({ time: -1 }); // Fetch all logs sorted by most recent
    res.json(logs);
  } catch (err) {
    console.error('Error fetching logs:', err);
    res.status(500).json({ message: 'Error fetching logs' });
  }
});

// GET logs with search parameters
router.get('/search', async (req, res) => {
  try {
    // Extract query parameters from the request
    const { ip, method, status, url, startDate, endDate } = req.query;

    // Build the query object based on provided search criteria
    const query = {};

    if (ip) query.ip = ip; // Search by IP address
    if (method) query.method = method; // Search by HTTP method
    if (status) query.status = Number(status); // Search by HTTP status code
    if (url) query.url = { $regex: url, $options: 'i' }; // Search by URL (case-insensitive)

    // Filter by date range if provided
    if (startDate && endDate) {
      query.time = { $gte: new Date(startDate), $lte: new Date(endDate) };
    } else if (startDate) {
      query.time = { $gte: new Date(startDate) };
    } else if (endDate) {
      query.time = { $lte: new Date(endDate) };
    }

    // Fetch logs based on the query, sorted by time descending
    const logs = await Log.find(query).sort({ time: -1 });
    
    // Send the filtered logs back to the client
    res.json(logs);
  } catch (err) {
    console.error('Error fetching logs:', err);
    res.status(500).json({ message: 'Error fetching logs' });
  }
});

module.exports = router;
