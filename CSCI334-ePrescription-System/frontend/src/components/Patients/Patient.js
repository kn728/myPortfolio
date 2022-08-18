import React from "react"
import "./Patients.css"
import PatientLogin from "./PatientLogin";
import PatientHome from "./PatientHome"
import PatPrescriptionHistory from "./PatPrescriptionHistory";
import UpdateInfoHome from "./UpdateInfoHome";
import PhysicalCondition from "./PhysicalCondition"
import Allergies from "./Allergies"
import Otc from "./Otc"
import { Routes, Route } from 'react-router-dom'
export default function Patient() {
    const[medId, setMedId] = React.useState("")

    return (
               
        <Routes>
            <Route path="PatientLogin" element ={ <PatientLogin changeMed={medId => setMedId(medId)}/> }/>
            <Route path="patHome" element ={<PatientHome medical_id={medId}/>}/>
            <Route path="prescriptionHistory" element ={<PatPrescriptionHistory />}/>
            <Route path="updateInfo" element ={<UpdateInfoHome />}/>
            <Route path="physicalCondition" element ={<PhysicalCondition />}/>
            <Route path="allergiesAndDrugsAdverseReactions" element ={<Allergies />}/>
            <Route path="OTC" element ={<Otc />}/>
        </Routes>                 
        
    )
}