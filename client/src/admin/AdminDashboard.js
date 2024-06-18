import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from '../components/Navbar';
import { useNavigate } from "react-router-dom";
import Loading from '../components/Loading';
import '../styles.css';
import SideNavbar from "../components/SideNavbar";

const AdminDashboard = () => {
  const token = localStorage.getItem("token");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [institutionIDs, setInstitutionIDs] = useState([]);
  const [localIDs, setLocalIDs] = useState([]);
  const [searchInstitutionTerm, setSearchInstitutionTerm] = useState(""); // State for institution search term
  const [searchLocalTerm, setSearchLocalTerm] = useState(""); // State for local search term
  const navigate = useNavigate();

  // Filter function for filtering institution users based on search term
  const filterInstitutionUsers = (users) => {
    return users.filter(user =>
      (user.userEmail && user.userEmail.toLowerCase().includes(searchInstitutionTerm.toLowerCase())) ||
      (user.id && user.id.toString().toLowerCase().includes(searchInstitutionTerm.toLowerCase())) ||
      (user.institutionName && user.institutionName.toLowerCase().includes(searchInstitutionTerm.toLowerCase()))
    );
  };

  // Filter function for filtering local users based on search term
  const filterLocalUsers = (users) => {
    return users.filter(user =>
      (user.userEmail && user.userEmail.toLowerCase().includes(searchLocalTerm.toLowerCase())) ||
      (user.id && user.id.toString().toLowerCase().includes(searchLocalTerm.toLowerCase())) ||
      (user.organizationName && user.organizationName.toLowerCase().includes(searchLocalTerm.toLowerCase()))
    );
  };

  // Handle change in institution search input
  const handleInstitutionSearch = (e) => {
    setSearchInstitutionTerm(e.target.value);
  };

  // Handle change in local search input
  const handleLocalSearch = (e) => {
    setSearchLocalTerm(e.target.value);
  };

  // Function to handle edit button click
  const handleEdit = (emailUser) => {
    navigate(`/localform`, { state: { emailUser } });
  };

  const fetchUsersData = async () => {
    try {
      console.log("Fetching user data..."); // Debugging log
      const response = await axios.get("http://localhost:8000/api/user/usersData", {
        headers: {
          Authorization: `Bearer ${token}`
        },
      });
      console.log("Response:", response.data); // Debugging log
      if (response.data && response.data.institutionIDs && response.data.localIDs) {
        setInstitutionIDs(response.data.institutionIDs);
        setLocalIDs(response.data.localIDs);
      } else {
        setError("Invalid data format");
      }
    } catch (err) {
      console.error("Error fetching data:", err); // Debugging log
      setError(err.message);
    } finally {
      setTimeout(() => setLoading(false), 3000); // Set loading to false after 3 seconds
    }
  };

  useEffect(() => {
    if (!token) {
      navigate('/');
      return; // Ensure to return here to prevent further execution
    }
    fetchUsersData(); // Call the fetch function here
  }, [navigate, token]); // Removed searchTerm as a dependency to avoid unnecessary fetches

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
  const filteredInstitutionIDs = filterInstitutionUsers(institutionIDs);
  const filteredLocalIDs = filterLocalUsers(localIDs);

  // Render loading or error message if loading or error state is true
  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  // Render the actual content once loading and error checks are done
  return (
    <div className="admin-container">
      <Navbar />
      <SideNavbar />
      <div className="admin-body">
        <h2>แบบประเมินสถานศึกษา</h2>
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search Institution by email, ID, or name..."
            value={searchInstitutionTerm}
            onChange={handleInstitutionSearch}
          />
        </div>
        <table style={tableStyle}>
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
        <h2>แบบประเมินองค์กรปกครองส่วนท้องถิ่น</h2>
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search Local by email, ID, or name..."
            value={searchLocalTerm}
            onChange={handleLocalSearch}
          />
        </div>
        <table style={tableStyle}>
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
