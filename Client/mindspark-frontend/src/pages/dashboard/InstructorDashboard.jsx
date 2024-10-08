import React from 'react';
import DashboardHeader from '../../components/Dashboard/DashboardHeader';
import AssignmentManagement from '../../components/Dashboard/Instructor/AssignmentManagement';
import VideoList from '../../components/Dashboard/Instructor/VideoList';
import VideoUploadButton from '../../components/Dashboard/Instructor/VideoUploadButton';
import LiveStream from '../../components/LiveStream';
import Chat from '../../components/Chat';
import AssignmentList from '../../components/Dashboard/Student/AssignmentList';
import style from "../../Styles/dashboardStyles.module.css";

const InstructorDashboard = () => {
  return (
    <div className={style.dashboardContainer}>
      <DashboardHeader />
      
      <h1 className={style.dashboardTitle}>Instructor Dashboard</h1>
      
      <div className={style.videoSection}>
        <h2 className={style.sectionTitle}>Video Management</h2>
        <VideoList />
        <VideoUploadButton />
      </div>
      
      <div className={style.liveStreamSection}>
       
        <LiveStream className={style.livestream}/>
        <Chat className={style.chat}/>
      </div>
      
      <div className={style.assignmentSection}>
       
        <AssignmentManagement className={style.AssignmentManagement}/>
        <AssignmentList className={style.AssignmentList} />
      </div>
    </div>
  );
};

export default InstructorDashboard;
