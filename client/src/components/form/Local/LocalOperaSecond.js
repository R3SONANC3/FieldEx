import React, { useEffect, useState } from 'react';
import Navbar from '../../Navbar';
import { useNavigate, useLocation } from 'react-router-dom';
import './localform.css';
import axios from 'axios';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

const LocalOperaSecond = () => {
    const navigate = useNavigate();
    const [isAdmin, setIsAdmin] = useState(false); // assuming admin role management
    const token = localStorage.getItem('token');
    const location = useLocation();
    const emailUser = location.state?.emailUser;
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
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    useEffect(() => {
        console.log(formData);
    }, [formData]);

    const fetchUserData = async () => {
        try {
            if (emailUser) {
                const response = await axios.get(`http://localhost:8000/api/data/getDataEmail/${emailUser}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                const data = response.data.localOperaSec[0] || {};
                const updatedFormData = {
                    localBasicInfo: data.localBasicInfo || 0,
                    refereeBasicInfo: data.refereeBasicInfo || 0,
                    commentBasicInfo: data.commentBasicInfo || '',
                    localOccupationalInfo: data.localOccupationalInfo || 0,
                    refereeOccupationalInfo: data.refereeOccupationalInfo || 0,
                    commentOccupationalInfo: data.commentOccupationalInfo || '',
                    localPhysicalInfo: data.localPhysicalInfo || 0,
                    refereePhysicalInfo: data.refereePhysicalInfo || 0,
                    commentPhysicalInfo: data.commentPhysicalInfo || '',
                    localCommunityHistory: data.localCommunityHistory || 0,
                    refereeCommunityHistory: data.refereeCommunityHistory || 0,
                    commentCommunityHistory: data.commentCommunityHistory || '',
                    localPlantUsage: data.localPlantUsage || 0,
                    refereePlantUsage: data.refereePlantUsage || 0,
                    commentPlantUsage: data.commentPlantUsage || '',
                    localAnimalUsage: data.localAnimalUsage || 0,
                    refereeAnimalUsage: data.refereeAnimalUsage || 0,
                    commentAnimalUsage: data.commentAnimalUsage || '',
                    localOtherBiologicalUsage: data.localOtherBiologicalUsage || 0,
                    refereeOtherBiologicalUsage: data.refereeOtherBiologicalUsage || 0,
                    commentOtherBiologicalUsage: data.commentOtherBiologicalUsage || '',
                    localLocalWisdom: data.localLocalWisdom || 0,
                    refereeLocalWisdom: data.refereeLocalWisdom || 0,
                    commentLocalWisdom: data.commentLocalWisdom || '',
                    localArchaeologicalResources: data.localArchaeologicalResources || 0,
                    refereeArchaeologicalResources: data.refereeArchaeologicalResources || 0,
                    commentArchaeologicalResources: data.commentArchaeologicalResources || '',
                    localResourceSurveyReport: data.localResourceSurveyReport || 0,
                    refereeResourceSurveyReport: data.refereeResourceSurveyReport || 0,
                    commentResourceSurveyReport: data.commentResourceSurveyReport || ''
                };
                setFormData(updatedFormData);
            } else {
                const response = await axios.get(`http://localhost:8000/api/data/fetchData`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                const data = response.data.localOperaSec[0] || {};
                const updatedFormData = {
                    localBasicInfo: data.localBasicInfo || 0,
                    refereeBasicInfo: data.refereeBasicInfo || 0,
                    commentBasicInfo: data.commentBasicInfo || '',
                    localOccupationalInfo: data.localOccupationalInfo || 0,
                    refereeOccupationalInfo: data.refereeOccupationalInfo || 0,
                    commentOccupationalInfo: data.commentOccupationalInfo || '',
                    localPhysicalInfo: data.localPhysicalInfo || 0,
                    refereePhysicalInfo: data.refereePhysicalInfo || 0,
                    commentPhysicalInfo: data.commentPhysicalInfo || '',
                    localCommunityHistory: data.localCommunityHistory || 0,
                    refereeCommunityHistory: data.refereeCommunityHistory || 0,
                    commentCommunityHistory: data.commentCommunityHistory || '',
                    localPlantUsage: data.localPlantUsage || 0,
                    refereePlantUsage: data.refereePlantUsage || 0,
                    commentPlantUsage: data.commentPlantUsage || '',
                    localAnimalUsage: data.localAnimalUsage || 0,
                    refereeAnimalUsage: data.refereeAnimalUsage || 0,
                    commentAnimalUsage: data.commentAnimalUsage || '',
                    localOtherBiologicalUsage: data.localOtherBiologicalUsage || 0,
                    refereeOtherBiologicalUsage: data.refereeOtherBiologicalUsage || 0,
                    commentOtherBiologicalUsage: data.commentOtherBiologicalUsage || '',
                    localLocalWisdom: data.localLocalWisdom || 0,
                    refereeLocalWisdom: data.refereeLocalWisdom || 0,
                    commentLocalWisdom: data.commentLocalWisdom || '',
                    localArchaeologicalResources: data.localArchaeologicalResources || 0,
                    refereeArchaeologicalResources: data.refereeArchaeologicalResources || 0,
                    commentArchaeologicalResources: data.commentArchaeologicalResources || '',
                    localResourceSurveyReport: data.localResourceSurveyReport || 0,
                    refereeResourceSurveyReport: data.refereeResourceSurveyReport || 0,
                    commentResourceSurveyReport: data.commentResourceSurveyReport || ''
                };
                setFormData(updatedFormData);
            }

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
            const response = await axios.post('http://localhost:8000/api/data/localOperaSec', {
                ...formData,
                emailUser
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
            alert('Failed to save data');
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
                    <h1 className='title'>ด้านที่ 2 การดำเนินงาน : <small>งานที่ 2 งานสำรวจเก็บรวบรวมทรัพยากรท้องถิ่น</small></h1>
                </div>
            </div>
            <form onSubmit={handleSubmit}>
                <div className='lmf-table'>
                    <table id="lmf-table" >
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
                                            value={formData[`local${item.field}`] || ''}
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
                                            value={formData[`referee${item.field}`] || ''}
                                            min="0"
                                            max={item.maxScore}
                                            onChange={handleInputChange}
                                            disabled={!isAdmin}
                                        />
                                    </td>
                                    <td>
                                        <input
                                            type="text"
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
                                <td colSpan="4" style={{ textAlign: 'center' }}><b>รวมคะแนนที่ได้ งานที่ 2 งานสำรวจเก็บรวบรวมทรัพยากรท้องถิ่น</b></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className='lmf-footer'>
                    <div className="button">
                        <div className="button-back">
                            <button onClick={navigateToPreviousPage}>ย้อนกลับ</button>
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
