import React, { useEffect, useState } from 'react';
import Navbar from '../../Navbar';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';

const LocalOperaThird = () => {
    const [isAdmin, setIsAdmin] = useState(false);
    const navigate = useNavigate();
    // const emailUser = location.state?.emailUser;
    const emailUser = 'test2@gmail.com'
    const token = localStorage.getItem('token');
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
        fetchData();
    }, [token]);

    const [formData, setFormData] = useState(initialFormData);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async () => {
        try {
            const response = await axios.post('http://localhost:8000/api/data/localOperaThird', {
                ...formData,
                emailUser
            }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            if (response.status === 200) {
                navigate('/localresult')
                alert('Data submitted successfully!');
            }
        } catch (error) {
            console.error('Error submitting form:', error);
        }
    };

    const renderRow = (idPrefix, label, maxScore) => (
        <tr key={idPrefix}>
            <td className="tabb">{label}</td>
            <td><input type="number" name={`scoreInput${idPrefix}`} value={formData[`scoreInput${idPrefix}`]} onChange={handleChange} min="0" max={maxScore} disabled={isAdmin} /></td>
            <td><input type="number" name={`refereeScoreInput${idPrefix}`} value={formData[`refereeScoreInput${idPrefix}`]} onChange={handleChange} min="0" max={maxScore} disabled={!isAdmin} /></td>
            <td><input type="text" name={`comment${idPrefix}`} value={formData[`comment${idPrefix}`]} onChange={handleChange} disabled={!isAdmin} /></td>
        </tr>
    );



    const fetchData = async () => {
        try {
            const response = await axios.get(`http://localhost:8000/api/data/getDataEmail/${emailUser}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            const data = response.data.localOperaThird[0] || {};
            const updatedFormData = {
                scoreInput31: data.scoreInput31 || 0,
                refereeScoreInput31: data.refereeScoreInput31 || 0,
                comment31: data.comment31 || '',
                scoreInput32: data.scoreInput32 || 0,
                refereeScoreInput32: data.refereeScoreInput32 || 0,
                comment32: data.comment32 || '',
                scoreInput33: data.scoreInput33 || 0,
                refereeScoreInput33: data.refereeScoreInput33 || 0,
                comment33: data.comment33 || '',
                scoreInput41: data.scoreInput41 || 0,
                refereeScoreInput41: data.refereeScoreInput41 || 0,
                comment41: data.comment41 || '',
                scoreInput42: data.scoreInput42 || 0,
                refereeScoreInput42: data.refereeScoreInput42 || 0,
                comment42: data.comment42 || '',
                scoreInput51: data.scoreInput51 || 0,
                refereeScoreInput51: data.refereeScoreInput51 || 0,
                comment51: data.comment51 || '',
                scoreInput52: data.scoreInput52 || 0,
                refereeScoreInput52: data.refereeScoreInput52 || 0,
                comment52: data.comment52 || '',
                scoreInput61: data.scoreInput61 || 0,
                refereeScoreInput61: data.refereeScoreInput61 || 0,
                comment61: data.comment61 || '',
                scoreInput62: data.scoreInput62 || 0,
                refereeScoreInput62: data.refereeScoreInput62 || 0,
                comment62: data.comment62 || ''
            };
            setFormData(updatedFormData);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

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
                        </tr>
                    </tbody>
                </table>
                <div className='lmf-footer'>
                    <div className="button">
                        <div className="button-back">
                            <button type="button">ย้อนกลับ</button>
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
