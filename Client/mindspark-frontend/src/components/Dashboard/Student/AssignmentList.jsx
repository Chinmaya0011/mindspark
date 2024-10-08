import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAssignments } from '../../../redux/assignmentSlice'; // Adjust the path as needed

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
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-xl text-gray-700">Loading assignments...</p>
      </div>
    );
  }

  if (status === 'failed') {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-xl text-red-600">Error: {error}</p>
      </div>
    );
  }

  return (
    <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-xl transform transition-transform duration-200 bg-gradient-to-r from-green-100 to-blue-100">
      <h2 className="text-2xl font-bold text-center mb-4 text-gray-800">Assignments List</h2>
      {assignments.length === 0 ? (
        <p className="text-center text-gray-600">No assignments available.</p>
      ) : (
        <ul className="space-y-4">
          {assignments.map((assignment, index) => (
            <li
              key={`${assignment.id}-${index}`}
              className="p-4 border border-gray-300 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200"
            >
              <h3 className="text-xl font-semibold text-gray-800">{assignment.title}</h3>
              <p className="text-gray-700">{assignment.description}</p>
              <p className="text-gray-600">Subject: {assignment.subject}</p>
              {/* Format the due date to 'dd/mm/yyyy' */}
              <p className="text-gray-600">Due Date: {formatDate(assignment.dueDate)}</p>
              {/* Display the instructor's name */}
              <p className="text-gray-600">
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
