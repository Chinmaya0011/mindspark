const Log = require('../models/Log'); // Adjust the path as necessary

// Middleware to log requests
const requestLogger = (req, res, next) => {
  const startTime = Date.now(); // Start time for calculating request duration

  // Capture the response end event to log the status code and duration
  res.on('finish', async () => {
    const duration = Date.now() - startTime; // Calculate the duration

    // Create a new log entry
    const logEntry = new Log({
      ip: req.ip,
      method: req.method,
      url: req.originalUrl,
      status: res.statusCode,
      duration: duration,
      userAgent: req.headers['user-agent'],
      referer: req.headers['referer'],
    });

    try {
      // Save the log entry to the database
      await logEntry.save();
    } catch (err) {
      console.error('Error saving log to MongoDB', err);
    }
  });

  next(); // Proceed to the next middleware or route handler
};

module.exports = requestLogger;
