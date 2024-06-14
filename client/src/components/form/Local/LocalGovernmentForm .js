import React, { useState, useEffect } from 'react';
import './localform.css'; // Import CSS file
import Navbar from '../../Navbar';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import 'sweetalert2/dist/sweetalert2.min.css';

function LocalGovernmentForm() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    organizationName: "",
    localID: "",
    phoneNumber: "",
    faxNumber: "",
    email: "",
    subDistrict: "",
    district: "",
    province: "",
    affiliation: "",
    headmasterName: "",
    highlightedActivities: ""
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


  const fetchOldData = async () =>{
    const response = await axios.get("http://localhost:8000/api/fetchData", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Validate form data
    const requiredFields = [
      "organizationName",
      "localID",
      "phoneNumber",
      "email",
      "subDistrict",
      "district",
      "province",
      "affiliation",
      "headmasterName",
    ];

    for (let field of requiredFields) {
      if (!formData[field]) {
        Swal.fire({
          icon: "error",
          title: "เกิดข้อผิดพลาดในการส่งข้อมูล!",
          text: "กรุณากรอกข้อมูลให้ครบทุกช่องที่จำเป็น",
        });
        return; // Stop the form submission
      }
    }

    try {
      console.log(formData);
      await axios.post("http://localhost:8000/api/submitlc", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      await Swal.fire({
        icon: "success",
        title: "ส่งข้อมูลสำเร็จ",
        text: "ไปที่หน้าต่อไป"
      });
      navigate("/localconscript");
    } catch (error) {
      await Swal.fire({
        icon: "error",
        title: "เกิดข้อผิดพลาดในการส่งข้อมูล!",
        text: "กรุณาตรวจสอบข้อมูลและรหัสองค์กรปกครองส่วนท้องถิ่นของท่านให้ครบ",
      });
    }
  };

  return (
    <div className='lc-container'>
      <div className='lc-header'>
        <Navbar />
      </div>
      <div className='lc-heading'>
        <h2>แบบประเมินองค์กรปกครองส่วนท้องถิ่น</h2>
        <h3>ข้อมูลทั่วไป</h3>
        <p>(องค์กรปกครองส่วนท้องถิ่นเป็นผู้กรอก / รายงาน)</p>
      </div>
      <div className='lc-body'>
        <form className='lc-form' onSubmit={handleSubmit}>
          <div className='lc-content'>
            <div className='organization-form'>
              <label>
                ชื่อองค์กรปกครองส่วนท้องถิ่น:
                <input type="text" name="organizationName" value={formData.organizationName} onChange={handleInputChange} />
              </label>
              <label>
                รหัสองค์กรปกครองส่วนท้องถิ่น:
                <input type="text" name="localID" value={formData.localID} onChange={handleInputChange} />
              </label>
            </div>
            <div className="phone-fax">
              <label>โทรศัพท์:
                <input type="text" name="phoneNumber" value={formData.phoneNumber} onChange={handleInputChange} />
              </label>
              <label>โทรสาร:
                <input type="text" name="faxNumber" value={formData.faxNumber} onChange={handleInputChange} />
              </label>
            </div>
            <label>
              อีเมล:
              <input type="email" name="email" value={formData.email} onChange={handleInputChange} />
            </label>
            <div className="address">
              <label>ตำบล:</label>
              <input type="text" name="subDistrict" value={formData.subDistrict} onChange={handleInputChange} />
              <label>อำเภอ:</label>
              <input type="text" name="district" value={formData.district} onChange={handleInputChange} />
              <label>จังหวัด:</label>
              <input type="text" name="province" value={formData.province} onChange={handleInputChange} />
            </div>
            <label>
              สังกัด:
              <input type="text" name="affiliation" value={formData.affiliation} onChange={handleInputChange} />
            </label>
            <label>
              ชื่อหัวหน้าองค์กรปกครองส่วนท้องถิ่น:
              <input type="text" name="headmasterName" value={formData.headmasterName} onChange={handleInputChange} />
            </label>
            <label>
              งาน/โครงการหรือกิจกรรมดีเด่น:
              <textarea name="highlightedActivities" value={formData.highlightedActivities} rows={5} onChange={handleInputChange} />
            </label>
          </div>
          <div className='lc-footer'>
            <button type="submit">ส่งข้อมูล</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LocalGovernmentForm;
