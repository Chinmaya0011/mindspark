import React from 'react';
import DashboardHeader from '../../components/Dashboard/DashboardHeader';
import AssignmentList from '../../components/Dashboard/Student/AssignmentList';
import VideoList from '../../components/Dashboard/Instructor/VideoList';
import LiveStream from '../../components/LiveStream';
import Chat from '../../components/Chat';
import AssignmentManagement from '../../components/Dashboard/Instructor/AssignmentManagement';
import style from "../../Styles/dashboardStyles.module.css";
import Footer from '../../components/Dashboard/Footer';

const StudentDashboard = () => {
  return (
    <div className={style.dashboardContainer}>
      <DashboardHeader />

      {/* Video Section */}
      <h1 className="text-2xl font-bold mb-4">Video Section</h1>
      <div className={style.videoSection}>
        <VideoList />
      </div>

      {/* Live Stream Section */}
      <h1 className="text-2xl font-bold mb-4">Live Stream Section</h1>
      <div className={style.liveStreamSection}>
        <LiveStream className={style.livestream} />
        <Chat className={style.chat} />
      </div>

      {/* Assignment Section */}
      <h1 className="text-2xl font-bold mb-4">Assignment Section</h1>
      <div className={style.assignmentSection}>
        <AssignmentManagement className={style.AssignmentManagement} />
        <AssignmentList className={style.AssignmentList} />
      </div>

      <Footer />
    </div>
  );
};

export default StudentDashboard;
