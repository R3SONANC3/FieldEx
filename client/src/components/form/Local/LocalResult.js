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
                    <h1 className='lmf-h1'>ด้านที่ 3 ผลการดำเนินงาน</h1>
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
                            <td colSpan="4"><b>3.1 สภาพแวดล้อมทั่วไปของท้องถิ่นมีความสะอาด เป็นระเบียบ ร่มรื่น น่าอยู่ (50 คะแนน)</b></td>
                        </tr>
                        {['1) มีความสะอาด (20 คะแนน)', '2) มีความเป็นระเบียบ (15 คะแนน)', '3) มีความร่มรื่น น่าอยู่ (15 คะแนน)'].map((item, index) => (
                            <tr key={index}>
                                <td style={{paddingLeft:"32px"}}>{item}</td>
                                <td><input type="number" min="0" max={parseInt(item.match(/\d+/)[0])} /></td>
                                <td><input type="number" min="0" max={parseInt(item.match(/\d+/)[0])} /></td>
                                <td><input type="text" /></td>
                            </tr>
                        ))}
                        <tr>
                            <td colSpan="4"><b>3.2 บรรยากาศของท้องถิ่น (50 คะแนน)</b></td>
                        </tr>
                        {['1) มีความเบิกบาน มีชีวิตชีวา (20 คะแนน)', '2) มีบรรยากาศของท้องถิ่น (15 คะแนน)', '3) มีแหล่งเรียนรู้ที่เหมาะสม (15 คะแนน)'].map((item, index) => (
                            <tr key={index}>
                                <td style={{paddingLeft:"32px"}}>{item}</td>
                                <td><input type="number" min="0" max={parseInt(item.match(/\d+/)[0])} /></td>
                                <td><input type="number" min="0" max={parseInt(item.match(/\d+/)[0])} /></td>
                                <td><input type="text" /></td>
                            </tr>
                        ))}
                        <tr>
                            <td colSpan="4"><b>3.3 บุคลากร มีคุณธรรม จริยธรรม (70 คะแนน)<p>(สมาชิกองค์กรปกครองส่วนท้องถิ่น กำนัน ผู้ใหญ่บ้าน ชุมชน ผู้รู้ในท้องถิ่น ผู้บริหารสถานศึกษา และผู้ที่เกี่ยวข้องเกี่ยวกับการจัดทำฐานทรัพยากรท้องถิ่น)</p></b></td>
                        </tr>
                        {['1) มีความรับผิดชอบ (10 คะแนน)', '2) มีความซื่อตรง (10 คะแนน)', '3) มีความอดทน (10 คะแนน)', '4) มีความเพียร (10 คะแนน)', '5) มีความสามัคคี (10 คะแนน)', '6) มีความกตัญญู (10 คะแนน)', '7) มีความวิริยะอุตสาหะ (10 คะแนน)'].map((item, index) => (
                            <tr key={index}>
                                <td style={{paddingLeft:"32px"}}>{item}</td>
                                <td><input type="number" min="0" max={parseInt(item.match(/\d+/)[0])} /></td>
                                <td><input type="number" min="0" max={parseInt(item.match(/\d+/)[0])} /></td>
                                <td><input type="text" /></td>
                            </tr>
                        ))}
                        <tr>
                            <td colSpan="4"><b>3.4 ผลการดำเนินงานขององค์กรปกครองส่วนท้องถิ่น บุคลากรดีเป็นที่ยอมรับ (30 คะแนน)</b></td>
                        </tr>
                        {['1) สมาชิกองค์กรปกครองส่วนท้องถิ่นมีส่วนร่วมในการใช้ฐานทรัพยากรท้องถิ่นเป็นแหล่งเรียนรู้ (10 คะแนน)', '2) การเยี่ยมชมงานฐานทรัพยากรท้องถิ่นจากหน่วยงานอื่นๆ (5 คะแนน)', '3) การไปให้ความรู้เกี่ยวกับงานฐานทรัพยากรท้องถิ่น (15 คะแนน)'].map((item, index) => (
                            <tr key={index}>
                                <td style={{paddingLeft:"32px"}}>{item}</td>
                                <td><input type="number" min="0" max={parseInt(item.match(/\d+/)[0])} /></td>
                                <td><input type="number" min="0" max={parseInt(item.match(/\d+/)[0])} /></td>
                                <td><input type="text" /></td>
                            </tr>
                        ))}
                        <tr>
                            <td style={{ textAlign: 'center' }}><b>รวมคะแนนด้านที่ 3  ผลการดำเนินงาน</b></td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div className='lmf-footer'>
                <div class="button">
                    <div class="button-back">
                        <button >ย้อนกลับ</button>
                    </div>
                    <div class="button-next">
                        <button >ถัดไป</button>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default LocalResult;
