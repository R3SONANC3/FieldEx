import React from "react";
import "./localform.css";

function App() {
  return (
    <div className="App lmf-container">
      <div className="header lmf-text">
        <h1>
          ด้านที่ 2 การดำเนินงาน : <small>งานที่ 1 งานปกปักทรัพยากรท้องถิ่น</small>
        </h1>
        <img src="logo1.png" alt="Logo1" />
        <img src="logo2.png" alt="Logo2" />
      </div>
      <div className="lmf-body">
        <table id="lmf-table">
          <thead>
            <tr>
              <th>
                รายการประเมิน<p>(คะแนนเต็ม 100 คะแนน)</p>
              </th>
              <th>องค์กรปกครองส่วนท้องถิ่น</th>
              <th>แนบเอกสาร</th>
              <th>กรรมการ</th>
              <th>ผลประเมิน</th>
              <th>ข้อเสนอแนะ</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td colSpan="6">
                <b>1. การดำเนินงานปกปักทรัพยากรท้องถิ่น (100 คะแนน)</b>
              </td>
            </tr>
            <tr>
              <td className="tabb">
                1.1 การกำหนดขอบเขตพื้นที่ และสำรวจทรัพยากรในพื้นที่ปกปักทรัพยากรท้องถิ่น (20 คะแนน)
                <p className="tab">
                  1) การกำหนดขอบเขตพื้นที่ปกปักทรัพยากรท้องถิ่น (5 คะแนน)
                  <p className="tabb">ตารางสรุปจำนวนพื้นที่ปกปักทรัพยากรท้องถิ่น</p>
                </p>
                <table id="Nested-table">
                  <thead>
                    <tr>
                      <th>ปีงบประมาณ</th>
                      <th>จำนวนพื้นที่ปกปักทรัพยากรท้องถิ่น (พื้นที่)</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        <span className="row1-year">25</span>
                        <input type="number" className="score-input" min="0" max="99" />
                      </td>
                      <td>
                        <input type="number" className="r1d1-input" min="0" max="9007199254740991" />
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <span className="row2-year">25</span>
                        <input type="number" className="score-input" min="0" max="99" />
                      </td>
                      <td>
                        <input type="number" className="r2d1-input" min="0" max="9007199254740991" />
                      </td>
                    </tr>
                  </tbody>
                </table>
              </td>
              <td>
                <input type="number" className="score-input" min="0" max="5" />
              </td>
              <td className="insert-file">
                <input type="file" className="file-input" />
              </td>
              <td>
                <input type="number" className="referee-score-input" min="0" max="5" />
              </td>
              <td>
                <p>
                  <span className="not-passed">ไม่ผ่าน</span>
                </p>
              </td>
              <td>
                <input type="text" className="comment" />
              </td>
            </tr>
            <tr>
              <td className="tabbb">
                2) การสำรวจทรัพยากรในพื้นที่ปกปักทรัพยากรท้องถิ่น (5 คะแนน)
              </td>
              <td>
                <input type="number" className="score-input" min="0" max="5" />
              </td>
              <td className="insert-file">
                <input type="file" className="file-input" />
              </td>
              <td>
                <input type="number" className="referee-score-input" min="0" max="5" />
              </td>
              <td>
                <p>
                  <span className="not-passed">ไม่ผ่าน</span>
                </p>
              </td>
              <td>
                <input type="text" className="comment" />
              </td>
            </tr>
          </tbody>
        </table>
        <div className="button">
          <div className="button-back lmf-button">
            <button >ย้อนกลับ</button>
          </div>
          <div className="button-next lmf-button">
            <button >ถัดไป</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
