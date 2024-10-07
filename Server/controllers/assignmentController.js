// src/controllers/assignmentController.js
const Assignment = require('../models/assignmentModel'); // Assuming you have a model defined

// Get all assignments
exports.getAssignments = async (req, res) => {
  try {
    const assignments = await Assignment.find(); // Fetch assignments from the database
    res.json(assignments); // Return the assignments as JSON
  } catch (error) {
    res.status(500).json({ message: error.message }); // Handle errors
  }
};

// Add a new assignment
exports.addAssignment = async (req, res) => {
  const newAssignment = new Assignment(req.body);
  try {
    const savedAssignment = await newAssignment.save(); // Save to database
    res.status(201).json(savedAssignment); // Return the saved assignment
  } catch (error) {
    res.status(400).json({ message: error.message }); // Handle errors
  }
};
