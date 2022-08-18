import React from "react";
import "./pharmacist.css"
import { useNavigate } from "react-router-dom";

export default function PharmacistDashboard() {
    const [patId, setPatId] = React.useState("")
    const [scripts, setScripts ] = React.useState([])
    const [dispensations, setDispensations] = React.useState([])
    const [reactionList, setReactionList] = React.useState([])
    const [isScripts, setIsScripts] = React.useState(true)
    const [isReactions, setIsReactions] = React.useState(true)
    const [isPatient, setIsPatient] = React.useState(true)

    const navigate = useNavigate()
    //track pharmacist input
    function inputId(e) {
        setPatId(e.target.value)
    }
    //retrieve the scripts
    const getScripts = (e) => {
        e.preventDefault()
        const s = {medicare_id: patId}

        fetch('http://localhost:5000/api/pharmacist/scripts', {
            method:'POST',
            headers:{"Content-Type":"application/json",
            "Authorization": "Bearer "+ localStorage.getItem('phtoken')},
            body: JSON.stringify(s)
        }).then(res => res.json())
        .then(data => {
                if(data.activeScripts) {
                    setScripts(data.activeScripts) 
                    setIsPatient(true)                              
                    getPatientInfo()
                    if(Array.isArray(data.activeScripts)) {
                        if(data.activeScripts.length === 0) {
                            setIsScripts(false)
                        }else {
                            setIsScripts(true)
                        }
                    } 
            } else {
                setIsPatient(false)
            }    
        })
    }
    //retrieve the patient allergies
    function getPatientInfo() {
        const s = {medicare_id: patId}

        fetch('http://localhost:5000/api/pharmacist/reactions', {
            method: 'POST',
            headers: {"Content-Type":"application/json",
            "Authorization": "Bearer "+ localStorage.getItem('phtoken')},
            body: JSON.stringify(s)
        }).then(res => res.json())
        .then(res => {
            if(res.reactions) {
                setReactionList(res.reactions)
                if(Array.isArray(res.reactions)) {
                    if(res.reactions.length === 0) {
                        setIsReactions(false)
                    }else {
                        setIsReactions(true)
                    }
                }
            } 
        })
    }

    

    
    //handles the dispensations array
    function handleDispensations(e) {
        if(e.target.checked) {            
            for(let i=0; i < scripts.length; i++){
                if(scripts[i].name === e.target.value) {
                    setDispensations(prev => {
                        return[...prev, scripts[i]]
                    })
                }
            }
        } else { 
            for(let i=0; i < scripts.length; i++)   {
                if(scripts[i].name === e.target.value) {
                    setDispensations(prev => prev.splice(i, 1))
                }
            }         
        }        
    }
    //maps out scripts to be displayed
    let scriptLayout
    if(Array.isArray(scripts)) {
        scriptLayout = scripts.map(a => (
            <div key={a.name} className="presList">
                <p key={a.name} className="pName">{a.name}</p>
                <p className="pdata">Repeats: {a.repeats}</p>
                <p className="pdata">expiration: {a.expiration}</p>
                <div className="checkHolder">
                    <input type="checkbox" value={a.name}
                    onChange={handleDispensations}  className="checkScript"></input>
                 </div>
            </div>
        ))
    } else {
        scriptLayout = [];
    }
    if(scripts.length === 0 ) {
        scriptLayout = "Click the Retrieve Patient Data button to see scripts!"
    }
    
    //send the chosen prescriptions to be dispensed
    const sendDispenses= (e) => {
        e.preventDefault();
        const disp= {dispensations: dispensations, medicare_id: patId }

        fetch('http://localhost:5000/api/pharmacist/dispense', {
            method:'POST',
            headers: {"Content-Type":"application/json",
            "Authorization": "Bearer "+ localStorage.getItem('phtoken')},
            body: JSON.stringify(disp)
        }).then(res => res.json())
        .then(res =>{ 
            setScripts(res)
            setDispensations([])            
        });
    }

    let reactNameLayout
    let reactTypeLayout
    if(Array.isArray(reactionList)) {
        reactNameLayout = reactionList.map(a => <p key={a.name}>{a.name}</p>)
        reactTypeLayout= reactionList.map(a => <p key={a.name}>{a.type}</p>)
    } else {
        reactNameLayout = [];
        reactTypeLayout= []
    }
    if(reactionList.length === 0 ) {
        reactNameLayout = "Click the Retrieve Patient Data button to see Allergies or reactions!"
        reactTypeLayout=""
    }

    function changePage() {
        navigate("/PharmacistLogin")
    }

    return (                      
            <div className ="pageMargin" >  
                <h1 className="phTitle">Pharmacist DashBoard</h1>                
                <div className ="phInput">
                <span className="lblSearch"> Search: </span>
                    <input type="text"
                        placeholder="Search patient medicare_id"
                        className="patIdholder"
                        onChange={inputId}></input>                
                    <button className="scriptsButton" onClick={getScripts}>Retrieve Patient Data</button> 
                    <button onClick={sendDispenses} className = "disSend">Send Dispensions</button>
                    {!isPatient && <span className="note">Patient does not exist</span>}
                </div>
                <div className="phStructure">   
                    <div className ="phDisplay">
                        <h3>View Prescriptions</h3>                                                
                        {scriptLayout} 
                    {!isScripts && <p>Patient does not have any prescriptions, please check the medicare id or inform the patient</p>}                       
                    </div>
                    <div className ="reactionDisplay">
                        <h3>Drug Adverse Reactions</h3>
                        <div className = "reactionStructure">
                            <div>
                                <h5>Medication Name</h5>
                                {reactNameLayout}
                                {!isReactions && <p>Patient does not have any reactions or allergies to drugs</p>}
                                
                            </div>
                            <div>
                                <h5>Type</h5>
                                {reactTypeLayout}
                            </div>
                        </div>  
                    </div>
                </div>
                <button className="phBack" onClick={changePage}>Back</button>                 
            </div>     
               
    )               
}