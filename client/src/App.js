import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import SelectForm from "./components/SelectForm";
import Evaluation from "./components/form/EvaluationPage";
import FormManagement from "./components/form/FormManagement";
import FormManagement2 from "./components/form/FormManagement2";
import GeneralForm from "./components/form/GeneralForm";
import "./components/styles.css";
import AdminDashboard from "./components/AdminDashboard";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/home" element={<Home />} />\
        <Route path="/admindashboard" element={<AdminDashboard/>}/>
        <Route path="/selectform" element={<SelectForm />} />
        <Route path="/evaluation" element={<Evaluation />} />
        <Route path="/generalform" element={<GeneralForm />} />
        <Route path="/formmanagement" element={<FormManagement />} />
        <Route path="/formmanagement2" element={<FormManagement2 />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
