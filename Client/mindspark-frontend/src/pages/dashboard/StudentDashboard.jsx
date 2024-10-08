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
        <h2 className={style.sectionTitle}>Video Management</h2>
        <VideoList />
      </div>

      <div className={style.liveStreamSection}>
        <LiveStream className={style.livestream} />
        <Chat className={style.chat} />
      </div>

      <div className={style.assignmentSection}>
        <AssignmentManagement className={style.AssignmentManagement} />
        <AssignmentList className={style.AssignmentList} />
      </div>
    </div>
  );
};

export default StudentDashboard;
