import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../Navbar";

const FormManagement = () => {
  const [formData, setFormData] = useState({
    reportScore: '',
    meetingAgendaScore: '',
    committeeSignaturesScore: '',
    participationEvidenceScore: '',
    meetingMinutesScore: '',
    photosScore: '',
    committeeAppointmentOrderScore: '',
    fiveElementsOrderScore: '',
    localResourceOrderScore: '',
    managementPlanScore: '',
    committeeFeedback: '',
    suggestions: ''
  });
  const [role, setRole] = useState("user"); // Default role is "user"
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch user role from localStorage
    const userRole = localStorage.getItem("userRole");
    if (userRole) {
      setRole(userRole);
    } else {
      navigate('/'); // Redirect to login if no role is found
    }
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log(formData);
  };

  return (
    <div className="fm-container">
      <div className="fm-header">
        <Navbar />
      </div>
      <div className="fm-body">
        <h1 className="fm-heading">ส่วนที่ 1 การบริหารและการจัดการ</h1>
        <form onSubmit={handleSubmit}>
          <table className="fm-maintable">
            <thead>
              <tr>
                <th className="fm-col1">รายการประเมิน (คะแนนเต็ม 250 คะแนน)</th>
                <th className="fm-col2">สถานศึกษา</th>
                <th className="fm-col3">แนบเอกสาร</th>
                <th className="fm-col4">กรรมการ</th>
                <th className="fm-col5">ข้อเสนอแนะ</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>1.1 สถานศึกษา และชุมชนมีส่วนร่วม ในงานสวนพฤกษศาสตร์โรงเรียน (30 คะแนน)</strong></td>
                <td>&nbsp;</td>
                <td>&nbsp;</td>
                <td>{role === "admin" ? <input type="text" name="committeeFeedback" value={formData.committeeFeedback} onChange={handleChange} /> : formData.committeeFeedback}</td>
                <td>{role === "admin" ? <input type="text" name="suggestions" value={formData.suggestions} onChange={handleChange} /> : formData.suggestions}</td>
              </tr>
              <tr>
                <td>1) รายงานการประชุม (20 คะแนน)</td>
                <td><input type="number" name="reportScore" value={formData.reportScore} onChange={handleChange} /></td>
                <td>&nbsp;</td>
                <td>{role === "admin" ? <input type="text" name="committeeFeedback" value={formData.committeeFeedback} onChange={handleChange} /> : formData.committeeFeedback}</td>
                <td>{role === "admin" ? <input type="text" name="suggestions" value={formData.suggestions} onChange={handleChange} /> : formData.suggestions}</td>
              </tr>
              <tr>
                <td>วาระการประชุมเรื่องเกี่ยวกับงานสวนพฤกษศาสตร์โรงเรียน (10 คะแนน)</td>
                <td><input type="number" name="meetingAgendaScore" value={formData.meetingAgendaScore} onChange={handleChange} /></td>
                <td>&nbsp;</td>
                <td>{role === "admin" ? <input type="text" name="committeeFeedback" value={formData.committeeFeedback} onChange={handleChange} /> : formData.committeeFeedback}</td>
                <td>{role === "admin" ? <input type="text" name="suggestions" value={formData.suggestions} onChange={handleChange} /> : formData.suggestions}</td>
              </tr>
              <tr>
                <td>รายชื่อ ลายมือชื่อ คณะกรรมการสถานศึกษา และ/หรือคณะกรรมการ สถานศึกษาขั้นพื้นฐาน และ/หรือกรรมการสภามหาวิทยาลัย หรือ คณะกรรมการอื่นใดที่เกี่ยวข้องกับงานสวนพฤกษศาสตร์โรงเรียน (10 คะแนน) </td>
                <td><input type="number" name="committeeSignaturesScore" value={formData.committeeSignaturesScore} onChange={handleChange} /></td>
                <td>&nbsp;</td>
                <td>{role === "admin" ? <input type="text" name="committeeFeedback" value={formData.committeeFeedback} onChange={handleChange} /> : formData.committeeFeedback}</td>
                <td>{role === "admin" ? <input type="text" name="suggestions" value={formData.suggestions} onChange={handleChange} /> : formData.suggestions}</td>
              </tr>
              <tr>
                <td>&nbsp;</td>
                <td>&nbsp;</td>
                <td>&nbsp;</td>
                <td>&nbsp;</td>
                <td>&nbsp;</td>
              </tr>
              <tr>
                <td><strong>2)หลักฐานที่แสดงถึงการมีส่วนร่วม (10 คะแนน) </strong></td>
                <td><input type="number" name="participationEvidenceScore" value={formData.participationEvidenceScore} onChange={handleChange} /></td>
                <td>&nbsp;</td>
                <td>{role === "admin" ? <input type="text" name="committeeFeedback" value={formData.committeeFeedback} onChange={handleChange} /> : formData.committeeFeedback}</td>
                <td>{role === "admin" ? <input type="text" name="suggestions" value={formData.suggestions} onChange={handleChange} /> : formData.suggestions}</td>
              </tr>
              <tr>
                <td>- บันทึกการประชุม (5 คะแนน)</td>
                <td><input type="number" name="meetingMinutesScore" value={formData.meetingMinutesScore} onChange={handleChange} /></td>
                <td>&nbsp;</td>
                <td>{role === "admin" ? <input type="text" name="committeeFeedback" value={formData.committeeFeedback} onChange={handleChange} /> : formData.committeeFeedback}</td>
                <td>{role === "admin" ? <input type="text" name="suggestions" value={formData.suggestions} onChange={handleChange} /> : formData.suggestions}</td>
              </tr>
              <tr>
                <td>- ภาพถ่าย (5 คะแนน) </td>
                <td><input type="number" name="photosScore" value={formData.photosScore} onChange={handleChange} /></td>
                <td>&nbsp;</td>
                <td>{role === "admin" ? <input type="text" name="committeeFeedback" value={formData.committeeFeedback} onChange={handleChange} /> : formData.committeeFeedback}</td>
                <td>{role === "admin" ? <input type="text" name="suggestions" value={formData.suggestions} onChange={handleChange} /> : formData.suggestions}</td>
              </tr>
              <tr>
                <td><strong>1.2 แต่งตั้งคณะกรรมการดำเนินงาน งานสวนพฤกษศาสตร์โรงเรียน (30 คะแนน)</strong> </td>
                <td>&nbsp;</td>
                <td>&nbsp;</td>
                <td>&nbsp;</td>
                <td>&nbsp;</td>
              </tr>
              <tr>
                <td>1) คำสั่งแต่งตั้งคณะกรรมการดำเนินงาน งานสวนพฤกษศาสตร์โรงเรียน คำสั่ง 4 ด้าน (10 คะแนน)</td>
                <td><input type="number" name="committeeAppointmentOrderScore" value={formData.committeeAppointmentOrderScore} onChange={handleChange} /></td>
                <td>&nbsp;</td>
                <td>{role === "admin" ? <input type="text" name="committeeFeedback" value={formData.committeeFeedback} onChange={handleChange} /> : formData.committeeFeedback}</td>
                <td>{role === "admin" ? <input type="text" name="suggestions" value={formData.suggestions} onChange={handleChange} /> : formData.suggestions}</td>
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
        </form>
      </div>
    </div>
  );
};

export default FormManagement;
