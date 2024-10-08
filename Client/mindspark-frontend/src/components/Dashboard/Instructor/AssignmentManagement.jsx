import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { addAssignment, fetchAssignments } from '../../../redux/assignmentSlice'; // Adjust the path as needed
import Swal from 'sweetalert2'; // Import SweetAlert2
import { FaBook, FaRegCalendarAlt, FaChalkboardTeacher } from 'react-icons/fa'; // Import icons

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
    <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-xl transform transition-transform duration-200 hover:scale-105">
      <h2 className="text-2xl font-bold text-center mb-4 text-gray-800">
        <FaBook className="inline-block mr-2" />
        Create Assignment
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex flex-col">
          <label className="font-semibold text-gray-700">
            Title:
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
          />
        </div>
        <div className="flex flex-col">
          <label className="font-semibold text-gray-700">
            Subject:
          </label>
          <select
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            required
            className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
          >
            <option value="">Select a subject</option>
            <option value="Math">Math</option>
            <option value="Science">Science</option>
            <option value="History">History</option>
            {/* Add more subjects as needed */}
          </select>
        </div>
        <div className="flex flex-col">
          <label className="font-semibold text-gray-700">
            Description:
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
          ></textarea>
        </div>
        <div className="flex flex-col">
          <label className="font-semibold text-gray-700">
            Due Date:
          </label>
          <div className="flex items-center border border-gray-300 rounded-lg">
            <FaRegCalendarAlt className="p-2 text-gray-600" />
            <input
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              required
              className="flex-grow p-2 focus:outline-none focus:ring focus:ring-blue-300 rounded-lg"
            />
          </div>
        </div>
        <button
          type="submit"
          className="w-full p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-200 shadow-lg"
        >
          <FaChalkboardTeacher className="inline-block mr-2" />
          Create Assignment
        </button>
      </form>
    </div>
  );
};

export default AssignmentManagement;
