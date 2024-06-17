import React from 'react';
import Navbar from '../../Navbar';

const LocalResult = () => {
    const goBack = () => {
        window.location.href = 'side4.html';
    };

    const goNextPage = () => {
        window.location.href = 'summary.html';
    };

    return (
        <div className='lmf-container'>
            <div className='lmd-header'>
                <Navbar />
            </div>
            <div className='lmf-body'>
                <div className='lmf-text'>
                    <h1>ด้านที่ 3 ผลการดำเนินงาน</h1>
                </div>
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
                            <td colSpan="6"><b>3.1 สภาพแวดล้อมทั่วไปของท้องถิ่นมีความสะอาด เป็นระเบียบ ร่มรื่น น่าอยู่ (50 คะแนน)</b></td>
                        </tr>
                        {['มีความสะอาด (20 คะแนน)', 'มีความเป็นระเบียบ (15 คะแนน)', 'มีความร่มรื่น น่าอยู่ (15 คะแนน)'].map((item, index) => (
                            <tr key={index}>
                                <td>{item}</td>
                                <td><input type="number" min="0" max={parseInt(item.match(/\d+/)[0])} /></td>
                                <td><input type="number" min="0" max={parseInt(item.match(/\d+/)[0])} /></td>
                                <td><input type="text" /></td>
                            </tr>
                        ))}
                        <tr>
                            <td colSpan="6"><b>3.2 บรรยากาศของท้องถิ่น (50 คะแนน)</b></td>
                        </tr>
                        {['มีความเบิกบาน มีชีวิตชีวา (20 คะแนน)', 'มีบรรยากาศของท้องถิ่น (15 คะแนน)', 'มีแหล่งเรียนรู้ที่เหมาะสม (15 คะแนน)'].map((item, index) => (
                            <tr key={index}>
                                <td>{item}</td>
                                <td><input type="number" min="0" max={parseInt(item.match(/\d+/)[0])} /></td>
                                <td><input type="number" min="0" max={parseInt(item.match(/\d+/)[0])} /></td>
                                <td><input type="text" /></td>
                            </tr>
                        ))}
                        <tr>
                            <td colSpan="6"><b>3.3 บุคลากร มีคุณธรรม จริยธรรม (70 คะแนน)<p>(สมาชิกองค์กรปกครองส่วนท้องถิ่น กำนัน ผู้ใหญ่บ้าน ชุมชน ผู้รู้ในท้องถิ่น ผู้บริหารสถานศึกษา และผู้ที่เกี่ยวข้องเกี่ยวกับการจัดทำฐานทรัพยากรท้องถิ่น)</p></b></td>
                        </tr>
                        {['มีความรับผิดชอบ (10 คะแนน)', 'มีความซื่อตรง (10 คะแนน)', 'มีความอดทน (10 คะแนน)', 'มีความเพียร (10 คะแนน)', 'มีความสามัคคี (10 คะแนน)', 'มีความกตัญญู (10 คะแนน)', 'มีความวิริยะอุตสาหะ (10 คะแนน)'].map((item, index) => (
                            <tr key={index}>
                                <td>{item}</td>
                                <td><input type="number" min="0" max={parseInt(item.match(/\d+/)[0])} /></td>
                                <td><input type="number" min="0" max={parseInt(item.match(/\d+/)[0])} /></td>
                                <td><input type="text" /></td>
                            </tr>
                        ))}
                        <tr>
                            <td colSpan="6"><b>3.4 ผลการดำเนินงานขององค์กรปกครองส่วนท้องถิ่น บุคลากรดีเป็นที่ยอมรับ (30 คะแนน)</b></td>
                        </tr>
                        {['สมาชิกองค์กรปกครองส่วนท้องถิ่นมีส่วนร่วมในการใช้ฐานทรัพยากรท้องถิ่นเป็นแหล่งเรียนรู้ (10 คะแนน)', 'การเยี่ยมชมงานฐานทรัพยากรท้องถิ่นจากหน่วยงานอื่นๆ (5 คะแนน)', 'การไปให้ความรู้เกี่ยวกับงานฐานทรัพยากรท้องถิ่น (15 คะแนน)'].map((item, index) => (
                            <tr key={index}>
                                <td>{item}</td>
                                <td><input type="number" min="0" max={parseInt(item.match(/\d+/)[0])} /></td>
                                <td><input type="number" min="0" max={parseInt(item.match(/\d+/)[0])} /></td>
                                <td><input type="text" /></td>
                            </tr>
                        ))}
                        <tr>
                            <td><b>รวมคะแนนด้านที่ 3  ผลการดำเนินงาน</b></td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div className='lmf-footer'>
                <button onClick={goBack}>ย้อนกลับ</button>
                <button onClick={goNextPage}>หน้าต่อไป</button>
            </div>
        </div>
    );
};

export default LocalResult;
