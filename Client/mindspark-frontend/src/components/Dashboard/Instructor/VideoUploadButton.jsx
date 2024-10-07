// src/components/VideoUploadButton.js
import React, { useState } from 'react';
import Modal from '../../Modal';
import VideoUpload from './VideoUpload';
import styles from '../../../Styles/instructor/VideoUploadButton.module.css';

const VideoUploadButton = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className={styles.uploadButtonContainer}>
      <button className={styles.addButton} onClick={handleOpenModal}>
        Add Video
      </button>

      {/* Modal for Video Upload */}
      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        <VideoUpload />
      </Modal>
    </div>
  );
};

export default VideoUploadButton;
