import React, { useState, useEffect } from 'react';
import Navbar from '../../Navbar';
import './localform.css';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';

function LocalManage() {
    const [isAdmin, setIsAdmin] = useState(false);
    const location = useLocation();
    const emailUser = location.state?.emailUser;
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        localMeetingAgenda: 0,
        localMemberSignatures: 0,
        meetingMinutes: 0,
        photos: 0,
        appointmentOrder: 0,
        subcommittee: 0,
        managementPlan: 0,
        protectionPlan: 0,
        surveyPlan: 0,
        coordination: 0,
        expenseSummary: 0,
        meetingInvite: 0,
        thankYouNote: 0,
        operationResults: 0,
        analysisResults: 0,
        improvementPlan: 0,
        annualReport: 0,
        budgetDetails: [
            { year: 0, budget: 0, expense: 0, remaining: 0 },
            { year: 0, budget: 0, expense: 0, remaining: 0 }
        ]
    });

    const token = localStorage.getItem('token');

    useEffect(() => {
        setIsAdmin(localStorage.getItem('userRole') === 'admin');
        if (!token) {
            navigate('/');
        } else {
            fetchUserData();
        }
    }, [navigate, token]);

    const handleInputChange = (e) => {
        const { name, value, dataset } = e.target;
        const { index, field } = dataset;

        const numericValue = value === '' ? 0 : parseFloat(value);

        if (index !== undefined) {
            const updatedBudgetDetails = formData.budgetDetails.map((detail, i) =>
                i === parseInt(index) ? { ...detail, [field]: numericValue } : detail
            );
            setFormData(prevFormData => ({
                ...prevFormData,
                budgetDetails: updatedBudgetDetails
            }));
        } else {
            setFormData(prevFormData => ({
                ...prevFormData,
                [name]: numericValue
            }));
        }
    };

    const fetchUserData = async () => {
        try {
          const response = await axios.get(`http://localhost:8000/api/getDataEmail/${emailUser}`);
          const data = response.data.localManageData[0] || {}; // Assuming there's only one object in the array

          const updatedFormData = {
              localMeetingAgenda: data.localMeetingAgenda || 0,
              localMemberSignatures: data.localMemberSignatures || 0,
              meetingMinutes: data.meetingMinutes || 0,
              photos: data.photos || 0,
              appointmentOrder: data.appointmentOrder || 0,
              subcommittee: data.subcommittee || 0,
              managementPlan: data.managementPlan || 0,
              protectionPlan: data.protectionPlan || 0,
              surveyPlan: data.surveyPlan || 0,
              coordination: data.coordination || 0,
              expenseSummary: data.expenseSummary || 0,
              meetingInvite: data.meetingInvite || 0,
              thankYouNote: data.thankYouNote || 0,
              operationResults: data.operationResults || 0,
              analysisResults: data.analysisResults || 0,
              improvementPlan: data.improvementPlan || 0,
              annualReport: data.annualReport || 0,
              budgetDetails: [
                  {
                      year: data.budget1_year || 0,
                      budget: parseFloat(data.budget1_budget) || 0,
                      expense: parseFloat(data.budget1_expense) || 0,
                      remaining: parseFloat(data.budget1_remaining) || 0,
                  },
                  {
                      year: data.budget2_year || 0,
                      budget: parseFloat(data.budget2_budget) || 0,
                      expense: parseFloat(data.budget2_expense) || 0,
                      remaining: parseFloat(data.budget2_remaining) || 0,
                  },
              ],
          };
          setFormData(updatedFormData);
        } catch (error) {
          console.error("Error fetching user data", error);
        }
      };
    

    const fetchOldData = async () => {
        try {
            const response = await axios.get('http://localhost:8000/api/fetchData', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            const data = response.data.localManageData[0] || {}; // Assuming there's only one object in the array

            const updatedFormData = {
                localMeetingAgenda: data.localMeetingAgenda || 0,
                localMemberSignatures: data.localMemberSignatures || 0,
                meetingMinutes: data.meetingMinutes || 0,
                photos: data.photos || 0,
                appointmentOrder: data.appointmentOrder || 0,
                subcommittee: data.subcommittee || 0,
                managementPlan: data.managementPlan || 0,
                protectionPlan: data.protectionPlan || 0,
                surveyPlan: data.surveyPlan || 0,
                coordination: data.coordination || 0,
                expenseSummary: data.expenseSummary || 0,
                meetingInvite: data.meetingInvite || 0,
                thankYouNote: data.thankYouNote || 0,
                operationResults: data.operationResults || 0,
                analysisResults: data.analysisResults || 0,
                improvementPlan: data.improvementPlan || 0,
                annualReport: data.annualReport || 0,
                budgetDetails: [
                    {
                        year: data.budget1_year || 0,
                        budget: parseFloat(data.budget1_budget) || 0,
                        expense: parseFloat(data.budget1_expense) || 0,
                        remaining: parseFloat(data.budget1_remaining) || 0,
                    },
                    {
                        year: data.budget2_year || 0,
                        budget: parseFloat(data.budget2_budget) || 0,
                        expense: parseFloat(data.budget2_expense) || 0,
                        remaining: parseFloat(data.budget2_remaining) || 0,
                    },
                ],
            };

            setFormData(updatedFormData);
        } catch (error) {
            console.error('There was an error fetching the form data!', error);
        }
    };

    const handleSubmit = async () => {
        try {
            const response = await axios.post('http://localhost:8000/submit', formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            console.log(response.data);
            // Optionally, perform navigation or display success message
        } catch (error) {
            console.error('There was an error submitting the form!', error);
            // Optionally, display an error message to the user
        }
    };

    const rows = [
        { colSpan: 6, title: "1.1 องค์กรปกครองส่วนท้องถิ่น ชุมชน และสถานศึกษา มีส่วนร่วมในการจัดทำฐานทรัพยากรท้องถิ่น (30 คะแนน)" },
        { colSpan: 6, title: "1) รายงานการประชุม (20 คะแนน)" },
        { title: "- วาระการประชุมเรื่องเกี่ยวกับการจัดทำฐานทรัพยากรท้องถิ่น (10 คะแนน)", name: "localMeetingAgenda", max: 10 },
        { title: "- รายชื่อ ลายมือชื่อของสมาชิกองค์กรปกครองส่วนท้องถิ่น กำนัน ผู้ใหญ่บ้าน ชุมชน ผู้รู้ในท้องถิ่น ผู้บริหารสถานศึกษา และผู้ที่เกี่ยวข้องเกี่ยวกับการจัดทำฐานทรัพยากรท้องถิ่น (10 คะแนน)", name: "localMemberSignatures", max: 10 },
        { colSpan: 6, title: "2) หลักฐานที่แสดงถึงการมีส่วนร่วม (10 คะแนน)" },
        { title: "- บันทึกการประชุม (5 คะแนน)", name: "meetingMinutes", max: 5 },
        { title: "- ภาพถ่าย (5 คะแนน)", name: "photos", max: 5 },
        { colSpan: 6, title: "1.2 แต่งตั้งคณะกรรมการดำเนินงานการจัดทำฐานทรัพยากรท้องถิ่น (30 คะแนน)" },
        { title: "1) คำสั่งแต่งตั้งคณะกรรมการดำเนินงานฐานทรัพยากรท้องถิ่นคำสั่ง 3 ด้าน (15 คะแนน)", name: "appointmentOrder", max: 15 },
        {
            title: "2) คณะอนุกรรมการศูนย์อนุรักษ์และพัฒนาทรัพยากรท้องถิ่น (15 คะแนน)",
            name: "subcommittee", max: 15,
            details: [
                "1.คณะทำงานปกปักทรัพยากรท้องถิ่น",
                "2.คณะทำงานสำรวจเก็บรวบรวมทรัพยากรท้องถิ่น",
                "3.คณะทำงานปลูกรักษาทรัพยากรท้องถิ่น",
                "4.คณะทำงานอนุรักษ์และใช้ประโยชน์ทรัพยากรท้องถิ่น",
                "5.คณะทำงานศูนย์ข้อมูลทรัพยากรท้องถิ่น",
                "6.คณะทำงานสนับสนุนในการอนุรักษ์และจัดทำฐานทรัพยากรท้องถิ่น"
            ]
        },
        { colSpan: 6, title: "1.3 วางแผนการบริหารและแผนการดำเนินงานการจัดทำฐานทรัพยากรท้องถิ่น (40 คะแนน)" },
        { title: "1) แผนการดำเนินงานด้านการบริหาร โดยเขียนแผนการจัดทำฐานทรัพยากรท้องถิ่น รวมกับแผนพัฒนา แผนงานประจำปีขององค์กรปกครองส่วนท้องถิ่นแสดงผังงาน Flow Chart แสดงขั้นตอนอย่างชัดเจน (20 คะแนน)", name: "managementPlan", max: 20 },
        { title: "2) แผนการปกปัก (10 คะแนน)", name: "protectionPlan", max: 10 },
        { title: "3) แผนการสำรวจเก็บรวบรวม (10 คะแนน)", name: "surveyPlan", max: 10 },
        { colSpan: 6, title: "1.4 ดำเนินงานตามแผน (20 คะแนน)" },
        {
            title: "การประสานงานของคณะกรรมการดำเนินงาน คณะอนุกรรมการ ศูนย์อนุรักษ์พัฒนาทรัพยากรท้องถิ่นตำบลกับหน่วยงานต่างๆ",
            name: "coordination", max: 20,
            nestedTable: true
        },
        { title: "1) เอกสารสรุปค่าใช้จ่ายในการดำเนินการจัดทำฐานทรัพยากรท้องถิ่น ลงนามชื่อผู้บริหาร หัวหน้างาน (10 คะแนน)", name: "expenseSummary", max: 10 },
        { title: "2) หนังสือเชิญประชุม (5 คะแนน)", name: "meetingInvite", max: 5 },
        { title: "3) หนังสือขอบคุณผู้เข้าร่วมประชุม (5 คะแนน)", name: "thankYouNote", max: 5 },
        { colSpan: 6, title: "1.5 สรุปและประเมินผลการดำเนินงาน (20 คะแนน)" },
        { title: "1) ผลการดำเนินงาน 6 งานฐานทรัพยากรท้องถิ่น (20 คะแนน)", name: "operationResults", max: 20 },
        { colSpan: 6, title: "1.6 วิเคราะห์ผลและปรับปรุงพัฒนางาน (20 คะแนน)" },
        { title: "1) วิเคราะห์ผล และหาข้อสรุป (10 คะแนน)", name: "analysisResults", max: 10 },
        { title: "2) วางแผน ปรับปรุง และพัฒนาการดำเนินงานในปีต่อไป (10 คะแนน)", name: "improvementPlan", max: 10 },
        { colSpan: 6, title: "1.7 รายงานผลการดำเนินงานฐานทรัพยากรท้องถิ่น ประจำปีงบประมาณให้ อพ.สธ. อย่างน้อยปีละ 1 ครั้ง (40 คะแนน)" },
        {
            title: "รายงานผลการดำเนินงานฐานทรัพยากรท้องถิ่นโดยแสดงหลักฐานตั้งแต่ข้อ 1.1 – 1.6",
            name: "annualReport", max: 40
        },
        { colSpan: 6, title: "รวมคะแนนที่ได้ ด้านที่ 1 การบริหารและการจัดการ", center: true, fontSize: "18px" }
    ];

    return (
        <div className="lmf-container">
            <div className="lmf-header"><Navbar /></div>
            <div className="lmf-body">
                <div className="lmf-text"><h2>ด้านที่ 1 การบริหารและการจัดการ</h2></div>
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
                                                <p key={`${index}-${detailIndex}`} className="tabb">{detail}</p>
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
                                                        {formData.budgetDetails.map((detail, i) => (
                                                            <tr key={`nested-${i}`}>
                                                                <td><input type="number" className="score-input" data-index={i} data-field="year" value={detail.year} min="0" max="99" onChange={handleInputChange} disabled={isAdmin}/></td>
                                                                <td><input type="number" className={`r${i}d1-input`} data-index={i} data-field="budget" value={detail.budget} min="0" max={9007199254740991} onChange={handleInputChange} disabled={isAdmin}/></td>
                                                                <td><input type="number" className={`r${i}d2-input`} data-index={i} data-field="expense" value={detail.expense} min="0" max={9007199254740991} onChange={handleInputChange} disabled={isAdmin}/></td>
                                                                <td><input type="number" className={`r${i}d3-input`} data-index={i} data-field="remaining" value={detail.remaining} min="0" max={9007199254740991} onChange={handleInputChange} disabled={isAdmin} /></td>
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
                                                onChange={handleInputChange}
                                                disabled={!isAdmin}
                                            />
                                        </td>
                                    </tr>
                                )}
                            </React.Fragment>
                        ))}
                    </tbody>
                </table>
                <button onClick={handleSubmit}>Submit</button>
            </div>
        </div>
    );
}

export default LocalManage;
