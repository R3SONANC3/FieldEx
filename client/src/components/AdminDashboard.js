import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from './Navbar';

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [usersData, setUsersData] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/users", {
          headers: {
            Authorization: `Bearer ${token}`, // Include token in the request headers
          },
        });
        setUsers(response.data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

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

    fetchUsers();
    fetchUsersData();
  }, []);

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
        <h1>User Data</h1>
        <table style={tableStyle}>
          <thead>
            <tr>
              <th style={thTdStyle}>ID</th>
              <th style={thTdStyle}>Email</th>
              <th style={thTdStyle}>Role</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td style={thTdStyle}>{user.id}</td>
                <td style={thTdStyle}>{user.email}</td>
                <td style={thTdStyle}>{user.role}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <table style={tableStyle}>
          <thead>
            <tr>
              <th style={thTdStyle}>Email</th>
              <th style={thTdStyle}>School Name</th>
            </tr>
          </thead>
          <tbody>
            {usersData.map((school, index) => (
              <tr key={index}>
                <td style={thTdStyle}>{school.institutionID}</td>
                <td style={thTdStyle}>{school.institutionName}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    
  );
};

export default AdminDashboard;
