import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from '../components/Navbar';
import SideNavbar from "../components/SideNavbar";
import Loading from '../components/Loading';
import '../styles.css';

const LocalUsers = () => {
  const token = localStorage.getItem("token");
  const [localIDs, setLocalIDs] = useState([]);
  const [searchLocalTerm, setSearchLocalTerm] = useState(""); // State for local search term
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const API_URL = 'https://fieldex-production.up.railway.app'


  useEffect(() => {
    if (!token) {
      navigate('/');
      return;
    }
    const fetchLocalUsers = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/user/usersData`, {
          headers: {
            Authorization: `Bearer ${token}`
          },
        });
        if (response.data && response.data.localIDs) {
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
    fetchLocalUsers();
  }, [navigate, token]);

  // Filter function for filtering local users based on search term
  const filterLocalUsers = (users) => {
    return users.filter(user =>
      (user.userEmail && user.userEmail.toLowerCase().includes(searchLocalTerm.toLowerCase())) ||
      (user.id && user.id.toString().toLowerCase().includes(searchLocalTerm.toLowerCase())) ||
      (user.organizationName && user.organizationName.toLowerCase().includes(searchLocalTerm.toLowerCase()))
    );
  };

  // Handle change in local search input
  const handleLocalSearch = (e) => {
    setSearchLocalTerm(e.target.value);
  };

  // Function to handle edit button click
  const handleEdit = (emailUser) => {
    navigate(`/localform`, { state: { emailUser } });
  };

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }


  const thTdStyle = {
    border: "1px solid black",
    padding: "8px",
    textAlign: "left"
  };

  // Filtered local IDs based on search term
  const filteredLocalIDs = filterLocalUsers(localIDs);

  return (
    <div className="admin-container">
      <Navbar />
      <SideNavbar />
      <div className="admin-body">
        <h2 className='admin-h2'>แบบประเมินองค์กรปกครองส่วนท้องถิ่น</h2>
        <h2 className="admin-h2">ที่ดำเนินงานฐานทรัพยากรส่วนท้องถิ่น</h2>
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search Local by email, ID, or name..."
            value={searchLocalTerm}
            onChange={handleLocalSearch}
          />
        </div>
        <table className="user-table" >
          <tbody>
            {filteredLocalIDs.map((user, index) => (
              <tr key={index}>
                <td style={thTdStyle}>{user.userEmail}</td>
                <td style={thTdStyle}>{user.id}</td>
                <td style={thTdStyle}>{user.organizationName || "-"}</td>
                <td style={thTdStyle}>
                  <button onClick={() => handleEdit(user.userEmail)}>ประเมินองค์กร</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LocalUsers;
