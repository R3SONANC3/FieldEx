import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import './styles.css'
import axios from 'axios';

function SelectForm({ setOpenModal }) {
    const [previousForms, setPreviousForms] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchForms = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get('http://localhost:8000/api/fetchforms', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setPreviousForms(response.data);
            } catch (error) {
                console.error("Error fetching previous forms:", error);
            }
        };

        fetchForms();
    }, []);

    const selectOption = (option) => {
        if (option === 'schoolBotanicalGarden') {
            navigate('/evaluation');
        } else if (option === 'localResourceBase') {
            navigate('/localresourcebase'); // เพิ่มการนำทางไปยังหน้าที่เหมาะสมสำหรับ localResourceBase
        }

        setOpenModal(false);
    };

    const viewPreviousForm = () => {
        navigate(`/generalform`);
        setOpenModal(false);
    };

    return (
        <div className="modalBackground">
            <div className="modalContainer">
                <div className="titleCloseBtn">
                    <button onClick={() => setOpenModal(false)}> X </button>
                </div>
                <div className="title">
                    <h2>กรุณาเลือกแบบฟอร์มที่ต้องการกรอกข้อมูล</h2>
                </div>
                <div className="buttonContainer">
                    <button className="schoolBotanicalGardenButton" onClick={() => selectOption('schoolBotanicalGarden')}>
                        สวนพฤกษศาสตร์โรงเรียน
                    </button>
                    <button className="localResourceBaseButton" onClick={() => selectOption('localResourceBase')}>
                        ฐานทรัพยากรท้องถิ่น
                    </button>
                </div>
                <div className="previousFormsContainer">
                    <h3>ฟอร์มที่เคยกรอก:</h3>
                    {previousForms.length > 0 ? (
                        previousForms.map((form, index) => (
                            <button key={index} className="previousFormButton" onClick={() => viewPreviousForm()}>
                                {form.institutionName}
                            </button>
                        ))
                    ) : (
                        <p>ท่านยังไม่เคยกรอกข้อมูลในระบบนี้</p>
                    )}
                </div>
            </div>
        </div>
    );
}

export default SelectForm;
