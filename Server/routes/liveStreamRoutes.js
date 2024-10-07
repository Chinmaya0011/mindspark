const express = require('express');
const router = express.Router();

// Sample endpoint to check if the live stream route is working
router.get('/', (req, res) => {
  res.send('Live Stream API is active!');
});

module.exports = router;
