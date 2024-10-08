import React from 'react';
import DashboardHeader from '../../components/Dashboard/DashboardHeader';
import AssignmentList from '../../components/Dashboard/Student/AssignmentList';
import VideoList from '../../components/Dashboard/Instructor/VideoList';
import LiveStream from '../../components/LiveStream';
import Chat from '../../components/Chat';
import AssignmentManagement from '../../components/Dashboard/Instructor/AssignmentManagement';
import style from "../../Styles/dashboardStyles.module.css";

const StudentDashboard = () => {
  return (
    <div className={style.dashboardContainer}>
      <DashboardHeader />
      

      <div className={style.videoSection}>
        <VideoList />
      </div>
      
      <div className={style.liveStreamSection}>
        <LiveStream />
        <Chat />
      </div>

      <div className={style.assignmentSection}>
        <AssignmentManagement />
        <AssignmentList />
      </div>
    </div>
  );
};

export default StudentDashboard;
