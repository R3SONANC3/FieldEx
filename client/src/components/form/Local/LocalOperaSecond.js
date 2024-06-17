import React, { useState } from 'react';
import Navbar from '../../Navbar';

const LocalOperaSecond = () => {
    const [formData, setFormData] = useState({});
    const [isAdmin, setIsAdmin] = useState(false); // assuming admin role management

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleFileChange = (e, name) => {
        const file = e.target.files[0];
        setFormData({
            ...formData,
            [name]: file
        });
    };

    const goBack = () => {
        window.location.href = 'side2.html';
    };

    const goNextPage = () => {
        window.location.href = 'side4.html';
    };

    const rows = [
        { description: '2.1 การเก็บข้อมูลพื้นฐานในท้องถิ่น (5 คะแนน)', max: 5 },
        { description: '2.2 การเก็บข้อมูลการประกอบอาชีพในท้องถิ่น (5 คะแนน)', max: 5 },
        { description: '2.3 การเก็บข้อมูลกายภาพในท้องถิ่น (5 คะแนน)', max: 5 },
        { description: '2.4 การเก็บข้อมูลประวัติหมู่บ้าน ชุมชน วิถีชุมชน ในท้องถิ่น (10 คะแนน)', max: 10 },
        { description: '2.5 การเก็บข้อมูลการใช้ประโยชน์ของพืชในท้องถิ่น และทะเบียนพรรณไม้ในชุมชน (10 คะแนน)', max: 10 },
        { description: '2.6 การเก็บข้อมูลการใช้ประโยชน์ของสัตว์ในท้องถิ่น ทะเบียนพันธุ์สัตว์ในชุมชน (10 คะแนน)', max: 10 },
        { description: '2.7 การเก็บข้อมูลการใช้ประโยชน์ของชีวภาพอื่นๆ ในท้องถิ่น และทะเบียนชีวภาพอื่นๆ ในชุมชน (10 คะแนน)', max: 10 },
        { description: '2.8 การเก็บข้อมูลภูมิปัญญาในท้องถิ่น และทะเบียนภูมิปัญญาในชุมชน (10 คะแนน)', max: 10 },
        { description: '2.9 การเก็บข้อมูลแหล่งทรัพยากรและโบราณคดีในท้องถิ่น และทะเบียนแหล่งทรัพยากรชุมชนและทะเบียนโบราณคดีในชุมชน (10 คะแนน)', max: 10 },
        { description: '2.10 การจัดทำรายงานผลการสำรวจและจัดทำฐานทรัพยากรท้องถิ่น (25 คะแนน)', max: 25 }
    ];

    return (
        <div >
            <div className="lmf-header" >
                <Navbar />
            </div>
            <div className='lmf-body'>
                <div className='lmf-text'><h1>ด้านที่ 2 การดำเนินงาน : <small>งานที่ 2 งานสำรวจเก็บรวบรวมทรัพยากรท้องถิ่น</small></h1>
                </div>
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
                            <td colSpan="6"><b>2.การดำเนินงานสำรวจเก็บรวบรวมทรัพยากรท้องถิ่น (100 คะแนน)</b></td>
                        </tr>
                        {rows.map((row, index) => (
                            <tr key={index}>
                                <td className="tabb">{row.description}</td>
                                <td><input type="number" className="score-input" name={`local${index}`} value={formData[`local${index}`] || ''} min="0" max={row.max} onChange={handleInputChange} disabled={!isAdmin} /></td>
                                <td><input type="number" className="referee-score-input" name={`referee${index}`} value={formData[`referee${index}`] || ''} min="0" max={row.max} onChange={handleInputChange} disabled={isAdmin} /></td>
                                <td><input type="text" className="comment" name={`comment${index}`} value={formData[`comment${index}`] || ''} onChange={handleInputChange} disabled={isAdmin} /></td>
                            </tr>
                        ))}
                        <tr>
                            <td style={{ textAlign: 'center' }}><b>รวมคะแนนที่ได้ งานที่ 2 งานสำรวจเก็บรวบรวมทรัพยากรท้องถิ่น</b></td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div className="button" style={{ display: 'flex', justifyContent: 'space-between', width: '100%', marginTop: '15px', paddingBottom: '35px' }}>
                <div className="button-back">
                    <button onClick={goBack} style={{ padding: '12.5px 30px', border: 0, borderRadius: '100px', backgroundColor: '#ec6459', color: '#ffffff', fontWeight: 'Bold', transition: 'all 0.5s', WebkitTransition: 'all 0.5s' }}>ย้อนกลับ</button>
                </div>
                <div className="button-next">
                    <button onClick={goNextPage} style={{ padding: '12.5px 30px', border: 0, borderRadius: '100px', backgroundColor: '#1ca59e', color: '#ffffff', fontWeight: 'Bold', transition: 'all 0.5s', WebkitTransition: 'all 0.5s' }}>ถัดไป</button>
                </div>
            </div>
        </div>
    );
};

export default LocalOperaSecond;
