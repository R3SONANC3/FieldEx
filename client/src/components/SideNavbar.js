import React from "react";
import { Link } from "react-router-dom";
import "../styles.css";

const SideNavbar = () => {
  return (
    <div className="side-navbar">
      <ul className="side-navbar-links">
        <li><Link to="/institutionevaluations">Institution Evaluations</Link></li>
        <li><Link to="/localevaluations">Local Evaluations</Link></li>
        <li><Link to="/forgotpass">Forgot Password</Link></li>
      </ul>
    </div>
  );
};

export default SideNavbar;
