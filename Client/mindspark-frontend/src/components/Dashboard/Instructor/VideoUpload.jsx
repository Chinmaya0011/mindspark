
import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2'; // Import SweetAlert2
import styles from '../../../Styles/instructor/VideoUpload.module.css'; // Adjust if needed

const VideoUpload = () => {
  const [title, setTitle] = useState('');
  const [videoUrl, setVideoUrl] = useState('');
  const [file, setFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const user = JSON.parse(localStorage.getItem('user')); // Retrieve user from local storage
  const API_URL = import.meta.env.VITE_API_URL;

  const instructorName = user?.name || 'Unknown Instructor';

  const handleUpload = async () => {
    let uploadedVideoUrl = videoUrl;

    // If a file is selected, upload it to the server
    if (file) {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('title', title);
      formData.append('instructorName', instructorName);

      try {
        // Use axios's `onUploadProgress` to track upload progress
        const response = await axios.post(`${API_URL}/videos/upload`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          onUploadProgress: (progressEvent) => {
            const total = progressEvent.total;
            const current = progressEvent.loaded;
            const percentage = Math.floor((current / total) * 100);
            setUploadProgress(percentage); // Update upload progress
          },
        });

        uploadedVideoUrl = response.data.fileUrl; // Get the uploaded video URL

        // Show success alert
        Swal.fire({
          title: 'Success!',
          text: 'Video uploaded successfully!',
          icon: 'success',
          confirmButtonText: 'OK',
        });
      } catch (error) {
        // Show error alert
        Swal.fire({
          title: 'Error!',
          text: 'Error uploading video file',
          icon: 'error',
          confirmButtonText: 'OK',
        });
        setUploadProgress(0); // Reset progress
        return;
      }
    }

    if (!uploadedVideoUrl) {
      Swal.fire({
        title: 'Warning!',
        text: 'Please provide a video link or upload a file.',
        icon: 'warning',
        confirmButtonText: 'OK',
      });
      return;
    }

    // If no file is uploaded and videoUrl is provided
    if (videoUrl) {
      Swal.fire({
        title: 'Success!',
        text: 'Video URL saved successfully!',
        icon: 'success',
        confirmButtonText: 'OK',
      });
    }
  };

  return (
    <div className={styles.videoUploadContainer}>
      <h2>Upload Video</h2>
      <input
        type="text"
        placeholder="Video Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className={styles.inputField}
      />
      <input
        type="text"
        placeholder="Instructor Name"
        value={instructorName}
        disabled
        className={styles.inputField}
      />
      <input
        type="text"
        placeholder="Video Link (optional if uploading a file)"
        value={videoUrl}
        onChange={(e) => setVideoUrl(e.target.value)}
        className={styles.inputField}
      />
      <input
        type="file"
        onChange={(e) => setFile(e.target.files[0])}
        className={styles.fileInput}
      />
      <button onClick={handleUpload} className={styles.uploadButton}>
        Upload Video
      </button>
      {uploadProgress > 0 && <p>Upload Progress: {uploadProgress}%</p>} {/* Display upload progress */}
    </div>
  );
};

export default VideoUpload;
