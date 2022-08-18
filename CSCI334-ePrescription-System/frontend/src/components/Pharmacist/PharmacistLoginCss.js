// This is a free template signin page provided by Material UI, a React library

import * as React from 'react';


import { useNavigate } from "react-router-dom";  

export default function PharmacistLogin( ) {
  
  
  const [email, setEmail] = React.useState();
  const [password, setPassword] = React.useState();
  const [isCorrect, setIsCorrect] = React.useState(true)

  function inputEmail(e) {
    setEmail(e.target.value)
  }

  function inputPassword(e) {
    setPassword(e.target.value)
  }


//checks login
  const logIn = (e) => {
    e.preventDefault();
    const pharm = {pharmacist_id: email, password: password} 
    console.log(email + "   " + password)
    fetch('http://localhost:5000/api/pharmacist/login', {
        method:'POST',
        headers:{"Content-Type":"application/json"},
        body: JSON.stringify(pharm)
    }).then(res =>  res.json())
    .then(res => {
      const pharmToken = res.jwt;

      if(pharmToken) {
        localStorage.setItem('phtoken', pharmToken)
        setIsCorrect(true)
        navigate("/pharmacistDashboard")
      } else {setIsCorrect(false)}

    })
  }

  //change navigation
  const navigate = useNavigate()
  function changePage(e) {
      if(e.target.value === "back") {
        navigate("/")
      }
  }

 return (
  <div className = "loginStructure">  
  <h1 className = "pageTitle">Pharmicist Login</h1>          
      <div className ="Login">               
          <div className = "LogInfo">                        
              <input type="text" 
                  className = "in" 
                  placeholder="email"
                  onChange = {inputEmail}                   
              />
          
              
              <input type="password" 
              className = "inPass" 
              placeholder="password"
              onChange ={inputPassword}             
              />  
                            
              <button className = "logInButton" onClick={logIn}>Login</button> 

              <div className ="passHolder">
                  <button className ="backToLogin" onClick = {changePage} value="back">back</button> 
                  {!isCorrect && <span className="wrong">wrong details!</span> }                        
              </div>           
          </div>          
      </div>      
  </div> 
 )
}

