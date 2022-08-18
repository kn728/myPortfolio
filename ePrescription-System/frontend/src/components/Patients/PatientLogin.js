import React from "react";
import './Patients.css';
import { useNavigate } from "react-router-dom";





export default function PatientLogin(props) {
    const [userName, setUserName] = React.useState("")
    const [pword, setPassword] = React.useState("")
    const [isCorrect, setIsCorrect] = React.useState(true)//decides if login details are correct
     
    //confirm log in details
    let patToken;
    const navigate = useNavigate();
    const testLogin = (e) => {
        e.preventDefault();
        const PatientDets = {medicare_id:userName,  password:pword}
        
        fetch('http://localhost:5000/api/patient/login', {
            method: 'POST',
            headers:{"Content-Type":"application/json"},
            body: JSON.stringify(PatientDets)
        }).then(res =>  res.json())
            .then(res => {                
            patToken = res.jwt;            
            
            if(patToken && res.medicare_id.length === 11) {
                localStorage.setItem('token', patToken) 
                setIsCorrect(true)                 
                navigate("/Patient/patHome")
                console.log("success")  
            } else {
                setIsCorrect(false)
            }           
        }).then(() => props.changeMed(userName))       
    }


    function signOut() {
        navigate("/")
    }

   function handleUserName(event) {
        setUserName(event.target.value)
    }

    function handlePassword(event) {
        setPassword(event.target.value)
    }
    return (
        <div className = "loginStructure">  
            <h1 className = "pageTitle">Patient Login</h1>          
                <div className ="Login">               
                    <div className = "LogInfo">                        
                        <input type="text" 
                            className = "in" 
                            placeholder="medicare id"
                            onChange={handleUserName}
                        />
                    
                        
                            <input type="password" 
                            className = "inPass" 
                            placeholder="password"
                            onChange={handlePassword}
                            />                            
                                     
                        <button className = "logInButton" onClick={testLogin}>Login</button> 
                        <div className ="passHolder">
                            <button className ="backToLogin" onClick = {signOut}>back</button> 
                            {!isCorrect && <span className="wrong">wrong details!</span> }                        
                        </div>
                    </div>                    
                </div>                
            </div>        
    )   
}