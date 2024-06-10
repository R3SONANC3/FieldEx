import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import Navbar from "../Navbar";
import "./form.css"; // Import the CSS file for styling
import axios from "axios";
import Swal from 'sweetalert2';

const GeneralForm = () => {
  const navigate = useNavigate();
  const [educationLevels, setEducationLevels] = useState([]);
  const [studentCounts, setStudentCounts] = useState({});
  const [teacherCounts, setTeacherCounts] = useState({});
  const [otherEducationLevel, setOtherEducationLevel] = useState("");
  const [formData, setFormData] = useState({
    schoolName: "",
    schoolId: "",
    telephone: "",
    fax: "",
    email: "",
    subdistrict: "",
    district: "",
    province: "",
    affiliation: "",
    headmasterName: "",
    outstandingActivities: ""
  });
  
  const handleStudentCountChange = (level, value) => {
    setStudentCounts((prevCounts) => ({
      ...prevCounts,
      [level]: value,
    }));
  };

  const handleTeacherCountChange = (level, value) => {
    setTeacherCounts((prevCounts) => ({
      ...prevCounts,
      [level]: value,
    }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    try {
      // Retrieve token from local storage
      const token = localStorage.getItem('token');
  
      // Check if token exists
      if (!token) {
        throw new Error('Authentication token not found.');
      }
  
      // Combine form data with additional data if necessary
      const combinedFormData = {
        ...formData,
        educationLevels,
        studentCounts,
        teacherCounts
      };
  
      // Make API request with token included in headers
      const response = await axios.post('http://localhost:8000/api/add_general_form', combinedFormData);
  
      console.log("Form submitted successfully:", response.data.message);
      await Swal.fire({
        icon: 'success',
        title: 'Success!',
        text: 'Form submitted successfully!',
      });
      navigate('/formmanagement');
    } catch (error) {
      console.error("Failed to submit form:", error);
      // Handle error response here
    }
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
              onChange={(e) => {
                const isChecked = e.target.checked;
                setEducationLevels(prevLevels => isChecked ? [...prevLevels, "ก่อนประถมศึกษา"] : prevLevels.filter(level => level !== "ก่อนประถมศึกษา"));
                if (!isChecked) {
                  setStudentCounts(prevCounts => {
                    const { [e.target.value]: _, ...rest } = prevCounts;
                    return rest;
                  });
                  setTeacherCounts(prevCounts => {
                    const { [e.target.value]: _, ...rest } = prevCounts;
                    return rest;
                  });
                }
              }}
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
              onChange={(e) => {
                const isChecked = e.target.checked;
                setEducationLevels(prevLevels => isChecked ? [...prevLevels, "ประถมศึกษา"] : prevLevels.filter(level => level !== "ประถมศึกษา"));
                if (!isChecked) {
                  setStudentCounts(prevCounts => {
                    const { [e.target.value]: _, ...rest } = prevCounts;
                    return rest;
                  });
                  setTeacherCounts(prevCounts => {
                    const { [e.target.value]: _, ...rest } = prevCounts;
                    return rest;
                  });
                }
              }}
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
              onChange={(e) => {
                const isChecked = e.target.checked;
                setEducationLevels(prevLevels => isChecked ? [...prevLevels, "มัธยมศึกษา"] : prevLevels.filter(level => level !== "มัธยมศึกษา"));
                if (!isChecked) {
                  setStudentCounts(prevCounts => {
                    const { [e.target.value]: _, ...rest } = prevCounts;
                    return rest;
                  });
                  setTeacherCounts(prevCounts => {
                    const { [e.target.value]: _, ...rest } = prevCounts;
                    return rest;
                  });
                }
              }}
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
              onChange={(e) => {
                const isChecked = e.target.checked;
                setEducationLevels(prevLevels => isChecked ? [...prevLevels, "อาชีวศึกษา"] : prevLevels.filter(level => level !== "อาชีวศึกษา"));
                if (!isChecked) {
                  setStudentCounts(prevCounts => {
                    const { [e.target.value]: _, ...rest } = prevCounts;
                    return rest;
                  });
                  setTeacherCounts(prevCounts => {
                    const { [e.target.value]: _, ...rest } = prevCounts;
                    return rest;
                  });
                }
              }}
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
              onChange={(e) => {
                const isChecked = e.target.checked;
                setEducationLevels(prevLevels => isChecked ? [...prevLevels, "อื่น ๆ"] : prevLevels.filter(level => level !== "อื่น ๆ"));
                if (!isChecked) {
                  setStudentCounts(prevCounts => {
                    const { [e.target.value]: _, ...rest } = prevCounts;
                    return rest;
                  });
                  setTeacherCounts(prevCounts => {
                    const { [e.target.value]: _, ...rest } = prevCounts;
                    return rest;
                  });
                }
              }}
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
            <label htmlFor="schoolName">ชื่อสถานศึกษา</label>
            <input
              type="text"
              id="schoolName"
              name="schoolName"
              value={formData.schoolName}
              onChange={handleInputChange}
            />
            <label htmlFor="schoolId">รหัสสถานศึกษา</label>
            <input
              type="text"
              id="schoolId"
              name="schoolId"
              value={formData.schoolId}
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
            <label htmlFor="outstandingActivities">รายละเอียด</label>
            <textarea
              id="outstandingActivities"
              name="outstandingActivities"
              value={formData.outstandingActivities}
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