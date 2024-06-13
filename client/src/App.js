import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import SelectForm from "./components/SelectForm";
import Evaluation from "./components/form/EvaluationPage";
import FormManagement from "./components/form/FormManagement";
import GeneralForm from "./components/form/GeneralForm";
import AdminDashboard from "./components/AdminDashboard";
import About from "./components/About";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admindashboard" element={<AdminDashboard/>}/>
        <Route path="/selectform" element={<SelectForm />} />
        <Route path="/evaluation" element={<Evaluation />} />
        <Route path="/generalform" element={<GeneralForm />} />
        <Route path="/formmanagement" element={<FormManagement />} />
        <Route path="/about" element={<About /> } />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
