import React from "react";
import QRCode from "qrcode"
import {useState} from "react"
import { useNavigate } from "react-router-dom";


export default function PatientHome(props) {
    
    const[src, setSrc] = useState("")
    const test = props.medical_id
    //generates a qr code          
   QRCode.toDataURL(test).then((data) => {
        setSrc(data);
    })

    //navigates to a different page
    const navigate = useNavigate();
    function changePage(event) {
        if (event.target.value === "update") {
            navigate("/Patient/updateInfo")
        } else if(event.target.value === "pres") {
            navigate("/Patient/prescriptionHistory")
        } else if(event.target.value === "login") {
            navigate("/Patient/PatientLogin")
        }
    }
    
    
    return (
        
            <div className = "pageStructure"> 
                <div className = "screen">
                    <h1 className= "PatLogo">Patient</h1>
                    <div className = "qrDisplay">
                         <img src={src} />
                    </div>
                    <div style={{textAlign:"center"}}>Token String:  {props.medical_id}</div>
                    <div className= "buttonRow1">                                     
                        <button className = "updateInfo" value ="update" onClick={changePage}>Update Information</button>
                                  
                        <button className= "presButton" value ="pres" onClick={changePage}>View prescription History</button>
                    
                    </div>  
                    <div className= "buttonRow2">
                        <button className ="back"  value="login" onClick={changePage}>back</button>                  
                            
                        
                    </div>
                     
                </div>
            </div>
        )
}