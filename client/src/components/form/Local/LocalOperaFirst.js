import React from 'react'
import Navbar from '../../Navbar'

function LocalOperaFirst() {
  const rows = [
    { colspan: 6, title: "1. การดำเนินงานปกปักทรัพยากรท้องถิ่น (100 คะแนน)" },
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
      colspan: 6,
      title: "1.3 การศึกษาทรัพยากรในพื้นที่ปกปักทรัพยากรท้องถิ่น (20 คะแนน)",
      details: [
        { title: "1) การศึกษาทรัพยากรในพื้นที่ปกปักทรัพยากรท้องถิ่น (10 คะแนน)", name: "studyResources", max: 10 },
        { title: "2) การถ่ายภาพทรัพยากรในพื้นที่ปกปักทรัพยากรท้องถิ่น (10 คะแนน)", name: "photographResources", max: 10 },
      ],
    },
    { title: "1.4 การทำตัวอย่างทรัพยากรในพื้นที่ปกปักทรัพยากรท้องถิ่น (20 คะแนน)", name: "resourceSamples", max: 20 },
    {
      colspan: 6,
      title: "1.5 การทำทะเบียนทรัพยากรในพื้นที่ปกปักทรัพยากรท้องถิ่น (10 คะแนน)",
      details: [
        { title: "1) การทำทะเบียนทรัพยากรในพื้นที่ปกปักทรัพยากรท้องถิ่นตามแบบ อพ.สธ. (5 คะแนน)", name: "resourceRegister", max: 5 },
        { title: "2) การถ่ายภาพทรัพยากรในพื้นที่ปกปักทรัพยากรท้องถิ่น (10 คะแนน)", name: "resourcePhotography", max: 10 },
      ],
    },
    {
      title: "1.6 การดูแลรักษาทรัพยากรในพื้นที่ปกปักทรัพยากรท้องถิ่น (20 คะแนน)",
      name: "resourceConservation",
      max: 20,
    },
    { colspan: 6, title: "รวมคะแนนที่ได้ งานที่ 1 งานปกปักทรัพยากรท้องถิ่น" },
  ]

  return (
    <div className='lmf-container'>
      <div className='lmf-header'><Navbar /></div>
      <div className='lmf-body'>
        <div className="lmf-text"><h1>ด้านที่ 2 การดำเนินงาน : <small>งานที่ 1 งานปกปักทรัพยากรท้องถิ่น</small></h1></div>
        <table id='lmf-table'>
          <thead>
            <tr>
              <th>รายการประเมิน<p>(คะแนนเต็ม 100 คะแนน)</p></th>
              <th>องค์กรปกครองส่วนท้องถิ่น</th>
              <th>กรรมการ</th>
              <th>ข้อเสนอแนะ</th>
            </tr>
          </thead>
          <tbody>
            {rows.map(({ colspan, title, details, name, max }, index) => (
              <React.Fragment key={index}>
                {colspan ? (
                  <tr>
                    <td colSpan={colspan}><b>{title}</b></td>
                  </tr>
                ) : (
                  <React.Fragment>
                    <tr>
                      <td className={details ? 'tabb' : ''}>{title}</td>
                      <td><input type="number" className="score-input" name={name} min="0" max={max} /></td>
                      <td><input type="number" className="referee-score-input" name={`referee${name}`} min="0" max={max} readOnly /></td>
                      <td><input type="text" className="comment" name={`comment${name}`} readOnly /></td>
                    </tr>
                    {details && details.map((detail, detailIndex) => (
                      <tr key={detailIndex}>
                        <td className='tabbbb'>{detail.title}</td>
                        <td><input type="number" className="score-input" name={detail.name} min="0" max={detail.max} /></td>
                        <td><input type="number" className="referee-score-input" name={`referee${detail.name}`} min="0" max={detail.max} readOnly /></td>
                        <td><input type="text" className="comment" name={`comment${detail.name}`} readOnly /></td>
                      </tr>
                    ))}
                  </React.Fragment>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
      <div className='lmf-footer'>
        <div className="button">
          <div className="button-back">
            <button onClick={() => window.location.href = 'side1.html'}>ย้อนกลับ</button>
          </div>
          <div className="button-next">
            <button onClick={() => window.location.href = 'side3.html'}>ถัดไป</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LocalOperaFirst
