import React from 'react'
import Navbar from '../../Navbar'
import './localform.css'

function Conscript() {
    return (
        <div className='co-container'>
            <div className='co-header'>
                <Navbar />
            </div>
            <div className='box'>
                <table id='conscript-table'className='conscript-table'>
                    <thead>
                        <tr>
                            <td className='co-body-head'>
                                <h2>การประเมินองค์กรปกครองส่วนท้องถิ่น</h2>
                                <h3>เพื่อรับป้ายสนองพระราชดำริในงานฐานทรัพยากรท้องถิ่น</h3>
                                <div className="co-content1">
                                    <p><b>1.เกณฑ์การประเมิน</b> แบ่งเป็น 3 ด้าน (ด้านที่ 1 - 3 คะแนน 1,000 คะแนน)</p>
                                    <p>
                                        <span class="inline tabbbb" >ด้านที่ 1 การบริหารและการจัดการ</span>
                                        <span class="inline tabb" >คะแนน 200 คะแนน</span>
                                        <span class="inline tab">ต้องได้ไม่ต่ำกว่า 150 คะแนน</span>
                                    </p>
                                    <p>
                                        <span class="inline tabbbb" >ด้านที่ 2 การดำเนินงาน</span>
                                        <span class="inline tab6" >คะแนน 600 คะแนน</span>
                                        <span class="inline tab">ต้องได้ไม่ต่ำกว่า 350 คะแนน</span>
                                    </p>
                                    <p>
                                        <span class="inline tabbbb">ด้านที่ 3 ผลการดำเนินงาน</span>
                                        <span class="inline tab5" >คะแนน 200 คะแนน</span>
                                        <span class="inline tab">ต้องได้ไม่ต่ำกว่า 150 คะแนน</span>
                                    </p>
                                    <p class="inline-right"><b>รวมคะแนนเฉลี่ยไม่ต่ำกว่า 650 คะแนน</b></p>
                                </div>
                                <div className='co-content2'>
                                    <p><b>2.ผู้ร่วมปฏิบัติ</b> องค์กรปกครองส่วนท้องถิ่น ชุมชน สถานศึกษา มีส่วนร่วมในการจัดทำฐานทรัพยากรท้องถิ่น</p>
                                </div>
                                <div className='co-content3'>
                                <p><b>3.การปฏิบัติของบุคลากรในองค์กรปกครองส่วนท้องถิ่น</b></p>
                                <p>
                                    <span class="inline tabbbb">1) องค์กรปกครองส่วนท้องถิ่น</span>
                                </p>    
                                <p>
                                    <span class="inline2" >- สนับสนุนงบประมาณ การดำเนินงานอย่างต่อเนื่อง</span>
                                </p>
                                <p>
                                    <span class="inline2">- ส่งเสริมการมีส่วนร่วมในการพัฒนาท้องถิ่น</span>
                                </p>
                                <p>
                                    <span class="inline2">- สืบสาน อนุรักษ์ และพัฒนาความรู้ ภูมิปัญญาจากการเรียนรู้ฐานทรัพยากรท้องถิ่น</span>
                                </p>
                                <p>
                                    <span class="inline2" >- มีจิตสำนึกในการอนุรักษ์และพัฒนา</span>
                                </p>
                                <p>
                                    <span class="inline tabbbb">2) ผู้บริหาร</span>
                                </p>    
                                <p>
                                    <span class="inline2">- รู้เป้าหมาย ...“จิตสำนึก”... แล้วทำ</span>
                                </p>
                                <p>
                                    <span class="inline2">- รู้หน้าที่...“สนับสนุนผู้ปฏิบัติ”...แล้วทำ</span>
                                </p>
                                <p>
                                    <span class="inline2">- ปกครองโดยธรรม</span>
                                </p>
                                <p>
                                    <span class="inline tabbbb">3) ผู้ปฏิบัติ</span>
                                <p>
                                    <span class="inline2">- ซื่อตรง มุ่งมั่น พัฒนา สามัคคี มีคุณธรรม</span>
                                </p>
                                <p>
                                    <span class="inline2">- อนุรักษ์และพัฒนาบนฐานปรัชญาของเศรษฐกิจพอเพียง</span>
                                </p>
                                </p>
                                </div>
                                <div className='co-content4'>
                                    <p><b>4.วิธีการประเมิน</b></p>
                                    <p>
                                        <span class="inline tabbbb">1) นำเสนอตามรายการประเมิน พิจารณาหลักฐานเอกสารที่ปรากฏย้อนหลัง 2 ปี</span>
                                    </p>
                                    <p>
                                        <span class="inline tabbbb">2) สอบถามบุคลากรขององค์กรปกครองส่วนท้องถิ่น ผู้บริหารองค์กรปกครองส่วนท้องถิ่น เจ้าหน้าที่</span>
                                    </p>
                                    <p>
                                        <span class="inline tabbbb">ผู้นำชุมชน ผู้รู้ในท้องถิ่น ผู้บริหารสถานศึกษา และผู้ที่เกี่ยวข้องกับการดำเนินงานฐานทรัพยากรท้องถิ่น</span>
                                    </p>
                                </div>
                            </td>
                        </tr>
                    </thead>
                </table>
            </div>
        <div className='co-footer'>
            <button type='submit'>Next Page</button>
        </div>
    </div>
        
    )
}

export default Conscript