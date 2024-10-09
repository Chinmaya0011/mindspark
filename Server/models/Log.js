// models/Log.js
const mongoose = require('mongoose');

const logSchema = new mongoose.Schema({
  ip: String,
  method: String,
  url: String,
  time: { type: Date, default: Date.now },
  status: Number,
  duration: Number,
  userAgent: String,
  referer: String,
});

const Log = mongoose.model('Log', logSchema);

module.exports = Log;
