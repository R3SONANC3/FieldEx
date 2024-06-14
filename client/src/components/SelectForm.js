import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles.css';

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
            localStorage.setItem('fetchData', false);
        } else if (option === 'localResourceBase') {
            navigate('/localform');
            localStorage.setItem('fetchData', false);
        }

        setOpenModal(false);
    };

    const viewPreviousForm = (id, type) => {
        if (type === 'institution') {
            navigate(`/generalform`);
        } else if (type === 'local') {
            navigate(`/localform`);
        }
        setOpenModal(false);
        localStorage.setItem('fetchData', true);
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
                            <button
                                key={index}
                                className="previousFormButton"
                                onClick={() => viewPreviousForm(form.id, form.institutionID ? 'institution' : 'local')}
                            >
                                {form.institutionID ? 
                                    `${form.institutionName} (${form.institutionID})` : 
                                    `${form.organizationName} (${form.localID})`
                                }
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
