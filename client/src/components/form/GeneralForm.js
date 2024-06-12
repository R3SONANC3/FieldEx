import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from 'sweetalert2';
import { useNavigate } from "react-router-dom";
import Navbar from "../Navbar";
import './form.css';

const GeneralForm = () => {
  const [educationLevels, setEducationLevels] = useState([]);
  const [studentCounts, setStudentCounts] = useState({});
  const [teacherCounts, setTeacherCounts] = useState({});
  const [otherEducationLevel, setOtherEducationLevel] = useState("");
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    educationLevels: [],
    studentCounts: {},
    teacherCounts: {},
    otherEducationLevel: "",
    otherStudentCount: "",
    otherTeacherCount: "",
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
    userEmail: "",
  });

  useEffect(() => {
    console.log(formData);
  })

  const isFormValid = () => {
    const requiredFields = [
      'institutionName', 'institutionID', 'telephone',
      'email', 'subdistrict', 'district',
      'province', 'affiliation', 'headmasterName'
    ];
    for (let field of requiredFields) {
      if (!formData[field]) {
        return false;
      }
    }
    if (formData.educationLevels.length === 0) {
      return false;
    }
    for (let level of formData.educationLevels) {
      if (!formData.studentCounts[level] || !formData.teacherCounts[level]) {
        return false;
      }
    }
    return true;
  };

  const handleSubmit = async () => {
    if (!isFormValid()) {
      await Swal.fire({
        icon: 'error',
        title: 'เกิดข้อผิดพลาดในการส่งข้อมูล!',
        text: 'กรุณากรอกข้อมูลให้ครบถ้วน',
      });
      return;
    }
    try {
      const response = await axios.post('http://localhost:8000/api/submitge', formData);
      console.log("Form submitted successfully:", response.data.message);
      console.log(formData.userEmail);
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
        return [...prevLevels, educationLevel];
      } else {
        return prevLevels.filter(level => level !== educationLevel);
      }
    });
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
      if (educationLevel === "อื่น ๆ") {
        setFormData(prevData => ({
          ...prevData,
          otherStudentCount: count
        }));
      } else {
        setFormData(prevData => ({
          ...prevData,
          studentCounts: updatedCounts
        }));
      }
      return updatedCounts;
    });
  };

  const handleTeacherCountChange = (educationLevel, count) => {
    setTeacherCounts(prevCounts => {
      const updatedCounts = {
        ...prevCounts,
        [educationLevel]: count
      };
      if (educationLevel === "อื่น ๆ") {
        setFormData(prevData => ({
          ...prevData,
          otherTeacherCount: count
        }));
      } else {
        setFormData(prevData => ({
          ...prevData,
          teacherCounts: updatedCounts
        }));
      }
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
          {["ก่อนประถมศึกษา", "ประถมศึกษา", "มัธยมศึกษา", "อาชีวศึกษา", "อื่น ๆ"].map(level => (
            <div className="education-level" key={level}>
              <input
                type="checkbox"
                id={level}
                value={level}
                checked={educationLevels.includes(level)}
                onChange={(e) => handleCheckboxChange(e, level)}
              />
              <label htmlFor={level}>{level}</label>
              {level !== "อื่น ๆ" ? (
                <div className="counts">
                  <input
                    type="number"
                    placeholder="จำนวนนักเรียน"
                    value={studentCounts[level] || ""}
                    onChange={(e) => handleStudentCountChange(level, e.target.value)}
                  />
                  <input
                    type="number"
                    placeholder="จำนวนครู / อาจารย์"
                    value={teacherCounts[level] || ""}
                    onChange={(e) => handleTeacherCountChange(level, e.target.value)}
                  />
                </div>
              ) : (
                <div className="counts">
                  <input
                    type="text"
                    placeholder="โปรดระบุ"
                    value={otherEducationLevel}
                    onChange={(e) => {
                      setOtherEducationLevel(e.target.value);
                      setFormData(prevData => ({
                        ...prevData,
                        otherEducationLevel: e.target.value
                      }));
                    }}
                  />

                  <input
                    type="number"
                    placeholder="จำนวนนักเรียน"
                    value={studentCounts[level] || ""}
                    onChange={(e) => handleStudentCountChange(level, e.target.value)}
                  />
                  <input
                    type="number"
                    placeholder="จำนวนครู / อาจารย์"
                    value={teacherCounts[level] || ""}
                    onChange={(e) => handleTeacherCountChange(level, e.target.value)}
                  />
                </div>
              )}
            </div>
          ))}
        </div>
        <div className="ge-column-middle">
          <h4>2. ข้อมูลสถานศึกษา</h4>
          <div className="form-group">
            {[
              { label: "ชื่อสถานศึกษา", name: "institutionName" },
              { label: "รหัสสถานศึกษา", name: "institutionID" },
              { label: "โทรศัพท์", name: "telephone" },
              { label: "โทรสาร", name: "fax" },
              { label: "อีเมล", name: "email" },
              { label: "ตำบล", name: "subdistrict" },
              { label: "อำเภอ", name: "district" },
              { label: "จังหวัด", name: "province" },
              { label: "สังกัด", name: "affiliation" },
            ].map(field => (
              <React.Fragment key={field.name}>
                <label htmlFor={field.name}>{field.label}</label>
                <input
                  type="text"
                  id={field.name}
                  name={field.name}
                  value={formData[field.name]}
                  onChange={handleInputChange}
                />
              </React.Fragment>
            ))}
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
          </div>      <h4>4. งาน / โครงการหรือกิจกรรมดีเด่น</h4>
          <div className="form-group">
            <label htmlFor="projectDetail">รายละเอียด</label>
            <textarea
              id="projectDetail"
              name="projectDetail"
              value={formData.projectDetail}
              onChange={handleInputChange}
              rows="6"
            ></textarea>
          </div>
          <button
            className="submit-button"
            onClick={handleSubmit}
            disabled={!isFormValid()}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};


export default GeneralForm;