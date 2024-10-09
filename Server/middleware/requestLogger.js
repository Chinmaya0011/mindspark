const fs = require('fs');
const path = require('path');

// Log file path
const logFilePath = path.join(__dirname, '../logs', 'request_logs.txt');

// Middleware to log requests
const requestLogger = (req, res, next) => {
  const startTime = Date.now(); // Start time for calculating request duration

  // Function to get the real IP address
  const getClientIp = (req) => {
    const xForwardedFor = req.headers['x-forwarded-for'];
    return xForwardedFor ? xForwardedFor.split(',')[0] : req.connection.remoteAddress;
  };

  // Capture the response end event to log the status code and duration
  res.on('finish', () => {
    const duration = Date.now() - startTime; // Calculate the duration
    const logEntry = `
      IP: ${getClientIp(req)}, 
      Method: ${req.method}, 
      URL: ${req.originalUrl}, 
      Time: ${new Date().toISOString()}, 
      Status: ${res.statusCode}, 
      Duration: ${duration}ms, 
      User-Agent: ${req.headers['user-agent']}, 
      Referer: ${req.headers['referer']}
    \n`;

    // Append the log entry to the log file
    fs.appendFile(logFilePath, logEntry, (err) => {
      if (err) {
        console.error('Error writing to log file', err);
      }
    });
  });

  next(); // Proceed to the next middleware or route handler
};

module.exports = requestLogger;
