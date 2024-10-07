import styles from '../Styles/LiveStream.module.css';
import React, { useEffect, useRef, useState } from 'react';
import { io } from 'socket.io-client';
import {
  FaMicrophone,
  FaMicrophoneSlash,
  FaPlay,
  FaPause,
  FaExpand,
  FaCompress,
  FaSignOutAlt,
} from 'react-icons/fa';

const LiveStream = () => {
  const [isBroadcaster, setIsBroadcaster] = useState(false);
  const [socketId, setSocketId] = useState(null);
  const [isBroadcasting, setIsBroadcasting] = useState(false);
  const videoRef = useRef(null);
  const remoteVideoRef = useRef(null);
  const socketRef = useRef();
  const peerConnectionRef = useRef();
  const [isMuted, setIsMuted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [loading, setLoading] = useState(false);

  const user = JSON.parse(localStorage.getItem('user'));
  const servers = { iceServers: [{ urls: 'stun:stun.l.google.com:19302' }] };

  useEffect(() => {
    // Use environment variable for socket URL
    const socketURL = import.meta.env.VITE_SOCKET_URL || 'http://localhost:5000/livestream';
    socketRef.current = io(socketURL);

    socketRef.current.on('connect', () => setSocketId(socketRef.current.id));
    socketRef.current.on('offer', handleOffer);
    socketRef.current.on('answer', handleAnswer);
    socketRef.current.on('ice-candidate', handleNewICECandidate);
    socketRef.current.on('broadcast-status', setIsBroadcasting);
    socketRef.current.on('disconnect', endBroadcast);

    return () => {
      socketRef.current.disconnect();
      peerConnectionRef.current?.close();
    };
  }, []);

  const startBroadcast = async () => {
    setLoading(true);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      videoRef.current.srcObject = stream;
      setIsBroadcaster(true);
      setIsBroadcasting(true);
      createPeerConnection();
      stream.getTracks().forEach((track) => peerConnectionRef.current.addTrack(track, stream));
      const offer = await peerConnectionRef.current.createOffer();
      await peerConnectionRef.current.setLocalDescription(offer);
      socketRef.current.emit('offer', offer);
      socketRef.current.emit('broadcast-started');
    } catch (error) {
      console.error('Error starting broadcast:', error);
    } finally {
      setLoading(false);
    }
  };

  const endBroadcast = () => {
    if (isBroadcaster) {
      peerConnectionRef.current.close();
      socketRef.current.emit('end-broadcast');
      setIsBroadcaster(false);
      setIsBroadcasting(false);
      videoRef.current.srcObject?.getTracks().forEach((track) => track.stop());
      videoRef.current.srcObject = null;
    }
  };

  const joinBroadcast = () => {
    createPeerConnection();
    socketRef.current.emit('join-broadcast');
  };

  const leaveBroadcast = () => {
    peerConnectionRef.current.close();
    remoteVideoRef.current.srcObject = null;
    socketRef.current.emit('leave-broadcast');
  };

  const createPeerConnection = () => {
    peerConnectionRef.current = new RTCPeerConnection(servers);
    peerConnectionRef.current.ontrack = handleTrackEvent;
    peerConnectionRef.current.onicecandidate = handleICECandidateEvent;
  };

  const handleTrackEvent = (event) => {
    remoteVideoRef.current.srcObject = event.streams[0];
  };

  const handleOffer = async (offer) => {
    createPeerConnection();
    await peerConnectionRef.current.setRemoteDescription(new RTCSessionDescription(offer));
    const answer = await peerConnectionRef.current.createAnswer();
    await peerConnectionRef.current.setLocalDescription(answer);
    socketRef.current.emit('answer', answer);
  };

  const handleAnswer = async (answer) => {
    await peerConnectionRef.current.setRemoteDescription(new RTCSessionDescription(answer));
  };

  const handleICECandidateEvent = (event) => {
    if (event.candidate) socketRef.current.emit('ice-candidate', event.candidate);
  };

  const handleNewICECandidate = async (candidate) => {
    await peerConnectionRef.current.addIceCandidate(new RTCIceCandidate(candidate));
  };

  const toggleMute = () => {
    const stream = videoRef.current.srcObject;
    if (stream) {
      stream.getAudioTracks().forEach((track) => (track.enabled = !isMuted));
      setIsMuted(!isMuted);
    }
  };

  const toggleFullscreen = () => {
    if (videoRef.current) {
      isFullscreen ? document.exitFullscreen() : videoRef.current.requestFullscreen();
      setIsFullscreen(!isFullscreen);
    }
  };

  const togglePause = () => {
    if (videoRef.current) {
      isPaused ? videoRef.current.play() : videoRef.current.pause();
      setIsPaused(!isPaused);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.videoContainer}>
        <h3 className={styles.header}>
          {user.name} || {user.role}
        </h3>
        <video
          ref={user?.role === "Instructor" ? videoRef : remoteVideoRef}
          autoPlay
          playsInline
          muted={user?.role === "Instructor"} // Instructors should be muted
          className={styles.video}
        />
        {isBroadcasting && user?.role === "Instructor" && (
          <div className={styles.redDot}>Live</div>
        )}
        {loading && <div className={styles.loading}>Starting Broadcast...</div>} {/* Loading feedback */}
        {user?.role === "Instructor" ? (
          <>
            {!isBroadcaster ? (
              <button
                className={styles.button}
                onClick={startBroadcast}
                aria-label="Start Broadcast"
              >
                Start Broadcast
              </button>
            ) : (
              <button
                className={styles.button}
                onClick={endBroadcast}
                aria-label="Stop Broadcast"
              >
                Stop    <FaSignOutAlt className={styles.signOut}/>
              </button>
            )}
            <div className={styles.controls}>
              <button
                className={styles.button}
                onClick={toggleMute}
                aria-label={isMuted ? "Unmute" : "Mute"}
              >
                {isMuted ? <FaMicrophoneSlash /> : <FaMicrophone />}
              </button>
              <button
                className={styles.button}
                onClick={togglePause}
                aria-label={isPaused ? "Play" : "Pause"}
              >
                {isPaused ? <FaPlay /> : <FaPause />}
              </button>
              <button
                className={styles.button}
                onClick={toggleFullscreen}
                aria-label={isFullscreen ? "Exit Fullscreen" : "Enter Fullscreen"}
              >
                {isFullscreen ? <FaCompress /> : <FaExpand />}
              </button>
            </div>
          </>
        ) : (
          <>
            {!isBroadcasting ? (
              <div className={styles.noClassMessage}>
                No live class available. Please check again some time later.
              </div>
            ) : (
              <button
                className={styles.button}
                onClick={joinBroadcast}
                aria-label="Join Broadcast"
              >
                Join Broadcast
              </button>
            )}
            {isBroadcasting && (
              <div className={styles.controls}>
                <button
                  className={styles.button}
                  onClick={togglePause}
                  aria-label={isPaused ? "Play" : "Pause"}
                >
                  {isPaused ? <FaPlay /> : <FaPause />}
                </button>
                <button
                  className={styles.button}
                  onClick={leaveBroadcast}
                  aria-label="Leave Broadcast"
                >
                  Leave Broadcast <FaSignOutAlt />
                </button>
                <button
                  className={styles.button}
                  onClick={toggleFullscreen}
                  aria-label={isFullscreen ? "Exit Fullscreen" : "Enter Fullscreen"}
                >
                  {isFullscreen ? <FaCompress /> : <FaExpand />}
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default LiveStream;
