import React from "react";
import './Login.css';
import {Link} from "react-router-dom"


export default function Login() {
    return (
                   
            <div className = "login--body">  

                <div className = "login--links">   
                    <h2 className = "login--title"> Login </h2>
                    <Link to="/Patient/PatientLogin" style={{ textDecoration: 'none' }}>
                        <button className = "login--buttons">Patient</button> 
                    </Link>

                    <Link to="/DoctorLogin" style={{ textDecoration: 'none' }}>
                        <button className = "login--buttons">Doctor </button>
                    </Link>

                    <Link to="/PharmacistLogin" style={{ textDecoration: 'none' }}>
                        <button className = "login--buttons">Pharmacist </button>  
                    </Link>          

                </div>  
            </div>        
    )
}