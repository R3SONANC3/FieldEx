import React, { useState, useEffect } from 'react';
import Navbar from '../../Navbar';
import './localform.css';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';

const Summary = () => {
    const [isAdmin, setIsAdmin] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();
    const emailUser = location.state?.emailUser;
    const token = localStorage.getItem('token');
    const API_URL = 'https://fieldex-production.up.railway.app';

    useEffect(() => {
        setIsAdmin(localStorage.getItem('userRole') === 'admin');
        if (!token) {
            navigate('/');
        }
        fetchUserData()
    }, [navigate, token]);

    const fetchUserData = async () => {
        try {
            const url = emailUser 
                ? `${API_URL}/api/data/getDataEmail/${emailUser}`
                : `${API_URL}/api/data/fetchData`;
    
            const response = await axios.get(url, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
    
            const data = response.data.localResult[0].totalRefereeScore || {};
            console.log(data);    
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "เกิดข้อผิดพลาดในการดึงข้อมูล!",
                text: "ไม่สามารถดึงข้อมูลจากฐานข้อมูลได้",
            });
        }
    };

    return (
        <div className='sum-container'>
            <div className='sum-header'>
                <Navbar />
            </div>
            <div className='sum-body'>
                <table className='sum-table' id='sum-table'>
                    <div className='sumUser-box'>
                        <h2 className='sum-h2'>สรุปผลการประเมินองค์กรปกครองส่วนท้องถิ่น โดยสมาชิกฐานทรัพยากรท้องถิ่น</h2>
                        <div className='sumUser'>
                            <h3 className='sum-h3'>สรุปผลการประเมิน 3 ด้าน คะแนนเต็ม 1,000 คะแนน</h3>
                            <div className="flex-line">
                                <div style={{ marginBottom: '8px' }}><b>ด้านที่ 1 การบริหารและการจัดการ</b></div>
                                <span style={{ marginLeft: '61px' }}>คะแนนเต็ม 200 คะแนน</span>
                                <span style={{ marginLeft: '100px' }}>คะแนนที่ได้ ............... คะแนน</span>
                            </div>
                            <div className="flex-line">
                                <div style={{ marginBottom: '8px' }}><b>ด้านที่ 2 การดำเนินงาน</b></div>
                                <span style={{ marginLeft: '61px' }}>คะแนนเต็ม 600 คะแนน</span>
                                <span style={{ marginLeft: '100px' }}>คะแนนที่ได้ ............... คะแนน</span>
                            </div>
                            <div className="flex-line">
                                <div style={{ marginBottom: '8px' }}><b>ด้านที่ 3 ผลการดำเนินงาน</b></div>
                                <span style={{ marginLeft: '61px' }}>คะแนนเต็ม 200 คะแนน</span>
                                <span style={{ marginLeft: '100px' }}>คะแนนที่ได้ ............... คะแนน</span>
                                <span><p style={{ marginTop: '10px' }}><b style={{ marginLeft: '230px' }}>รวมคะแนนที่ได้ 3 ด้าน ............... คะแนน</b></p></span>
                            </div>
                        </div>
                    </div>

                    <div className='sumReferee-box'>
                        <h2 className='sum-h2'>สรุปผลการเยี่ยมเยียนพิจารณาให้คะแนนองค์กรปกครองส่วนท้องถิ่น <p style={{ marginTop: '8px' }}>โดย คณะกรรมการเยี่ยมเยียนพิจารณาให้คะแนนฯ (อพ.สธ.)</p></h2>
                        <div className='sumReferee'>
                            <h3 className='sum-h3'>สรุปผลการประเมิน 3 ด้าน คะแนนเต็ม 1,000 คะแนน</h3>
                            <div className="flex-line">
                                <div style={{ marginBottom: '8px' }}><b>ด้านที่ 1 การบริหารและการจัดการ</b></div>
                                <span style={{ marginLeft: '61px' }}>คะแนนเต็ม 200 คะแนน</span>
                                <span style={{ marginLeft: '100px' }}>คะแนนที่ได้ ............... คะแนน</span>
                            </div>
                            <div className="flex-line">
                                <div style={{ marginBottom: '8px' }}><b>ด้านที่ 2 การดำเนินงาน</b></div>
                                <span style={{ marginLeft: '61px' }}>คะแนนเต็ม 600 คะแนน</span>
                                <span style={{ marginLeft: '100px' }}>คะแนนที่ได้ ............... คะแนน</span>
                            </div>
                            <div className="flex-line">
                                <div style={{ marginBottom: '8px' }}><b>ด้านที่ 3 ผลการดำเนินงาน</b></div>
                                <span style={{ marginLeft: '61px' }}>คะแนนเต็ม 200 คะแนน</span>
                                <span style={{ marginLeft: '100px' }}>คะแนนที่ได้ ............... คะแนน</span>
                                <span><p style={{ marginTop: '10px' }}><b style={{ marginLeft: '230px' }}>รวมคะแนนที่ได้ 3 ด้าน ............... คะแนน</b></p></span>
                            </div>
                        </div>
                    </div>
                </table>
            </div>
            <div className='sum-fooer'>
                <table className='showSum-table' id='showSum-table'>
                    <thead>
                        <tr>
                            <th>ผลการประเมิน</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td style={{ textAlign: 'center' }}><span className="pass">ผ่านเกณฑ์มาตรฐาน อพ.สธ. ระดับป้ายสนองพระราชดำริในงานฐานทรัพยากรท้องถิ่น</span></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Summary;
