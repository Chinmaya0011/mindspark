// src/components/VideoUploadButton.js
import React, { useState } from 'react';
import Modal from '../../Modal';
import VideoUpload from './VideoUpload';
import { FaUpload } from 'react-icons/fa'; // Importing an upload icon from react-icons

const VideoUploadButton = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="flex justify-center mt-5">
      <button 
        className="flex items-center px-6 py-3 bg-green-600 text-white rounded-md shadow-lg transition-transform transform hover:scale-105 hover:shadow-2xl focus:outline-none focus:ring-2 focus:ring-green-300"
        onClick={handleOpenModal}
      >
        <FaUpload className="mr-2" /> {/* Upload Icon */}
        Upload Video
      </button>

      {/* Modal for Video Upload */}
      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        <VideoUpload />
      </Modal>
    </div>
  );
};

export default VideoUploadButton;
