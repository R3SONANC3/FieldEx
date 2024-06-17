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
                <div className='lmf-text'><h1>ด้านที่ 2 การดำเนินงาน : <small>งานที่ 4 งานอนุรักษ์และใช้ประโยชน์ทรัพยากรท้องถิ่น</small></h1>
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
                <div className='lmf-text'><h1>ด้านที่ 2 การดำเนินงาน : <small>งานที่ 5 งานศูนย์ข้อมูลทรัพยากรท้องถิ่น</small></h1>
                </div>
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
                            <td colspan="6"><b>5.การดำเนินงานศูนย์ข้อมูลทรัพยากรท้องถิ่น (100 คะแนน)</b></td>
                        </tr>
                        <tr>
                            <td class="tabb">5.1 การรวบรวมและการบันทึกข้อมูลทรัพยากรท้องถิ่น (ทรัพยากรกายภาพ  ทรัพยากรชีวภาพ ทรัพยากรวัฒนธรรมและภูมิปัญญา) (60 คะแนน)</td>
                            <td><input type="number" class="score-input" min="0" max="60" /></td>
                            <td><input type="number" class="referee-score-input" min="0" max="60" /></td>
                            <td><input type="text" class="comment" /></td>
                        </tr>
                        <tr>
                            <td class="tabb">5.2 ระบบการจัดเก็บและสืบค้นได้ (เอกสารและคอมพิวเตอร์) (40 คะแนน)</td>
                            <td><input type="number" class="score-input" min="0" max="40" /></td>
                            <td><input type="number" class="referee-score-input" min="0" max="40" /></td>
                            <td><input type="text" class="comment" /></td>
                        </tr>
                        <tr>
                            <td><b>รวมคะแนนที่ได้ งานที่ 5 งานศูนย์ข้อมูลทรัพยากรท้องถิ่น</b></td>
                        </tr>
                    </tbody>
                </table>
                <div className='lmf-text'><h1><span class="main-title">ด้านที่ 2 การดำเนินงาน :</span><small> งานที่ 6 งานสนับสนุนในการอนุรักษ์และจัดทำฐานทรัพยากรท้องถิ่น</small></h1>
                </div>
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
                            <td colspan="6"><b>6.การดำเนินงานสนับสนุนในการอนุรักษ์และจัดทำฐานทรัพยากรท้องถิ่น (100 คะแนน)</b></td>
                        </tr>
                        <tr>
                            <td class="tabb">6.1 การสนับสนุนการสร้างจิตสำนึกในการอนุรักษ์ทรัพยากรงานสวนพฤกษศาสตร์โรงเรียน (60 คะแนน)</td>
                            <td><input type="number" class="score-input" min="0" max="60" /></td>
                            <td><input type="number" class="referee-score-input" min="0" max="60" /></td>
                            <td><input type="text" class="comment" /></td>
                        </tr>
                        <tr>
                            <td class="tabb">6.2 การสนับสนุนหน่วยงานและผู้ที่เกี่ยวข้องกับงานฐานทรัพยากรท้องถิ่นเช่น งบประมาณ วัสดุอุปกรณ์ การอำนวยความสะดวกต่างๆและการจัดทำสื่อ การเผยแพร่งานฐานทรัพยากรท้องถิ่น ฯลฯ (40 คะแนน)</td>
                            <td><input type="number" class="score-input" min="0" max="40" /></td>
                            <td><input type="number" class="referee-score-input" min="0" max="40" /></td>
                            <td><input type="text" class="comment" /></td>
                        </tr>
                        <tr>
                            <td><b>รวมคะแนนที่ได้ งานที่ 6 งานสนับสนุนในการอนุรักษ์และจัดทำฐานทรัพยากรท้องถิ่น</b></td>
                        </tr>
                        <tr>
                            <td><b>รวมคะแนนด้านที่ 2  การดำเนินงาน</b></td>
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
    )
}

export default LocalOperaThird