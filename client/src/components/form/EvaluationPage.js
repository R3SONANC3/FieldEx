import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from '../Navbar'

const EvaluationPage = () => {

  const navigate = useNavigate();

  const goToNextPage = () => {
    navigate("/generalform");
  };

  return (
    <div className="container">
      <Navbar />
      <div className="header">
        <h2 className="text-center">
          การประเมินสถานศึกษา
        </h2>
        <h2 className="text-center">
          เพื่อรับป้ายสนองพระราชดำริในงานสวนพฤกษศาสตร์โรงเรียน
        </h2>
        <div className="text-center">
          <h3 >
            1.เกณฑ์การประเมิน แบ่งเป็น 4 ด้าน (ด้านที่ 1 - 3 คะแนน 1,000 คะแนน
            ด้านที่ 4 คะแนน 100 คะแนน)
          </h3>
          <dl>
            <dd>
              ด้านที่ 1 การบริหารและการจัดการ คะแนน 250 คะแนน ต้องได้ไม่ต่ำกว่า
              150 คะแนน
            </dd>
            <dd>
              ด้านที่ 2 การดำเนินงาน คะแนน 500 คะแนน ต้องได้ไม่ต่ำกว่า 350 คะแนน
            </dd>
            <dd>
              ด้านที่ 3 ผลการดำเนินงาน คะแนน 250 คะแนน ต้องได้ไม่ต่ำกว่า 150 คะแนน
            </dd>
            <h4>รวมคะแนนเฉลี่ยไม่ต่ำกว่า 650 คะแนน</h4>
            <dd>
              ด้านที่ 4 ความถูกต้องทางวิชาการ พฤกษศาสตร์ คะแนนเต็ม 100 คะแนน
              ต้องได้ไม่ต่ำกว่า 80 คะแนน
            </dd>
            <dd>เกณฑ์การประเมินแบ่งเป็น 3 หัวข้อ</dd>
            <dd>1) ตัวอย่างพรรณไม้และการศึกษาพรรณไม้ (30 คะแนน)</dd>
            <dd>2) ทะเบียนพรรณไม้และภาพถ่ายพรรณไม้ (45 คะแนน)</dd>
            <dd>3) ป้ายชื่อพรรณไม้สมบูรณ์ (25 คะแนน)</dd>
            <p>ผลการประเมินด้านที่ 4 ผ่านเกณฑ์จึงประเมินด้านการบริหารและการจัดการ ด้านการดำเนินงานด้านผลการดำเนินงาน (ผลการประเมินด้านที่ 4 ไม่นำคะแนนไปรวมกับการประเมิน 3 ด้าน)
            </p>
          </dl>

          <h3>2.ผู้ร่วมปฏิบัติ</h3> <span> สถานศึกษาต้องมีผู้เรียนร่วมปฏิบัติการเรียนรู้ 5 องค์ประกอบงานสวนพฤกษศาสตร์โรงเรียนและพืชศึกษาไม่ต่ำกว่า 80 เปอร์เซ็นต์ ของผู้เรียนทั้งหมด </span>
          <h3>3.การปฏิบัติของบุคลากรในสถานศึกษา</h3>
          <dl>
            <dd>1) องค์ประกอบงานสวนพฤกษศาสตร์โรงเรียน ครบ เห็นได้ชัดเจน</dd>
            <dd>2) ผู้บริหาร - รู้เป้าหมาย ...“จิตสำนึก”... แล้วทำรู้หน้าที่...“สนับสนุนครูผู้ปฏิบัติ”...แล้วทำ </dd>
            <dd>3) ครูผู้ปฏิบัติ - ใช้รูปธรรมเป็นสื่อนำนามธรรม ไปสู่นามธรรมในเด็ก </dd>
            <dd>4) เด็ก - “คลุกคลี” กับพืชพรรณจนเกิดความรู้เบื้องต้น นำผลที่ได้แสดงพร้อมทั้งวิธีการอันเป็นที่มาแห่งผลนั้น</dd>
          </dl>

          <h3>4.วิธีการประเมิน</h3>
          <dl>
            <dd>1)นำเสนอตามรายการประเมิน พิจารณาหลักฐานเอกสารที่ปรากฏย้อนหลัง 2 ปี</dd>
            <dd>2)สอบถามบุคลากรของสถานศึกษา ผู้บริหารสถานศึกษา ครู-อาจารย์ ผู้เรียนและผู้ที่เกี่ยวข้องกับการดำเนินงานสวนพฤกษศาสตร์โรงเรียน</dd>
          </dl>
          <button onClick={goToNextPage}>ไปหน้าถัดไป</button>
        </div>
      </div>
    </div>
  );
};

export default EvaluationPage;
