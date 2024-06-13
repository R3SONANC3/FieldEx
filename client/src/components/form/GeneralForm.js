import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import Navbar from "../Navbar";
import "./form.css";

const GeneralForm = () => {
  const [educationLevels, setEducationLevels] = useState([]);
  const [studentCounts, setStudentCounts] = useState({});
  const [teacherCounts, setTeacherCounts] = useState({});
  const [otherEducationLevel, setOtherEducationLevel] = useState("");
  const [otherStudentCount, setOtherStudentCount] = useState("");
  const [otherTeacherCount, setOtherTeacherCount] = useState("");
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
  });

  const token = localStorage.getItem("token");
  const fetchData = localStorage.getItem("fetchData");

  useEffect(() => {
    if (!token) {
      navigate("/");
    }
    if (fetchData === "true") {
      fetchOldData();
      localStorage.setItem('updateData', true)
    }
  }, []);

  const fetchOldData = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/fetchData", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const oldData = response.data;
      setFormData((prevData) => ({
        ...prevData,
        ...oldData.institutionData,
        educationLevels: oldData.educationLevelsData.map(
          (levelData) => levelData.educationLevel
        ),
        studentCounts: Object.fromEntries(
          oldData.educationLevelsData.map((levelData) => [
            levelData.educationLevel,
            levelData.studentCount,
          ])
        ),
        teacherCounts: Object.fromEntries(
          oldData.educationLevelsData.map((levelData) => [
            levelData.educationLevel,
            levelData.teacherCount,
          ])
        ),
        otherEducationLevel:
          oldData.otherEducationLevelsData.otherEducationLevel,
        otherStudentCount: oldData.otherEducationLevelsData.otherStudentCount,
        otherTeacherCount: oldData.otherEducationLevelsData.otherTeacherCount,
      }));

      // Set otherEducationLevel ที่ได้จากข้อมูลเก่า
      setOtherEducationLevel(
        oldData.otherEducationLevelsData.otherEducationLevel
      );
      // อัพเดต studentCounts และ teacherCounts
      const studentCountsFromData = Object.fromEntries(
        oldData.educationLevelsData.map((levelData) => [
          levelData.educationLevel,
          levelData.studentCount,
        ])
      );
      setStudentCounts(studentCountsFromData);

      const teacherCountsFromData = Object.fromEntries(
        oldData.educationLevelsData.map((levelData) => [
          levelData.educationLevel,
          levelData.teacherCount,
        ])
      );
      setTeacherCounts(teacherCountsFromData);

      setEducationLevels(
        oldData.educationLevelsData.map((levelData) => levelData.educationLevel)
      );
      // Check if OtherEducationLevel exists and add it to educationLevels if it does
      if (oldData.otherEducationLevelsData.otherEducationLevel) {
        setEducationLevels((prevEducationLevels) => [
          ...prevEducationLevels,
          "อื่น ๆ",
        ]);
      }
      setOtherStudentCount(oldData.otherEducationLevelsData.otherStudentCount);
      setOtherTeacherCount(oldData.otherEducationLevelsData.otherTeacherCount);
    } catch (error) {
      console.error("Failed to fetch institution data:", error);
      Swal.fire({
        icon: "error",
        title: "เกิดข้อผิดพลาดในการโหลดข้อมูล!",
        text: "กรุณาลองใหม่อีกครั้ง",
      });
      navigate("/");
    }
  };
  const handleSubmit = async () => {
    try {
      await axios.post("http://localhost:8000/api/submitge", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      await Swal.fire({
        icon: "success",
        title: "ส่งข้อมูลสำเร็จ",
        text: "ไปที่หน้าต่อไป",
      });
      navigate("/formmanagement");
    } catch (error) {
      await Swal.fire({
        icon: "error",
        title: "เกิดข้อผิดพลาดในการส่งข้อมูล!",
        text: "กรุณาตรวจสอบรหัสประจำสถานศึกษาของท่าน",
      });
    }
  };
  const handleCheckboxChange = (e, educationLevel) => {
    const isChecked = e.target.checked;
    setEducationLevels((prevLevels) => {
      if (isChecked) {
        return [...prevLevels, educationLevel];
      } else {
        return prevLevels.filter((level) => level !== educationLevel);
      }
    });

    setFormData((prevData) => {
      const newEducationLevels = isChecked
        ? [...prevData.educationLevels, educationLevel]
        : prevData.educationLevels.filter((level) => level !== educationLevel);
      return {
        ...prevData,
        educationLevels: newEducationLevels,
      };
    });
  };

  const handleStudentCountChange = (educationLevel, count) => {
    setStudentCounts((prevCounts) => ({
      ...prevCounts,
      [educationLevel]: count,
    }));
    setFormData((prevData) => {
      const newStudentCounts = {
        ...prevData.studentCounts,
        [educationLevel]: count,
      };
      if (educationLevel === "อื่น ๆ") {
        return {
          ...prevData,
          otherStudentCount: count,
        };
      } else {
        return {
          ...prevData,
          studentCounts: newStudentCounts,
        };
      }
    });
  };

  const handleTeacherCountChange = (educationLevel, count) => {
    setTeacherCounts((prevCounts) => ({
      ...prevCounts,
      [educationLevel]: count,
    }));
    setFormData((prevData) => {
      const newTeacherCounts = {
        ...prevData.teacherCounts,
        [educationLevel]: count,
      };
      if (educationLevel === "อื่น ๆ") {
        return {
          ...prevData,
          otherTeacherCount: count,
        };
      } else {
        return {
          ...prevData,
          teacherCounts: newTeacherCounts,
        };
      }
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => {
      const updatedData = {
        ...prevData,
        [name]: value,
      };
      // ตรวจสอบค่าที่เปลี่ยนแปลง
      // if (name === "otherEducationLevel" && value !== "") {
      //   setOtherEducationLevel(value);
      // } else if (name === "otherStudentCount" && value !== "") {
      //   setOtherStudentCount(value);
      //   setStudentCounts((prevCounts) => ({
      //     ...prevCounts,
      //     [otherEducationLevel]: value,
      //   }));
      // } else if (name === "otherTeacherCount" && value !== "") {
      //   setOtherTeacherCount(value);
      //   setTeacherCounts((prevCounts) => ({
      //     ...prevCounts,
      //     [otherEducationLevel]: value,
      //   }));
      // }

      return updatedData;
      });
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
          {[
            "ก่อนประถมศึกษา",
            "ประถมศึกษา",
            "มัธยมศึกษา",
            "อาชีวศึกษา",
            "อื่น ๆ",
          ].map((level) => (
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
                    onChange={(e) =>
                      handleStudentCountChange(level, e.target.value)
                    }
                  />
                  <input
                    type="number"
                    placeholder="จำนวนครู / อาจารย์"
                    value={teacherCounts[level] || ""}
                    onChange={(e) =>
                      handleTeacherCountChange(level, e.target.value)
                    }
                  />
                </div>
              ) : (
                <div className="counts">
                  <input
                    type="text"
                    name="otherEducationLevel"
                    placeholder="โปรดระบุ"
                    value={otherEducationLevel}
                    onChange={handleInputChange}
                  />
                  <input
                    type="number"
                    name="otherStudentCount"
                    placeholder="จำนวนนักเรียน"
                    value={otherStudentCount}
                    onChange={handleInputChange}
                  />
                  <input
                    type="number"
                    name="otherTeacherCount"
                    placeholder="จำนวนครู / อาจารย์"
                    value={otherTeacherCount}
                    onChange={handleInputChange}
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
              { label: "รหัสประจำสถานศึกษา", name: "institutionID" },
              { label: "โทรศัพท์", name: "telephone" },
              { label: "โทรสาร", name: "fax" },
              { label: "อีเมล", name: "email" },
              { label: "ตำบล", name: "subdistrict" },
              { label: "อำเภอ", name: "district" },
              { label: "จังหวัด", name: "province" },
              { label: "สังกัด", name: "affiliation" },
            ].map((field) => (
              <React.Fragment key={field.name}>
                <label htmlFor={field.name}>{field.label}</label>
                <input
                  type="text"
                  id={field.name}
                  name={field.name}
                  value={formData[field.name] || ""}
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
              value={formData.headmasterName || ""}
              onChange={handleInputChange}
            />
          </div>
          <h4>4. งาน / โครงการหรือกิจกรรมดีเด่น</h4>
          <div className="form-group">
            <label htmlFor="projectDetail">รายละเอียด</label>
            <textarea
              id="projectDetail"
              name="projectDetail"
              value={formData.projectDetail || ""}
              onChange={handleInputChange}
              rows="6"
            ></textarea>
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
