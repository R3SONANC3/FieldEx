import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from './Navbar';
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [usersData, setUsersData] = useState([]);
  const navigate = useNavigate();
  

  useEffect(() => {
    const token = localStorage.getItem("token");
    if(!token){
      navigate('/')
    }

    const fetchUsersData = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/usersData", {
          headers: {
            Authorization: `Bearer ${token}`
          },
        });
        setUsersData(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchUsersData();
  }, [navigate]); 

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  const tableStyle = {
    border: "1px solid black",
    borderCollapse: "collapse",
    width: "100%",
    marginBottom: "20px"
  };

  const thTdStyle = {
    border: "1px solid black",
    padding: "8px",
    textAlign: "left"
  };

  return (
    <div className="container">
      <div className="header">
        <Navbar />
      </div>
      <div className="admin-dashboard">
        <h1>Data Form</h1>
        <table style={tableStyle}>
          <thead>
            <tr>
              <th style={thTdStyle}>รหัสประจำสถานศึกษา</th>
              <th style={thTdStyle}>ชื่อสถานศึกษา</th>
              <th style={thTdStyle}>ข้อมูลติดต่อผู้กรอกข้อมูล</th>
            </tr>
          </thead>
          <tbody>
            {usersData.map((school, index) => (
              <tr key={index}>
                <td style={thTdStyle}>{school.institutionID}</td>
                <td style={thTdStyle}>{school.institutionName}</td>
                <td style={thTdStyle}>{}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    
    
  );
};

export default AdminDashboard;
