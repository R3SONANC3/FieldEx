import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from 'sweetalert2';
import { useNavigate } from "react-router-dom";
import { jwtDecode } from 'jwt-decode';
import Navbar from "../Navbar";
import './form.css'


const GeneralForm = () => {
  const [educationLevels, setEducationLevels] = useState([]);
  const [studentCounts, setStudentCounts] = useState({});
  const [teacherCounts, setTeacherCounts] = useState({});
  const [otherEducationLevel, setOtherEducationLevel] = useState("");

  const [formData, setFormData] = useState({
    educationLevels: [],
    studentCounts: {},
    teacherCounts: {},
    otherEducationLevel: "",
    institutionName: "",
    institutionID: "",
    telephone: "",
    fax: "",
    email: "",
    subdistrict: "",
    district: "",
    province: "",
    affiliation: "",
    headmasterName: "",
    projectDetail: "",
    userEmail: ""
  });

  const navigate = useNavigate();

  useEffect(() => {
    // Decode JWT token and set userEmail
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken = jwtDecode(token);
      setFormData(prevData => ({
        ...prevData,
        userEmail: decodedToken.email // Assuming the email is stored under 'email' key
      }));
    }
  }, []);

  const handleSubmit = async () => {
    try {
      const response = await axios.post('http://localhost:8000/api/submitge', formData);
      console.log("Form submitted successfully:", response.data.message);
      console.log(formData);
      await Swal.fire({
        icon: 'success',
        title: 'ส่งข้อมูลสำเร็จ',
        text: 'ไปที่หน้าต่อไป',
      });
      navigate("/formmanagement");
    } catch (error) {
      console.error("Failed to submit form:", error);
      await Swal.fire({
        icon: 'error',
        title: 'เกิดข้อผิดพลาดในการส่งข้อมูล!',
        text: 'กรุณาตรวจสอบรหัสประจำสถานศึกษาของท่าน',
      });
    }
  };

  const handleCheckboxChange = (e, educationLevel) => {
    const isChecked = e.target.checked;
    setEducationLevels(prevLevels => {
      if (isChecked) {
        // เพิ่ม educationLevel เข้าไปใน prevLevels
        return [...prevLevels, educationLevel];
      } else {
        // กรอง educationLevel ที่ไม่ตรงกับ educationLevel ที่ถูกคลิก
        return prevLevels.filter(level => level !== educationLevel);
      }
    });
    
    // อัปเดตค่า formData ด้วยค่าใหม่ของ educationLevels
    setFormData(prevData => ({
      ...prevData,
      educationLevels: isChecked ? [...prevData.educationLevels, educationLevel] : prevData.educationLevels.filter(level => level !== educationLevel)
    }));
  };

  const handleStudentCountChange = (educationLevel, count) => {
    setStudentCounts(prevCounts => {
      const updatedCounts = {
        ...prevCounts,
        [educationLevel]: count
      };
      // อัปเดต formData ด้วยค่าใหม่ของ studentCounts
      setFormData(prevData => {
        const newFormData = {
          ...prevData,
          studentCounts: updatedCounts
        };
        return newFormData;
      });
      return updatedCounts;
    });
  };
  
  const handleTeacherCountChange = (educationLevel, count) => {
    setTeacherCounts(prevCounts => {
      const updatedCounts = {
        ...prevCounts,
        [educationLevel]: count
      };
      // อัปเดต formData ด้วยค่าใหม่ของ teacherCounts
      setFormData(prevData => {
        const newFormData = {
          ...prevData,
          teacherCounts: updatedCounts
        };
        return newFormData;
      });
      return updatedCounts;
    });
  };
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };



  return (
    <div className="ge-container">
      <div className="ge-header">
        <Navbar />
        <h2 className="ge-text">ข้อมูลทั่วไป</h2>
        <h2 className="ge-text">(สถานศึกษาเป็นผู้กรอก / รายงาน)</h2>
      </div>
      <div className="ge-body">
        <div className="ge-column-left">
          <h4>1. ระดับการศึกษา</h4>
          <div className="education-level">
            <input
              type="checkbox"
              id="pre_primary"
              value="ก่อนประถมศึกษา"
              checked={educationLevels.includes("ก่อนประถมศึกษา")}
              onChange={(e) => handleCheckboxChange(e, "ก่อนประถมศึกษา")}
            />
            <label htmlFor="pre_primary">ก่อนประถมศึกษา</label>
            <div className="counts">
              <input
                type="number"
                placeholder="จำนวนนักเรียน"
                value={studentCounts["ก่อนประถมศึกษา"] || ""}
                onChange={(e) => handleStudentCountChange("ก่อนประถมศึกษา", e.target.value)}
              />
              <input
                type="number"
                placeholder="จำนวนครู / อาจารย์"
                value={teacherCounts["ก่อนประถมศึกษา"] || ""}
                onChange={(e) => handleTeacherCountChange("ก่อนประถมศึกษา", e.target.value)}
              />
            </div>
          </div>

          <div className="education-level">
            <input
              type="checkbox"
              id="primary"
              value="ประถมศึกษา"
              checked={educationLevels.includes("ประถมศึกษา")}
              onChange={(e) => handleCheckboxChange(e, "ประถมศึกษา")}
            />
            <label htmlFor="primary">ประถมศึกษา</label>
            <div className="counts">
              <input
                type="number"
                placeholder="จำนวนนักเรียน"
                value={studentCounts["ประถมศึกษา"] || ""}
                onChange={(e) => handleStudentCountChange("ประถมศึกษา", e.target.value)}
              />
              <input
                type="number"
                placeholder="จำนวนครู / อาจารย์"
                value={teacherCounts["ประถมศึกษา"] || ""}
                onChange={(e) => handleTeacherCountChange("ประถมศึกษา", e.target.value)}
              />
            </div>
          </div>

          <div className="education-level">
            <input
              type="checkbox"
              id="secondary"
              value="มัธยมศึกษา"
              checked={educationLevels.includes("มัธยมศึกษา")}
              onChange={(e) => handleCheckboxChange(e, "มัธยมศึกษา")}
            />
            <label htmlFor="secondary">มัธยมศึกษา</label>
            <div className="counts">
              <input
                type="number"
                placeholder="จำนวนนักเรียน"
                value={studentCounts["มัธยมศึกษา"] || ""}
                onChange={(e) => handleStudentCountChange("มัธยมศึกษา", e.target.value)}
              />
              <input
                type="number"
                placeholder="จำนวนครู / อาจารย์"
                value={teacherCounts["มัธยมศึกษา"] || ""}
                onChange={(e) => handleTeacherCountChange("มัธยมศึกษา", e.target.value)}
              />
            </div>
          </div>

          <div className="education-level">
            <input
              type="checkbox"
              id="vocational"
              value="อาชีวศึกษา"
              checked={educationLevels.includes("อาชีวศึกษา")}
              onChange={(e) => handleCheckboxChange(e, "อาชีวศึกษา")}
            />
            <label htmlFor="vocational">อาชีวศึกษา</label>
            <div className="counts">
              <input
                type="number"
                placeholder="จำนวนนักเรียน"
                value={studentCounts["อาชีวศึกษา"] || ""}
                onChange={(e) => handleStudentCountChange("อาชีวศึกษา", e.target.value)}
              />
              <input
                type="number"
                placeholder="จำนวนครู / อาจารย์"
                value={teacherCounts["อาชีวศึกษา"] || ""}
                onChange={(e) => handleTeacherCountChange("อาชีวศึกษา", e.target.value)}
              />
            </div>
          </div>

          <div className="education-level">
            <input
              type="checkbox"
              id="other"
              value="อื่น ๆ"
              checked={educationLevels.includes("อื่น ๆ")}
              onChange={(e) => handleCheckboxChange(e, "อื่น ๆ")}
            />
            <label htmlFor="other">อื่น ๆ</label>
            <input
              type="text"
              placeholder="โปรดระบุ"
              value={otherEducationLevel}
              onChange={(e) => setOtherEducationLevel(e.target.value)}
            />
            <div className="counts">
              <input
                type="number"
                placeholder="จำนวนนักเรียน"
                value={studentCounts["อื่น ๆ"] || ""}
                onChange={(e) => handleStudentCountChange("อื่น ๆ", e.target.value)}
              />
              <input
                type="number"
                placeholder="จำนวนครู / อาจารย์"
                value={teacherCounts["อื่น ๆ"] || ""}
                onChange={(e) => handleTeacherCountChange("อื่น ๆ", e.target.value)}
              />
            </div>
          </div>
        </div>
        <div className="ge-column-middle">
          <h4>2. ข้อมูลสถานศึกษา</h4>
          <div className="form-group">
            <label htmlFor="institutionName">ชื่อสถานศึกษา</label>
            <input
              type="text"
              id="institutionName"
              name="institutionName"
              value={formData.institutionName}
              onChange={handleInputChange}
            />
            <label htmlFor="institutionID">รหัสสถานศึกษา</label>
            <input
              type="text"
              id="institutionID"
              name="institutionID"
              value={formData.institutionID}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="telephone">โทรศัพท์</label>
            <input
              type="tel"
              id="telephone"
              name="telephone"
              value={formData.telephone}
              onChange={handleInputChange}
            />
            <label htmlFor="fax">โทรสาร</label>
            <input
              type="tel"
              id="fax"
              name="fax"
              value={formData.fax}
              onChange={handleInputChange}
            />
            <label htmlFor="email">อีเมล</label>
            <input
              type="ge-email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="subdistrict">ตำบล </label>
            <input
              type="text"
              id="subdistrict"
              name="subdistrict"
              value={formData.subdistrict}
              onChange={handleInputChange}
            />
            <label htmlFor="district">อำเภอ</label>
            <input
              type="text"
              id="district"
              name="district"
              value={formData.district}
              onChange={handleInputChange}
            />
            <label htmlFor="province">จังหวัด</label>
            <input
              type="text"
              id="province"
              name="province"
              value={formData.province}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="affiliation">สังกัด</label>
            <input
              type="text"
              id="affiliation"
              name="affiliation"
              value={formData.affiliation}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div className="ge-column-right">
          <h4>3. ชื่อหัวหน้าสถานศึกษา</h4>
          <div className="form-group">
            <label htmlFor="headmasterName">ชื่อหัวหน้าสถานศึกษา</label>
            <input
              type="text"
              id="headmasterName"
              name="headmasterName"
              value={formData.headmasterName}
              onChange={handleInputChange}
            />
          </div>

          <h4>4. งาน / โครงการหรือกิจกรรมดีเด่น</h4>
          <div className="form-group">
            <label htmlFor="projectDetail">รายละเอียด</label>
            <textarea
              id="projectDetail"
              name="projectDetail"
              value={formData.projectDetail}
              onChange={handleInputChange} rows="6"></textarea>
          </div>
          <button className="submit-button" onClick={handleSubmit}>
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default GeneralForm;
