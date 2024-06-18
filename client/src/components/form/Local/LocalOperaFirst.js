import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../../Navbar';
import { useNavigate } from 'react-router-dom';

function LocalOperaFirst() {
    const [isAdmin, setIsAdmin] = useState(false);
    const navigate = useNavigate();
    const emailUser = 'test2@gmail.com';
    const token = localStorage.getItem('token');
    const [formData, setFormData] = useState({
        year1BoundaryAreaProtection: 0,
        area1BoundaryAreaProtection: 0,
        year2BoundaryAreaProtection: 0,
        area2BoundaryAreaProtection: 0,
        scoreBoundary: 0,
        refereeScoreBoundary: 0,
        commentBoundaryAreaProtection: "",
        scoreSurveyResources: 0,
        refereeScoreSurveyResources: 0,
        commentSurveyResources: "",
        scoreClassifyResources: 0,
        refereeScoreClassifyResources: 0,
        commentClassifyResources: "",
        scoreTagResources: 0,
        refereeScoreTagResources: 0,
        commentTagResources: "",
        scoreMappingBoundary: 0,
        refereeScoreMappingBoundary: 0,
        commentMappingBoundary: "",
        scoreStudyResources: 0,
        refereeScoreStudyResources: 0,
        commentStudyResources: "",
        scorePhotoResources: 0,
        refereeScorePhotoResources: 0,
        commentPhotoResources: "",
        scoreSampleResources: 0,
        refereeScoreSampleResources: 0,
        commentSampleResources: "",
        scoreRegisterResources: 0,
        refereeScoreRegisterResources: 0,
        commentRegisterResources: "",
        scorePhotoRegisterResources: 0,
        refereeScorePhotoRegisterResources: 0,
        commentPhotoRegisterResources: "",
        scoreCareResources: 0,
        refereeScoreCareResources: 0,
        commentCareResources: "",
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = async () => {
        try {
            const response = await axios.post('http://localhost:8000/api/data/localopera', {
                ...formData,
                emailUser: emailUser
            }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            alert(response.data);
        } catch (error) {
            console.error('There was an error submitting the form!', error);
        }
    };

    const goBack = () => {
        navigate('/localmanage')
    };

    const goNextPage = () => {
        handleSubmit();
    };

    const InputRow = ({ title, scoreMax, namePrefix, handleInputChange, formData }) => (
        <tr>
            <td className="tabbb">{title}</td>
            <td><input type="number" name={`score${namePrefix}`} className="score-input" min="0" max={scoreMax} value={formData[`score${namePrefix}`]} onChange={handleInputChange} disabled={isAdmin} /></td>
            <td><input type="number" name={`refereeScore${namePrefix}`} className="referee-score-input" min="0" max={scoreMax} value={formData[`refereeScore${namePrefix}`]} onChange={handleInputChange} disabled={!isAdmin} /></td>
            <td><input type="text" name={`comment${namePrefix}`} className="comment" value={formData[`comment${namePrefix}`]} onChange={handleInputChange} disabled={!isAdmin} /></td>
        </tr>
    );

    return (
        <div className="lmf-container">
            <div className="lmf-header">
                <Navbar />
                <div className='lmf-text'>
                    <h1>ด้านที่ 2 การดำเนินงาน : <small>งานที่ 1 งานปกปักทรัพยากรท้องถิ่น</small></h1>
                </div>
            </div>
            <div className='lmf-body'>
                <table className="lmf-table">
                    <thead>
                        <tr>
                            <th>รายการประเมิน (คะแนนเต็ม 100 คะแนน)</th>
                            <th>องค์กรปกครองส่วนท้องถิ่น</th>
                            <th>กรรมการ</th>
                            <th>ข้อเสนอแนะ</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td colSpan="4"><b>1. การดำเนินงานปกปักทรัพยากรท้องถิ่น (100 คะแนน)</b></td>
                        </tr>
                        <tr>
                            <td className="tabb">
                                1.1 การกำหนดขอบเขตพื้นที่ และสำรวจทรัพยากรในพื้นที่ปกปักทรัพยากรท้องถิ่น (20 คะแนน)
                                <div className="tab">
                                    1) การกำหนดขอบเขตพื้นที่ปกปักทรัพยากรท้องถิ่น (5 คะแนน)
                                    <div className="tabb">ตารางสรุปจำนวนพื้นที่ปกปักทรัพยากรท้องถิ่น</div>
                                </div>
                                <table className="nested-table">
                                    <thead>
                                        <tr>
                                            <th>ปีงบประมาณ</th>
                                            <th>จำนวนพื้นที่ปกปักทรัพยากรท้องถิ่น (พื้นที่)</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td><input type="number" name="year1BoundaryAreaProtection" className="score-input" min="0" max="9999" value={formData.year1BoundaryAreaProtection} onChange={handleInputChange} disabled={isAdmin}/></td>
                                            <td><input type="number" name="area1BoundaryAreaProtection" className="r1d1-input" min="0" max="9007199254740991" value={formData.area1BoundaryAreaProtection} onChange={handleInputChange} disabled={isAdmin}/></td>
                                        </tr>
                                        <tr>
                                            <td><input type="number" name="year2BoundaryAreaProtection" className="score-input" min="0" max="9999" value={formData.year2BoundaryAreaProtection} onChange={handleInputChange} disabled={isAdmin}/></td>
                                            <td><input type="number" name="area2BoundaryAreaProtection" className="r2d1-input" min="0" max="9007199254740991" value={formData.area2BoundaryAreaProtection} onChange={handleInputChange} disabled={isAdmin}/></td>
                                        </tr>
                                    </tbody>
                                </table>
                            </td>
                            <td><input type="number" name="scoreBoundary" className="score-input" min="0" max="5" value={formData.scoreBoundary} onChange={handleInputChange} disabled={isAdmin}/></td>
                            <td><input type="number" name="refereeScoreBoundary" className="referee-score-input" min="0" max="5" value={formData.refereeScoreBoundary} onChange={handleInputChange} disabled={!isAdmin} /></td>
                            <td><input type="text" name="commentBoundaryAreaProtection" className="comment" value={formData.commentBoundaryAreaProtection} onChange={handleInputChange} disabled={!isAdmin}/></td>
                        </tr>
                        <InputRow title="2) การสำรวจทรัพยากรในพื้นที่ปกปักทรัพยากรท้องถิ่น (5 คะแนน)" scoreMax="5" namePrefix="SurveyResources" handleInputChange={handleInputChange} formData={formData} />
                        <InputRow title="3) การจำแนกชนิดทรัพยากรในพื้นที่ปกปักทรัพยากรท้องถิ่น (5 คะแนน)" scoreMax="5" namePrefix="ClassifyResources" handleInputChange={handleInputChange} formData={formData} />
                        <InputRow title="4) การติดรหัสประจำชนิด (5 คะแนน)" scoreMax="5" namePrefix="TagResources" handleInputChange={handleInputChange} formData={formData} />
                        <tr>
                            <td className="tabb">1.2 การทำผังแสดงขอบเขตพื้นที่ปกปักทรัพยากรท้องถิ่น (10 คะแนน)</td>
                            <td><input type="number" name="scoreMappingBoundary" className="score-input" min="0" max="10" value={formData.scoreMappingBoundary} onChange={handleInputChange} disabled={isAdmin}/></td>
                            <td><input type="number" name="refereeScoreMappingBoundary" className="referee-score-input" min="0" max="10" value={formData.refereeScoreMappingBoundary} onChange={handleInputChange} disabled={!isAdmin} /></td>
                            <td><input type="text" name="commentMappingBoundary" className="comment" value={formData.commentMappingBoundary} onChange={handleInputChange} disabled={!isAdmin}/></td>
                        </tr>
                        <InputRow title="1.3 การจัดทำฐานข้อมูลทรัพยากรท้องถิ่น (40 คะแนน)" scoreMax="40" namePrefix="StudyResources" handleInputChange={handleInputChange} formData={formData} />
                        <InputRow title="1.4 การถ่ายภาพและจัดทำแหล่งข้อมูลท้องถิ่น (10 คะแนน)" scoreMax="10" namePrefix="PhotoResources" handleInputChange={handleInputChange} formData={formData} />
                        <InputRow title="1.5 การจัดทำตัวอย่างทรัพยากร (10 คะแนน)" scoreMax="10" namePrefix="SampleResources" handleInputChange={handleInputChange} formData={formData} />
                        <InputRow title="1.6 การลงทะเบียนทรัพยากร (10 คะแนน)" scoreMax="10" namePrefix="RegisterResources" handleInputChange={handleInputChange} formData={formData} />
                        <InputRow title="1.7 การถ่ายภาพทรัพยากร (10 คะแนน)" scoreMax="10" namePrefix="PhotoRegisterResources" handleInputChange={handleInputChange} formData={formData} />
                        <InputRow title="1.8 การดูแลรักษาทรัพยากร (10 คะแนน)" scoreMax="10" namePrefix="CareResources" handleInputChange={handleInputChange} formData={formData} />
                    </tbody>
                </table>
                <div className='lmf-footer'>
                    <div className="button">
                        <div className="button-back">
                            <button onClick={goBack}>ย้อนกลับ</button>
                        </div>
                        <div className="button-next">
                            <button onClick={handleSubmit}>ถัดไป</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LocalOperaFirst;
