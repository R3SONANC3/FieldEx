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

    const fetchUserStats = async () => {
      try {
        // Simulating API call with setTimeout
        const response = await new Promise((resolve) => {
          setTimeout(() => {
            resolve({
              totalUsersToday: 123,
              newUsersToday: 10
            });
          }, 2000); // Simulate a 2-second API call
        });

        setTotalUsersToday(response.totalUsersToday);
        setNewUsersToday(response.newUsersToday);
      } catch (error) {
        console.error("Failed to fetch user stats:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserStats();

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
        <div className="user-stats">
          <div className="stat-box">
            <div className="stat-box-left">
              <h2>ผู้เข้าใช้วันนี้</h2>
              <p>{totalUsersToday}</p>
            </div>
            <div className="stat-box-right">
              <FontAwesomeIcon icon={faUsers} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
