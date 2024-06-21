import React, { useEffect, useState } from 'react';
import Navbar from '../../Navbar';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

const LocalOperaThird = () => {
    const [isAdmin, setIsAdmin] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const emailUser = location.state?.emailUser;
    const token = localStorage.getItem('token');
    const API_URL = 'https://fieldex-production.up.railway.app'
    const initialFormData = {
        scoreInput31: 0,
        refereeScoreInput31: 0,
        comment31: '',
        scoreInput32: 0,
        refereeScoreInput32: 0,
        comment32: '',
        scoreInput33: 0,
        refereeScoreInput33: 0,
        comment33: '',
        scoreInput41: 0,
        refereeScoreInput41: 0,
        comment41: '',
        scoreInput42: 0,
        refereeScoreInput42: 0,
        comment42: '',
        scoreInput51: 0,
        refereeScoreInput51: 0,
        comment51: '',
        scoreInput52: 0,
        refereeScoreInput52: 0,
        comment52: '',
        scoreInput61: 0,
        refereeScoreInput61: 0,
        comment61: '',
        scoreInput62: 0,
        refereeScoreInput62: 0,
        comment62: ''
    };

    useEffect(() => {
        setIsAdmin(localStorage.getItem('userRole') === 'admin');
        if (!token) {
            navigate('/');
        } else {
            fetchUserData();
        }
    }, [navigate, token]);

    const [formData, setFormData] = useState(initialFormData);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async () => {
        try {
            const response = await axios.post(`${API_URL}/api/data/localOperaThird`, {
                ...formData,
                emailUser,
                totalScore,
                totalRefereeScore
            }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            if (response.status === 200) {
                await Swal.fire({
                    icon: "success",
                    title: "ส่งข้อมูลสำเร็จ",
                    text: "ไปที่หน้าต่อไป"
                });
                navigate('/localresult', { state: { emailUser } })
            }
        } catch (error) {
            await Swal.fire({
                icon: "error",
                title: "เกิดข้อผิดพลาดในการส่งข้อมูล!",
                text: "กรุณาตรวจสอบข้อมูลของท่านให้ครบ",
            });
        }
    };

    const goBack = () => {
        navigate('/localoperasec', { state: { emailUser } })
    }

    const renderRow = (idPrefix, label, maxScore) => (
        <tr key={idPrefix}>
            <td className="tabb">{label}</td>
            <td><input type="number" name={`scoreInput${idPrefix}`} value={formData[`scoreInput${idPrefix}`]} onChange={handleChange} min="0" max={maxScore} disabled={isAdmin} /></td>
            <td><input type="number" name={`refereeScoreInput${idPrefix}`} value={formData[`refereeScoreInput${idPrefix}`]} onChange={handleChange} min="0" max={maxScore} disabled={!isAdmin} /></td>
            <td><textarea type="text"  className ="commentInput"name={`comment${idPrefix}`} value={formData[`comment${idPrefix}`]} onChange={handleChange} disabled={!isAdmin} /></td>
        </tr>
    );

    const fetchUserData = async () => {
        try {
            const url = emailUser
                ? `${API_URL}/api/data/getDataEmail/${emailUser}`
                : `${API_URL}/api/data/fetchData`;

            const response = await axios.get(url, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            const data = response.data.localOperaThird[0] || {};
            const keys = [
                "scoreInput31", "refereeScoreInput31", "comment31",
                "scoreInput32", "refereeScoreInput32", "comment32",
                "scoreInput33", "refereeScoreInput33", "comment33",
                "scoreInput41", "refereeScoreInput41", "comment41",
                "scoreInput42", "refereeScoreInput42", "comment42",
                "scoreInput51", "refereeScoreInput51", "comment51",
                "scoreInput52", "refereeScoreInput52", "comment52",
                "scoreInput61", "refereeScoreInput61", "comment61",
                "scoreInput62", "refereeScoreInput62", "comment62"
            ];

            const updatedFormData = keys.reduce((acc, key) => {
                acc[key] = data[key] || (typeof data[key] === 'number' ? 0 : '');
                return acc;
            }, {});

            setFormData(updatedFormData);

        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "เกิดข้อผิดพลาดในการดึงข้อมูล!",
                text: "ไม่สามารถดึงข้อมูลจากฐานข้อมูลได้",
            });
        }
    };

    const calculateTotalScore = (prefix, section) => {
        const sectionIds = {
            3: ["31", "32", "33"],
            4: ["41", "42"],
            5: ["51", "52"],
            6: ["61", "62"]
        };
        return sectionIds[section].reduce((total, id) => {
            return total + parseFloat(formData[`${prefix}${id}`] || 0);
        }, 0);
    };

    const totalScore = calculateTotalScore("scoreInput", 3) + calculateTotalScore("scoreInput", 4) + calculateTotalScore("scoreInput", 5) + calculateTotalScore("scoreInput", 6);
    const totalRefereeScore = calculateTotalScore("refereeScoreInput", 3) + calculateTotalScore("refereeScoreInput", 4) + calculateTotalScore("refereeScoreInput", 5) + calculateTotalScore("refereeScoreInput", 6);

    return (
        <div className='lmf-container'>
            <div className='lmf-header'>
                <Navbar />
            </div>
            <div className='lmf-body'>
                <div className='lmf-text'><h1 className='lmf-h1'>ด้านที่ 2 การดำเนินงาน : <small>งานที่ 3 งานปลูกรักษาทรัพยากรท้องถิ่น</small></h1></div>
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
                        <tr>
                            <td colSpan="4"><b>3. การดำเนินงานปลูกรักษาทรัพยากรท้องถิ่น (100 คะแนน)</b></td>
                        </tr>
                        {renderRow('31', '3.1 การจัดหาและรวบรวมทรัพยากรท้องถิ่น (30 คะแนน)', 30)}
                        {renderRow('32', '3.2 การปลูก และรักษาทรัพยากรท้องถิ่น (30 คะแนน)', 30)}
                        {renderRow('33', '3.3 การติดตามการเจริญเติบโตและการเปลี่ยนแปลงของทรัพยากรท้องถิ่น เช่น การติดตามการเจริญเติบโต แบบบันทึกการเปลี่ยนแปลง ฯลฯ (40 คะแนน)', 40)}
                        <tr>
                            <td style={{ textAlign: 'center' }}><b>รวมคะแนนที่ได้ งานที่ 3 งานปลูกรักษาทรัพยากรท้องถิ่น</b></td>
                            <td>{calculateTotalScore("scoreInput", 3)}</td>
                            <td>{calculateTotalScore("refereeScoreInput", 3)}</td>
                            <td></td>
                        </tr>
                    </tbody>
                </table>
                <div className='lmf-text'><h1 className='lmf-h1'>ด้านที่ 2 การดำเนินงาน : <small>งานที่ 4 งานอนุรักษ์และใช้ประโยชน์ทรัพยากรท้องถิ่น</small></h1></div>
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
                        <tr>
                            <td colSpan="4"><b>4. การดำเนินงานอนุรักษ์และใช้ประโยชน์ทรัพยากรท้องถิ่น (100 คะแนน)</b></td>
                        </tr>
                        {renderRow('41', '4.1 การฟื้นฟู บำรุงรักษา ขยายพันธุ์เพิ่มขึ้นและแจกจ่ายให้กับชุมชน ตำบล (60 คะแนน)', 60)}
                        {renderRow('42', '4.2 การใช้ประโยชน์ทรัพยากรท้องถิ่นอย่างยั่งยืน เช่น การจัดการท่องเที่ยวเชิงนิเวศ การพัฒนาผลิตภัณฑ์จากทรัพยากรในท้องถิ่น แหล่งเรียนรู้ ฯลฯ  (40 คะแนน)', 40)}
                        <tr>
                            <td style={{ textAlign: 'center' }}><b>รวมคะแนนที่ได้ งานที่ 4 งานอนุรักษ์และใช้ประโยชน์ทรัพยากรท้องถิ่น</b></td>
                            <td>{calculateTotalScore("scoreInput", 4)}</td>
                            <td>{calculateTotalScore("refereeScoreInput", 4)}</td>
                            <td></td>
                        </tr>
                    </tbody>
                </table>
                <div className='lmf-text'><h1 className='lmf-h1'>ด้านที่ 2 การดำเนินงาน : <small>งานที่ 5 งานศูนย์ข้อมูลทรัพยากรท้องถิ่น</small></h1></div>
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
                        <tr>
                            <td colSpan="4"><b>5. การดำเนินงานศูนย์ข้อมูลทรัพยากรท้องถิ่น (100 คะแนน)</b></td>
                        </tr>
                        {renderRow('51', '5.1 การรวบรวมและการบันทึกข้อมูลทรัพยากรท้องถิ่น (ทรัพยากรกายภาพ  ทรัพยากรชีวภาพ ทรัพยากรวัฒนธรรมและภูมิปัญญา) (60 คะแนน)', 60)}
                        {renderRow('52', '5.2 ระบบการจัดเก็บและสืบค้นได้ (เอกสารและคอมพิวเตอร์) (40 คะแนน)', 40)}
                        <tr>
                            <td style={{ textAlign: 'center' }}><b>รวมคะแนนที่ได้ งานที่ 5 งานศูนย์ข้อมูลทรัพยากรท้องถิ่น</b></td>
                            <td>{calculateTotalScore("scoreInput", 5)}</td>
                            <td>{calculateTotalScore("refereeScoreInput", 5)}</td>
                            <td></td>
                        </tr>
                    </tbody>
                </table>
                <div className='lmf-text'><h1 className='lmf-h1'>ด้านที่ 2 การดำเนินงาน :<small> งานที่ 6 งานสนับสนุนในการอนุรักษ์และจัดทำฐานทรัพยากรท้องถิ่น</small></h1></div>
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
                        <tr>
                            <td colSpan="4"><b>6. การดำเนินงานสนับสนุนในการอนุรักษ์และจัดทำฐานทรัพยากรท้องถิ่น (100 คะแนน)</b></td>
                        </tr>
                        {renderRow('61', '6.1 การสนับสนุนและบูรณาการให้ชุมชนเกิดการมีส่วนร่วมในการอนุรักษ์ทรัพยากรในท้องถิ่นและการจัดทำฐานทรัพยากรท้องถิ่น (60 คะแนน)', 60)}
                        {renderRow('62', '6.2 การจัดทำแผนงาน โครงการเพื่อการอนุรักษ์ทรัพยากรในท้องถิ่นและการจัดทำฐานทรัพยากรท้องถิ่น (40 คะแนน)', 40)}
                        <tr>
                            <td style={{ textAlign: 'center' }}><b>รวมคะแนนที่ได้ งานที่ 6 งานสนับสนุนในการอนุรักษ์และจัดทำฐานทรัพยากรท้องถิ่น</b></td>
                            <td>{calculateTotalScore("scoreInput", 6)}</td>
                            <td>{calculateTotalScore("refereeScoreInput", 6)}</td>
                            <td></td>
                        </tr>
                        <tr>
                            <td style={{ textAlign: 'center' }}><b>รวมคะแนนที่ได้ทั้งหมด</b></td>
                            <td>{totalScore}</td>
                            <td>{totalRefereeScore}</td>
                            <td></td>
                        </tr>
                    </tbody>
                </table>
                <div className='lmf-footer'>
                    <div className="button">
                        <div className="button-back">
                            <button type="button" onClick={goBack}>ย้อนกลับ</button>
                        </div>
                        <div className="button-next">
                            <button type="submit" onClick={handleSubmit}>ถัดไป</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LocalOperaThird;
