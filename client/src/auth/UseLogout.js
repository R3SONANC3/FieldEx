import axios from 'axios';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

const UseLogout = (clearAuthData, setIsAuthenticated, setUserRole) => {
    const navigate = useNavigate();
    const API_URL = 'https://fieldex-production.up.railway.app'


    const handleSignOut = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.get(`${API_URL}/api/auth/logout`);
            console.log(response.data);
            Swal.fire({
                title: 'ออกจากระบบสำเร็จ',
                icon: 'success',
            }).then(() => {
                setIsAuthenticated(false);
                setUserRole(null);
                clearAuthData();
                navigate('/');
            });
        } catch (error) {
            console.error('Error:', error);
            Swal.fire({
                title: 'เกิดข้อผิดพลาดในการออกจากระบบ',
                icon: 'error',
            });
        }
    };

    return handleSignOut;
};

export default UseLogout;
