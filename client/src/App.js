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
import Conscript from "./components/form/Local/Conscript";
import Summary from "./components/form/Local/Summary";
import LocalManage from "./components/form/Local/LocalManage"

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
        <Route path="/localconscript" element={<Conscript />} />
        <Route path="/localsummary" element={<Summary />} />
        <Route path="/localmanage" element={<LocalManage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
