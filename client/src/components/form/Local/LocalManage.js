import React, { useState, useEffect } from 'react';
import Navbar from '../../Navbar';
import './localform.css';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

function LocalManage() {
    const [isAdmin, setIsAdmin] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();
    const emailUser = location.state?.emailUser;
    const API_URL = 'https://fieldex-production.up.railway.app'
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
            fetchUserData();
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

    const calculateRefereeTotal = (formData) => {
        const refereeFields = [
            'refereeLocalMeetingAgenda',
            'refereeLocalMemberSignatures',
            'refereeMeetingMinutes',
            'refereePhotos',
            'refereeAppointmentOrder',
            'refereeSubcommittee',
            'refereeManagementPlan',
            'refereeProtectionPlan',
            'refereeSurveyPlan',
            'refereeCoordination',
            'refereeExpenseSummary',
            'refereeMeetingInvite',
            'refereeThankYouNote',
            'refereeOperationResults',
            'refereeAnalysisResults',
            'refereeImprovementPlan',
            'refereeAnnualReport'
        ];

        const total = refereeFields.reduce((sum, field) => sum + (formData[field] || 0), 0);
        return total;
    };

    const calculateOrganizationTotal = (formData) => {
        const organizationFields = [
            'localMeetingAgenda',
            'localMemberSignatures',
            'meetingMinutes',
            'photos',
            'appointmentOrder',
            'subcommittee',
            'managementPlan',
            'protectionPlan',
            'surveyPlan',
            'coordination',
            'expenseSummary',
            'meetingInvite',
            'thankYouNote',
            'operationResults',
            'analysisResults',
            'improvementPlan',
            'annualReport'
        ];

        const total = organizationFields.reduce((sum, field) => sum + (formData[field] || 0), 0);
        return total;
    };

    const refereeTotal = calculateRefereeTotal(formData);
    const organizationTotal = calculateOrganizationTotal(formData);

    const fetchUserData = async () => {
        try {
            if (emailUser) {
                const response = await axios.get(`${API_URL}/api/data/getDataEmail/${emailUser}`, {
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
            } else {
                const response = await axios.get(`${API_URL}/api/data/fetchData`, {
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
            }
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "เกิดข้อผิดพลาดในการดึงข้อมูล!",
                text: "ไม่สามารถดึงข้อมูลจากฐานข้อมูลได้",
            });
        }
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${API_URL}/api/data/localsubmit`, {
                ...formData,
                emailUser: emailUser,
                refereeTotal,
                organizationTotal
            }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            await Swal.fire({
                icon: "success",
                title: "ส่งข้อมูลสำเร็จ",
                text: "ไปที่หน้าต่อไป"
            });
            navigate('/localoperafirst', { state: { emailUser } })
            // Redirect or show success message
        } catch (error) {
            await Swal.fire({
                icon: "error",
                title: "เกิดข้อผิดพลาดในการส่งข้อมูล!",
                text: "กรุณาตรวจสอบข้อมูลของท่านให้ครบ",
            });
        }
    };

    const goBack = () => {
        navigate('/localform', { state: { emailUser } })
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
        { colSpan: 4, title: "1.1 องค์กรปกครองส่วนท้องถิ่น ชุมชน และสถานศึกษา มีส่วนร่วมในการจัดทำฐานทรัพยากรท้องถิ่น (30 คะแนน)" },
        { colSpan: 4, title: (<span style={{ fontWeight: "normal", paddingLeft: "20px" }}>1) รายงานการประชุม (20 คะแนน)</span>) },
        { title: (<span style={{ paddingLeft: "20px" }}>- วาระการประชุมเรื่องเกี่ยวกับการจัดทำฐานทรัพยากรท้องถิ่น (10 คะแนน)</span>), name: "localMeetingAgenda", max: 10 },
        { title: (<span style={{ paddingLeft: "20px" }}>- รายชื่อ ลายมือชื่อของสมาชิกองค์กรปกครองส่วนท้องถิ่น กำนัน ผู้ใหญ่บ้าน ชุมชน ผู้รู้ในท้องถิ่น ผู้บริหารสถานศึกษา และผู้ที่เกี่ยวข้องเกี่ยวกับการจัดทำฐานทรัพยากรท้องถิ่น (10 คะแนน)</span>), name: "localMemberSignatures", max: 10 },
        { colSpan: 4, title: (<span style={{ fontWeight: "normal", paddingLeft: "20px" }}>2) หลักฐานที่แสดงถึงการมีส่วนร่วม (10 คะแนน)</span>) },
        { title: (<span style={{ paddingLeft: "20px" }}>- บันทึกการประชุม (5 คะแนน)</span>), name: "meetingMinutes", max: 5 },
        { title: (<span style={{ paddingLeft: "20px" }}>- ภาพถ่าย (5 คะแนน)</span>), name: "photos", max: 5 },
        { colSpan: 4, title: "1.2 แต่งตั้งคณะกรรมการดำเนินงานการจัดทำฐานทรัพยากรท้องถิ่น (30 คะแนน)" },
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
        { colSpan: 4, title: "1.3 วางแผนการบริหารและแผนการดำเนินงานการจัดทำฐานทรัพยากรท้องถิ่น (40 คะแนน)" },
        { title: "1) แผนการดำเนินงานด้านการบริหาร โดยเขียนแผนการจัดทำฐานทรัพยากรท้องถิ่น รวมกับแผนพัฒนา แผนงานประจำปีขององค์กรปกครองส่วนท้องถิ่นแสดงผังโครงสร้างการบริหาร รายละเอียดงาน ผู้รับผิดชอบ ปริมาณงาน งบประมาณ ระยะเวลา (25 คะแนน)", name: "managementPlan", max: 25 },
        { title: "2) การจัดทำปฏิทินการปฏิบัติงาน (5 คะแนน)", name: "protectionPlan", max: 5 },
        { title: "3) แผนการดำเนินงานการจัดทำฐานทรัพยากรท้องถิ่น โดยเขียนแผนบูรณาการงานฐานทรัพยากรท้องถิ่น แสดงให้เห็นวิธีการดำเนินงาน (10 คะแนน)", name: "surveyPlan", max: 10 },
        { colSpan: 4, title: (<span>1.4 ดำเนินงานตามแผน (20 คะแนน){" "}<span style={{ fontWeight: "normal", display: "block", paddingLeft: "30px" }}>การประสานงานของคณะกรรมการดำเนินงาน คณะอนุกรรมการ ศูนย์อนุรักษ์พัฒนาทรัพยากรท้องถิ่นตำบลกับหน่วยงานต่างๆ</span></span>) },
        {
            title: "1) เอกสารสรุปค่าใช้จ่ายในการดำเนินการจัดทำฐานทรัพยากรท้องถิ่น ลงนามชื่อผู้บริหาร หัวหน้างาน (10 คะแนน)",
            name: "coordination", max: 10,
            nestedTable: true
        },
        { title: "2) หนังสือเชิญประชุม (5 คะแนน)", name: "meetingInvite", max: 5 },
        { title: "3) หนังสือขอบคุณผู้เข้าร่วมประชุม (5 คะแนน)", name: "thankYouNote", max: 5 },
        { colSpan: 4, title: "1.5 สรุปและประเมินผลการดำเนินงาน (20 คะแนน)" },
        { title: "1) ผลการดำเนินงาน 6 งานฐานทรัพยากรท้องถิ่น (20 คะแนน)", name: "operationResults", max: 20 },
        { colSpan: 4, title: "1.6 วิเคราะห์ผลและปรับปรุงพัฒนางาน (20 คะแนน)" },
        { title: "1) วิเคราะห์ผล และหาข้อสรุป (10 คะแนน)", name: "analysisResults", max: 10 },
        { title: "2) วางแผน ปรับปรุง และพัฒนาการดำเนินงานในปีต่อไป (10 คะแนน)", name: "improvementPlan", max: 10 },
        { title: (<span><b>1.7 รายงานผลการดำเนินงานฐานทรัพยากรท้องถิ่น ประจำปีงบประมาณให้ อพ.สธ. อย่างน้อยปีละ 1 ครั้ง (40 คะแนน)</b>{" "}<span style={{ fontWeight: "normal", display: "block", paddingLeft: "30px" }}>รายงานผลการดำเนินงานฐานทรัพยากรท้องถิ่นโดยแสดงหลักฐานตั้งแต่ข้อ 1.1 – 1.6</span></span>), name: "annualReport", max: 40 }
    ];

    return (
        <div className="lmf-container">
            <div className="lmf-header"><Navbar /></div>
            <div className="lmf-body">
                <div className="lmf-text"><h1 className='lmf-h1'>ด้านที่ 1 การบริหารและการจัดการ</h1></div>
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
                                            <textarea
                                                type="text"  // Assuming you want to accept more than one character
                                                className="commentInput"
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
                        <tr>
                            <td >รวมคะแนนที่ได้ ด้านที่ 1 การบริหารและการจัดการ</td>
                            <td className="text-center" style={{ fontSize: '16px', alignItems: 'center' }}>
                                {organizationTotal}
                            </td>
                            <td className="text-center" style={{ fontSize: '16px', alignItems: 'center' }}>
                                {refereeTotal}
                            </td>
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
                        <button onClick={handleSubmit}>ถัดไป</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LocalManage;