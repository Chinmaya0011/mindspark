import React from 'react';
import DashboardHeader from '../../components/Dashboard/DashboardHeader';
import AssignmentManagement from '../../components/Dashboard/Instructor/AssignmentManagement';
import VideoList from '../../components/Dashboard/Instructor/VideoList';
import VideoUploadButton from '../../components/Dashboard/Instructor/VideoUploadButton';
import LiveStream from '../../components/LiveStream';
import Chat from '../../components/Chat';
import AssignmentList from '../../components/Dashboard/Student/AssignmentList';
import style from "../../Styles/dashboardStyles.module.css";
import Footer from '../../components/Dashboard/Footer';

const InstructorDashboard = () => {
  return (
    <div className={style.dashboardContainer}>
      <DashboardHeader />
      
      <h1 className="text-2xl font-bold mb-4">Instructor Dashboard</h1>

      {/* Video Section */}
      <div className={style.videoSection}>
        <VideoList />
        <VideoUploadButton />
      </div>

      {/* Live Stream Section */}
      <h1 className="text-xl font-semibold mb-2">Live Stream Section</h1>
      <div className={style.liveStreamSection}>
        <LiveStream className={style.livestream} />
        <Chat className={style.chat} />
      </div>

      {/* Assignment Section */}
      <h1 className="text-xl font-semibold mb-2">Assignment Section</h1>
      <div className={style.assignmentSection}>
        <AssignmentManagement className={style.AssignmentManagement} />
        <AssignmentList className={style.AssignmentList} />
      </div>

      <Footer />
    </div>
  );
};

export default InstructorDashboard;
