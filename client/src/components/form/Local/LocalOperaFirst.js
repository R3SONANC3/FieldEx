import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../../Navbar';
import { useLocation, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';


function LocalOperaFirst() {
    const [isAdmin, setIsAdmin] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const emailUser = location.state?.emailUser;
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
        setIsAdmin(localStorage.getItem('userRole') === 'admin');
        if (!token) {
            navigate('/');
        } else {
            fetchUserData();
        }
    }, [navigate, token]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const fetchUserData = async () => {
        try {
            const url = emailUser 
                ? `http://localhost:8000/api/data/getDataEmail/${emailUser}`
                : `http://localhost:8000/api/data/fetchData`;
    
            const response = await axios.get(url, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
    
            const data = response.data.localOperaFirst[0] || {};
            const keys = [
                "year1BoundaryAreaProtection", "area1BoundaryAreaProtection", "year2BoundaryAreaProtection", 
                "area2BoundaryAreaProtection", "scoreBoundary", "refereeScoreBoundary", "commentBoundaryAreaProtection", 
                "scoreSurveyResources", "refereeScoreSurveyResources", "commentSurveyResources", "scoreClassifyResources", 
                "refereeScoreClassifyResources", "commentClassifyResources", "scoreTagResources", "refereeScoreTagResources", 
                "commentTagResources", "scoreMappingBoundary", "refereeScoreMappingBoundary", "commentMappingBoundary", 
                "scoreStudyResources", "refereeScoreStudyResources", "commentStudyResources", "scorePhotoResources", 
                "refereeScorePhotoResources", "commentPhotoResources", "scoreSampleResources", "refereeScoreSampleResources", 
                "commentSampleResources", "scoreRegisterResources", "refereeScoreRegisterResources", "commentRegisterResources", 
                "scorePhotoRegisterResources", "refereeScorePhotoRegisterResources", "commentPhotoRegisterResources", 
                "scoreCareResources", "refereeScoreCareResources", "commentCareResources", "scoreEvaluateResources", 
                "refereeScoreEvaluateResources", "commentEvaluateResources", "scoreMonitorResources", 
                "refereeScoreMonitorResources", "commentMonitorResources", "scoreManageResources", 
                "refereeScoreManageResources", "commentManageResources", "scoreSupportResources", 
                "refereeScoreSupportResources", "commentSupportResources", "scoreAdministerResources", 
                "refereeScoreAdministerResources", "commentAdministerResources", "scoreCoordinateResources", 
                "refereeScoreCoordinateResources", "commentCoordinateResources", "scoreReportResources", 
                "refereeScoreReportResources", "commentReportResources", "scoreDocumentResources", 
                "refereeScoreDocumentResources", "commentDocumentResources", "scorePlanResources", 
                "refereeScorePlanResources", "commentPlanResources", "scoreFundResources", "refereeScoreFundResources", 
                "commentFundResources", "scoreExecuteResources", "refereeScoreExecuteResources", "commentExecuteResources", 
                "scoreReviewResources", "refereeScoreReviewResources", "commentReviewResources", "scoreAuditResources", 
                "refereeScoreAuditResources", "commentAuditResources", "scoreInspectResources", "refereeScoreInspectResources", 
                "commentInspectResources", "scoreVerifyResources", "refereeScoreVerifyResources", "commentVerifyResources"
            ];
    
            const updatedFormData = keys.reduce((acc, key) => {
                acc[key] = data[key] || (typeof data[key] === 'number' ? 0 : "");
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
            await Swal.fire({
                icon: "success",
                title: "ส่งข้อมูลสำเร็จ",
                text: "ไปที่หน้าต่อไป"
            });
            navigate('/localoperasec', { state: { emailUser } })
        } catch (error) {
            await Swal.fire({
                icon: "error",
                title: "เกิดข้อผิดพลาดในการส่งข้อมูล!",
                text: "กรุณาตรวจสอบข้อมูลของท่านให้ครบ",
            });
        }
    };

    const goBack = () => {
        navigate('/localmanage', { state: { emailUser } })
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
                    disabled={!isAdmin} /></td>
            <td>
                <input
                    type="text"
                    name={`comment${namePrefix}`}
                    className="commentInput"
                    value={formData[`comment${namePrefix}`]}
                    onChange={handleInputChange}
                    disabled={!isAdmin} /></td>
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
                                <div className="tab lmf-p">
                                    1) การกำหนดขอบเขตพื้นที่ปกปักทรัพยากรท้องถิ่น (5 คะแนน)
                                    <div className="tabb lmf-p">ตารางสรุปจำนวนพื้นที่ปกปักทรัพยากรท้องถิ่น</div>
                                </div>
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
                                                />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <span className="row2-year"></span>
                                                <input
                                                    type="number"
                                                    name="year2BoundaryAreaProtection"
                                                    className="score-input"
                                                    min="0" max="9999"
                                                    value={formData.year2BoundaryAreaProtection}
                                                    onChange={handleInputChange}
                                                    disabled={isAdmin}
                                                />
                                            </td>
                                            <td>
                                                <input
                                                    type="number"
                                                    name="area2BoundaryAreaProtection"
                                                    className="r2d1-input"
                                                    min="0" max="999999999999"
                                                    value={formData.area2BoundaryAreaProtection}
                                                    onChange={handleInputChange}
                                                    disabled={isAdmin}
                                                />
                                            </td>
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
                                />
                            </td>
                            <td>
                                <input
                                    type="number"
                                    name="refereeScoreBoundary"
                                    className="referee-score-input"
                                    min="0" max="5"
                                    value={formData.refereeScoreBoundary}
                                    onChange={handleInputChange}
                                    disabled={!isAdmin}
                                />
                            </td>
                            <td>
                                <input
                                    type="text"
                                    name="commentBoundaryAreaProtection"
                                    className="comment"
                                    value={formData.commentBoundaryAreaProtection}
                                    onChange={handleInputChange}
                                    disabled={!isAdmin}
                                />
                            </td>
                        </tr>

                        <InputRow title="2) การสำรวจทรัพยากรในพื้นที่ปกปักทรัพยากรท้องถิ่น (5 คะแนน)" scoreMax="5" namePrefix="SurveyResources" handleInputChange={handleInputChange} formData={formData} />
                        <InputRow title="3) การจำแนกชนิดทรัพยากรในพื้นที่ปกปักทรัพยากรท้องถิ่น (5 คะแนน)" scoreMax="5" namePrefix="ClassifyResources" handleInputChange={handleInputChange} formData={formData} />
                        <InputRow title="4) การติดรหัสประจำชนิด (5 คะแนน)" scoreMax="5" namePrefix="TagResources" handleInputChange={handleInputChange} formData={formData} />
                        <tr>
                            <td className="tabb">1.2 การทำผังแสดงขอบเขตพื้นที่ปกปักทรัพยากรท้องถิ่น (10 คะแนน)</td>
                            <td><input type="number" name="scoreMappingBoundary" className="score-input" min="0" max="10" value={formData.scoreMappingBoundary} onChange={handleInputChange} disabled={isAdmin} /></td>
                            <td><input type="number" name="refereeScoreMappingBoundary" className="referee-score-input" min="0" max="10" value={formData.refereeScoreMappingBoundary} onChange={handleInputChange} disabled={!isAdmin} /></td>
                            <td><input type="text" name="commentMappingBoundary" className="comment" value={formData.commentMappingBoundary} onChange={handleInputChange} disabled={!isAdmin} /></td>
                        </tr>
                        <tr>
                            <td className="tabb">1.3 การศึกษาทรัพยากรในพื้นที่ปกปักทรัพยากรท้องถิ่น (20 คะแนน)</td>
                        </tr>
                        <InputRow title="1) การศึกษาทรัพยากรในพื้นที่ปกปักทรัพยากรท้องถิ่น (10 คะแนน)" scoreMax="10" namePrefix="StudyResources" handleInputChange={handleInputChange} formData={formData} />
                        <InputRow title="2) การถ่ายภาพทรัพยากรในพื้นที่ปกปักทรัพยากรท้องถิ่น (10 คะแนน)" scoreMax="10" namePrefix="PhotoResources" handleInputChange={handleInputChange} formData={formData} />
                        <tr>
                            <td className="tabb">1.4 การทำตัวอย่างทรัพยากรในพื้นที่ปกปักทรัพยากรท้องถิ่น (20 คะแนน)</td>
                            <td><input type="number" name="scoreSampleResources" className="score-input" min="0" max="10" value={formData.scoreSampleResources} onChange={handleInputChange} disabled={isAdmin} /></td>
                            <td><input type="number" name="refereeScoreSampleResources" className="referee-score-input" min="0" max="10" value={formData.refereeScoreSampleResources} onChange={handleInputChange} disabled={!isAdmin} /></td>
                            <td><input type="text" name="commentSampleResources" className="comment" value={formData.commentSampleResources} onChange={handleInputChange} disabled={!isAdmin} /></td>
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
                            <td><input type="number" name="refereeScoreCareResources" className="referee-score-input" min="0" max="20" value={formData.refereeScoreCareResources} onChange={handleInputChange} disabled={!isAdmin} /></td>
                            <td><input type="text" name="commentCareResources" className="comment" value={formData.commentCareResources} onChange={handleInputChange} disabled={!isAdmin} /></td>
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
