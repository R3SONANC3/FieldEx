import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Router } from "react-router-dom";
import Home from "./components/Home";
import SelectForm from "./components/SelectForm";
import AdminDashboard from "./admin/AdminDashboard";
import About from "./components/About";
import FormManagement from "./components/form/School/FormManagement";
import EvaluationPage from "./components/form/School/EvaluationPage";
import GeneralForm from './components/form/School/GeneralForm'
import LocalGovernmentForm from "./components/form/Local/LocalGovernmentForm ";
import Conscript from "./components/form/Local/Conscript";
import Summary from "./components/form/Local/Summary";
import LocalManage from "./components/form/Local/LocalManage"
import LocalOperaFirst from './components/form/Local/LocalOperaFirst'
import LocalOperaSecond from "./components/form/Local/LocalOperaSecond";
import LocalOperaThird from "./components/form/Local/LocalOperaThird";
import LocalResult from "./components/form/Local/LocalResult";
import ForgotPassword from "./admin/ForgotPassword";
import Loding from './components/Loading'
import LocalUser from './admin/LocalUsers'
import InstitutionUsers from './admin/InstitutionUsers'


function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const hasVisitedHome = localStorage.getItem("hasVisitedHome");
    if (!hasVisitedHome) {
      // Simulate a 3-second loading time on the first visit to the home page
      const timer = setTimeout(() => {
        setIsLoading(false);
        localStorage.setItem("hasVisitedHome", "true");
      }, 3000);

      return () => clearTimeout(timer);
    } else {
      setIsLoading(false);
      localStorage.removeItem('hasVisitedHome')
    }
  }, []);

  return (
    <BrowserRouter>
      {isLoading ? (
        <div style={{ textAlign: "center" }}>
          <Loding />
        </div>
      ) : (
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/admindashboard" element={<AdminDashboard />} />
          <Route path="/selectform" element={<SelectForm />} />
          <Route path="/evaluation" element={<EvaluationPage />} />
          <Route path="/generalform" element={<GeneralForm />} />
          <Route path="/formmanagement" element={<FormManagement />} />
          <Route path="/about" element={<About />} />
          <Route path="/localform" element={<LocalGovernmentForm />} />
          <Route path="/localconscript" element={<Conscript />} />
          <Route path="/localsummary" element={<Summary />} />
          <Route path="/localmanage" element={<LocalManage />} />
          <Route path="/localoperafirst" element={<LocalOperaFirst />} />
          <Route path="/localoperasec" element={<LocalOperaSecond />} />
          <Route path="/localoperathird" element={<LocalOperaThird />} />
          <Route path="/localresult" element={<LocalResult />} />
          <Route path="/forgotpass" element={<ForgotPassword />} />
          <Route path="/adminlocal" element={<LocalUser />} />
          <Route path="/admininstitution" element={<InstitutionUsers />} />
        </Routes>
      )}
    </BrowserRouter>
  );
}

export default App;