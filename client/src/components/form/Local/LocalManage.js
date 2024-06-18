import React, { useState, useEffect } from 'react';
import Navbar from '../../Navbar';
import './localform.css';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';

function LocalManage() {
    const [isAdmin, setIsAdmin] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();
    // const emailUser = location.state?.emailUser;
    const emailUser = 'test2@gmail.com'
    const [formData, setFormData] = useState({
        localMeetingAgenda: 0,
        refereeLocalMeetingAgenda: 0,
        commentLocalMeetingAgenda: '',
        localMemberSignatures: 0,
        refereeLocalMemberSignatures: 0,
        commentLocalMemberSignatures: '',
        meetingMinutes: 0,
        refereeMeetingMinutes: 0,
        commentMeetingMinutes: '',
        photos: 0,
        refereePhotos: 0,
        commentPhotos: '',
        appointmentOrder: 0,
        refereeAppointmentOrder: 0,
        commentAppointmentOrder: '',
        subcommittee: 0,
        refereeSubcommittee: 0,
        commentSubcommittee: '',
        managementPlan: 0,
        refereeManagementPlan: 0,
        commentManagementPlan: '',
        protectionPlan: 0,
        refereeProtectionPlan: 0,
        commentProtectionPlan: '',
        surveyPlan: 0,
        refereeSurveyPlan: 0,
        commentSurveyPlan: '',
        coordination: 0,
        refereeCoordination: 0,
        commentCoordination: '',
        expenseSummary: 0,
        refereeExpenseSummary: 0,
        commentExpenseSummary: '',
        meetingInvite: 0,
        refereeMeetingInvite: 0,
        commentMeetingInvite: '',
        thankYouNote: 0,
        refereeThankYouNote: 0,
        commentThankYouNote: '',
        operationResults: 0,
        refereeOperationResults: 0,
        commentOperationResults: '',
        analysisResults: 0,
        refereeAnalysisResults: 0,
        commentAnalysisResults: '',
        improvementPlan: 0,
        refereeImprovementPlan: 0,
        commentImprovementPlan: '',
        annualReport: 0,
        refereeAnnualReport: 0,
        commentAnnualReport: '',
        emailUser: emailUser,
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
            if (emailUser) {
                fetchUserData();
            } else {
                fetchOldData();
            }
        }
    }, [navigate, token]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;

        // Check if the input name starts with 'comment'
        if (name.startsWith('comment')) {
            const fieldName = name.substring(7); // Remove 'comment' prefix
            setFormData(prevFormData => ({
                ...prevFormData,
                [`comment${fieldName}`]: value  // Update comment field
            }));
        } else {
            // Handle numeric score or other fields here
            const numericValue = value === '' ? 0 : parseFloat(value);
            setFormData(prevFormData => ({
                ...prevFormData,
                [name]: numericValue
            }));
        }
    };

    const fetchUserData = async () => {
        try {
            const response = await axios.get(`http://localhost:8000/api/data/getDataEmail/${emailUser}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            const data = response.data.localManageData[0] || {};

            const updatedFormData = {
                localMeetingAgenda: data.localMeetingAgenda || 0,
                refereeLocalMeetingAgenda: data.refereeLocalMeetingAgenda || 0,
                commentLocalMeetingAgenda: data.commentLocalMeetingAgenda || '',
                localMemberSignatures: data.localMemberSignatures || 0,
                refereeLocalMemberSignatures: data.refereeLocalMemberSignatures || 0,
                commentLocalMemberSignatures: data.commentLocalMemberSignatures || '',
                meetingMinutes: data.meetingMinutes || 0,
                refereeMeetingMinutes: data.refereeMeetingMinutes || 0,
                commentMeetingMinutes: data.commentMeetingMinutes || '',
                photos: data.photos || 0,
                refereePhotos: data.refereePhotos || 0,
                commentPhotos: data.commentPhotos || '',
                appointmentOrder: data.appointmentOrder || 0,
                refereeAppointmentOrder: data.refereeAppointmentOrder || 0,
                commentAppointmentOrder: data.commentAppointmentOrder || '',
                subcommittee: data.subcommittee || 0,
                refereeSubcommittee: data.refereeSubcommittee || 0,
                commentSubcommittee: data.commentSubcommittee || '',
                managementPlan: data.managementPlan || 0,
                refereeManagementPlan: data.refereeManagementPlan || 0,
                commentManagementPlan: data.commentManagementPlan || '',
                protectionPlan: data.protectionPlan || 0,
                refereeProtectionPlan: data.refereeProtectionPlan || 0,
                commentProtectionPlan: data.commentProtectionPlan || '',
                surveyPlan: data.surveyPlan || 0,
                refereeSurveyPlan: data.refereeSurveyPlan || 0,
                commentSurveyPlan: data.commentSurveyPlan || '',
                coordination: data.coordination || 0,
                refereeCoordination: data.refereeCoordination || 0,
                commentCoordination: data.commentCoordination || '',
                expenseSummary: data.expenseSummary || 0,
                refereeExpenseSummary: data.refereeExpenseSummary || 0,
                commentExpenseSummary: data.commentExpenseSummary || '',
                meetingInvite: data.meetingInvite || 0,
                refereeMeetingInvite: data.refereeMeetingInvite || 0,
                commentMeetingInvite: data.commentMeetingInvite || '',
                thankYouNote: data.thankYouNote || 0,
                refereeThankYouNote: data.refereeThankYouNote || 0,
                commentThankYouNote: data.commentThankYouNote || '',
                operationResults: data.operationResults || 0,
                refereeOperationResults: data.refereeOperationResults || 0,
                commentOperationResults: data.commentOperationResults || '',
                analysisResults: data.analysisResults || 0,
                refereeAnalysisResults: data.refereeAnalysisResults || 0,
                commentAnalysisResults: data.commentAnalysisResults || '',
                improvementPlan: data.improvementPlan || 0,
                refereeImprovementPlan: data.refereeImprovementPlan || 0,
                commentImprovementPlan: data.commentImprovementPlan || '',
                annualReport: data.annualReport || 0,
                refereeAnnualReport: data.refereeAnnualReport || 0,
                commentAnnualReport: data.commentAnnualReport || '',
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
            const response = await axios.get('http://localhost:8000/api/data/fetchData', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            const data = response.data.localManageData[0] || {};

            const updatedFormData = {
                localMeetingAgenda: data.localMeetingAgenda || 0,
                refereeLocalMeetingAgenda: data.refereeLocalMeetingAgenda || 0,
                commentLocalMeetingAgenda: data.commentLocalMeetingAgenda || '',
                localMemberSignatures: data.localMemberSignatures || 0,
                refereeLocalMemberSignatures: data.refereeLocalMemberSignatures || 0,
                commentLocalMemberSignatures: data.commentLocalMemberSignatures || '',
                meetingMinutes: data.meetingMinutes || 0,
                refereeMeetingMinutes: data.refereeMeetingMinutes || 0,
                commentMeetingMinutes: data.commentMeetingMinutes || '',
                photos: data.photos || 0,
                refereePhotos: data.refereePhotos || 0,
                commentPhotos: data.commentPhotos || '',
                appointmentOrder: data.appointmentOrder || 0,
                refereeAppointmentOrder: data.refereeAppointmentOrder || 0,
                commentAppointmentOrder: data.commentAppointmentOrder || '',
                subcommittee: data.subcommittee || 0,
                refereeSubcommittee: data.refereeSubcommittee || 0,
                commentSubcommittee: data.commentSubcommittee || '',
                managementPlan: data.managementPlan || 0,
                refereeManagementPlan: data.refereeManagementPlan || 0,
                commentManagementPlan: data.commentManagementPlan || '',
                protectionPlan: data.protectionPlan || 0,
                refereeProtectionPlan: data.refereeProtectionPlan || 0,
                commentProtectionPlan: data.commentProtectionPlan || '',
                surveyPlan: data.surveyPlan || 0,
                refereeSurveyPlan: data.refereeSurveyPlan || 0,
                commentSurveyPlan: data.commentSurveyPlan || '',
                coordination: data.coordination || 0,
                refereeCoordination: data.refereeCoordination || 0,
                commentCoordination: data.commentCoordination || '',
                expenseSummary: data.expenseSummary || 0,
                refereeExpenseSummary: data.refereeExpenseSummary || 0,
                commentExpenseSummary: data.commentExpenseSummary || '',
                meetingInvite: data.meetingInvite || 0,
                refereeMeetingInvite: data.refereeMeetingInvite || 0,
                commentMeetingInvite: data.commentMeetingInvite || '',
                thankYouNote: data.thankYouNote || 0,
                refereeThankYouNote: data.refereeThankYouNote || 0,
                commentThankYouNote: data.commentThankYouNote || '',
                operationResults: data.operationResults || 0,
                refereeOperationResults: data.refereeOperationResults || 0,
                commentOperationResults: data.commentOperationResults || '',
                analysisResults: data.analysisResults || 0,
                refereeAnalysisResults: data.refereeAnalysisResults || 0,
                commentAnalysisResults: data.commentAnalysisResults || '',
                improvementPlan: data.improvementPlan || 0,
                refereeImprovementPlan: data.refereeImprovementPlan || 0,
                commentImprovementPlan: data.commentImprovementPlan || '',
                annualReport: data.annualReport || 0,
                refereeAnnualReport: data.refereeAnnualReport || 0,
                commentAnnualReport: data.commentAnnualReport || '',
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

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8000/api/data/localsubmit', {
                ...formData,
                emailUser: emailUser
            }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            console.log(formData);
            console.log("Submit response:", response.data);
            navigate('/localoperafirst')
            // Redirect or show success message
        } catch (error) {
            console.error("Error submitting data:", error);
            // Handle error, show error message
        }
    };

    const goBack = () => {
        navigate('/localmanage')
    };


    const handleCommentInputChange = (e) => {
        const { name, value } = e.target;

        // Check if the input name starts with 'comment'
        if (name.startsWith('comment')) {
            const fieldName = name.substring(7); // Remove 'comment' prefix
            setFormData(prevFormData => ({
                ...prevFormData,
                [`comment${fieldName}`]: value  // Update comment field
            }));
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
                                                                <td><input type="number" className="score-input" data-index={i} data-field="year" value={detail.year} min="0" max="99" onChange={handleInputChange} disabled={isAdmin} /></td>
                                                                <td><input type="number" className={`r${i}d1-input`} data-index={i} data-field="budget" value={detail.budget} min="0" max={9007199254740991} onChange={handleInputChange} disabled={isAdmin} /></td>
                                                                <td><input type="number" className={`r${i}d2-input`} data-index={i} data-field="expense" value={detail.expense} min="0" max={9007199254740991} onChange={handleInputChange} disabled={isAdmin} /></td>
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
                                                value={formData[`referee${name.charAt(0).toUpperCase() + name.slice(1)}`]}
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
                                                value={formData[`comment${name.charAt(0).toUpperCase() + name.slice(1)}`]}
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
            <div className='lmf-footer'>
                <div className="button">
                    <div className="button-back">
                        <button onClick={goBack}>ย้อนกลับ</button>
                    </div>
                    <div className="button-next">
                        <button onClick={handleSubmit}>ถัดไป</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LocalManage;