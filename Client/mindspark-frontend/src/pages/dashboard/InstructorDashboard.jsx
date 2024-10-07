import React from 'react';
import DashboardHeader from '../../components/Dashboard/DashboardHeader';
import AssignmentManagement from '../../components/Dashboard/Instructor/AssignmentManagement';
import style from "../../Styles/dashboardStyles.module.css"; // Import shared styles
import VideoList from '../../components/Dashboard/Instructor/VideoList';
import VideoUploadButton from '../../components/Dashboard/Instructor/VideoUploadButton';
import LiveStream from '../../components/LiveStream';
import Chat from '../../components/Chat';

const InstructorDashboard = () => {
  return (
    <div>
      <DashboardHeader />
      <div className={style.video}>
        <VideoList className={style.videoList} />
      </div>
      <VideoUploadButton />
      <div className={style.dashboard}>
        <div className={style.livestreamChatContainer}>
          <div className={style.livestream}>
            <LiveStream />
          </div>
          <div className={style.chat}>
            <Chat />
          </div>
        </div>
        <div className={style.assignment}>
          <AssignmentManagement />
        </div>
      </div>
    </div>
  );
};

export default InstructorDashboard;
