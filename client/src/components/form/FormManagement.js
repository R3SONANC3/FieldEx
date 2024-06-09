import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../Navbar";

const FormManagement = () => {
  
  return (
    <div className="container">
      <div className="header">
        <Navbar />
      </div>
      <div className="body">
      <h1 className="heading">ส่วนที่ 1 การบริหารและการจัดการ</h1>
      <table className="maintable">
          <thead>
            <tr>
              <th className="col1">รายการประเมิน (คะแนนเต็ม 250 คะแนน)</th>
              <th className="col2">สถานศึกษา</th>
              <th className="col3">แนบเอกสาร</th>
              <th className="col4">กรรมการ</th>
              <th className="col5">ข้อเสนอแนะ</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>1.1 สถานศึกษา และชุมชนมีส่วนร่วม ในงานสวนพฤกษศาสตร์โรงเรียน (30 คะแนน)</strong></td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
            </tr>
            <tr>
              <td>1) รายงานการประชุม (20 คะแนน)</td>
              <td><input type="number"/></td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
            </tr>
            <tr>
              <td>วาระการประชุมเรื่องเกี่ยวกับงานสวนพฤกษศาสตร์โรงเรียน (10 คะแนน)</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
            </tr>
            <tr>
              <td>รายชื่อ ลายมือชื่อ คณะกรรมการสถานศึกษา และ/หรือคณะกรรมการ สถานศึกษาขั้นพื้นฐาน และ/หรือกรรมการสภามหาวิทยาลัย หรือ คณะกรรมการอื่นใดที่เกี่ยวข้องกับงานสวนพฤกษศาสตร์โรงเรียน (10 คะแนน) </td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
            </tr>
            <tr>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
            </tr>
            <tr>
              <td><strong>2)หลักฐานที่แสดงถึงการมีส่วนร่วม   (10 คะแนน) </strong></td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
            </tr>
            <tr>
              <td>- บันทึกการประชุม (5 คะแนน)</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
            </tr>
            <tr>
              <td>- ภาพถ่าย  (5 คะแนน) </td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
            </tr>
            <tr>
              <td><strong>1.2 แต่งตั้งคณะกรรมการดำเนินงาน งานสวนพฤกษศาสตร์โรงเรียน (30 คะแนน)</strong> </td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
            </tr>
            <tr>
              <td>1) คำสั่งแต่งตั้งคณะกรรมการดำเนินงาน งานสวนพฤกษศาสตร์โรงเรียน  คำสั่ง 4 ด้าน (10 คะแนน)</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
            </tr>
            <tr>
              <td>2) คำสั่งแต่งตั้งคณะกรรมการดำเนินงาน 5 องค์ประกอบ (10 คะแนน)</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
            </tr>
            <tr>
              <td>3) คำสั่งแต่งตั้งคณะกรรมการดำเนินงาน พืชศึกษา การสำรวจและจัดทำฐานทรัพยากรท้องถิ่น สาระการเรียนรู้ ธรรมชาติแห่งชีวิต สรรพสิ่งล้วนพันเกี่ยว ประโยชน์แท้แก่มหาชน (10 คะแนน)</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
            </tr>
            <tr>
              <td><strong>1.3 วางแผนการบริหารและแผนการจัดการเรียนรู้ (50 คะแนน) </strong></td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FormManagement;
