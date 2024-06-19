import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../../Navbar';
import { useNavigate } from 'react-router-dom';


function LocalOperaFirst() {
    const [isAdmin, setIsAdmin] = useState(false);
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

    useEffect(() => {
        fetchUserData();
    })

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const fetchUserData = async ()=>{
        try {
            const response = await axios.get(`http://localhost:8000/api/data/getDataEmail/${emailUser}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            const data = response.data.localOperaFirst[0] || {};
            const updatedFormData = {
                year1BoundaryAreaProtection: data.year1BoundaryAreaProtection || 0,
                area1BoundaryAreaProtection: data.area1BoundaryAreaProtection || 0,
                year2BoundaryAreaProtection: data.year2BoundaryAreaProtection || 0,
                area2BoundaryAreaProtection: data.area2BoundaryAreaProtection || 0,
                scoreBoundary: data.scoreBoundary || 0,
                refereeScoreBoundary: data.refereeScoreBoundary || 0,
                commentBoundaryAreaProtection: data.commentBoundaryAreaProtection || "",
                scoreSurveyResources: data.scoreSurveyResources || 0,
                refereeScoreSurveyResources: data.refereeScoreSurveyResources || 0,
                commentSurveyResources: data.commentSurveyResources || "",
                scoreClassifyResources: data.scoreClassifyResources || 0,
                refereeScoreClassifyResources: data.refereeScoreClassifyResources || 0,
                commentClassifyResources: data.commentClassifyResources || "",
                scoreTagResources: data.scoreTagResources || 0,
                refereeScoreTagResources: data.refereeScoreTagResources || 0,
                commentTagResources: data.commentTagResources || "",
                scoreMappingBoundary: data.scoreMappingBoundary || 0,
                refereeScoreMappingBoundary: data.refereeScoreMappingBoundary || 0,
                commentMappingBoundary: data.commentMappingBoundary || "",
                scoreStudyResources: data.scoreStudyResources || 0,
                refereeScoreStudyResources: data.refereeScoreStudyResources || 0,
                commentStudyResources: data.commentStudyResources || "",
                scorePhotoResources: data.scorePhotoResources || 0,
                refereeScorePhotoResources: data.refereeScorePhotoResources || 0,
                commentPhotoResources: data.commentPhotoResources || "",
                scoreSampleResources: data.scoreSampleResources || 0,
                refereeScoreSampleResources: data.refereeScoreSampleResources || 0,
                commentSampleResources: data.commentSampleResources || "",
                scoreRegisterResources: data.scoreRegisterResources || 0,
                refereeScoreRegisterResources: data.refereeScoreRegisterResources || 0,
                commentRegisterResources: data.commentRegisterResources || "",
                scorePhotoRegisterResources: data.scorePhotoRegisterResources || 0,
                refereeScorePhotoRegisterResources: data.refereeScorePhotoRegisterResources || 0,
                commentPhotoRegisterResources: data.commentPhotoRegisterResources || "",
                scoreCareResources: data.scoreCareResources || 0,
                refereeScoreCareResources: data.refereeScoreCareResources || 0,
                commentCareResources: data.commentCareResources || "",
                scoreEvaluateResources: data.scoreEvaluateResources || 0,
                refereeScoreEvaluateResources: data.refereeScoreEvaluateResources || 0,
                commentEvaluateResources: data.commentEvaluateResources || "",
                scoreMonitorResources: data.scoreMonitorResources || 0,
                refereeScoreMonitorResources: data.refereeScoreMonitorResources || 0,
                commentMonitorResources: data.commentMonitorResources || "",
                scoreManageResources: data.scoreManageResources || 0,
                refereeScoreManageResources: data.refereeScoreManageResources || 0,
                commentManageResources: data.commentManageResources || "",
                scoreSupportResources: data.scoreSupportResources || 0,
                refereeScoreSupportResources: data.refereeScoreSupportResources || 0,
                commentSupportResources: data.commentSupportResources || "",
                scoreAdministerResources: data.scoreAdministerResources || 0,
                refereeScoreAdministerResources: data.refereeScoreAdministerResources || 0,
                commentAdministerResources: data.commentAdministerResources || "",
                scoreCoordinateResources: data.scoreCoordinateResources || 0,
                refereeScoreCoordinateResources: data.refereeScoreCoordinateResources || 0,
                commentCoordinateResources: data.commentCoordinateResources || "",
                scoreReportResources: data.scoreReportResources || 0,
                refereeScoreReportResources: data.refereeScoreReportResources || 0,
                commentReportResources: data.commentReportResources || "",
                scoreDocumentResources: data.scoreDocumentResources || 0,
                refereeScoreDocumentResources: data.refereeScoreDocumentResources || 0,
                commentDocumentResources: data.commentDocumentResources || "",
                scorePlanResources: data.scorePlanResources || 0,
                refereeScorePlanResources: data.refereeScorePlanResources || 0,
                commentPlanResources: data.commentPlanResources || "",
                scoreFundResources: data.scoreFundResources || 0,
                refereeScoreFundResources: data.refereeScoreFundResources || 0,
                commentFundResources: data.commentFundResources || "",
                scoreExecuteResources: data.scoreExecuteResources || 0,
                refereeScoreExecuteResources: data.refereeScoreExecuteResources || 0,
                commentExecuteResources: data.commentExecuteResources || "",
                scoreReviewResources: data.scoreReviewResources || 0,
                refereeScoreReviewResources: data.refereeScoreReviewResources || 0,
                commentReviewResources: data.commentReviewResources || "",
                scoreAuditResources: data.scoreAuditResources || 0,
                refereeScoreAuditResources: data.refereeScoreAuditResources || 0,
                commentAuditResources: data.commentAuditResources || "",
                scoreInspectResources: data.scoreInspectResources || 0,
                refereeScoreInspectResources: data.refereeScoreInspectResources || 0,
                commentInspectResources: data.commentInspectResources || "",
                scoreVerifyResources: data.scoreVerifyResources || 0,
                refereeScoreVerifyResources: data.refereeScoreVerifyResources || 0,
                commentVerifyResources: data.commentVerifyResources || ""
            }
            setFormData(updatedFormData);
        } catch (error) {
            
        }
    }

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
            navigate('/localoperasec')
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
            <td>
                <input 
                type="number" 
                name={`score${namePrefix}`} 
                className="score-input" 
                min="0" max={scoreMax} 
                value={formData[`score${namePrefix}`]} 
                onChange={handleInputChange} 
                disabled={isAdmin} 
                />
                </td>
            <td>
                <input 
                type="number" 
                name={`refereeScore${namePrefix}`} 
                className="referee-score-input" 
                min="0" max={scoreMax} 
                value={formData[`refereeScore${namePrefix}`]} 
                onChange={handleInputChange} 
                disabled={!isAdmin}/></td>
            <td>
                <input 
                type="text" 
                name={`comment${namePrefix}`} 
                className="comment" 
                value={formData[`comment${namePrefix}`]} 
                onChange={handleInputChange}
                 disabled={!isAdmin}/></td>
        </tr>
    );
    return (
        <div className="lmf-container">
            <div className="lmf-header">
                <Navbar />    
            </div>
            <div className='lmf-body'>
                <div className='lmf-text'><h1 className='lmf-h1'>ด้านที่ 2 การดำเนินงาน : <small>งานที่ 1 งานปกปักทรัพยากรท้องถิ่น</small></h1></div>
            </div>
            <div className="lmf-table">
                <table id='lmf-table'>
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
                            <td colSpan="4"><b>1. การดำเนินงานปกปักทรัพยากรท้องถิ่น (100 คะแนน)</b></td>
                        </tr>
                        <tr>
                            <td className="tabb">
                                1.1 การกำหนดขอบเขตพื้นที่ และสำรวจทรัพยากรในพื้นที่ปกปักทรัพยากรท้องถิ่น (20 คะแนน)
                                <p className="tab lmf-p">
                                    1) การกำหนดขอบเขตพื้นที่ปกปักทรัพยากรท้องถิ่น (5 คะแนน)
                                    <p className="tabb lmf-p">ตารางสรุปจำนวนพื้นที่ปกปักทรัพยากรท้องถิ่น</p>
                                </p>
                                <table className="Nested-table1" id='Nested-table1'>
                                    <thead>
                                        <tr>
                                            <th>ปีงบประมาณ</th>
                                            <th>จำนวนพื้นที่ปกปักทรัพยากรท้องถิ่น(พื้นที่)</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>
                                                <span className="row1-year"></span>
                                                <input 
                                                type="number" 
                                                name="year1BoundaryAreaProtection" 
                                                className="score-input" 
                                                min="0" max="9999" 
                                                value={formData.year1BoundaryAreaProtection} 
                                                onChange={handleInputChange} 
                                                disabled={isAdmin}
                                                />
                                            </td>
                                            <td>
                                                <input 
                                                type="number" 
                                                name="area1BoundaryAreaProtection" 
                                                className="r1d1-input" 
                                                min="0" max="999999999999" 
                                                value={formData.area1BoundaryAreaProtection} 
                                                onChange={handleInputChange} 
                                                disabled={isAdmin}
                                                /></td>
                                        </tr>
                                        <tr>
                                            <td><span className="row2-year"></span>
                                            <input 
                                            type="number" 
                                            name="year2BoundaryAreaProtection" 
                                            className="score-input" 
                                            min="0" max="9999" 
                                            value={formData.year2BoundaryAreaProtection} 
                                            onChange={handleInputChange} 
                                            disabled={isAdmin}
                                            /></td>
                                            <td>
                                                <input 
                                                type="number" 
                                                name="area2BoundaryAreaProtection" 
                                                className="r2d1-input"
                                                min="0" max="999999999999" 
                                                value={formData.area2BoundaryAreaProtection} 
                                                onChange={handleInputChange} 
                                                disabled={isAdmin}
                                                /></td>
                                        </tr>
                                    </tbody>
                                </table>
                            </td>
                            <td>
                                <input 
                            type="number" 
                            name="scoreBoundary" 
                            className="score-input" 
                            min="0" max="5" 
                            value={formData.scoreBoundary} 
                            onChange={handleInputChange} 
                            disabled={isAdmin}
                            /></td>
                            <td>
                                <input 
                                type="number" 
                                name="refereeScoreBoundary" 
                                className="referee-score-input"
                                 min="0" max="5" 
                                 value={formData.refereeScoreBoundary} 
                                 onChange={handleInputChange} 
                                 disabled={!isAdmin}
                                 /></td>
                            <td><input 
                            type="text" 
                            name="commentBoundaryAreaProtection" 
                            className="comment" 
                            value={formData.commentBoundaryAreaProtection} 
                            onChange={handleInputChange} 
                            disabled={!isAdmin}
                            /></td>
                        </tr>
                        <InputRow title="2) การสำรวจทรัพยากรในพื้นที่ปกปักทรัพยากรท้องถิ่น (5 คะแนน)" scoreMax="5" namePrefix="SurveyResources" handleInputChange={handleInputChange} formData={formData} />
                        <InputRow title="3) การจำแนกชนิดทรัพยากรในพื้นที่ปกปักทรัพยากรท้องถิ่น (5 คะแนน)" scoreMax="5" namePrefix="ClassifyResources" handleInputChange={handleInputChange} formData={formData} />
                        <InputRow title="4) การติดรหัสประจำชนิด (5 คะแนน)" scoreMax="5" namePrefix="TagResources" handleInputChange={handleInputChange} formData={formData} />
                        <tr>
                            <td className="tabb">1.2 การทำผังแสดงขอบเขตพื้นที่ปกปักทรัพยากรท้องถิ่น (10 คะแนน)</td>
                            <td><input type="number" name="scoreMappingBoundary" className="score-input" min="0" max="10" value={formData.scoreMappingBoundary} onChange={handleInputChange} disabled={isAdmin} /></td>
                            <td><input type="number" name="refereeScoreMappingBoundary" className="referee-score-input" min="0" max="10" value={formData.refereeScoreMappingBoundary} onChange={handleInputChange} disabled={!isAdmin}/></td>
                            <td><input type="text" name="commentMappingBoundary" className="comment" value={formData.commentMappingBoundary} onChange={handleInputChange}disabled={!isAdmin} /></td>
                        </tr>
                        <tr>
                            <td className="tabb">1.3 การศึกษาทรัพยากรในพื้นที่ปกปักทรัพยากรท้องถิ่น (20 คะแนน)</td>
                        </tr>
                        <InputRow title="1) การศึกษาทรัพยากรในพื้นที่ปกปักทรัพยากรท้องถิ่น (10 คะแนน)" scoreMax="10" namePrefix="StudyResources" handleInputChange={handleInputChange} formData={formData} />
                        <InputRow title="2) การถ่ายภาพทรัพยากรในพื้นที่ปกปักทรัพยากรท้องถิ่น (10 คะแนน)" scoreMax="10" namePrefix="PhotoResources" handleInputChange={handleInputChange} formData={formData} />
                        <tr>
                            <td className="tabb">1.4 การทำตัวอย่างทรัพยากรในพื้นที่ปกปักทรัพยากรท้องถิ่น (20 คะแนน)</td>
                            <td><input type="number" name="scoreSampleResources" className="score-input" min="0" max="10" value={formData.scoreSampleResources} onChange={handleInputChange} disabled={isAdmin}/></td>
                            <td><input type="number" name="refereeScoreSampleResources" className="referee-score-input" min="0" max="10" value={formData.refereeScoreSampleResources} onChange={handleInputChange} disabled={!isAdmin}/></td>
                            <td><input type="text" name="commentSampleResources" className="comment" value={formData.commentSampleResources} onChange={handleInputChange} disabled={!isAdmin}/></td>
                        </tr>
                        <tr>
                            <td className="tabb" colSpan="4">1.5 การทำทะเบียนทรัพยากรในพื้นที่ปกปักทรัพยากรท้องถิ่น (10 คะแนน) </td>
                        </tr>
                        <InputRow title="1) การทำทะเบียนทรัพยากรในพื้นที่ปกปักทรัพยากรท้องถิ่นตามแบบ อพ.สธ. (5 คะแนน)" scoreMax="5" namePrefix="RegisterResources" handleInputChange={handleInputChange} formData={formData} />
                        <InputRow title="2) ระบบการจัดเก็บและสืบค้นได้ (เอกสาร และคอมพิวเตอร์)  (5 คะแนน)" scoreMax="5" namePrefix="PhotoRegisterResources" handleInputChange={handleInputChange} formData={formData} />
                        <tr>
                            <td className="tabb">1.6 การดูแลรักษาทรัพยากรในพื้นที่ปกปักทรัพยากรท้องถิ่น (20 คะแนน)
                                <p className="tabb">แบบบันทึกการดูแลรักษาทรัพยากรในพื้นที่ปกปักทรัพยากรท้องถิ่น เช่น การทำแนวกันไฟ การทำฝายชะลอน้ำ อาสาสมัครดูแลรักษาพื้นที่ปกปักทรัพยากรท้องถิ่น ฯลฯ</p>
                            </td>
                            <td><input type="number" name="scoreCareResources" className="score-input" min="0" max="20" value={formData.scoreCareResources} onChange={handleInputChange} disabled={isAdmin} /></td>
                            <td><input type="number" name="refereeScoreCareResources" className="referee-score-input" min="0" max="20" value={formData.refereeScoreCareResources} onChange={handleInputChange}disabled={!isAdmin} /></td>
                            <td><input type="text" name="commentCareResources" className="comment" value={formData.commentCareResources} onChange={handleInputChange} disabled={!isAdmin}/></td>
                        </tr>
                        <tr>
                            <td style={{ textAlign: 'center' }}><b>รวมคะแนนที่ได้  งานที่ 1 งานปกปักทรัพยากรท้องถิ่น</b></td>
                        </tr>
                    </tbody>
                </table>    
            </div>
            <div className='lmf-footer'>
                <div className="button">
                    <div className="button-back">
                        <button onClick={goBack}>ย้อนกลับ</button>
                    </div>
                    <div className="button-next">
                        <button onClick={goNextPage}>ถัดไป</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LocalOperaFirst;
