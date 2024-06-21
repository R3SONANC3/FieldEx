import React, { useEffect, useState } from 'react';
import Navbar from '../../Navbar';
import { useNavigate, useLocation } from 'react-router-dom';
import './localform.css';
import axios from 'axios';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

const LocalOperaSecond = () => {
    const navigate = useNavigate();
    const [isAdmin, setIsAdmin] = useState(false);
    const token = localStorage.getItem('token');
    const location = useLocation();
    const emailUser = location.state?.emailUser;
    const API_URL = 'https://fieldex-production.up.railway.app'
    const [formData, setFormData] = useState({
        localBasicInfo: 0,
        refereeBasicInfo: 0,
        commentBasicInfo: '',
        localOccupationalInfo: 0,
        refereeOccupationalInfo: 0,
        commentOccupationalInfo: '',
        localPhysicalInfo: 0,
        refereePhysicalInfo: 0,
        commentPhysicalInfo: '',
        localCommunityHistory: 0,
        refereeCommunityHistory: 0,
        commentCommunityHistory: '',
        localPlantUsage: 0,
        refereePlantUsage: 0,
        commentPlantUsage: '',
        localAnimalUsage: 0,
        refereeAnimalUsage: 0,
        commentAnimalUsage: '',
        localOtherBiologicalUsage: 0,
        refereeOtherBiologicalUsage: 0,
        commentOtherBiologicalUsage: '',
        localLocalWisdom: 0,
        refereeLocalWisdom: 0,
        commentLocalWisdom: '',
        localArchaeologicalResources: 0,
        refereeArchaeologicalResources: 0,
        commentArchaeologicalResources: '',
        localResourceSurveyReport: 0,
        refereeResourceSurveyReport: 0,
        commentResourceSurveyReport: ''
    });

    useEffect(() => {
        setIsAdmin(localStorage.getItem('userRole') === 'admin');
        if (!token) {
            navigate('/');
        } else {
            fetchUserData();
        }
    }, [navigate, token]);

    const handleInputChange = (e) => {
        const { name, value, type } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'number' ? Number(value) : value
        });
    };

    const calculateTotal = (fields) => {
        return fields.reduce((sum, field) => sum + (formData[field] || 0), 0);
    };

    const refereeTotal = calculateTotal([
        'refereeBasicInfo',
        'refereeOccupationalInfo',
        'refereePhysicalInfo',
        'refereeCommunityHistory',
        'refereePlantUsage',
        'refereeAnimalUsage',
        'refereeOtherBiologicalUsage',
        'refereeLocalWisdom',
        'refereeArchaeologicalResources',
        'refereeResourceSurveyReport'
    ]);

    const organizationTotal = calculateTotal([
        'localBasicInfo',
        'localOccupationalInfo',
        'localPhysicalInfo',
        'localCommunityHistory',
        'localPlantUsage',
        'localAnimalUsage',
        'localOtherBiologicalUsage',
        'localLocalWisdom',
        'localArchaeologicalResources',
        'localResourceSurveyReport'
    ]);

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

            const data = response.data.localOperaSec[0] || {};
            const keys = [
                "localBasicInfo", "refereeBasicInfo", "commentBasicInfo",
                "localOccupationalInfo", "refereeOccupationalInfo", "commentOccupationalInfo",
                "localPhysicalInfo", "refereePhysicalInfo", "commentPhysicalInfo",
                "localCommunityHistory", "refereeCommunityHistory", "commentCommunityHistory",
                "localPlantUsage", "refereePlantUsage", "commentPlantUsage",
                "localAnimalUsage", "refereeAnimalUsage", "commentAnimalUsage",
                "localOtherBiologicalUsage", "refereeOtherBiologicalUsage", "commentOtherBiologicalUsage",
                "localLocalWisdom", "refereeLocalWisdom", "commentLocalWisdom",
                "localArchaeologicalResources", "refereeArchaeologicalResources", "commentArchaeologicalResources",
                "localResourceSurveyReport", "refereeResourceSurveyReport", "commentResourceSurveyReport"
            ];

            const updatedFormData = keys.reduce((acc, key) => {
                acc[key] = data[key] !== undefined ? data[key] : (key.startsWith('comment') ? '' : 0);
                return acc;
            }, {});

            setFormData(updatedFormData);

        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "เกิดข้อผิดพลาดในการดึงข้อมูล!",
                text: "ไม่สามารถดึงข้อมูลจากฐานข้อมูลได้",
            });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${API_URL}/api/data/localOperaSec`, {
                ...formData,
                emailUser,
                refereeTotal,
                organizationTotal
            }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            if (response.status === 200) {
                await Swal.fire({
                    icon: "success",
                    title: "ส่งข้อมูลสำเร็จ",
                    text: "ไปที่หน้าต่อไป"
                });
                navigate('/localoperathird', { state: { emailUser } });
            }
        } catch (error) {
            await Swal.fire({
                icon: "error",
                title: "เกิดข้อผิดพลาดในการส่งข้อมูล!",
                text: "กรุณาตรวจสอบข้อมูลของท่านให้ครบ",
            });
        }
    };

    const navigateToPreviousPage = () => {
        navigate('/localoperafirst', { state: { emailUser } });
    };

    const evaluationItems = [
        { description: '2.1 การเก็บข้อมูลพื้นฐานในท้องถิ่น (5 คะแนน)', maxScore: 5, field: 'BasicInfo' },
        { description: '2.2 การเก็บข้อมูลการประกอบอาชีพในท้องถิ่น (5 คะแนน)', maxScore: 5, field: 'OccupationalInfo' },
        { description: '2.3 การเก็บข้อมูลกายภาพในท้องถิ่น (5 คะแนน)', maxScore: 5, field: 'PhysicalInfo' },
        { description: '2.4 การเก็บข้อมูลประวัติหมู่บ้าน ชุมชน วิถีชุมชน ในท้องถิ่น (10 คะแนน)', maxScore: 10, field: 'CommunityHistory' },
        { description: '2.5 การเก็บข้อมูลการใช้ประโยชน์ของพืชในท้องถิ่น และทะเบียนพรรณไม้ในชุมชน (10 คะแนน)', maxScore: 10, field: 'PlantUsage' },
        { description: '2.6 การเก็บข้อมูลการใช้ประโยชน์ของสัตว์ในท้องถิ่น ทะเบียนพันธุ์สัตว์ในชุมชน (10 คะแนน)', maxScore: 10, field: 'AnimalUsage' },
        { description: '2.7 การเก็บข้อมูลการใช้ประโยชน์ของชีวภาพอื่นๆ ในท้องถิ่น และทะเบียนชีวภาพอื่นๆ ในชุมชน (10 คะแนน)', maxScore: 10, field: 'OtherBiologicalUsage' },
        { description: '2.8 การเก็บข้อมูลภูมิปัญญาในท้องถิ่น และทะเบียนภูมิปัญญาในชุมชน (10 คะแนน)', maxScore: 10, field: 'LocalWisdom' },
        { description: '2.9 การเก็บข้อมูลแหล่งทรัพยากรและโบราณคดีในท้องถิ่น และทะเบียนแหล่งทรัพยากรชุมชนและทะเบียนโบราณคดีในชุมชน (10 คะแนน)', maxScore: 10, field: 'ArchaeologicalResources' },
        { description: '2.10 การจัดทำรายงานผลการสำรวจและจัดทำฐานทรัพยากรท้องถิ่น (25 คะแนน)', maxScore: 25, field: 'ResourceSurveyReport' }
    ];

    return (
        <div>
            <div className="lmf-header">
                <Navbar />
            </div>
            <div className='lmf-body'>
                <div className='lmf-text'>
                    <h1 className='lmf-h1'>ด้านที่ 2 การดำเนินงาน : <small>งานที่ 2 งานสำรวจเก็บรวบรวมทรัพยากรท้องถิ่น</small></h1>
                </div>
            </div>
            <form onSubmit={handleSubmit}>
                <div className='lmf-table'>
                    <table id="lmf-table">
                        <thead>
                            <tr>
                                <th>รายการประเมิน<p>(คะแนนเต็ม 100 คะแนน)</p></th>
                                <th>องค์กรปกครองส่วนท้องถิ่น</th>
                                <th>กรรมการ</th>
                                <th>ข้อเสนอแนะ</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td colSpan="4"><b>2. การดำเนินงานสำรวจเก็บรวบรวมทรัพยากรท้องถิ่น (100 คะแนน)</b></td>
                            </tr>
                            {evaluationItems.map((item, index) => (
                                <tr key={index}>
                                    <td className="tabb">{item.description}</td>
                                    <td>
                                        <input
                                            type="number"
                                            className="localScoreInput"
                                            name={`local${item.field}`}
                                            value={formData[`local${item.field}`] || 0}
                                            min="0"
                                            max={item.maxScore}
                                            onChange={handleInputChange}
                                            disabled={isAdmin}
                                        />
                                    </td>
                                    <td>
                                        <input
                                            type="number"
                                            className="refereeScoreInput"
                                            name={`referee${item.field}`}
                                            value={formData[`referee${item.field}`] || 0}
                                            min="0"
                                            max={item.maxScore}
                                            onChange={handleInputChange}
                                            disabled={!isAdmin}
                                        />
                                    </td>
                                    <td>
                                        <textarea
                                            className="commentInput"
                                            name={`comment${item.field}`}
                                            value={formData[`comment${item.field}`] || ''}
                                            onChange={handleInputChange}
                                            disabled={!isAdmin}
                                        />
                                    </td>
                                </tr>
                            ))}
                            <tr>
                                <td style={{ textAlign: 'center' }}><b>รวมคะแนนที่ได้ งานที่ 2 งานสำรวจเก็บรวบรวมทรัพยากรท้องถิ่น</b></td>
                                <td className="text-center" style={{ fontSize: '16px', alignItems: 'center' }}>
                                    {organizationTotal}
                                </td>
                                <td className="text-center" style={{ fontSize: '16px', alignItems: 'center' }}>
                                    {refereeTotal}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className='lmf-footer'>
                    <div className="button">
                        <div className="button-back">
                            <button type="button" onClick={navigateToPreviousPage}>ย้อนกลับ</button>
                        </div>
                        <div className="button-next">
                            <button type="submit">ถัดไป</button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default LocalOperaSecond;
