import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../Navbar";

const FormManagement = () => {
  const navigate = useNavigate();



  const goToNextPage = () => {
    navigate('/formmanagement2');
  }

  return (
    <div className="container">
      <Navbar />
    </div>
  );
};

export default FormManagement;
