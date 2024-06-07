import React, { useState } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import { jwtDecode } from "jwt-decode";

function Login({ setOpenModal, setIsAuthenticated }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false); // State to toggle between login and sign-up

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    // Basic validation
    if (!email || !password) {
      alert("กรุณากรอกข้อมูลให้ครบทั้งสองช่อง..");
      return;
    }

    setLoading(true);

    try {
      let response;
      if (isSignUp) {
        response = await axios.post("http://localhost:8000/api/register", {
          email,
          password,
        });
        alert("สร้างบัญชีสำเร็จ  สามารถเข้าสู่ระบบได้แล้ว.");
      } else {
        response = await axios.post("http://localhost:8000/api/login", {
          email,
          password,
        });

        const token = response.data.token;
        const decodedToken = jwtDecode(token);
        const role = decodedToken.role; // Assuming the token has a 'role' field
        
        alert("เข้าสู่ระบบสำเร็จ!");
        setIsAuthenticated(true);

        // Save the token and role to localStorage or state if needed
        localStorage.setItem("token", token);
        localStorage.setItem("userRole", role);
      }

      setOpenModal(false);
    } catch (error) {
      console.error("Error:", error);
      alert(isSignUp ? "เกิดข้อผิดพลาดในการสร้างบัญชี" : "เกิดข้อผิดพลาดในการเข้าสู่ระบบ");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modalBackground">
      <div className="modalContainer">
        <div className="titleCloseBtn">
          <button onClick={() => setOpenModal(false)}> X </button>
        </div>
        <div className="title">
          <h1>{isSignUp ? "สร้างบัญชีใหม่" : "เข้าสู่ระบบ"}</h1>
        </div>
        <div className="body">
          <form onSubmit={handleFormSubmit}>
            <div className="form-group">
              <label htmlFor="email">อีเมล:</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">รหัสผ่าน:</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="footer">
              <button
                type="button"
                onClick={() => setOpenModal(false)}
                id="cancelBtn"
              >
                ยกเลิก
              </button>
              <button type="submit" disabled={loading}>
                {loading ? (isSignUp ? "กำลังสร้างบัญชีใหม่" : "กำลังเข้าสู่ระบบ") : isSignUp ? "สร้างบัญชีใหม่" : "เข้าสู่ระบบ"}
              </button>
            </div>
          </form>
          <div className="modal-navigate">
            {isSignUp ? (
              <p>
                มีบัญชีแล้วใช่หรือไม่?{" "}
                <span onClick={() => setIsSignUp(false)} style={{ cursor: "pointer", color: "blue" }}>
                  เข้าสู่ระบบ
                </span>
              </p>
            ) : (
              <p>
                ยังไม่มีบัญชีใช่หรือไม่?{" "}
                <span onClick={() => setIsSignUp(true)} style={{ cursor: "pointer", color: "blue" }}>
                  สร้างบัญชีใหม่
                </span>
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

Login.propTypes = {
  setOpenModal: PropTypes.func.isRequired,
  setIsAuthenticated: PropTypes.func.isRequired,
};

export default Login;
