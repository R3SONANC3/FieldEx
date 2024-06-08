import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const FormManagement = () => {
  const navigate = useNavigate();



  const goToNextPage = () => {
    navigate('/formmanagement2');
  }

  return (
    <div className="container">
    </div>
  );
};

export default FormManagement;
