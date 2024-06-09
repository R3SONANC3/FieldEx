import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png';
import logonu from '../assets/logoNu.png';
import axios from 'axios';
import LoginModal from './Login';
import SelectForm from './SelectForm';
import  Swal from 'sweetalert2'

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
                title: 'Sign out successful!',
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
                title: 'Sign out failed!',
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
                    <Link > <img src={logo} className="navbar-logo" alt="Logo" />  </Link>
                    <Link > <img src={logonu} className="navbar-logonu" alt="logonu" />  </Link>
                    <Link > <span className="website-name">ระบบประเมินตัวเอง</span>  </Link>
                </div>
                <ul className="navbar-links">
                    <li><Link to="/about">About</Link></li>
                    {isAuthenticated && userRole === 'admin' && (
                        <li><Link to="/admindashboard">Admin Page</Link></li>
                    )}
                    <li>
                        <Link to="/" onClick={() => {
                            if (isAuthenticated) {
                                setSelectFormOpen(true);
                            } else {
                                Swal.fire({
                                    title: 'กรุณาเข้าสู่ระบบก่อนกรอกแบบฟอร์ม',
                                    icon: 'warning',
                                }).then(()=>{
                                    setLoginModalOpen(true);
                                })
                            }
                        }}>กรอกแบบฟอร์ม</Link>
                    </li>
                    {isAuthenticated ? (
                        <li><Link onClick={handleSignOut} className="signout-button">ออกจากระบบ</Link></li>
                    ) : (
                        <li><Link to="/" onClick={() => setLoginModalOpen(true)}>เข้าสู่ระบบ</Link></li>
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
