import React, { useState } from 'react';
import Navbar from '../../Navbar';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LocalResult = () => {
    const [isAdmin, setIsAdmin] = useState(false);
    const navigate = useNavigate();
    const emailUser = 'test2@gmail.com'; // Example email
    const token = localStorage.getItem('token');

    const initialFormData = {
        cleanlinessLocal: 0,
        cleanlinessCommittees: 0,
        cleanlinessComments: '',
        orderlinessLocal: 0,
        orderlinessCommittees: 0,
        orderlinessComments: '',
        greeneryLocal: 0,
        greeneryCommittees: 0,
        greeneryComments: '',
        atmosphereLocal: 0,
        atmosphereCommittees: 0,
        atmosphereComments: '',
        responsibilityLocal: 0,
        responsibilityCommittees: 0,
        responsibilityComments: '',
        honestyLocal: 0,
        honestyCommittees: 0,
        honestyComments: '',
        perseveranceLocal: 0,
        perseveranceCommittees: 0,
        perseveranceComments: '',
        unityLocal: 0,
        unityCommittees: 0,
        unityComments: '',
        gratitudeLocal: 0,
        gratitudeCommittees: 0,
        gratitudeComments: '',
        diligenceLocal: 0,
        diligenceCommittees: 0,
        diligenceComments: '',
        localInvolvementLocal: 0,
        localInvolvementCommittees: 0,
        localInvolvementComments: '',
        externalVisitLocal: 0,
        externalVisitCommittees: 0,
        externalVisitComments: '',
        knowledgeSharingLocal: 0,
        knowledgeSharingCommittees: 0,
        knowledgeSharingComments: '',
        perseverance2Local: 0,  // Change name
        perseverance2Committees: 0,  // Change name
        perseverance2Comments: '',  // Change name
        knowledgeProvidingLocal: 0,  // New key
        knowledgeProvidingCommittees: 0,  // New key
        knowledgeProvidingComments: '',  // New key
    };

    const [formData, setFormData] = useState(initialFormData);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8000/api/data/localResult', {
                ...formData,
                emailUser
            }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            if (response.status === 200) {
                alert('Data submitted successfully!');
            }
        } catch (error) {
            console.error('Error submitting form:', error);
        }
    };

    const goBack = () => {
        navigate('/side4.html');
    };

    const goNextPage = () => {
        navigate('/summary.html');
    };

    const renderRow = (label, max, localName, committeesName, commentsName) => (
        <tr key={`${localName}_${label}`}>
            <td style={{ paddingLeft: "32px" }}>{label}</td>
            <td>
                <input
                    type="number"
                    name={localName}
                    value={formData[localName]}
                    onChange={handleInputChange}
                    min="0"
                    max={max}
                    disabled={isAdmin}
                />
            </td>
            <td>
                <input
                    type="number"
                    name={committeesName}
                    value={formData[committeesName]}
                    onChange={handleInputChange}
                    min="0"
                    max={max}
                    disabled={!isAdmin}
                />
            </td>
            <td>
                <input
                    type="text"
                    name={commentsName}
                    value={formData[commentsName]}
                    onChange={handleInputChange}
                    disabled={!isAdmin}
                />
            </td>
        </tr>
    );

    return (
        <div className='lmf-container'>
            <div className='lmd-header'>
                <Navbar />
            </div>
            <div className='lmf-body'>
                <div className='lmf-text'>
                    <h1 className='lmf-h1'>ด้านที่ 3 ผลการดำเนินงาน</h1>
                </div>
                <form onSubmit={handleSubmit}>
                    <table id='lmf-table'>
                        <thead>
                            <tr>
                                <th>รายการประเมิน<p>(คะแนนเต็ม 200 คะแนน)</p></th>
                                <th>องค์กรปกครองส่วนท้องถิ่น</th>
                                <th>กรรมการ</th>
                                <th>ข้อเสนอแนะ</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td colSpan="4"><b>3.1 สภาพแวดล้อมทั่วไปของท้องถิ่นมีความสะอาด เป็นระเบียบ ร่มรื่น น่าอยู่ (50 คะแนน)</b></td>
                            </tr>
                            {renderRow('1) มีความสะอาด (20 คะแนน)', 20, 'cleanlinessLocal', 'cleanlinessCommittees', 'cleanlinessComments')}
                            {renderRow('2) มีความเป็นระเบียบ (15 คะแนน)', 15, 'orderlinessLocal', 'orderlinessCommittees', 'orderlinessComments')}
                            {renderRow('3) มีความร่มรื่น น่าอยู่ (15 คะแนน)', 15, 'greeneryLocal', 'greeneryCommittees', 'greeneryComments')}

                            <tr>
                                <td colSpan="4"><b>3.2 บรรยากาศของท้องถิ่น (50 คะแนน)</b></td>
                            </tr>
                            {renderRow('1) มีความเบิกบาน มีชีวิตชีวา (20 คะแนน)', 20, 'atmosphereLocal', 'atmosphereCommittees', 'atmosphereComments')}
                            {renderRow('2) มีบรรยากาศของท้องถิ่น (15 คะแนน)', 15, 'localInvolvementLocal', 'localInvolvementCommittees', 'localInvolvementComments')}
                            {renderRow('3) มีแหล่งเรียนรู้ที่เหมาะสม (15 คะแนน)', 15, 'externalVisitLocal', 'externalVisitCommittees', 'externalVisitComments')}

                            <tr>
                                <td colSpan="4"><b>3.3 บุคลากร มีคุณธรรม จริยธรรม (70 คะแนน)</b></td>
                            </tr>
                            {renderRow('1) มีความรับผิดชอบ (10 คะแนน)', 10, 'responsibilityLocal', 'responsibilityCommittees', 'responsibilityComments')}
                            {renderRow('2) มีความซื่อตรง (10 คะแนน)', 10, 'honestyLocal', 'honestyCommittees', 'honestyComments')}
                            {renderRow('3) มีความอดทน (10 คะแนน)', 10, 'perseveranceLocal', 'perseveranceCommittees', 'perseveranceComments')}
                            {renderRow('4) มีความเพียร (10 คะแนน)', 10, 'diligenceLocal', 'diligenceCommittees', 'diligenceComments')}
                            {renderRow('5) มีความสามัคคี (10 คะแนน)', 10, 'unityLocal', 'unityCommittees', 'unityComments')}
                            {renderRow('6) มีความกตัญญู (10 คะแนน)', 10, 'gratitudeLocal', 'gratitudeCommittees', 'gratitudeComments')}
                            {renderRow('7) มีความวิริยะอุตสาหะ (10 คะแนน)', 10, 'perseverance2Local', 'perseverance2Committees', 'perseverance2Comments')}

                            <tr>
                                <td colSpan="4"><b>3.4 ผลการดำเนินงานขององค์กรปกครองส่วนท้องถิ่น บุคลากรดีเป็นที่ยอมรับ (30 คะแนน)</b></td>
                            </tr>
                            {renderRow('1) สมาชิกองค์กรปกครองส่วนท้องถิ่นมีส่วนร่วมในการใช้ฐานทรัพยากรท้องถิ่นเป็นแหล่งเรียนรู้ (10 คะแนน)', 10, 'knowledgeSharingLocal', 'knowledgeSharingCommittees', 'knowledgeSharingComments')}
                            {renderRow('2) การเยี่ยมชมงานฐานทรัพยากรท้องถิ่นจากหน่วยงานอื่นๆ (5 คะแนน)', 5, 'externalVisitLocal', 'externalVisitCommittees', 'externalVisitComments')}
                            {renderRow('3) การไปให้ความรู้เกี่ยวกับงานฐานทรัพยากรท้องถิ่น (15 คะแนน)', 15, 'knowledgeProvidingLocal', 'knowledgeProvidingCommittees', 'knowledgeProvidingComments')}

                            <tr>
                                <td colSpan="4" style={{ textAlign: 'center' }}><b>รวมคะแนนด้านที่ 3  ผลการดำเนินงาน</b></td>
                            </tr>
                        </tbody>
                    </table>
                    <div className='lmf-footer'>
                        <div className="button">
                            <div className="button-back">
                                <button type="button" onClick={goBack}>ย้อนกลับ</button>
                            </div>
                            <div className="button-next">
                                <button type="submit">ถัดไป</button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default LocalResult;
