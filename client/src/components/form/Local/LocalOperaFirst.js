import React, { useState } from 'react';
import './localform.css';
import Navbar from '../../Navbar';

const InputRow = ({ title, scoreMax, namePrefix, handleInputChange, formData }) => (
    <tr>
        <td className="tabbb">{title}</td>
        <td><input type="number" name={`score${namePrefix}`} className="score-input" min="0" max={scoreMax} value={formData[`score${namePrefix}`]} onChange={handleInputChange} /></td>
        <td><input type="number" name={`refereeScore${namePrefix}`} className="referee-score-input" min="0" max={scoreMax} value={formData[`refereeScore${namePrefix}`]} onChange={handleInputChange} /></td>
        <td><input type="text" name={`comment${namePrefix}`} className="comment" value={formData[`comment${namePrefix}`]} onChange={handleInputChange} /></td>
    </tr>
);

function LocalOperaFirst() {
    const [formData, setFormData] = useState({
        year1BoundaryAreaProtection: 2023,
        area1BoundaryAreaProtection: 100,
        year2BoundaryAreaProtection: 2024,
        area2BoundaryAreaProtection: 200,
        scoreBoundary: 5,
        refereeScoreBoundary: 4,
        commentBoundaryAreaProtection: "Good job",
        scoreSurveyResources: 3,
        refereeScoreSurveyResources: 2,
        commentSurveyResources: "Needs improvement",
        scoreClassifyResources: 4,
        refereeScoreClassifyResources: 3,
        commentClassifyResources: "Well done",
        scoreTagResources: 5,
        refereeScoreTagResources: 4,
        commentTagResources: "Excellent",
        scoreMappingBoundary: 6,
        refereeScoreMappingBoundary: 5,
        commentMappingBoundary: "Good effort",
        scoreStudyResources: 7,
        refereeScoreStudyResources: 6,
        commentStudyResources: "Very good",
        scorePhotoResources: 8,
        refereeScorePhotoResources: 7,
        commentPhotoResources: "Outstanding",
        scoreSampleResources: 9,
        refereeScoreSampleResources: 8,
        commentSampleResources: "Remarkable",
        scoreRegisterResources: 10,
        refereeScoreRegisterResources: 9,
        commentRegisterResources: "Exceptional",
        scorePhotoRegisterResources: 8,
        refereeScorePhotoRegisterResources: 7,
        commentPhotoRegisterResources: "Great",
        scoreCareResources: 7,
        refereeScoreCareResources: 6,
        commentCareResources: "Good",
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const goBack = () => {
        window.location.href = 'side1.html';
    };

    const goNextPage = () => {
        window.location.href = 'side3.html';
    };

    return (
        <div className="lmf-container">
            <div className="lmf-header">
                <Navbar />
                <h1>ด้านที่ 2 การดำเนินงาน : <small>งานที่ 1 งานปกปักทรัพยากรท้องถิ่น</small></h1>
            </div>
            <table className="lmf-table">
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
                                        <td><span className="row1-year"></span><input type="number" name="year1BoundaryAreaProtection" className="score-input" min="0" max="99" value={formData.year1BoundaryAreaProtection} onChange={handleInputChange} /></td>
                                        <td><input type="number" name="area1BoundaryAreaProtection" className="r1d1-input" min="0" max="9007199254740991" value={formData.area1BoundaryAreaProtection} onChange={handleInputChange} /></td>
                                    </tr>
                                    <tr>
                                        <td><span className="row2-year"></span><input type="number" name="year2BoundaryAreaProtection" className="score-input" min="0" max="99" value={formData.year2BoundaryAreaProtection} onChange={handleInputChange} /></td>
                                        <td><input type="number" name="area2BoundaryAreaProtection" className="r2d1-input" min="0" max="9007199254740991" value={formData.area2BoundaryAreaProtection} onChange={handleInputChange} /></td>
                                    </tr>
                                </tbody>
                            </table>
                        </td>
                        <td><input type="number" name="scoreBoundary" className="score-input" min="0" max="5" value={formData.scoreBoundary} onChange={handleInputChange} /></td>
                        <td><input type="number" name="refereeScoreBoundary" className="referee-score-input" min="0" max="5" value={formData.refereeScoreBoundary} onChange={handleInputChange} /></td>
                        <td><input type="text" name="commentBoundaryAreaProtection" className="comment" value={formData.commentBoundaryAreaProtection} onChange={handleInputChange} /></td>
                    </tr>
                    <InputRow title="2) การสำรวจทรัพยากรในพื้นที่ปกปักทรัพยากรท้องถิ่น (5 คะแนน)" scoreMax="5" namePrefix="SurveyResources" handleInputChange={handleInputChange} formData={formData} />
                    <InputRow title="3) การจำแนกชนิดทรัพยากรในพื้นที่ปกปักทรัพยากรท้องถิ่น (5 คะแนน)" scoreMax="5" namePrefix="ClassifyResources" handleInputChange={handleInputChange} formData={formData} />
                    <InputRow title="4) การติดรหัสประจำชนิด (5 คะแนน)" scoreMax="5" namePrefix="TagResources" handleInputChange={handleInputChange} formData={formData} />
                    <tr>
                        <td className="tabb">1.2 การทำผังแสดงขอบเขตพื้นที่ปกปักทรัพยากรท้องถิ่น (10 คะแนน)</td>
                        <td><input type="number" name="scoreMappingBoundary" className="score-input" min="0" max="10" value={formData.scoreMappingBoundary} onChange={handleInputChange} /></td>
                        <td><input type="number" name="refereeScoreMappingBoundary" className="referee-score-input" min="0" max="10" value={formData.refereeScoreMappingBoundary} onChange={handleInputChange} /></td>
                        <td><input type="text" name="commentMappingBoundary" className="comment" value={formData.commentMappingBoundary} onChange={handleInputChange} /></td>
                    </tr>
                    <InputRow title="1.3 การศึกษาทรัพยากรในพื้นที่ปกปักทรัพยากรท้องถิ่น (20 คะแนน)" scoreMax="10" namePrefix="StudyResources" handleInputChange={handleInputChange} formData={formData} />
                    <InputRow title="2) การถ่ายภาพทรัพยากรในพื้นที่ปกปักทรัพยากรท้องถิ่น (10 คะแนน)" scoreMax="10" namePrefix="PhotoResources" handleInputChange={handleInputChange} formData={formData} />
                    <tr>
                        <td className="tabb">1.4 การทำตัวอย่างทรัพยากรในพื้นที่ปกปักทรัพยากรท้องถิ่น (20 คะแนน)</td>
                        <td><input type="number" name="scoreSampleResources" className="score-input" min="0" max="10" value={formData.scoreSampleResources} onChange={handleInputChange} /></td>
                        <td><input type="number" name="refereeScoreSampleResources" className="referee-score-input" min="0" max="10" value={formData.refereeScoreSampleResources} onChange={handleInputChange} /></td>
                        <td><input type="text" name="commentSampleResources" className="comment" value={formData.commentSampleResources} onChange={handleInputChange} /></td>
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
                        <td><input type="number" name="scoreCareResources" className="score-input" min="0" max="20" value={formData.scoreCareResources} onChange={handleInputChange} /></td>
                        <td><input type="number" name="refereeScoreCareResources" className="referee-score-input" min="0" max="20" value={formData.refereeScoreCareResources} onChange={handleInputChange} /></td>
                        <td><input type="text" name="commentCareResources" className="comment" value={formData.commentCareResources} onChange={handleInputChange} /></td>
                    </tr>
                    <tr>
                        <td><b>รวมคะแนนที่ได้  งานที่ 1 งานปกปักทรัพยากรท้องถิ่น</b></td>
                    </tr>
                </tbody>
            </table>
            <div className="buttons">
                <button onClick={goBack}>ย้อนกลับ</button>
                <button onClick={goNextPage}>ถัดไป</button>
            </div>
        </div>
    );
}

export default LocalOperaFirst;
