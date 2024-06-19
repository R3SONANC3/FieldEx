import React from "react";
import { Link } from "react-router-dom";
import "../styles.css";

const SideNavbar = () => {
  return (
    <div className="side-navbar">
      <ul className="side-navbar-links">
        <li><Link to="/admindashboard">Admin Dashboard</Link></li>
        <li><Link to="/admininstitution">Institution Evaluations</Link></li>
        <li><Link to="/adminlocal">Local Evaluations</Link></li>
        <li><Link to="/forgotpass">Forgot Password</Link></li>
      </ul>
    </div>
  );
};

export default SideNavbar;
