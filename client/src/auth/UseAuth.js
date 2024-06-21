import { useEffect, useState } from 'react';

const UseAuth = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [userRole, setUserRole] = useState(null);

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
        localStorage.removeItem('hasVisitedHome')
        window.location.reload();
    };

    return { isAuthenticated, userRole, clearAuthData, setIsAuthenticated, setUserRole };
};

export default UseAuth;
