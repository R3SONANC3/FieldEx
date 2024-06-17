import React from 'react';
import Navbar from '../../Navbar';
import './localform.css';
import { useNavigate } from 'react-router-dom';

// Component to render a nested table
const NestedTable = () => (
    <table id="Nested-table">
        <thead>
            <tr>
                <th>ปีงบประมาณ</th>
                <th>จำนวนพื้นที่ปกปักทรัพยากรท้องถิ่น (พื้นที่)</th>                                                         
            </tr>
        </thead>
        <tbody>
            <tr>
                <td><span className="row1-year"></span><input type="number" className="score-input" min="0" max="99" /></td>
                <td><input type="number" className="r1d1-input" min="0" max="9007199254740991" /></td>
            </tr>
            <tr>
                <td><span className="row2-year"></span><input type="number" className="score-input" min="0" max="99" /></td>
                <td><input type="number" className="r2d1-input" min="0" max="9007199254740991" /></td>
            </tr>
        </tbody>
    </table>
);

// Component to render a table row
const TableRow = ({ title, maxScore, nested }) => (
    <tr>
        <td className="tabbb">
            {title} ({maxScore} คะแนน)
            {nested && <NestedTable />}
        </td>
        <td><input type="number" className="score-input" min="0" max={maxScore} /></td>
        <td><input type="number" className="referee-score-input" min="0" max={maxScore} /></td>
        <td><input type="text" className="comment" /></td>
    </tr>
);

function LocalOperaFirst() {
  const navigate = useNavigate();
    const tableData = [
        { id: '1.1', title: '1.การกำหนดขอบเขตพื้นที่ และสำรวจทรัพยากรในพื้นที่ปกปักทรัพยากรท้องถิ่น', maxScore: 20, subSections: [
            { subTitle: '1) การกำหนดขอบเขตพื้นที่ปกปักทรัพยากรท้องถิ่น ', score: 5, nested: true },
            { subTitle: '2) การสำรวจทรัพยากรในพื้นที่ปกปักทรัพยากรท้องถิ่น', score: 5 },
            { subTitle: '3) การจำแนกชนิดทรัพยากรในพื้นที่ปกปักทรัพยากรท้องถิ่น', score: 5 },
            { subTitle: '4) การติดรหัสประจำชนิด', score: 5 },
        ] },
        { id: '1.2', title: '1.2 การทำผังแสดงขอบเขตพื้นที่ปกปักทรัพยากรท้องถิ่น', maxScore: 10 },
        { id: '1.3', title: '1.3 การศึกษาทรัพยากรในพื้นที่ปกปักทรัพยากรท้องถิ่น', maxScore: 20, subSections: [
            { subTitle: '1) การศึกษาทรัพยากรในพื้นที่ปกปักทรัพยากรท้องถิ่น', score: 10 },
            { subTitle: '2) การถ่ายภาพทรัพยากรในพื้นที่ปกปักทรัพยากรท้องถิ่น', score: 10 },
        ] },
        { id: '1.4', title: '1.4 การทำตัวอย่างทรัพยากรในพื้นที่ปกปักทรัพยากรท้องถิ่น', maxScore: 20 },
        { id: '1.5', title: '1.5 การทำทะเบียนทรัพยากรในพื้นที่ปกปักทรัพยากรท้องถิ่น', maxScore: 10, subSections: [
            { subTitle: '1) การทำทะเบียนทรัพยากรในพื้นที่ปกปักทรัพยากรท้องถิ่นตามแบบ อพ.สธ.', score: 5 },
            { subTitle: '2) การถ่ายภาพทรัพยากรในพื้นที่ปกปักทรัพยากรท้องถิ่น', score: 10 },
        ] },
        { id: '1.6', title: '1.6 การดูแลรักษาทรัพยากรในพื้นที่ปกปักทรัพยากรท้องถิ่น', subSections:[
          {subTitle:'-แบบบันทึกการดูแลรักษาทรัพยากรในพื้นที่ปกปักทรัพยากรท้องถิ่น เช่น การทำแนวกันไฟ การทำฝายชะลอน้ำ อาสาสมัครดูแลรักษาพื้นที่ปกปักทรัพยากรท้องถิ่น ฯลฯ',score: 20 }
        ]}
    ];

    const goBack = () => {
      navigate('/localmanage')
    };

    const goNextPage = () => {
      navigate('/localoperasecond')
    };

    return (
        <div className='lmf-container'>
            <div className='lmf-header'>
                <Navbar />
            </div>
            <div className='lmf-body'>
                <div className='lmf-text'>
                    <h1>ด้านที่ 2 การดำเนินงาน : <small>งานที่ 1 งานปกปักทรัพยากรท้องถิ่น</small></h1>
                </div>
            </div>
            <div className='lmf-table'>
                <table id="lmf-table">
                    <thead>
                        <tr>
                            <th>รายการประเมิน<p>(คะแนนเต็ม 100 คะแนน)</p></th>
                            <th>องค์กรปกครองส่วนท้องถิ่น</th>
                            <th>กรรมการ</th>
                            <th>ข้อเสนอแนะ</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tableData.map(section => (
                            <React.Fragment key={section.id}>
                                <tr>
                                    <td colSpan="4"><b>{section.title} ({section.maxScore} คะแนน)</b></td>
                                </tr>
                                {section.subSections && section.subSections.map(sub => (
                                    <TableRow key={sub.subTitle} title={sub.subTitle} maxScore={sub.score} nested={sub.nested} />
                                ))}
                            </React.Fragment>
                        ))}
                        <tr>
                            <td colSpan="4"><b>รวมคะแนนที่ได้ งานที่ 1 งานปกปักทรัพยากรท้องถิ่น</b></td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div className='lmf-footer'>
                <div className="button">
                    <div className="button-back">
                        <button onClick={goBack}>ย้อนกลับ</button>
                    </div>
                    <div className="button-next">
                        <button onClick={goNextPage}>ถัดไป</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LocalOperaFirst;
