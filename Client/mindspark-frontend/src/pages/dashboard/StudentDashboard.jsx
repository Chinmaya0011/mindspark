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
      
      <h1 className={style.dashboardTitle}>Student Dashboard</h1>

      <div className={style.videoSection}>
        <h2 className={style.sectionTitle}>Videos</h2>
        <VideoList />
      </div>
      
      <div className={style.liveStreamSection}>
        <h2 className={style.sectionTitle}>Live Stream</h2>
        <LiveStream />
        <Chat />
      </div>

      <div className={style.assignmentSection}>
        <h2 className={style.sectionTitle}>Assignments</h2>
        <AssignmentManagement />
        <AssignmentList />
      </div>
    </div>
  );
};

export default StudentDashboard;
