import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from './Navbar';
import { useNavigate } from "react-router-dom";
import '../styles.css';

const AdminDashboard = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [institutionIDs, setInstitutionIDs] = useState([]);
  const [localIDs, setLocalIDs] = useState([]);
  const [searchTerm, setSearchTerm] = useState(""); // State for search term
  const navigate = useNavigate();

  // Filter function for filtering users based on search term
  const filterUsers = (users) => {
    return users.filter(user =>
      (typeof user.userEmail === 'string' && user.userEmail.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (typeof user.id === 'string' && user.id.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (typeof user.institutionName === 'string' && user.institutionName.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (typeof user.organizationName === 'string' && user.organizationName.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  };

  // Handle change in search input
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  // Function to handle edit button click
  const handleEdit = (emailUser) => {
    navigate(`/localform`, {state:{emailUser}});
    
  };

  const fetchUsersData = async (token) => {
    try {
      const response = await axios.get("http://localhost:8000/api/usersData", {
        headers: {
          Authorization: `Bearer ${token}`
        },
      });
      if (response.data && response.data.institutionIDs && response.data.localIDs) {
        setInstitutionIDs(response.data.institutionIDs);
        setLocalIDs(response.data.localIDs);
      } else {
        setError("Invalid data format");
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate('/');
      return; // Ensure to return here to prevent further execution
    }
    fetchUsersData(token); // Call the fetch function here

  }, [navigate, searchTerm]); // Add searchTerm as a dependency to useEffect


  

  // Define table style and thTdStyle here
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

  // Filtered institution and local IDs based on search term
  const filteredInstitutionIDs = filterUsers(institutionIDs);
  const filteredLocalIDs = filterUsers(localIDs);

  // Render loading or error message if loading or error state is true
  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  // Render the actual content once loading and error checks are done
  return (
    <div className="admin-container">
      <div className="header">
        <Navbar />
      </div>
      <div className="admin-body">
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search by name or ID..."
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>
        <h2>Institution IDs</h2>
        <table style={tableStyle}>
          {/* Table header */}
          <tbody>
            {filteredInstitutionIDs.map((user, index) => (
              <tr key={index}>
                <td style={thTdStyle}>{user.userEmail}</td>
                <td style={thTdStyle}>{user.id}</td>
                <td style={thTdStyle}>{user.institutionName || "-"}</td>
                <td style={thTdStyle}>
                  <button onClick={() => handleEdit(user.userEmail)}>Edit</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <h2>Local IDs</h2>
        <table style={tableStyle}>
          {/* Table header */}
          <tbody>
            {filteredLocalIDs.map((user, index) => (
              <tr key={index}>
                <td style={thTdStyle}>{user.userEmail}</td>
                <td style={thTdStyle}>{user.id}</td>
                <td style={thTdStyle}>{user.organizationName || "-"}</td>
                <td style={thTdStyle}>
                  <button onClick={() => handleEdit(user.userEmail)}>Edit</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminDashboard;
