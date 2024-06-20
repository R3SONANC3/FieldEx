import React, { useEffect, useState } from 'react';
import '../styles.css';
import SideNavbar from '../components/SideNavbar';
import Navbar from '../components/Navbar';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';
import Swal from 'sweetalert2';

function ForgotPassword() {
    const [users, setUsers] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [forgotPasswordModalOpen, setForgotPasswordModalOpen] = useState(false);
    const [newPassword, setNewPassword] = useState('');
    const [resetEmail, setResetEmail] = useState('');
    const token = localStorage.getItem('token');
    const API_URL = 'https://fieldex-production.up.railway.app'
    const navigate = useNavigate();

    useEffect(() => {
        if (!token) {
            navigate('/');
            return;
        }
        try {
            const decodedToken = jwtDecode(token);
            if (decodedToken.role !== 'admin') {
                navigate('/');
                return;
            }
        } catch (error) {
            console.error('Error decoding token:', error);
            navigate('/');
            return;
        }
        fetchUsers();
    }, [navigate, token]);

    useEffect(() => {
        const filtered = users.filter(user =>
            user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
            (user.institutionID && user.institutionID.toString().includes(searchTerm)) ||
            (user.localID && user.localID.toString().includes(searchTerm))
        );
        filtered.sort((a, b) => a.email.localeCompare(b.email));
        setFilteredUsers(filtered);
    }, [searchTerm, users]);

    const fetchUsers = async () => {
        try {
            const response = await axios.get(`${API_URL}/api/user/fetchUser`, {
                headers: {
                    Authorization: `Bearer ${token}`
                },
            });
            const usersData = response.data;
            setUsers(usersData);
        } catch (error) {
            console.error('Error fetching users data:', error);
        }
    };

    const handleForgotPassword = (email) => {
        setResetEmail(email);
        setForgotPasswordModalOpen(true);
    };

    const handleSubmitForgotPassword = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${API_URL}/api/auth/resetPassword`, {
                email: resetEmail,
                newPassword
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                },
            });
            console.log('Password reset successful:', response.data.message);
            setForgotPasswordModalOpen(false);
            setNewPassword(''); // Reset newPassword state
            fetchUsers();

            // Show success message with email and new password
            Swal.fire({
                icon: 'success',
                title: 'Password reset successful!',
                html: `<p>Email: ${resetEmail}</p><p>New Password: ${newPassword}</p>`
            });
        } catch (error) {
            console.error('Error resetting password:', error);
        }
    };

    const handleModalClose = () => {
        setForgotPasswordModalOpen(false);
        setNewPassword(''); // Reset newPassword state
    };

    return (
        <div className="admin-container">
            <Navbar />
            <SideNavbar />
            <div className="admin-body">
                <h2 className='admin-h2'>Search Users Information</h2>
                <div className="search-bar">
                    <input
                        type="text"
                        placeholder="Search by email, institution ID, or local ID"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <div>
                    <h3 className='admin-h3'>Users Information:</h3>
                    <div className="table-container">
                        <table className="user-table">
                            <thead>
                                <tr>
                                    <th>Email</th>
                                    <th>Role</th>
                                    <th>Institution ID</th>
                                    <th>Local ID</th>
                                    <th>Reset Password</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredUsers.map(user => (
                                    <tr key={user.id}>
                                        <td>{user.email}</td>
                                        <td>{user.role}</td>
                                        <td>{user.institutionID || '-'}</td>
                                        <td>{user.localID || '-'}</td>
                                        <td>
                                            <button onClick={() => handleForgotPassword(user.email)}>Forgot Password</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* Forgot Password Modal */}
            {forgotPasswordModalOpen && (
                <div className="modalBackground">
                    <div className="modalContainer">
                        <button className="close" onClick={handleModalClose}>&times;</button>
                        <h3>Reset Password for {resetEmail}</h3>
                        <form onSubmit={handleSubmitForgotPassword}>
                            <div className="form-group">
                                <label htmlFor="newPassword">New Password:</label>
                                <input
                                    type="password"
                                    id="newPassword"
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="footer">
                                <button type="button" onClick={handleModalClose}>Cancel</button>
                                <button type="submit">Reset Password</button>
                            </div>
                        </form>

                    </div>
                </div>
            )}
        </div>
    );
}

export default ForgotPassword;
