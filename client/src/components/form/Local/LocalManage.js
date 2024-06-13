import React from 'react';
import Navbar from '../../Navbar';
import './localform.css'


function LocalManage() {


    return (
        <div className="lmf-container">
            <div className="lmf-header">
                <Navbar />
            </div>
            <div className='lmf-body'>
                <div className='lmf-text'>
                    <h2>ด้านที่ 1 การบริหารและการจัดการ</h2>
                </div>
                <table id="lmf-table">
                    <thead>
                        <tr>
                            <th>รายการประเมิน<p>(คะแนนเต็ม 200 คะแนน)</p></th>
                            <th>องค์กรปกครองส่วนท้องถิ่น</th>
                            <th>แนบเอกสาร</th>
                            <th>กรรมการ</th>
                            <th>ผลประเมิน</th>
                            <th>ข้อเสนอแนะ</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td colspan="6"><b>1.1 องค์กรปกครองส่วนท้องถิ่น ชุมชน และสถานศึกษา มีส่วนร่วมในการจัดทำฐานทรัพยากรท้องถิ่น (30 คะแนน)</b></td>

                        </tr>
                        <tr>
                            <td class="tabb" colspan="6">1) รายงานการประชุม (20 คะแนน)</td>

                        </tr>
                        <tr>
                            <td class="tabb">- วาระการประชุมเรื่องเกี่ยวกับการจัดทำฐานทรัพยากรท้องถิ่น (10 คะแนน)</td>
                            <td><input type="number" class="score-input" min="0" max="10" /></td>
                            <td class="insert-file"><input type="file" class="file-input" /></td>
                            <td><input type="number" class="referee-score-input" min="0" max="10" /></td>
                            <td><p><span class="passed">ผ่าน</span></p></td>
                            <td><input type="text" class="comment" /></td>
                        </tr>
                        <tr>
                            <td class="tabb">- รายชื่อ ลายมือชื่อของสมาชิกองค์กรปกครองส่วนท้องถิ่น กำนัน ผู้ใหญ่บ้าน ชุมชน ผู้รู้ในท้องถิ่น ผู้บริหารสถานศึกษา และผู้ที่เกี่ยวข้องเกี่ยวกับการจัดทำฐานทรัพยากรท้องถิ่น (10 คะแนน)</td>
                            <td><input type="number" class="score-input" min="0" max="10" /></td>
                            <td class="insert-file"><input type="file" class="file-input" /></td>
                            <td><input type="number" class="referee-score-input" min="0" max="10" /></td>
                            <td><p><span class="not-passed">ไม่ผ่าน</span></p></td>
                            <td><input type="text" class="comment" /></td>

                        </tr>
                        <tr>
                            <td class="tabb" colspan="6">2) หลักฐานที่แสดงถึงการมีส่วนร่วม (10 คะแนน)</td>

                        </tr>
                        <tr>
                            <td class="tabb">- บันทึกการประชุม (5 คะแนน)</td>
                            <td><input type="number" class="score-input" min="0" max="5" /></td>
                            <td class="insert-file"><input type="file" class="file-input" /></td>
                            <td><input type="number" class="referee-score-input" min="0" max="5" /></td>
                            <td><p><span class="not-passed">ไม่ผ่าน</span></p></td>
                            <td><input type="text" class="comment" /></td>
                        </tr>
                        <tr>
                            <td class="tabb">- ภาพถ่าย (5 คะแนน)</td>
                            <td><input type="number" class="score-input" min="0" max="5" /></td>
                            <td class="insert-file"><input type="file" class="file-input" /></td>
                            <td><input type="number" class="referee-score-input" min="0" max="5" /></td>
                            <td><p><span class="not-passed">ไม่ผ่าน</span></p></td>
                            <td><input type="text" class="comment" /></td>
                        </tr>
                        <tr>
                            <td colspan="6"><b>1.2 แต่งตั้งคณะกรรมการดำเนินงานการจัดทำฐานทรัพยากรท้องถิ่น (30 คะแนน)</b></td>

                        </tr>
                        <tr>
                            <td class="tabb">1) คำสั่งแต่งตั้งคณะกรรมการดำเนินงานฐานทรัพยากรท้องถิ่นคำสั่ง 3 ด้าน (15 คะแนน)</td>
                            <td><input type="number" class="score-input" min="0" max="15" /></td>
                            <td class="insert-file"><input type="file" class="file-input" /></td>
                            <td><input type="number" class="referee-score-input" min="0" max="15" /></td>
                            <td><p><span class="not-passed">ไม่ผ่าน</span></p></td>
                            <td><input type="text" class="comment" /></td>
                        </tr>
                        <tr>
                            <td class="tabb">2) คณะอนุกรรมการศูนย์อนุรักษ์และพัฒนาทรัพยากรท้องถิ่น (15 คะแนน)
                                <p class="tabb">1.คณะทำงานปกปักทรัพยากรท้องถิ่น</p>
                                <p class="tabb">2.คณะทำงานสำรวจเก็บรวบรวมทรัพยากรท้องถิ่น</p>
                                <p class="tabb">3.คณะทำงานปลูกรักษาทรัพยากรท้องถิ่น</p>
                                <p class="tabb">4.คณะทำงานอนุรักษ์และใช้ประโยชน์ทรัพยากรท้องถิ่น</p>
                                <p class="tabb">5.คณะทำงานศูนย์ข้อมูลทรัพยากรท้องถิ่น</p>
                                <p class="tabb">6.คณะทำงานสนับสนุนในการอนุรักษ์และจัดทำฐานทรัพยากรท้องถิ่น</p></td>
                            <td><input type="number" class="score-input" min="0" max="15" /></td>
                            <td class="insert-file"><input type="file" class="file-input" /></td>
                            <td><input type="number" class="referee-score-input" min="0" max="15" /></td>
                            <td><p><span class="not-passed">ไม่ผ่าน</span></p></td>
                            <td><input type="text" class="comment" /></td>
                        </tr>
                        <tr>
                            <td colspan="6"><b>1.3 วางแผนการบริหารและแผนการดำเนินงานการจัดทำฐานทรัพยากรท้องถิ่น (40 คะแนน)</b></td>

                        </tr>
                        <tr>
                            <td class="tabb">1) แผนการดำเนินงานด้านการบริหาร โดยเขียนแผนการจัดทำฐานทรัพยากรท้องถิ่น รวมกับแผนพัฒนา แผนงานประจำปีขององค์กรปกครองส่วนท้องถิ่นแสดงผังโครงสร้างการบริหาร รายละเอียดงาน
                                ผู้รับผิดชอบ ปริมาณงาน งบประมาณ ระยะเวลา (25 คะแนน)</td>
                            <td><input type="number" class="score-input" min="0" max="25" /></td>
                            <td class="insert-file"><input type="file" class="file-input" /></td>
                            <td><input type="number" class="referee-score-input" min="0" max="25" /></td>
                            <td><p><span class="not-passed">ไม่ผ่าน</span></p></td>
                            <td><input type="text" class="comment" /></td>
                        </tr>
                        <tr>
                            <td class="tabb">2) การจัดทำปฏิทินการปฏิบัติงาน (5 คะแนน)</td>
                            <td><input type="number" class="score-input" min="0" max="5" /></td>
                            <td class="insert-file"><input type="file" class="file-input" /></td>
                            <td><input type="number" class="score-input" min="0" max="5" /></td>
                            <td><p><span class="not-passed">ไม่ผ่าน</span></p></td>
                            <td><input type="text" class="comment" /></td>
                        </tr>
                        <tr>
                            <td class="tabb">3) แผนการดำเนินงานการจัดทำฐานทรัพยากรท้องถิ่น โดยเขียนแผนบูรณาการงานฐานทรัพยากรท้องถิ่น แสดงให้เห็นวิธีการดำเนินงาน (10 คะแนน)</td>
                            <td><input type="number" class="score-input" min="0" max="10" /></td>
                            <td class="insert-file"><input type="file" class="file-input" /></td>
                            <td><input type="number" class="referee-score-input" min="0" max="10" /></td>
                            <td><p><span class="not-passed">ไม่ผ่าน</span></p></td>
                            <td><input type="text" class="comment" /></td>
                        </tr>
                        <tr>
                            <td colspan="6"><b>1.4 ดำเนินงานตามแผน (20 คะแนน)</b>
                                <p class="tab">การประสานงานของคณะกรรมการดำเนินงาน คณะอนุกรรมการ
                                    ศูนย์อนุรักษ์พัฒนาทรัพยากรท้องถิ่นตำบลกับหน่วยงานต่างๆ</p>
                            </td>
                        </tr>
                        <tr>
                            <td class="tabb">1) เอกสารสรุปค่าใช้จ่ายในการดำเนินการจัดทำฐานทรัพยากรท้องถิ่น ลงนามชื่อผู้บริหาร หัวหน้างาน (10 คะแนน)
                            </td>
                            <td><input type="number" class="score-input" min="0" max="10" /></td>
                            <td class="insert-file"><input type="file" class="file-input" /></td>
                            <td><input type="number" class="referee-score-input" min="0" max="10" /></td>
                            <td><p><span class="not-passed">ไม่ผ่าน</span></p></td>
                            <td><input type="text" class="comment" /></td>
                        </tr>
                        <tr>
                            <td class="tabb">2) หนังสือเชิญประชุม (5 คะแนน)</td>
                            <td><input type="number" class="score-input" min="0" max="5" /></td>
                            <td class="insert-file"><input type="file" class="file-input" /></td>
                            <td><input type="number" class="referee-score-input" min="0" max="5" /></td>
                            <td><p><span class="not-passed">ไม่ผ่าน</span></p></td>
                            <td><input type="text" class="comment" /></td>
                        </tr>
                        <tr>
                            <td class="tabb">3) หนังสือขอบคุณผู้เข้าร่วมประชุม (5 คะแนน)</td>
                            <td><input type="number" class="score-input" min="0" max="5" /></td>
                            <td class="insert-file"><input type="file" class="file-input" /></td>
                            <td><input type="number" class="referee-score-input" min="0" max="5" /></td>
                            <td><p><span class="not-passed">ไม่ผ่าน</span></p></td>
                            <td><input type="text" class="comment" /></td>
                        </tr>
                        <tr>
                            <td colspan="6"><b>1.5 สรุปและประเมินผลการดำเนินงาน (20 คะแนน) </b></td>
                        </tr>
                        <tr>
                            <td class="tabb">1) ผลการดำเนินงาน 6 งานฐานทรัพยากรท้องถิ่น (20 คะแนน)</td>
                            <td><input type="number" class="score-input" min="0" max="20" /></td>
                            <td class="insert-file"><input type="file" class="file-input" /></td>
                            <td><input type="number" class="referee-score-input" min="0" max="20" /></td>
                            <td><p><span class="not-passed">ไม่ผ่าน</span></p></td>
                            <td><input type="text" class="comment" /></td>
                        </tr>
                        <tr>
                            <td colspan="6"><b>1.6 วิเคราะห์ผลและปรับปรุงพัฒนางาน (20 คะแนน)</b>  </td>
                        </tr>
                        <tr>
                            <td class="tabb">1) วิเคราะห์ผล และหาข้อสรุป (10 คะแนน)</td>
                            <td><input type="number" class="score-input" min="0" max="10" /></td>
                            <td class="insert-file"><input type="file" class="file-input" /></td>
                            <td><input type="number" class="referee-score-input" min="0" max="10" /></td>
                            <td><p><span class="not-passed">ไม่ผ่าน</span></p></td>
                            <td><input type="text" class="comment" /></td>
                        </tr>
                        <tr>
                            <td class="tabb">2) วางแผน ปรับปรุง และพัฒนาการดำเนินงานในปีต่อไป (10 คะแนน)</td>
                            <td><input type="number" class="score-input" min="0" max="10" /></td>
                            <td class="insert-file"><input type="file" class="file-input" /></td>
                            <td><input type="number" class="referee-score-input" min="0" max="10" /></td>
                            <td><p><span class="not-passed">ไม่ผ่าน</span></p></td>
                            <td><input type="text" class="comment" /></td>
                        </tr>
                        <tr>
                            <td><b>1.7 รายงานผลการดำเนินงานฐานทรัพยากรท้องถิ่น ประจำปีงบประมาณให้ อพ.สธ. อย่างน้อยปีละ 1 ครั้ง (40 คะแนน)</b>
                                <p class="tab">รายงานผลการดำเนินงานฐานทรัพยากรท้องถิ่นโดยแสดงหลักฐานตั้งแต่ข้อ 1.1 – 1.6</p></td>
                            <td><input type="number" class="score-input" min="0" max="40" /></td>
                            <td class="insert-file"><input type="file" class="file-input" /></td>
                            <td><input type="number" class="referee-score-input" min="0" max="40" /></td>
                            <td><p><span class="not-passed">ไม่ผ่าน</span></p></td>
                            <td><input type="text" class="comment" /></td>
                        </tr>
                        <tr>
                            <td><b>รวมคะแนนที่ได้ ด้านที่ 1 การบริหารและการจัดการ</b></td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div className='lmf-footer'>
                <button >ถัดไป</button>
            </div>

        </div>
    );
}

export default LocalManage;
