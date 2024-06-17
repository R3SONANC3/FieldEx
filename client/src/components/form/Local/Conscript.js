import React, { useState } from 'react';
import Navbar from '../../Navbar';
import Swal from 'sweetalert2';
import './localform.css';
import { useNavigate } from 'react-router-dom';

function Conscript() {
    const [isChecked, setIsChecked] = useState(false);
    const navigate = useNavigate();

    const handleCheckboxChange = (e) => {
        setIsChecked(e.target.checked);
    };

    const handleSubmit = () => {
        if (!isChecked) {
            Swal.fire({
                icon: 'error',
                title: 'ข้อผิดพลาด',
                text: 'กรุณาเลือก checkbox ก่อนดำเนินการต่อ',
            });
        } else {
            navigate('/localmanage');
        }
    };

    return (
        <div className='co-container'>
            <div className='co-header'>
                <Navbar />
            </div>
            <div className='box'>
                <table id='conscript-table' className='conscript-table'>
                    <thead>
                        <tr>
                            <td className='co-body-head'>
                                <h2>การประเมินองค์กรปกครองส่วนท้องถิ่น</h2>
                                <h3>เพื่อรับป้ายสนองพระราชดำริในงานฐานทรัพยากรท้องถิ่น</h3>
                                <div className="co-content1">
                                    <p><b>1.เกณฑ์การประเมิน</b> แบ่งเป็น 3 ด้าน (ด้านที่ 1 - 3 คะแนน 1,000 คะแนน)</p>
                                    <p>
                                        <span className="inline tabbbb">ด้านที่ 1 การบริหารและการจัดการ</span>
                                        <span className="inline tabb">คะแนน 200 คะแนน</span>
                                        <span className="inline tab">ต้องได้ไม่ต่ำกว่า 150 คะแนน</span>
                                    </p>
                                    <p>
                                        <span className="inline tabbbb">ด้านที่ 2 การดำเนินงาน</span>
                                        <span className="inline tab6">คะแนน 600 คะแนน</span>
                                        <span className="inline tab">ต้องได้ไม่ต่ำกว่า 350 คะแนน</span>
                                    </p>
                                    <p>
                                        <span className="inline tabbbb">ด้านที่ 3 ผลการดำเนินงาน</span>
                                        <span className="inline tab5">คะแนน 200 คะแนน</span>
                                        <span className="inline tab">ต้องได้ไม่ต่ำกว่า 150 คะแนน</span>
                                    </p>
                                    <p className="inline-right"><b>รวมคะแนนเฉลี่ยไม่ต่ำกว่า 650 คะแนน</b></p>
                                </div>
                                <div className='co-content2'>
                                    <p><b>2.ผู้ร่วมปฏิบัติ</b> องค์กรปกครองส่วนท้องถิ่น ชุมชน สถานศึกษา มีส่วนร่วมในการจัดทำฐานทรัพยากรท้องถิ่น</p>
                                </div>
                                <div className='co-content3'>
                                    <p><b>3.การปฏิบัติของบุคลากรในองค์กรปกครองส่วนท้องถิ่น</b></p>
                                    <div>
                                        <span className="inline tabbbb">1) องค์กรปกครองส่วนท้องถิ่น</span>
                                    </div>
                                    <div>
                                        <span className="inline2">- สนับสนุนงบประมาณ การดำเนินงานอย่างต่อเนื่อง</span>
                                    </div>
                                    <div>
                                        <span className="inline2">- ส่งเสริมการมีส่วนร่วมในการพัฒนาท้องถิ่น</span>
                                    </div>
                                    <div>
                                        <span className="inline2">- สืบสาน อนุรักษ์ และพัฒนาความรู้ ภูมิปัญญาจากการเรียนรู้ฐานทรัพยากรท้องถิ่น</span>
                                    </div>
                                    <div>
                                        <span className="inline2">- มีจิตสำนึกในการอนุรักษ์และพัฒนา</span>
                                    </div>
                                    <div>
                                        <span className="inline tabbbb">2) ผู้บริหาร</span>
                                    </div>
                                    <div>
                                        <span className="inline2">- รู้เป้าหมาย ...“จิตสำนึก”... แล้วทำ</span>
                                    </div>
                                    <div>
                                        <span className="inline2">- รู้หน้าที่...“สนับสนุนผู้ปฏิบัติ”...แล้วทำ</span>
                                    </div>
                                    <div>
                                        <span className="inline2">- ปกครองโดยธรรม</span>
                                    </div>
                                    <div>
                                        <span className="inline tabbbb">3) ผู้ปฏิบัติ</span>
                                    </div>
                                    <div>
                                        <span className="inline2">- ซื่อตรง มุ่งมั่น พัฒนา สามัคคี มีคุณธรรม</span>
                                    </div>
                                    <div>
                                        <span className="inline2">- อนุรักษ์และพัฒนาบนฐานปรัชญาของเศรษฐกิจพอเพียง</span>
                                    </div>
                                </div>
                                <div className='co-content4'>
                                    <p><b>4.วิธีการประเมิน</b></p>
                                    <div>
                                        <span className="inline tabbbb">1) นำเสนอตามรายการประเมิน พิจารณาหลักฐานเอกสารที่ปรากฏย้อนหลัง 2 ปี</span>
                                    </div>
                                    <div>
                                        <span className="inline tabbbb">2) สอบถามบุคลากรขององค์กรปกครองส่วนท้องถิ่น ผู้บริหารองค์กรปกครองส่วนท้องถิ่น เจ้าหน้าที่</span>
                                    </div>
                                    <div>
                                        <span className="inline tabbbb">ผู้นำชุมชน ผู้รู้ในท้องถิ่น ผู้บริหารสถานศึกษา และผู้ที่เกี่ยวข้องกับการดำเนินงานฐานทรัพยากรท้องถิ่น</span>
                                    </div>
                                </div>
                            </td>
                        </tr>
                    </thead>
                </table>
            </div>
            <div className='co-footer'>
                <div className='checkbox'>
                    <input
                        type="checkbox"
                        name="acceptance"
                        checked={isChecked}
                        onChange={handleCheckboxChange}
                    /> ยอมรับวิธีการประเมิน
                </div>
                <button type='button' onClick={handleSubmit}>Next Page</button>
            </div>
        </div>
    );
}

export default Conscript;
