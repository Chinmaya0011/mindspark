import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAssignments } from '../../../redux/assignmentSlice'; // Adjust the path as needed
import './AssignmentList.css'; // Import the CSS file
import { FaClipboardList, FaBook, FaCalendarAlt, FaUser, FaStickyNote } from 'react-icons/fa'; // Import icons

const AssignmentList = () => {
  const dispatch = useDispatch();
  const assignments = useSelector((state) => state.assignments.assignments);
  const status = useSelector((state) => state.assignments.status);
  const error = useSelector((state) => state.assignments.error);

  useEffect(() => {
    // Fetch assignments when the component mounts
    dispatch(fetchAssignments());
  }, [dispatch]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

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
    <div className="max-w-full w-full mx-auto p-6 bg-white rounded-lg shadow-lg transform transition duration-300 scroll-container">
       <h2 className="text-2xl font-bold text-center mb-6 text-gray-800 flex items-center justify-center">
        <FaStickyNote className="mr-2 text-yellow-600" /> {/* Note Icon */}
        Notes List
      </h2>
      {assignments.length === 0 ? (
        <p className="text-center text-gray-600">No assignments available.</p>
      ) : (
        <ul className="space-y-4">
          {assignments.map((assignment, index) => (
            <li
              key={`${assignment.id}-${index}`}
              className="p-4 border border-gray-300 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
            >
              <h3 className="text-xl font-semibold text-gray-800 flex items-center">
                <FaClipboardList className="mr-2 text-blue-600" /> {/* Assignment Title Icon */}
                {assignment.title}
              </h3>
              <p className="text-gray-700 flex items-center">
                <FaBook className="mr-2 text-green-600" /> {/* Subject Icon */}
                {assignment.description}
              </p>
              <p className="text-gray-600 flex items-center">
                <FaCalendarAlt className="mr-2 text-yellow-600" /> {/* Due Date Icon */}
                Due Date: {formatDate(assignment.dueDate)}
              </p>
              <p className="text-gray-600 flex items-center">
                <FaUser className="mr-2 text-purple-600" /> {/* Instructor Name Icon */}
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
