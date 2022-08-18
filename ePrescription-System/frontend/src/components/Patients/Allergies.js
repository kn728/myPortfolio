import React from "react";
import { useNavigate } from "react-router-dom";

export default function Allergies() {
    const [allergyList, setAllergyList] = React.useState([])
    const [currAllergy, setCurrAllergy] = React.useState("")
    

   //keeps track of what allergy/reaction is chose
    function inputAllergy(event) {
        setCurrAllergy(event.target.value)              
    }       
    
    //retrieves list of allergies
    function getAllergies() {
        fetch('http://localhost:5000/api/patient/reaction', {
            headers:
            {
                "Authorization":"Bearer " + localStorage.getItem('token')
            }
        }).then(res => res.json())
        .then(data => setAllergyList(data))     
    }

    //adds reaction to database
    const handleAllergy= (e) => {  
        let aType = "prescription"
        if(currAllergy.charAt(0) === 'o' ) {
            aType = "otc"
        } 

        const a= {name: currAllergy, type: aType}
        fetch('http://localhost:5000/api/patient/reaction/add', {
            method: 'POST',
            headers:{"Content-Type":"application/json",
                "Authorization": "Bearer "+ localStorage.getItem('token') 
            },
            body: JSON.stringify(a)
            }).then(() => getAllergies())             
    } 
    
    //lists all options for dropdown box    
    var AllInputList = new Array(200);
    for(let i = 0; i < AllInputList.length; i++) {
        if(i < 100) {
        AllInputList[i] = `otc ${i+1}` 
        }  else {
            AllInputList[i] = `prescription ${(i+1) -100}` 
        }    
    } 

    let allergyLayout
    let allergyTypeLayout
    if(Array.isArray(allergyList)) {
        allergyLayout = allergyList.map(a => <p key={a.name}>{a.name}</p>)
        allergyTypeLayout= allergyList.map(a => <p key={a.name}>{a.type}</p>)
    } else {
        allergyLayout = [];
        allergyTypeLayout= []
    }
    if(allergyList.length === 0 ) {
        allergyLayout = "click here to see Allergies or reactions!"
        allergyTypeLayout=""
    }
    
    //manage mapping allergy options
    const AllergyInputOptions = AllInputList.map(
       allergyOption => 
            <option value={allergyOption}
                key = {allergyOption}>{allergyOption}</option> )
   
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
                Allergies and drug adverse reactions
                </h4>
                <div className = "infoDisplayReaction" onClick={getAllergies}> 
                    <div className = "infoName">
                    <h4>Product name</h4>
                        {allergyLayout}
                    </div>
                    <div className = "infoName">
                        <h4>type</h4>
                        {allergyTypeLayout}
                    </div>
                </div>
                <div className= "updateInfoLayout">
                    <p>Input allergy or drug adverse reaction:</p>
                    <select name="allergy"
                            onChange={inputAllergy}
                            value={currAllergy}
                            >
                            {AllergyInputOptions}
                    </select>
                    <button onClick={handleAllergy}>Log</button>                    
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