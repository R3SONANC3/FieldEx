import React, { useState } from 'react';
import './localform.css'; // Import CSS file
import Navbar from '../../Navbar';

function LocalGovernmentForm() {
  const [organizationName, setOrganizationName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [faxNumber, setFaxNumber] = useState('');
  const [email, setEmail] = useState('');
  const [subDistrict, setSubDistrict] = useState('');
  const [district, setDistrict] = useState('');
  const [province, setProvince] = useState('');
  const [supervision, setSupervision] = useState('');
  const [headName, setHeadName] = useState('');
  const [highlightedActivities, setHighlightedActivities] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    // ส่งข้อมูลไปยัง API หรือทำการประมวลผลต่อไปที่นี่
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
            <label>
              ชื่อองค์กรปกครองส่วนท้องถิ่น:
              <input type="lc-text" value={organizationName} onChange={(e) => setOrganizationName(e.target.value)} />
            </label>
            <div className="phone-fax">
              <label>
                <span>โทรศัพท์:</span>
                <input type="lc-text" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
              </label>
              <label>
                <span>โทรสาร:</span>
                <input type="lc-text" value={faxNumber} onChange={(e) => setFaxNumber(e.target.value)} />
              </label>
            </div>
            <label>
              อีเมล:
              <input type="lc-email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </label>
            <div className="address">
              <label>ตำบล:</label>
              <input type="lc-text" value={subDistrict} onChange={(e) => setSubDistrict(e.target.value)} />
              <label>อำเภอ:</label>
              <input type="lc-text" value={district} onChange={(e) => setDistrict(e.target.value)} />
              <label>จังหวัด:</label>
              <input type="lc-text" value={province} onChange={(e) => setProvince(e.target.value)} />
            </div>
            <label>
              สังกัด:
              <input type="lc-text" value={supervision} onChange={(e) => setSupervision(e.target.value)} />
            </label>
            <label>
              ชื่อหัวหน้าองค์กรปกครองส่วนท้องถิ่น:
              <input type="lc-text" value={headName} onChange={(e) => setHeadName(e.target.value)} />
            </label>
            <label>
              งาน/โครงการหรือกิจกรรมดีเด่น:
              <textarea value={highlightedActivities} rows={5} onChange={(e) => setHighlightedActivities(e.target.value)} />
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
