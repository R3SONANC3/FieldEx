import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from '../components/Navbar';
import SideNavbar from "../components/SideNavbar";
import Loading from '../components/Loading';
import '../styles.css';

const InstitutionUsers = () => {
  const token = localStorage.getItem("token");
  const [institutionIDs, setInstitutionIDs] = useState([]);
  const [searchInstitutionTerm, setSearchInstitutionTerm] = useState(""); // State for institution search term
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const API_URL = 'https://fieldex-production.up.railway.app'


  useEffect(() => {
    if (!token) {
      navigate('/');
      return;
    }
    const fetchInstitutionUsers = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/user/usersData`, {
          headers: {
            Authorization: `Bearer ${token}`
          },
        });
        if (response.data && response.data.institutionIDs) {
          setInstitutionIDs(response.data.institutionIDs);
        } else {
          setError("Invalid data format");
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchInstitutionUsers();
  }, [navigate, token]);

  // Filter function for filtering institution users based on search term
  const filterInstitutionUsers = (users) => {
    return users.filter(user =>
      (user.userEmail && user.userEmail.toLowerCase().includes(searchInstitutionTerm.toLowerCase())) ||
      (user.id && user.id.toString().toLowerCase().includes(searchInstitutionTerm.toLowerCase())) ||
      (user.institutionName && user.institutionName.toLowerCase().includes(searchInstitutionTerm.toLowerCase()))
    );
  };

  // Handle change in institution search input
  const handleInstitutionSearch = (e) => {
    setSearchInstitutionTerm(e.target.value);
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

  // Filtered institution IDs based on search term
  const filteredInstitutionIDs = filterInstitutionUsers(institutionIDs);

  return (
    <div className="admin-container">
      <Navbar />
      <SideNavbar />
      <div className="admin-body">
        <h2 className="admin-h2">แบบประเมินสถานศึกษา</h2>
        <h2 className="admin-h2">ที่ดำเนินงานสวนพฤกษศาสตร์โรงเรียน</h2>
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search Institution by email, ID, or name..."
            value={searchInstitutionTerm}
            onChange={handleInstitutionSearch}
          />
        </div>
        <table className="user-table">
          <tbody>
            {filteredInstitutionIDs.map((user, index) => (
              <tr key={index}>
                <td style={thTdStyle}>{user.userEmail}</td>
                <td style={thTdStyle}>{user.id}</td>
                <td style={thTdStyle}>{user.institutionName || "-"}</td>
                <td className="btn-edit">
                  <button onClick={() => handleEdit(user.userEmail)}>ประเมินสถานศึกษา</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default InstitutionUsers;
