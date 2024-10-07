import React from 'react';
import DashboardHeader from '../../components/Dashboard/DashboardHeader';
import style from "../../Styles/dashboardStyles.module.css"; // Import shared styles
import AssignmentList from '../../components/Dashboard/Student/AssignmentList';
import VideoList from '../../components/Dashboard/Instructor/VideoList';
import LiveStream from '../../components/LiveStream';
import Chat from '../../components/Chat';

const StudentDashboard = () => {
  return (
    <div>
      <DashboardHeader className={style.header} />
      <div className={style.video}>
        <VideoList className={style.videoList} />
      </div>
      <div className={style.dashboard}>
        <div className={style.livestreamChatContainer}>
          <div className={style.livestream}>
            <h2 className={style.livestreamTitle}>Live Stream</h2>
            <LiveStream />
          </div>
          <div className={style.chat}>
            <Chat />
          </div>
        </div>
        <div className={style.assignment}>
          <AssignmentList />
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
