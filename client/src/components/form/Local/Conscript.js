import React from 'react';
import Navbar from '../../Navbar';
import './localform.css';
import { useNavigate, useLocation } from 'react-router-dom';

function Conscript() {
    const location = useLocation();
    const navigate = useNavigate();
    const emailUser = location.state?.emailUser;

    const handleNextPage = () => {
        navigate('/localmanage', {state:{emailUser}});
        console.log(emailUser);
    }

    return (
        <div className='co-container'>
            <div className='co-header'>
                <Navbar />
            </div>
            <div className='co-body'>
                <div className='co-body-head'>
                    <h2>การประเมินองค์กรปกครองส่วนท้องถิ่น</h2>
                    <h3>เพื่อรับป้ายสนองพระราชดำริในงานฐานทรัพยากรท้องถิ่น</h3>
                </div>
                <div className='co-content1'>
                    <p><b>1.เกณฑ์การประเมิน</b> แบ่งเป็น 3 ด้าน (ด้านที่ 1 - 3 คะแนน 1,000 คะแนน)</p>
                    <p>
                        <span>ด้านที่ 1 การบริหารและการจัดการ</span>
                        <span>คะแนน 200 คะแนน</span>
                        <span>ต้องได้ไม่ต่ำกว่า 150 คะแนน</span>
                    </p>
                    <p>
                        <span>ด้านที่ 2 การดำเนินงาน</span>
                        <span>คะแนน 600 คะแนน</span>
                        <span>ต้องได้ไม่ต่ำกว่า 350 คะแนน</span>
                    </p>
                    <p>
                        <span>ด้านที่ 3 ผลการดำเนินงาน</span>
                        <span>คะแนน 200 คะแนน</span>
                        <span>ต้องได้ไม่ต่ำกว่า 150 คะแนน</span>
                    </p>
                    <p><b>รวมคะแนนเฉลี่ยไม่ต่ำกว่า 650 คะแนน</b></p>
                </div>
                <div className="co-content2">
                    <p><b>2.ผู้ร่วมปฏิบัติ</b> องค์กรปกครองส่วนท้องถิ่น ชุมชน สถานศึกษา มีส่วนร่วมในการจัดทำฐานทรัพยากรท้องถิ่น</p>
                </div>
                <div className="co-content3">
                    <p><b>3.การปฏิบัติของบุคลากรในองค์กรปกครองส่วนท้องถิ่น</b></p>
                    <p>1) องค์กรปกครองส่วนท้องถิ่น</p>
                    <ul>
                        <li>สนับสนุนงบประมาณ การดำเนินงานอย่างต่อเนื่อง</li>
                        <li>ส่งเสริมการมีส่วนร่วมในการพัฒนาท้องถิ่น</li>
                        <li>สืบสาน อนุรักษ์ และพัฒนาความรู้ ภูมิปัญญาจากการเรียนรู้ฐานทรัพยากรท้องถิ่น</li>
                        <li>มีจิตสำนึกในการอนุรักษ์และพัฒนา</li>
                    </ul>
                    <p>2) ผู้บริหาร</p>
                    <ul>
                        <li>รู้เป้าหมาย ...“จิตสำนึก”... แล้วทำ</li>
                        <li>รู้หน้าที่...“สนับสนุนผู้ปฏิบัติ”...แล้วทำ</li>
                        <li>ปกครองโดยธรรม</li>
                    </ul>
                    <p>3) ผู้ปฏิบัติ</p>
                    <ul>
                        <li>ซื่อตรง มุ่งมั่น พัฒนา สามัคคี มีคุณธรรม</li>
                        <li>อนุรักษ์และพัฒนาบนฐานปรัชญาของเศรษฐกิจพอเพียง</li>
                    </ul>
                </div>
                <div className="co-content4">
                    <p><b>4.วิธีการประเมิน</b></p>
                    <ul>
                        <li>นำเสนอตามรายการประเมิน พิจารณาหลักฐานเอกสารที่ปรากฏย้อนหลัง 2 ปี</li>
                        <li>สอบถามบุคลากรขององค์กรปกครองส่วนท้องถิ่น ผู้บริหารองค์กรปกครองส่วนท้องถิ่น เจ้าหน้าที่</li>
                        <li>ผู้นำชุมชน ผู้รู้ในท้องถิ่น ผู้บริหารสถานศึกษา และผู้ที่เกี่ยวข้องกับการดำเนินงานฐานทรัพยากรท้องถิ่น</li>
                    </ul>
                </div>
            </div>
            <div className='co-footer'>
                <button type='submit' onClick={handleNextPage}>Next Page</button>
            </div>
        </div>
    )
}

export default Conscript;
