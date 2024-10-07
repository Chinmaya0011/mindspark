import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addAssignment, fetchAssignments } from '../../../redux/assignmentSlice'; // Adjust the path as needed
import Swal from 'sweetalert2'; // Import SweetAlert2
import styles from '../../../Styles/instructor/AssignmentManagement.module.css'; // Import the CSS module

const AssignmentManagement = () => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState('');
  const [subject, setSubject] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');

  // Retrieve user information from local storage
  const user = JSON.parse(localStorage.getItem('user'));

 
  useEffect(() => {
    dispatch(fetchAssignments()); // Fetch assignments when the component mounts
  }, [dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Create assignment object with the user's name included
    const assignmentData = {
      title,
      subject,
      description,
      dueDate,
      instructorName: user?.name || 'Unknown', // Add the instructor's name from local storage
    };

    // Dispatch the addAssignment action
    dispatch(addAssignment(assignmentData)).then((response) => {
      if (response.meta.requestStatus === 'fulfilled') {
        // Show success alert
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'Assignment added successfully!',
          confirmButtonText: 'OK',
        });
      } else {
        // Optionally, handle error case
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Failed to add assignment. Please try again.',
          confirmButtonText: 'OK',
        });
      }
    });

    // Reset form fields after submission
    setTitle('');
    setSubject('');
    setDescription('');
    setDueDate('');
  };

  return (
    <div className={styles.assignmentContainer}>
      <h2 className={styles.header}>Create Assignment</h2>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.formGroup}>
          <label className={styles.label}>Title:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className={styles.input}
          />
        </div>
        <div className={styles.formGroup}>
          <label className={styles.label}>Subject:</label>
          <select
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            required
            className={styles.select}
          >
            <option value="">Select a subject</option>
            <option value="Math">Math</option>
            <option value="Science">Science</option>
            <option value="History">History</option>
            {/* Add more subjects as needed */}
          </select>
        </div>
        <div className={styles.formGroup}>
          <label className={styles.label}>Description:</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            className={styles.textarea}
          ></textarea>
        </div>
        <div className={styles.formGroup}>
          <label className={styles.label}>Due Date:</label>
          <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            required
            className={styles.input}
          />
        </div>
        <button type="submit" className={styles.submitButton}>
          Create Assignment
        </button>
      </form>
    </div>
  );
};

export default AssignmentManagement;
