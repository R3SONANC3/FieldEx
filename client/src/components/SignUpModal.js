import React, { useState } from "react";
import axios from "axios";

function SignUpModal({ setOpenModal }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleReg = async (event) => {
    event.preventDefault(); // Prevent default form submission behavior
    try {
      const response = await axios.post('http://localhost:8000/api/register', {
        email,
        password
      }, { withCredentials: true });

      console.log(response.data);
      alert('Sign up successful!');
      setOpenModal(false);
      setIsAuthenticated(true); // Set authentication state to true

    } catch (error) {
      console.error('Error:', error);
      alert('Sign up failed!');
    }
  };


  return (
    <div className="modalBackground">
      <div className="modalContainer">
        <div className="titleCloseBtn">
          <button onClick={() => setOpenModal(false)}> X </button>
        </div>
        <div className="title">
          <h1>Sign Up</h1>
        </div>
        <div className="body">
          <form onSubmit={handleReg}>
            <div className="form-group">
              <label htmlFor="username">Email:</label>
              <input
                type="text"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password:</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </form>
        </div>
        <div className="footer">
          <button onClick={() => setOpenModal(false)}>Cancel</button>
          <button onClick={handleReg}>Sign Up</button>
        </div>
      </div>
    </div>
  );
}

export default SignUpModal;