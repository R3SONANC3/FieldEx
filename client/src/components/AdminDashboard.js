import React, { useEffect, useState } from "react";
import axios from "axios";

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        // Retrieve token from localStorage
        const token = localStorage.getItem("token");

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

    fetchUsers();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className="container">
        <div className="header">
        </div>
      <div className="admin-dashboard">
        <h1>User Data</h1>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Email</th>
              <th>Role</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminDashboard;
