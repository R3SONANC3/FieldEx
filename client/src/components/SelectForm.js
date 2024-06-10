import React from "react";
import { useNavigate } from 'react-router-dom';
import './styles.css'


function SelectForm({ setOpenModal }) {
    const navigate = useNavigate();

    const selectOption = (option) => {
        if(option = 'schoolBotanicalGardenButton'){
            navigate('/evaluation')
        }

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

            </div>
        </div>
    );
}

export default SelectForm;
