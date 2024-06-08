import React, { useState } from "react";
import Navbar from "../Home";
import { useNavigate } from "react-router-dom";

const GeneralForm = () => {
  const [educationLevel, setEducationLevel] = useState("");
  const [studentCount, setStudentCount] = useState("");
  const [teacherCount, setTeacherCount] = useState("");
  const [otherEducationLevel, setOtherEducationLevel] = useState("");
  const [institutionName, setInstitutionName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [faxNumber, setFaxNumber] = useState("");
  const [email, setEmail] = useState("");
  const [district, setDistrict] = useState("");
  const [province, setProvince] = useState("");
  const [affiliation, setAffiliation] = useState("");
  const [headName, setHeadName] = useState("");
  const [projectDetail, setProjectDetail] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      educationLevel,
      studentCount,
      teacherCount,
      otherEducationLevel,
      institutionName,
      phoneNumber,
      faxNumber,
      email,
      district,
      province,
      affiliation,
      headName,
      projectDetail,
    };

    try {
      const response = await fetch("http://localhost:8000/api/submitGeForm", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        console.log("Data sent successfully");
        navigate("/generalform");
      } else {
        console.error("Failed to send data");
      }
    } catch (error) {
      console.error("Error sending data:", error);
    }
  };

  return (
    <div className="container">
        <Navbar />
        <div className="form-container">
      <div className="ge-form">
        <form onSubmit={handleSubmit}>
          <h2>ข้อมูลทั่วไป</h2>
          <h3>สถานศึกษาเป็นผู้กรอก / รายงาน</h3>
          <div className="form">
            <label>1. ระดับการศึกษา:</label>
            <select
              value={educationLevel}
              onChange={(e) => setEducationLevel(e.target.value)}
              required
            >
              <option value="">-- โปรดเลือก --</option>
              <option value="ก่อนประถมศึกษา">ก่อนประถมศึกษา</option>
              <option value="ประถมศึกษา">ประถมศึกษา</option>
              <option value="มัธยมศึกษา">มัธยมศึกษา</option>
              <option value="อาชีวศึกษา">อาชีวศึกษา</option>
              <option value="อื่นๆ">อื่นๆ</option>
            </select>
          </div>
          {educationLevel === "อื่นๆ" && (
            <div className="form-group">
              <label>โปรดระบุระดับการศึกษาอื่นๆ:</label>
              <input
                type="text"
                value={otherEducationLevel}
                onChange={(e) => setOtherEducationLevel(e.target.value)}
                required
              />
            </div>
          )}
          {educationLevel && (
            <>
              <div className="form-group">
                <label>จำนวนนักเรียน:</label>
                <input
                  type="number"
                  value={studentCount}
                  onChange={(e) => setStudentCount(e.target.value)}
                  required
                  min="1"
                />
              </div>
              <div className="form-group">
                <label>จำนวนครู/อาจารย์:</label>
                <input
                  type="number"
                  value={teacherCount}
                  onChange={(e) => setTeacherCount(e.target.value)}
                  required
                  min="1"
                />
              </div>
            </>
          )}

          <h3>2. ข้อมูลสถาบัน</h3>
          <div className="form-group">
            <label>ชื่อสถาบัน:</label>
            <input
              type="text"
              value={institutionName}
              onChange={(e) => setInstitutionName(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>โทรศัพท์:</label>
            <input
              type="tel"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>โทรสาร:</label>
            <input
              type="tel"
              value={faxNumber}
              onChange={(e) => setFaxNumber(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>อีเมล:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>ตำบล/ขวาง:</label>
            <input
              type="text"
              value={district}
              onChange={(e) => setDistrict(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>จังหวัด:</label>
            <input
              type="text"
              value={province}
              onChange={(e) => setProvince(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>สังกัด:</label>
            <input
              type="text"
              value={affiliation}
              onChange={(e) => setAffiliation(e.target.value)}
              required
            />
          </div>

          <h3>3.ชื่อหัวหน้าสถาบัน</h3>
          <div className="form-group">
            <input
              type="text"
              value={headName}
              onChange={(e) => setHeadName(e.target.value)}
              required
            />
          </div>

          <h3>4.งาน/โครงการหรือกิจกรรมดีเด่น</h3>
          <div className="form-group">
            <textarea
              value={projectDetail}
              onChange={(e) => setProjectDetail(e.target.value)}
              rows="4"
              required
            />
          </div>
          <button type="submit">ส่งข้อมูล</button>
        </form>
      </div>
      </div>
    </div>
  );
};

export default GeneralForm;
