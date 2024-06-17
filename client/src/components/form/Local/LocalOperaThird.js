import React from 'react'
import Navbar from '../../Navbar'

function LocalOperaThird() {
    return (
        <div className='lmf-container'>
            <div className='lmf-header'>
                <Navbar />
            </div>
            <div className='lmf-body'>
                <div className='lmf-text'><h1>ด้านที่ 2 การดำเนินงาน : <small>งานที่ 3 งานปลูกรักษาทรัพยากรท้องถิ่น</small></h1></div>
                <table id="lmf-table">
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
                            <td colspan="6"><b>3.การดำเนินงานปลูกรักษาทรัพยากรท้องถิ่น (100 คะแนน)</b></td>
                        </tr>
                        <tr>
                            <td class="tabb">3.1 การจัดหาและรวบรวมทรัพยากรท้องถิ่น (30 คะแนน)</td>
                            <td><input type="number" class="score-input" min="0" max="30" /></td>
                            <td><input type="number" class="referee-score-input" min="0" max="30" /></td>
                            <td><input type="text" class="comment" /></td>
                        </tr>
                        <tr>
                            <td class="tabb">3.2 การปลูก และรักษาทรัพยากรท้องถิ่น (30 คะแนน)</td>
                            <td><input type="number" class="score-input" min="0" max="30" /></td>
                            <td><input type="number" class="referee-score-input" min="0" max="30" /></td>
                            <td><input type="text" class="comment" /></td>
                        </tr>
                        <tr>
                            <td class="tabb">3.3 การติดตามการเจริญเติบโตและการเปลี่ยนแปลงของทรัพยากรท้องถิ่น เช่น การติดตามการเจริญเติบโต แบบบันทึกการเปลี่ยนแปลง ฯลฯ (40 คะแนน)</td>
                            <td><input type="number" class="score-input" min="0" max="40" /></td>
                            <td><input type="number" class="referee-score-input" min="0" max="40" /></td>
                            <td><input type="text" class="comment" /></td>
                        </tr>
                        <tr>
                            <td><b>รวมคะแนนที่ได้ งานที่ 3 งานปลูกรักษาทรัพยากรท้องถิ่น</b></td>
                        </tr>
                    </tbody>
                </table>
                <div className='lmf-text'>        <h1>ด้านที่ 2 การดำเนินงาน : <small>งานที่ 4 งานอนุรักษ์และใช้ประโยชน์ทรัพยากรท้องถิ่น</small></h1>
                </div>
                <table id="lmf-table">
                    <thead>
                        <tr>
                            <th>รายการประเมิน<p>(คะแนนเต็ม 100 คะแนน)</p></th>
                            <th>องค์กรปกครองส่วนท้องถิ่น</th>             <th>กรรมการ</th>
                            <th>ข้อเสนอแนะ</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td colspan="6"><b>4.การดำเนินงานอนุรักษ์และใช้ประโยชน์ทรัพยากรท้องถิ่น (100 คะแนน)</b></td>
                        </tr>
                        <tr>
                            <td class="tabb">4.1 การฟื้นฟู บำรุงรักษา ขยายพันธุ์เพิ่มขึ้นและแจกจ่ายให้กับชุมชน ตำบล (60 คะแนน)</td>
                            <td><input type="number" class="score-input" min="0" max="60" /></td>
                            <td><input type="number" class="referee-score-input" min="0" max="60" /></td>
                            <td><input type="text" class="comment" /></td>
                        </tr>
                        <tr>
                            <td class="tabb">4.2 การใช้ประโยชน์ทรัพยากรท้องถิ่นอย่างยั่งยืน เช่น การจัดการท่องเที่ยวเชิงนิเวศ การพัฒนาผลิตภัณฑ์จากทรัพยากรในท้องถิ่น แหล่งเรียนรู้ ฯลฯ  (40 คะแนน)</td>
                            <td><input type="number" class="score-input" min="0" max="40" /></td>
                            <td><input type="number" class="referee-score-input" min="0" max="40" /></td>
                            <td><input type="text" class="comment" /></td>
                        </tr>
                        <tr>
                            <td ><b>รวมคะแนนที่ได้ งานที่ 4 งานอนุรักษ์และใช้ประโยชน์ทรัพยากรท้องถิ่น</b></td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div className='lmf-footer'>

            </div>
        </div>
    )
}

export default LocalOperaThird