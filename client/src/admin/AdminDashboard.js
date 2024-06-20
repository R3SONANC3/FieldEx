import React, { useEffect, useState } from "react";
import Navbar from '../components/Navbar';
import SideNavbar from "../components/SideNavbar";
import Loading from '../components/Loading'; // Assuming you have a Loading component
import '../styles.css';

const AdminDashboard = () => {
  const [loading, setLoading] = useState(true);
 

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000); // Set loading to false after 3 seconds

    
    return () => clearTimeout(timer); // Cleanup the timer on component unmount
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="admin-container">
      <Navbar />
      <SideNavbar />
      <div className="admin-body">
        <h1>Welcome to the Admin Dashboard</h1>
        
      </div>
    </div>
  );
};

export default AdminDashboard;
