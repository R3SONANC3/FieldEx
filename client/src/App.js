import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import SelectForm from "./components/SelectForm";
import AdminDashboard from "./components/AdminDashboard";
import About from "./components/About";
import FormManagement from "./components/form/School/FormManagement";
import EvaluationPage from "./components/form/School/EvaluationPage";
import GeneralForm from './components/form/School/GeneralForm'
import LocalGovernmentForm from "./components/form/Local/LocalGovernmentForm ";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admindashboard" element={<AdminDashboard/>}/>
        <Route path="/selectform" element={<SelectForm />} />
        <Route path="/evaluation" element={<EvaluationPage />} />
        <Route path="/generalform" element={<GeneralForm />} />
        <Route path="/formmanagement" element={<FormManagement />} />
        <Route path="/about" element={<About /> } />
        <Route path="/localform" element={<LocalGovernmentForm  />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
