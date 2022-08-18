import React from "react";
import { useNavigate } from "react-router-dom";

//
export default function PhysicalCondition() {
    const [conditions, setConditions] = React.useState([])
    const [currentCondition, setCurrentCondition] = React.useState("")

    //track input condition
    function inputCondition(event) {
        setCurrentCondition(event.target.value)
    }
    
    //retrieves the discussions
    function getConditions() {
        fetch('http://localhost:5000/api/patient/condition', {
            headers:
            {
                "Authorization":"Bearer " + localStorage.getItem('token')
            }
        }).then(res => res.json())
        .then(data => setConditions(data)) 
                
    }

    const cond= {condition:currentCondition}
    
    //add condition to patient
    const handleCondition = (e) => {
        fetch('http://localhost:5000/api/patient/condition/add', {
            method: 'POST',
            headers:{"Content-Type":"application/json",
            "Authorization": "Bearer "+ localStorage.getItem('token') 
            },
            body: JSON.stringify(cond)
        }).then(() => getConditions())
    } 

    //maps out conditions to be displayed
    let conditionsLayout
    if(Array.isArray(conditions)) {
        conditionsLayout = conditions.map(c => <p key={c}>{c}</p>)
    } else {
        conditionsLayout = [];
    }
    if(conditions.length === 0 ) {
        conditionsLayout = "click here to see conditions!"
    }
    //lists out the options for conditions
    var conInputList = new Array(100);
    for(let i = 0; i < conInputList.length; i++) {
        conInputList[i] = `condition ${i+1}`        
    } 
    
    const conditionInputOptions = conInputList.map(
       conOption => 
            <option value={conOption}
                key = {conOption}>{conOption}</option> )
   
    const navigate = useNavigate();
    function changePage(e) {
        if(e.target.value === "back") {
            navigate("/Patient/updateInfo")
        }
    }
    return (
        <div className = "pageStructure">
            <div className = "screen">
                <h1 className = "PatLogo">Patient</h1>
                
                <h4 className ="updateHeadings">
                    Physical Conditions
                </h4>
                <div className = "infoDisplay" onClick={getConditions} >{conditionsLayout}</div>
                <div className= "updateInfoLayout">
                    <p>Input current physical condition:</p>                    

                    <select onChange={inputCondition} 
                            value={currentCondition}
                            name="condition"
                            >
                        {conditionInputOptions}
                    </select>
                    <button onClick={handleCondition}>Log</button>                    
                </div>
                <div className = "buttonRow2">                
                    <button className="back"
                    value ="back"
                    onClick={changePage}>Back</button>                    
                    
                </div>
            </div>
        </div>
    )
}