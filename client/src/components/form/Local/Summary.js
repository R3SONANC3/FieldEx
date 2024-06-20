import React, { useState, useEffect, useCallback } from 'react';
import Navbar from '../../Navbar';
import './localform.css';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import '../../../styles.css'

const Summary = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const emailUser = location.state?.emailUser;
    const token = localStorage.getItem('token');
    const API_URL = 'https://fieldex-production.up.railway.app';
    const [formData, setFormData] = useState({
        scoResult: 0,
        refResult: 0,
        scoManage: 0,
        refManage: 0,
        sumScore: 0,
        sumRef: 0
    });

    const fetchUserData = useCallback(async () => {
        try {
            const url = emailUser 
                ? `${API_URL}/api/data/getDataEmail/${emailUser}`
                : `${API_URL}/api/data/fetchData`;
    
            const response = await axios.get(url, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
    
            const { localResult, localManageData, localOperaFirst, localOperaSec, localOperaThird } = response.data;
    
            const scoResult = localResult[0].totalScore;
            const refResult = localResult[0].totalRefereeScore;
            const scoManage = localManageData[0].organizationTotal;
            const refManage = localManageData[0].refereeTotal;
            const scoOpera1 = localOperaFirst[0].totalScore;
            const refOpera1 = localOperaFirst[0].totalRefereeScore;
            const scoOpera2 = localOperaSec[0].organizationTotal;
            const refOpera2 = localOperaSec[0].refereeTotal;
            const scoOpera3 = localOperaThird[0].totalScore;
            const refOpera3 = localOperaThird[0].totalRefereeScore;
    
            const sumScore = scoOpera1 + scoOpera2 + scoOpera3 + scoManage + scoResult;
            const sumRef = refOpera1 + refOpera2 + refOpera3 + refResult + refManage;
    
            setFormData({
                scoResult,
                refResult,
                scoManage,
                refManage,
                sumScore,
                sumRef
            });
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "เกิดข้อผิดพลาดในการดึงข้อมูล!",
                text: "ไม่สามารถดึงข้อมูลจากฐานข้อมูลได้",
            });
        }
    }, [API_URL, emailUser, token]);

    useEffect(() => {
        if (!token) {
            navigate('/');
        } else {
            fetchUserData();
        }
    }, [navigate, token, fetchUserData]);

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
                                <span style={{ marginLeft: '100px' }}>คะแนนที่ได้ <input type="number" className="score-input" value={formData.scoManage} min="0" disabled /> คะแนน</span>
                            </div>
                            <div className="flex-line">
                                <div style={{ marginBottom: '8px' }}><b>ด้านที่ 2 การดำเนินงาน</b></div>
                                <span style={{ marginLeft: '61px' }}>คะแนนเต็ม 600 คะแนน</span>
                                <span style={{ marginLeft: '100px' }}>คะแนนที่ได้ <input type="number" className="score-input" value={formData.sumScore - formData.scoManage - formData.scoResult} min="0" disabled /> คะแนน</span>
                            </div>
                            <div className="flex-line">
                                <div style={{ marginBottom: '8px' }}><b>ด้านที่ 3 ผลการดำเนินงาน</b></div>
                                <span style={{ marginLeft: '61px' }}>คะแนนเต็ม 200 คะแนน</span>
                                <span style={{ marginLeft: '100px' }}>คะแนนที่ได้ <input type="number" className="score-input" value={formData.scoResult} min="0" disabled /> คะแนน</span>
                                <span><p style={{ marginTop: '10px' }}><b style={{ marginLeft: '230px' }}>รวมคะแนนที่ได้ 3 ด้าน <input type="number" className="score-input" value={formData.sumScore} min="0" disabled /> คะแนน</b></p></span>
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
                                <span style={{ marginLeft: '100px' }}>คะแนนที่ได้ <input type="number" className="score-input" value={formData.refManage} min="0" disabled /> คะแนน</span>              
                            </div>
                            <div className="flex-line">
                                <div style={{ marginBottom: '8px' }}><b>ด้านที่ 2 การดำเนินงาน</b></div>
                                <span style={{ marginLeft: '61px' }}>คะแนนเต็ม 600 คะแนน</span>
                                <span style={{ marginLeft: '100px' }}>คะแนนที่ได้ <input type="number" className="score-input" value={formData.sumRef - formData.refManage - formData.refResult} min="0" disabled /> คะแนน</span>
                            </div>
                            <div className="flex-line">
                                <div style={{ marginBottom: '8px' }}><b>ด้านที่ 3 ผลการดำเนินงาน</b></div>
                                <span style={{ marginLeft: '61px' }}>คะแนนเต็ม 200 คะแนน</span>
                                <span style={{ marginLeft: '100px' }}>คะแนนที่ได้ <input type="number" className="score-input" value={formData.refResult} min="0" disabled /> คะแนน</span>
                                <span><p style={{ marginTop: '10px' }}><b style={{ marginLeft: '230px' }}>รวมคะแนนที่ได้ 3 ด้าน <input type="number" className="score-input" value={formData.sumRef} min="0" disabled /> คะแนน</b></p></span>
                            </div>
                        </div>
                    </div>
                </table>
            </div>
            <div className='sum-footer' style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
                <button>ประเมินองค์กร</button>
            </div>
            <div className='sum-footer'>
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
