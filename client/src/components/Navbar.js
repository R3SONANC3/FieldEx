import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.png';
import logonu from '../assets/logoNu.png';
import SelectForm from './SelectForm';
import { FaUser } from "react-icons/fa";
import { FaFileWaveform } from "react-icons/fa6";
import { MdAdminPanelSettings, MdPermContactCalendar } from "react-icons/md";
import { IoHome, IoLogOut } from "react-icons/io5";
import { GiHamburgerMenu } from "react-icons/gi";
import '../styles.css';
import useAuth from '../auth/UseAuth';
import useLogout from '../auth/UseLogout';
import useLogin from '../auth/UseLogin';
import Login from '../auth/Login';
import Swal from 'sweetalert2'

const Navbar = () => {
    const [LoginModalOpen, setLoginModalOpen] = useState(false);
    const [selectFormOpen, setSelectFormOpen] = useState(false);
    const [showMobileMenu, setShowMobileMenu] = useState(false);

    const { isAuthenticated, userRole, clearAuthData, setIsAuthenticated, setUserRole } = useAuth();
    const handleSignOut = useLogout(clearAuthData, setIsAuthenticated, setUserRole);
    const handleSignInSuccess = useLogin(setIsAuthenticated, setUserRole, clearAuthData);

    const toggleMobileMenu = () => {
        setShowMobileMenu(!showMobileMenu);
    };

    return (
        <nav className="navbar">
            <div className="navbar-container">
                <div className="logo-container">
                    <Link to="/"> <img src={logo} className="navbar-logo" alt="Logo" /> </Link>
                    <Link to="/"> <img src={logonu} className="navbar-logonu" alt="logonu" /> </Link>
                    <strong className="website-name">ระบบประเมินตัวเอง</strong>
                </div>
                <button className="mobile-menu-toggle" onClick={toggleMobileMenu}>
                    <GiHamburgerMenu className="mobile-menu-icon" />
                </button>

                <ul className={`navbar-links ${showMobileMenu ? 'show' : ''}`}>
                    <li> <Link to="/" onClick={toggleMobileMenu}> <IoHome className='icon custom-icon' /> Home</Link> </li>
                    <li><Link to="/about" onClick={toggleMobileMenu}> <MdPermContactCalendar className='icon custom-icon' /> About</Link></li>
                    {isAuthenticated && userRole === 'admin' && (
                        <li><Link to="/admindashboard" onClick={toggleMobileMenu}> <MdAdminPanelSettings className='icon custom-icon' /> Admin Page</Link></li>
                    )}
                    <li>
                        <Link to="/" onClick={() => {
                            if (isAuthenticated) {
                                setSelectFormOpen(true);
                                toggleMobileMenu();
                            } else {
                                Swal.fire({
                                    title: 'กรุณาเข้าสู่ระบบก่อนกรอกแบบฟอร์ม',
                                    icon: 'warning',
                                }).then(() => {
                                    setLoginModalOpen(true);
                                    toggleMobileMenu();
                                })
                            }
                        }}> <FaFileWaveform className='icon custom-icon' /> Select Forms</Link>
                    </li>

                    {isAuthenticated ? (
                        <li><Link onClick={handleSignOut} className="signout-button"> <IoLogOut className='icon custom-icon' /> Logout</Link></li>
                    ) : (
                        <li><Link to="/" onClick={() => {
                            setLoginModalOpen(true);
                            toggleMobileMenu();
                        }}> <FaUser className='icon custom-icon' /> Login</Link></li>
                    )}
                </ul>
            </div>
            {LoginModalOpen && (
                <Login setOpenModal={setLoginModalOpen} setIsAuthenticated={handleSignInSuccess} setUserRole={setUserRole} />
            )}
            {selectFormOpen && <SelectForm setOpenModal={setSelectFormOpen} />}
        </nav>
    );
}

export default Navbar;
