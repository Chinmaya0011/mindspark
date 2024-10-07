import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from '../../../Styles/instructor/VideoList.module.css';

const VideoList = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await axios.get(`${API_URL}/videos`);
        console.log('Fetched Videos:', response.data); // Debug log
        setVideos(response.data);
      } catch (err) {
        setError('Error fetching videos');
      } finally {
        setLoading(false);
      }
    };
    fetchVideos();
  }, []);

  if (loading) {
    return <div className={styles.loading}>Loading videos...</div>;
  }

  if (error) {
    return <div className={styles.error}>{error}</div>;
  }

  return (
    <div className={styles.videoListContainer}>
      <h2 className={styles.header}>Leactures Videos</h2>
      {videos.length === 0 ? (
        <div className={styles.noVideosContainer}>
          <p className={styles.noVideos}>No videos available.</p>
        </div>
      ) : (
        <ul className={styles.videoList}>
          {videos.map((video) => (
            <li key={video._id} className={styles.videoItem}>
              {console.log('Video URL:', video.videoUrl)} {/* Debugging */}
              {video.videoUrl && video.videoUrl.includes('.mp4') ? (
                <video
                  className={styles.videoPlayer}
                  controls
                  onError={(e) => console.log('Video Load Error:', e)}
                >
                  <source src={`http://localhost:5000${video.videoUrl}`} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              ) : (
                <iframe
                  className={styles.videoIframe}
                  src={video.videoUrl}
                  title={video.title}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              )}
              <h3 className={styles.videoTitle}>{video.title}</h3>
              <p className={styles.instructorName}>By: {video.instructorName}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default VideoList;
