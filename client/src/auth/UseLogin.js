import Swal from 'sweetalert2';

const UseLogin = (setIsAuthenticated, setUserRole, clearAuthData) => {
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

    return handleSignInSuccess;
};

export default UseLogin;
