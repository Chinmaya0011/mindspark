const mongoose = require('mongoose');

const assignmentSchema = new mongoose.Schema({
  title: { type: String, required: true },
  subject: { type: String, required: true },
  description: { type: String, required: true },
  dueDate: { type: Date, required: true },
  instructorName: { type: String, required: true }, // Add instructor name field
});

const Assignment = mongoose.model('Assignment', assignmentSchema);

module.exports = Assignment;
