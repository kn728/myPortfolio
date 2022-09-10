//import logo from './logo.svg';
import Login from "./pages/Login";
import Patient from "./components/Patients/Patient"
import DoctorLogin from "./components/Doctor/DoctorLogin"
import DoctorRegisterPatient from "./components/Doctor/DoctorRegisterPatient"
import DoctorDashboard from "./components/Doctor/DoctorDashboard"
import PharmacistLogin from "./components/Pharmacist/PharmacistLoginCss"
import PharmacistDashboard from "./components/Pharmacist/PharmacistDashboard"

import NavBar from "./components/NavBar"
import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
import React from "react";
 
function App() {
  React.useEffect(() => {
    
  }, [])
  
  return (
    <Router>
      <NavBar />
      <Routes>
        
        <Route path="/" element = { <Login /> }></Route>

        <Route path="/Patient/*" element = { <Patient /> }></Route>

        <Route path="/patient" element = { <Patient /> }></Route>

        <Route path="/doctorLogin" element = { <DoctorLogin /> }></Route>

        <Route path="/doctorRegisterPatient" element = {<DoctorRegisterPatient/>}> </Route>

        <Route path="/doctorDashboard" element = { <DoctorDashboard /> }></Route>

        <Route path="/pharmacistLogin" element = { <PharmacistLogin /> }></Route>

        <Route path="/pharmacistDashboard" element = { <PharmacistDashboard /> }></Route>

      </Routes>
      
    </Router>
  )
} 


export default App;
