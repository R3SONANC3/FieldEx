import React, { useState } from "react";
import axios from "axios";

function SignInModal({ setOpenModal, setIsAuthenticated }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);

  const handleLogin = async (event) => {
    event.preventDefault(); // Prevent default form submission behavior
    try {
      const response = await axios.post('https://fieldex-production.up.railway.app/api/login', {
        email,
        password
      }, { withCredentials: true });

      console.log(response.data);
      alert('Sign in successful!');
      setOpenModal(false);
      setIsAuthenticated(true); // Set authentication state to true

    } catch (error) {
      console.error('Error:', error);
      alert('Sign in failed!');
    }
  };

  return (
    <div className="modalBackground">
      <div className="modalContainer">
        <div className="titleCloseBtn">
          <button onClick={() => setOpenModal(false)}> X </button>
        </div>
        <div className="title">
          <h1>Sign in</h1>
        </div>
        <div className="body">
          <form onSubmit={handleLogin}>
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
            <div className="footer">
              <button onClick={() => setOpenModal(false)} id="cancelBtn">Cancel</button>
              <button type="submit">Sign in</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SignInModal;
