import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../../Navbar';
import { useNavigate } from 'react-router-dom';


function LocalOperaFirst() {
    const [isAdmin, setIsAdmin] = useState(true);
    const navigate = useNavigate();
    const emailUser = 'test2@gmail.com'
    const token = localStorage.getItem('token')
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
            <td><input type="number" name={`refereeScore${namePrefix}`} className="referee-score-input" min="0" max={scoreMax} value={formData[`refereeScore${namePrefix}`]} onChange={handleInputChange} disabled={!isAdmin}/></td>
            <td><input type="text" name={`comment${namePrefix}`} className="comment" value={formData[`comment${namePrefix}`]} onChange={handleInputChange} disabled={!isAdmin}/></td>
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
                                <p className="tab">
                                    1) การกำหนดขอบเขตพื้นที่ปกปักทรัพยากรท้องถิ่น (5 คะแนน)
                                    <p className="tabb">ตารางสรุปจำนวนพื้นที่ปกปักทรัพยากรท้องถิ่น</p>
                                </p>
                                <table className="nested-table">
                                    <thead>
                                        <tr>
                                            <th>ปีงบประมาณ</th>
                                            <th>จำนวนพื้นที่ปกปักทรัพยากรท้องถิ่น (พื้นที่)</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td><span className="row1-year"></span><input type="number" name="year1BoundaryAreaProtection" className="score-input" min="0" max="9999" value={formData.year1BoundaryAreaProtection} onChange={handleInputChange} disabled={isAdmin}/></td>
                                            <td><input type="number" name="area1BoundaryAreaProtection" className="r1d1-input" min="0" max="9007199254740991" value={formData.area1BoundaryAreaProtection} onChange={handleInputChange} disabled={isAdmin}/></td>
                                        </tr>
                                        <tr>
                                            <td><span className="row2-year"></span><input type="number" name="year2BoundaryAreaProtection" className="score-input" min="0" max="9999" value={formData.year2BoundaryAreaProtection} onChange={handleInputChange} disabled={isAdmin}/></td>
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
                            <td><input type="number" name="refereeScoreMappingBoundary" className="referee-score-input" min="0" max="10" value={formData.refereeScoreMappingBoundary} onChange={handleInputChange}disabled={!isAdmin} /></td>
                            <td><input type="text" name="commentMappingBoundary" className="comment" value={formData.commentMappingBoundary} onChange={handleInputChange}disabled={!isAdmin} /></td>
                        </tr>
                        <InputRow title="1.3 การศึกษาทรัพยากรในพื้นที่ปกปักทรัพยากรท้องถิ่น (20 คะแนน)" scoreMax="20" namePrefix="StudyResources" handleInputChange={handleInputChange} formData={formData} />
                        <InputRow title="2) การถ่ายภาพทรัพยากรในพื้นที่ปกปักทรัพยากรท้องถิ่น (10 คะแนน)" scoreMax="10" namePrefix="PhotoResources" handleInputChange={handleInputChange} formData={formData} />
                        <tr>
                            <td className="tabb">1.4 การทำตัวอย่างทรัพยากรในพื้นที่ปกปักทรัพยากรท้องถิ่น (20 คะแนน)</td>
                            <td><input type="number" name="scoreSampleResources" className="score-input" min="0" max="10" value={formData.scoreSampleResources} onChange={handleInputChange} /></td>
                            <td><input type="number" name="refereeScoreSampleResources" className="referee-score-input" min="0" max="10" value={formData.refereeScoreSampleResources} onChange={handleInputChange} disabled={!isAdmin}/></td>
                            <td><input type="text" name="commentSampleResources" className="comment" value={formData.commentSampleResources} onChange={handleInputChange} disabled={!isAdmin}/></td>
                        </tr>
                        <tr>
                            <td className="tabb" colSpan="4">1.5 การบันทึกข้อมูลทรัพยากรท้องถิ่นในพื้นที่ปกปักทรัพยากรท้องถิ่น (30 คะแนน)</td>
                        </tr>
                        <InputRow title="1) การจัดทำระบบฐานข้อมูลทรัพยากรท้องถิ่นในพื้นที่ปกปักทรัพยากรท้องถิ่น (20 คะแนน)" scoreMax="20" namePrefix="RegisterResources" handleInputChange={handleInputChange} formData={formData} />
                        <InputRow title="2) การจัดทำระบบฐานข้อมูลเพื่อใช้ในการวางแผนการใช้ประโยชน์จากทรัพยากร (10 คะแนน)" scoreMax="10" namePrefix="PhotoRegisterResources" handleInputChange={handleInputChange} formData={formData} />
                        <tr>
                            <td>1.6 การดูแลรักษาทรัพยากรในพื้นที่ปกปักทรัพยากรท้องถิ่น (20 คะแนน)
                                <p className="tabb">แบบบันทึกการดูแลรักษาทรัพยากรในพื้นที่ปกปักทรัพยากรท้องถิ่น เช่น การทำแนวกันไฟ การทำฝายชะลอน้ำ อาสาสมัครดูแลรักษาพื้นที่ปกปักทรัพยากรท้องถิ่น ฯลฯ</p>
                            </td>
                            <td><input type="number" name="scoreCareResources" className="score-input" min="0" max="20" value={formData.scoreCareResources} onChange={handleInputChange} disabled={isAdmin}/></td>
                            <td><input type="number" name="refereeScoreCareResources" className="referee-score-input" min="0" max="20" value={formData.refereeScoreCareResources} onChange={handleInputChange} disabled={!isAdmin}/></td>
                            <td><input type="text" name="commentCareResources" className="comment" value={formData.commentCareResources} onChange={handleInputChange}disabled={!isAdmin} /></td>
                        </tr>
                        <tr>
                            <td><b>รวมคะแนนที่ได้  งานที่ 1 งานปกปักทรัพยากรท้องถิ่น</b></td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div className="lmf-footer">
                <button onClick={goBack}>ย้อนกลับ</button>
                <button onClick={goNextPage}>ถัดไป</button>
            </div>
        </div>
    );
}

export default LocalOperaFirst;
