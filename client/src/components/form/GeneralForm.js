import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from 'sweetalert2';
import { useNavigate } from "react-router-dom";
import { jwtDecode } from 'jwt-decode'; // Ensure correct import statement for jwt-decode
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

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken = jwtDecode(token);
      setFormData(prevData => ({
        ...prevData,
        userEmail: decodedToken.email
      }));

      axios.get('http://localhost:8000/api/fetchGeForm', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
        .then(response => {
          const data = response.data;
          const institutionData = data.institution;
          const educationLevelsData = data.educationLevels;
          const otherEducationLevelsData = data.otherEducationLevels;
          const studentCountsData = educationLevelsData.reduce((acc, level) => {
            acc[level.educationLevel] = level.studentCount;
            return acc;
          }, {});
          const teacherCountsData = educationLevelsData.reduce((acc, level) => {
            acc[level.educationLevel] = level.teacherCount;
            return acc;
          }, {});

          // Set formData for otherEducationLevel
          const otherEducationLevelData = otherEducationLevelsData.length > 0 ? otherEducationLevelsData[0] : {};
          setFormData(prevData => ({
            ...prevData,
            ...institutionData,
            otherEducationLevel: otherEducationLevelData.otherEducationLevel || "",
            otherEducationLevelStudentCount: otherEducationLevelData.studentCount || "",
            otherEducationLevelTeacherCount: otherEducationLevelData.teacherCount || "",
            educationLevels: educationLevelsData.map(level => level.educationLevel),
            studentCounts: studentCountsData,
            teacherCounts: teacherCountsData
          }));

          setEducationLevels(educationLevelsData.map(level => level.educationLevel));
          setOtherEducationLevel(otherEducationLevelsData.length > 0 ? otherEducationLevelsData[0].otherEducationLevel : "");
          setStudentCounts(studentCountsData);
          setTeacherCounts(teacherCountsData);
        })
        .catch(error => {
          console.error("Failed to fetch institution data:", error);
          Swal.fire({
            icon: 'error',
            title: 'เกิดข้อผิดพลาดในการโหลดข้อมูล!',
            text: 'กรุณาลองใหม่อีกครั้ง',
          });
          navigate('/');
        });
    } else {
      navigate('/');
    }
  }, [navigate]);




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
      setFormData(prevData => ({
        ...prevData,
        studentCounts: updatedCounts
      }));
      return updatedCounts;
    });
  };

  const handleTeacherCountChange = (educationLevel, count) => {
    setTeacherCounts(prevCounts => {
      const updatedCounts = {
        ...prevCounts,
        [educationLevel]: count
      };
      setFormData(prevData => ({
        ...prevData,
        teacherCounts: updatedCounts
      }));
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
              type='projectDetail'
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
