// src/routes/assignmentRoutes.js
const express = require('express');
const router = express.Router();
const AssignmentController = require('../controllers/assignmentController');

// Get all assignments
router.get('/', AssignmentController.getAssignments);

// Add a new assignment
router.post('/', AssignmentController.addAssignment);

module.exports = router;
