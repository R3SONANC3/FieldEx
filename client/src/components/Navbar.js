import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.png';
import logonu from '../assets/logoNu.png';
import axios from 'axios';
import LoginModal from './Login';
import SelectForm from './SelectForm';

const Navbar = () => {
    const [LoginModalOpen, setLoginModalOpen] = useState(false);
    const [selectFormOpen, setSelectFormOpen] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const authTime = localStorage.getItem('authTime');

        if (authTime) {
            const timeNow = new Date().getTime();
            const timeElapsed = timeNow - authTime;
            const authDuration = 10 * 1000;

            if (timeElapsed < authDuration ){
                setIsAuthenticated(true);
                setTimeout(() => {
                    localStorage.removeItem('authTime');
                    window.location.reload();
                }, authDuration - timeElapsed );
            } else {
                localStorage.removeItem('authTime');
                window.location.reload();
            }
        }
    }, [] );


    const handleSignOut = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.get('https://fieldex-production.up.railway.app/api/logout');
            console.log(response.data);
            alert('Sign out successful!');
            setIsAuthenticated(false);
            localStorage.removeItem('authTime')
            localStorage.removeItem('token')
            localStorage.removeItem('userRole')
            window.location.reload();
        } catch (error) {
            console.error('Error:', error);
            alert('Sign out failed!');
        }
    };

    const handleSignInSuccess = () => {
        const timeOut = 10 * 1000;
        setIsAuthenticated(true);
        localStorage.setItem('authTime', new Date().getTime());
        setTimeout(() => {
            localStorage.removeItem('authTime');
            window.location.reload();
        }, timeOut )
    }

    return (
        <nav className="navbar">
            <div className="navbar-container">
                <div className="logo-container">
                    <img src={logo} className="navbar-logo" alt="Logo" />
                    <img src={logonu} className="navbar-logonu" alt="logonu" />
                    <span className="website-name">ระบบประเมินตัวเอง</span>
                </div>
                <ul className="navbar-links">
                    <li><Link to="/">About</Link></li>

                    <li><Link to="/admin">Admin Page</Link></li>

                    <li><Link to="/" onClick={() => { if (isAuthenticated) { setSelectFormOpen(true);} else
                        { setLoginModalOpen(true);alert('กรุณาเข้าสู่ระบบก่อนกรอกแบบฟอร์ม');}}}> กรอกแบบฟอร์ม</Link></li>

                    {isAuthenticated ? (
                        <li><Link onClick={handleSignOut} className="signout-button">ออกจากระบบ</Link></li>
                    ) : (
                        <li><Link to="/" onClick={() => setLoginModalOpen(true)}>เข้าสู่ระบบ</Link></li>
                    )}

                </ul>
            </div>
            {LoginModalOpen && <LoginModal setOpenModal={setLoginModalOpen} setIsAuthenticated={handleSignInSuccess} />}
            {selectFormOpen && <SelectForm setOpenModal={setSelectFormOpen} />}
        </nav>
    );
}

export default Navbar;
