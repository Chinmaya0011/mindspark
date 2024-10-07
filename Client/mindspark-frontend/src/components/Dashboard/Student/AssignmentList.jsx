import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAssignments } from '../../../redux/assignmentSlice'; // Adjust the path as needed
import styles from '../../../Styles/student/AssignmentList.module.css'; // Import the CSS module

const AssignmentList = () => {
  const dispatch = useDispatch();
  const assignments = useSelector((state) => state.assignments.assignments);
  const status = useSelector((state) => state.assignments.status);
  const error = useSelector((state) => state.assignments.error);

  useEffect(() => {
    // Fetch assignments when the component mounts
    const fetchData = async () => {
      await dispatch(fetchAssignments());
    };

    fetchData();
  }, [dispatch]);

  // Function to format the due date as 'dd/mm/yyyy'
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Month is zero-based, so add 1
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  // Handle loading and error states
  if (status === 'loading') {
    return <div className={styles.loading}>Loading assignments...</div>;
  }

  if (status === 'failed') {
    return <div className={styles.error}>Error: {error}</div>;
  }

  return (
    <div className={styles.assignmentContainer}>
      <h2 className={styles.header}>Assignments List</h2>
      {assignments.length === 0 ? (
        <p className={styles.noAssignments}>No assignments available.</p>
      ) : (
        <ul className={styles.assignmentList}>
          {assignments.map((assignment, index) => (
            <li key={`${assignment.id}-${index}`} className={styles.assignmentItem}>
              <h3 className={styles.assignmentTitle}>{assignment.title}</h3>
              <p className={styles.assignmentDescription}>{assignment.description}</p>
              <p className={styles.assignmentSubject}>Subject: {assignment.subject}</p>
              {/* Format the due date to 'dd/mm/yyyy' */}
              <p className={styles.assignmentDueDate}>
                Due Date: {formatDate(assignment.dueDate)}
              </p>
              {/* Display the instructor's name */}
              <p className={styles.instructorName}>
                <strong>Added by:</strong> {assignment.instructorName || 'Unknown'}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AssignmentList;
