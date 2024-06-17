import React, { useEffect, useState } from 'react';
import Navbar from '../../Navbar';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';

const LocalOperaFirst = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const emailUser = 'test2@gmail.com';
  const token = localStorage.getItem('token');

  const [formData, setFormData] = useState({
    scopeSurvey: '',
    refereeScopeSurvey: '',
    commentScopeSurvey: '',
    areaMap: '',
    refereeAreaMap: '',
    commentAreaMap: '',
    resourceSamples: '',
    refereeResourceSamples: '',
    commentResourceSamples: '',
    resourceConservation: '',
    refereeResourceConservation: '',
    commentResourceConservation: '',
    scopeSurveyNest: [
      { defineScope: '', surveyResources: '', classifyResources: '', tagResources: '' }
    ],
    studyResources: '',
    refereeStudyResources: '',
    commentStudyResources: '',
    photographResources: '',
    refereePhotographResources: '',
    commentPhotographResources: '',
    resourceRegister: '',
    refereeResourceRegister: '',
    commentResourceRegister: '',
    resourcePhotography: '',
    refereeResourcePhotography: '',
    commentResourcePhotography: '',
  });

  useEffect(() => {
    setIsAdmin(localStorage.getItem('userRole') === 'admin');
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/api/data/getDataEmail/${emailUser}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = response.data.localOperaFirst[0];
      console.log(data);
      setFormData(prevFormData => ({
        ...prevFormData,
        ...data,
        scopeSurveyNest: data.scopeSurveyNest || prevFormData.scopeSurveyNest
      }));
    } catch (error) {
      console.error('Error fetching user data', error);
    }
  };

  const rows = [
    { colSpan: 6, title: "1. การดำเนินงานปกปักทรัพยากรท้องถิ่น (100 คะแนน)" },
    {
      title: "1.1 การกำหนดขอบเขตพื้นที่ และสำรวจทรัพยากรในพื้นที่ปกปักทรัพยากรท้องถิ่น (20 คะแนน)",
      name: "scopeSurvey",
      max: 20,
      details: [
        { title: "1) การกำหนดขอบเขตพื้นที่ปกปักทรัพยากรท้องถิ่น (5 คะแนน)", name: "defineScope", max: 5, nestedTable: true },
        { title: "2) การสำรวจทรัพยากรในพื้นที่ปกปักทรัพยากรท้องถิ่น (5 คะแนน)", name: "surveyResources", max: 5 },
        { title: "3) การจำแนกชนิดทรัพยากรในพื้นที่ปกปักทรัพยากรท้องถิ่น(5 คะแนน)", name: "classifyResources", max: 5 },
        { title: "4) การติดรหัสประจำชนิด (5 คะแนน)", name: "tagResources", max: 5 },
      ],
    },
    { title: "1.2 การทำผังแสดงขอบเขตพื้นที่ปกปักทรัพยากรท้องถิ่น (10 คะแนน)", name: "areaMap", max: 10 },
    {
      colSpan: 6,
      title: "1.3 การศึกษาทรัพยากรในพื้นที่ปกปักทรัพยากรท้องถิ่น (20 คะแนน)",
      details: [
        { title: "1) การศึกษาทรัพยากรในพื้นที่ปกปักทรัพยากรท้องถิ่น (10 คะแนน)", name: "studyResources", max: 10 },
        { title: "2) การถ่ายภาพทรัพยากรในพื้นที่ปกปักทรัพยากรท้องถิ่น (10 คะแนน)", name: "photographResources", max: 10 },
      ],
    },
    { title: "1.4 การทำตัวอย่างทรัพยากรในพื้นที่ปกปักทรัพยากรท้องถิ่น (20 คะแนน)", name: "resourceSamples", max: 20 },
    {
      colSpan: 6,
      title: "1.5 การทำทะเบียนทรัพยากรในพื้นที่ปกปักทรัพยากรท้องถิ่น (10 คะแนน)",
      details: [
        { title: "1) การทำทะเบียนทรัพยากรในพื้นที่ปกปักทรัพยากรท้องถิ่นตามแบบ อพ.สธ. (5 คะแนน)", name: "resourceRegister", max: 5 },
        { title: "2) การถ่ายภาพทรัพยากรในพื้นที่ปกปักทรัพยากรท้องถิ่น (10 คะแนน)", name: "resourcePhotography", max: 10 },
      ],
    },
    { title: "1.6 การดูแลรักษาทรัพยากรในพื้นที่ปกปักทรัพยากรท้องถิ่น (20 คะแนน)", name: "resourceConservation", max: 20 },
    { colSpan: 6, title: "รวมคะแนนที่ได้ งานที่ 1 งานปกปักทรัพยากรท้องถิ่น" },
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const numericValue = value === '' ? 0 : parseFloat(value);
    setFormData(prevFormData => ({
      ...prevFormData,
      [name]: numericValue
    }));
  };

  const handleCommentInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevFormData => ({
      ...prevFormData,
      [name]: value
    }));
  };

  return (
    <div className='lmf-container'>
      <div className='lmf-header'>
        <Navbar />
      </div>
      <div className='lmf-body'>
        <table id="lmf-table">
          <thead>
            <tr>
              <th>รายการประเมิน<p>(คะแนนเต็ม 200 คะแนน)</p></th>
              <th>องค์กรปกครองส่วนท้องถิ่น</th>
              <th>กรรมการ</th>
              <th>ข้อเสนอแนะ</th>
            </tr>
          </thead>
          <tbody>
            {rows.map(({ colSpan, title, name, max, details, nestedTable, center, fontSize }, index) => (
              <React.Fragment key={index}>
                {colSpan ? (
                  <tr>
                    <td colSpan={colSpan} style={center ? { textAlign: 'center', fontSize: fontSize } : {}}><b>{title}</b></td>
                  </tr>
                ) : (
                  <tr>
                    <td className="tabb">
                      {title}
                      {details && details.map((detail, detailIndex) => (
                        <p key={`${index}-${detailIndex}`} className="tabb">{detail.title}</p>
                      ))}
                      {nestedTable && (
                        <table id="Nested-table">
                          <thead>
                            <tr>
                              <th>ปีงบประมาณ</th>
                              <th>งบประมาณ<p>(บาท)</p></th>
                              <th>ค่าใช้จ่าย<p>(บาท)</p></th>
                              <th>ยอดคงเหลือ<p>(บาท)</p></th>
                            </tr>
                          </thead>
                          <tbody>
                            {formData.scopeSurveyNest && formData.scopeSurveyNest.map((detail, i) => (
                              <tr key={`nested-${i}`}>
                                <td><input type="number" className="score-input" data-index={i} data-field="year" value={detail.defineScope || ''} min="0" max="99" onChange={handleInputChange} disabled={isAdmin} /></td>
                                <td><input type="number" className={`r${i}d1-input`} data-index={i} data-field="budget" value={detail.surveyResources || ''} min="0" max={9007199254740991} onChange={handleInputChange} disabled={isAdmin} /></td>
                                <td><input type="number" className={`r${i}d2-input`} data-index={i} data-field="expense" value={detail.classifyResources || ''} min="0" max={9007199254740991} onChange={handleInputChange} disabled={isAdmin} /></td>
                                <td><input type="number" className={`r${i}d3-input`} data-index={i} data-field="remaining" value={detail.tagResources || ''} min="0" max={9007199254740991} onChange={handleInputChange} disabled={isAdmin} /></td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      )}
                    </td>
                    <td>
                      <input
                        type="number"
                        className="score-input"
                        name={name}
                        value={formData[name] || ''}
                        min="0"
                        max={max}
                        onChange={handleInputChange}
                        data-min="0"
                        data-max={max}
                        disabled={isAdmin}
                      />
                    </td>
                    <td>
                      <input
                        type="number"
                        className="referee-score-input"
                        name={`referee${name.charAt(0).toUpperCase() + name.slice(1)}`}
                        min="0"
                        max={max}
                        value={formData[`referee${name.charAt(0).toUpperCase() + name.slice(1)}`] || ''}
                        onChange={handleInputChange}
                        data-min="0"
                        data-max={max}
                        disabled={!isAdmin}
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        className="comment"
                        name={`comment${name.charAt(0).toUpperCase() + name.slice(1)}`}
                        onChange={handleCommentInputChange}
                        value={formData[`comment${name.charAt(0).toUpperCase() + name.slice(1)}`] || ''}
                        disabled={!isAdmin}
                      />
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
      <div className='lmf-footer'></div>
    </div>
  );
};

export default LocalOperaFirst;
