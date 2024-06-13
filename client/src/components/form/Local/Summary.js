import React from 'react';
import './Summary.css'; // Import your CSS file

const Summary = () => {
    return (
        <div>
            <h2>สรุปผลการประเมินองค์กรปกครองส่วนท้องถิ่น โดยสมาชิกฐานทรัพยากรท้องถิ่น</h2>
            <h3>สรุปผลการประเมิน 3 ด้าน คะแนนเต็ม 1,000 คะแนน</h3>
            <div className="text">
                <div><b>ด้านที่ 1 การบริหารและการจัดการ</b></div>
                <div className="flex-line">
                    <span>คะแนนเต็ม 200 คะแนน</span>
                    <span style={{marginLeft: '100px'}}>คะแนนที่ได้ ............... คะแนน</span>
                </div>
                <div><b style={{marginRight: '75px'}}>ด้านที่ 2 การดำเนินงาน</b></div>
                <div className="flex-line">
                    <span>คะแนนเต็ม 600 คะแนน</span>
                    <span style={{marginLeft: '100px'}}>คะแนนที่ได้ ............... คะแนน</span>
                </div>
                <div><b style={{marginRight: '55px'}}>ด้านที่ 3 ผลการดำเนินงาน</b></div>
                <div className="flex-line">
                    <span>คะแนนเต็ม 200 คะแนน</span>
                    <span style={{marginLeft: '100px'}}>คะแนนที่ได้ ............... คะแนน</span>
                    <span><p><b style={{marginLeft: '180px'}}>รวมคะแนนที่ได้ 3 ด้าน ............... คะแนน</b></p></span>
                </div>
            </div>
            <h2 style={{marginTop: '50px'}}>สรุปผลการเยี่ยมเยียนพิจารณาให้คะแนนองค์กรปกครองส่วนท้องถิ่น <p style={{marginTop: '15px'}}>โดย คณะกรรมการเยี่ยมเยียนพิจารณาให้คะแนนฯ (อพ.สธ.)</p></h2>
            <h3 style={{marginTop: '-4px', marginLeft: '18px'}}>สรุปผลการประเมิน 3 ด้าน คะแนนเต็ม 1,000 คะแนน</h3>
            <div className="text">
                <div><b>ด้านที่ 1 การบริหารและการจัดการ</b></div>
                <div className="flex-line">
                    <span>คะแนนเต็ม 200 คะแนน</span>
                    <span style={{marginLeft: '100px'}}>คะแนนที่ได้ ............... คะแนน</span>
                </div>
                <div><b style={{marginRight: '75px'}}>ด้านที่ 2 การดำเนินงาน</b></div>
                <div className="flex-line">
                    <span>คะแนนเต็ม 600 คะแนน</span>
                    <span style={{marginLeft: '100px'}}>คะแนนที่ได้ ............... คะแนน</span>
                </div>
                <div><b style={{marginRight: '55px'}}>ด้านที่ 3 ผลการดำเนินงาน</b></div>
                <div className="flex-line">
                    <span>คะแนนเต็ม 200 คะแนน</span>
                    <span style={{marginLeft: '100px'}}>คะแนนที่ได้ ............... คะแนน</span>
                    <span><p><b style={{marginLeft: '180px'}}>รวมคะแนนที่ได้ 3 ด้าน ............... คะแนน</b></p></span>
                </div>
            </div>
            <table id="sum-table">
                <thead>
                    <tr>
                        <th>ผลการประเมิน</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td><span className="pass">ผ่านเกณฑ์มาตรฐาน อพ.สธ. ระดับป้ายสนองพระราชดำริในงานฐานทรัพยากรท้องถิ่น</span></td>
                    </tr>
                </tbody>
            </table>
            <div className="button">
                <div className="button-next">
                    <button >หน้าแรก</button>
                </div>
            </div>
        </div>
    );
};

export default Summary;
