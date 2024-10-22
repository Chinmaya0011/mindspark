// src/components/Modal.js
import React from 'react';
import styles from '../Styles/Modal.module.css';
import { AiOutlineClose } from 'react-icons/ai'; // Importing the close icon

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContainer}>
        <button className={styles.closeButton} onClick={onClose}>
          <AiOutlineClose size={24} /> {/* Close icon */}
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
