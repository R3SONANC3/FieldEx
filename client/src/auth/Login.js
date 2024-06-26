import React, { useState } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import  { jwtDecode } from "jwt-decode"; // Corrected import statement
import Swal from "sweetalert2"; // Import SweetAlert2
import '../styles.css'

function Login({ setOpenModal, setIsAuthenticated, setUserRole }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false); // State to toggle between login and sign-up
  const API_URL = 'https://fieldex-production.up.railway.app'

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    // Basic validation
    if (!email || !password) {
      Swal.fire({
        title: 'กรุณากรอกข้อมูลให้ครบทั้งสองช่อง.',
        icon: 'warning',
      });
      return;
    }

    setLoading(true);

    try {
      let response;
      if (isSignUp) {
        response = await axios.post(`${API_URL}/api/auth/register`, {
          email,
          password,
        });
        console.log(response.data);
        Swal.fire({
          title: 'สร้างบัญชีสำเร็จ',
          text: 'สามารถเข้าสู่ระบบได้แล้ว.',
          icon: 'success',
        });
      } else {
        response = await axios.post(`${API_URL}/api/auth/login`, {
          email,
          password,
        });

        const token = response.data.token;
        const decodedToken = jwtDecode(token);
        const role = decodedToken.role; // Assuming the token has a 'role' field
        setIsAuthenticated(true);
        setUserRole(role);

        // Save the token and role to localStorage
        localStorage.setItem("token", token);
        localStorage.setItem("userRole", role);
        localStorage.setItem('authTime', new Date().getTime());
      }

      setOpenModal(false);
    } catch (error) {
      console.error("Error:", error);
      Swal.fire({
        title: isSignUp ? "เกิดข้อผิดพลาดในการสร้างบัญชี" : "เกิดข้อผิดพลาดในการเข้าสู่ระบบ",
        icon: 'error',
      });
    } finally {
      setLoading(false);
    }
  };

  const toggleSignUp = () => {
    setEmail("");
    setPassword("");
    setIsSignUp(!isSignUp);
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
                <span onClick={toggleSignUp} style={{ cursor: "pointer", color: "blue" }}>
                  เข้าสู่ระบบ
                </span>
              </p>
            ) : (
              <p>
                ยังไม่มีบัญชีใช่หรือไม่?{" "}
                <span onClick={toggleSignUp} style={{ cursor: "pointer", color: "blue" }}>
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
  setUserRole: PropTypes.func.isRequired,
};

export default Login;
