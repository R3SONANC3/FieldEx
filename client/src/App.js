import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './components/Home'
import SignUpModal from './components/SignUpModal';
import SelectForm from './components/SelectForm';
import Evaluation from './components/form/EvaluationPage'
import FormManagement from './components/form/FormManagement'
import FormManagement2 from './components/form/FormManagement2'
import SignInModal from './components/SignInModal';
import './components/styles.css'
import GeneralForm from './components/form/GeneralForm';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path="/signin" element={<SignInModal/>} />
        <Route path='/signup' element={<SignUpModal/>} />
        <Route path="/selectform" element={<SelectForm/>} />
        <Route path='/evaluation' element={<Evaluation/>} />
        <Route path='generalform' element={<GeneralForm />} />
        <Route path='/formmanagement' element={<FormManagement/>} />
        <Route path='/formmanagement2' element={<FormManagement2/>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;
