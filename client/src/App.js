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
import ForgorPassword from "./admin/ForgorPassword";
import Loding from './components/Loading'


function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate a 2-second loading time
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <BrowserRouter>
      {isLoading ? (
        <div style={{ textAlign: "center"}}>
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
          <Route path="/forgotpass" element={<ForgorPassword />} />
        </Routes>
      )}
    </BrowserRouter>
  );
}

export default App;
