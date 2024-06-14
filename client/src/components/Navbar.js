import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png';
import logonu from '../assets/logoNu.png';
import axios from 'axios';
import LoginModal from './Login';
import SelectForm from './SelectForm';
import Swal from 'sweetalert2';
import '../styles.css';
import { FaUser } from "react-icons/fa";
import { FaFileWaveform } from "react-icons/fa6";
import { MdAdminPanelSettings, MdPermContactCalendar } from "react-icons/md";
import { IoHome, IoLogOut } from "react-icons/io5";

const Navbar = () => {
    const [LoginModalOpen, setLoginModalOpen] = useState(false);
    const [selectFormOpen, setSelectFormOpen] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [userRole, setUserRole] = useState(null);
    const navigate = useNavigate(); // Add useNavigate hook

    useEffect(() => {
        const authTime = localStorage.getItem('authTime');
        const storedUserRole = localStorage.getItem('userRole');

        if (authTime && storedUserRole) {
            const timeNow = new Date().getTime();
            const timeElapsed = timeNow - authTime;
            const authDuration = 60 * 60 * 1000; // time before session out is 1 hour

            if (timeElapsed < authDuration) {
                setIsAuthenticated(true);
                setUserRole(storedUserRole);
                setTimeout(() => {
                    clearAuthData();
                }, authDuration - timeElapsed);
            } else {
                clearAuthData();
            }
        }
    }, []);

    const clearAuthData = () => {
        localStorage.removeItem('authTime');
        localStorage.removeItem('token');
        localStorage.removeItem('userRole');
        localStorage.removeItem('isLoggedIn');
        window.location.reload();
    };

    const handleSignOut = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.get('http://localhost:8000/api/logout');
            console.log(response.data);
            Swal.fire({
                title: 'ออกจากระบบสำเร็จ',
                icon: 'success',
            }).then(() => {
                setIsAuthenticated(false);
                setUserRole(null);
                clearAuthData();
                navigate('/'); // Redirect to home page after logout
            });
        } catch (error) {
            console.error('Error:', error);
            Swal.fire({
                title: 'เกิดข้อผิดพลาดในการออกจากระบบ',
                icon: 'error',
            });
        }
    };

    const handleSignInSuccess = () => {
        const timeOut = 60 * 60 * 1000;
        setIsAuthenticated(true);
        const storedUserRole = localStorage.getItem('userRole');
        setUserRole(storedUserRole);

        localStorage.setItem('isLoggedIn', 'true');

        setTimeout(() => {
            clearAuthData();
        }, timeOut);

        Swal.fire({
            title: 'เข้าสู่ระบบสำเร็จ',
            icon: 'success',
        }).then(() => {
            window.location.reload();
        });
    };

    return (
        <nav className="navbar">
            <div className="navbar-container">
                <div className="logo-container">
                    <Link to="/" > <img src={logo} className="navbar-logo" alt="Logo" />  </Link>
                    <Link to="/" > <img src={logonu} className="navbar-logonu" alt="logonu" />  </Link>
                    <strong className="website-name">ระบบประเมินตัวเอง</strong>
                </div>
                <ul className="navbar-links">
                    <li> <Link to="/" > <IoHome className='icon custom-icon'/> Home</Link> </li>
                    <li><Link to="/about"> <MdPermContactCalendar className='icon custom-icon' /> About</Link></li>
                    {isAuthenticated && userRole === 'admin' && (
                        <li><Link to="/admindashboard"> <MdAdminPanelSettings className='icon custom-icon' /> Admin Page</Link></li>
                    )}
                    <li>
                        <Link to="/" onClick={() => {
                            if (isAuthenticated) {
                                setSelectFormOpen(true);
                            } else {
                                Swal.fire({
                                    title: 'กรุณาเข้าสู่ระบบก่อนกรอกแบบฟอร์ม',
                                    icon: 'warning',
                                }).then(() => {
                                    setLoginModalOpen(true);
                                })
                            }
                        }}> <FaFileWaveform className='icon custom-icon' /> Select Forms</Link>
                    </li>
                    {isAuthenticated ? (
                        <li><Link onClick={handleSignOut} className="signout-button"> <IoLogOut className='icon custom-icon' /> Logout</Link></li>
                    ) : (
                        <li><Link to="/" onClick={() => setLoginModalOpen(true)}> <FaUser className='icon custom-icon' /> Login</Link></li>
                    )}
                </ul>
            </div>
            {LoginModalOpen && (
                <LoginModal setOpenModal={setLoginModalOpen} setIsAuthenticated={handleSignInSuccess} setUserRole={setUserRole} />
            )}
            {selectFormOpen && <SelectForm setOpenModal={setSelectFormOpen} />}
        </nav>
    );
}

export default Navbar;
