import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.png';
import logonu from '../assets/logoNu.png';
import SignInModal from './SignInModal';
import SelectForm from './SelectForm';
import axios from 'axios';

export default function Navbar() {
    const [SignInModalOpen, setSignInModalOpen] = useState(false);
    const [selectFormOpen, setSelectFormOpen] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const authTimestamp = localStorage.getItem('authTimestamp');
        if (authTimestamp) {
            const now = new Date().getTime();
            const timeElapsed = now - authTimestamp;
            const authDuration = 10 * 1000 * 60; //time before session out

            if (timeElapsed < authDuration) {
                setIsAuthenticated(true);
                setTimeout(() => {
                    localStorage.removeItem('authTimestamp');
                    window.location.reload();
                }, authDuration - timeElapsed);
            } else {
                localStorage.removeItem('authTimestamp');
                window.location.reload();
            }
        }
    }, []);

    const handleSignOut = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.get('https://fieldex-production.up.railway.app/logout', { withCredentials: true });
            console.log(response.data);
            alert('Sign out successful!');
            setIsAuthenticated(false);
            localStorage.removeItem('authTimestamp');
            window.location.reload();
        } catch (error) {
            console.error('Error:', error);
            alert('Sign out failed!');
        }
    };

    const handleSignInSuccess = () => {
        setIsAuthenticated(true);
        localStorage.setItem('authTimestamp', new Date().getTime());
        setTimeout(() => {
            localStorage.removeItem('authTimestamp');
            window.location.reload();
        }, 10 * 1000);
    };


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
                    <li><Link to="/" onClick={() => setSelectFormOpen(true)}>กรอกแบบฟอร์ม</Link></li>
                    {isAuthenticated ? (
                        <li><Link onClick={handleSignOut} className="signout-button">ออกจากระบบ</Link></li>
                    ) : (
                        <li><Link to="/" onClick={() => setSignInModalOpen(true)}>เข้าสู่ระบบ</Link></li>
                    )}
                </ul>
            </div>
            {SignInModalOpen && <SignInModal setOpenModal={setSignInModalOpen} setIsAuthenticated={handleSignInSuccess} />}
            {selectFormOpen && <SelectForm setOpenModal={setSelectFormOpen} />}
        </nav>
    );
}
