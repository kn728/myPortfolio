import React from "react";
import { useNavigate } from "react-router-dom";


export default function Otc() {   
    
    const [currOtc, setCurrOtc] = React.useState("")
    const [otcList, setOtcList] = React.useState([])
    
    //keep track of otc input
    function inputCurrOTC(event) {
        setCurrOtc(event.target.value)
    }
    
    //retrieves list of patient otc
    function getOTC() {
        fetch('http://localhost:5000/api/patient/otc', {
            headers:
            {
                "Authorization":"Bearer " + localStorage.getItem('token')
            }
        }).then(res => res.json())
        .then(data => setOtcList(data)             
        )        
    }
    
    //adds otc to patient array in database
    const supp={otc:currOtc}
    const searchSupp={query:currOtc}
    const handleOtc = (e) => {
        e.preventDefault()
        fetch('http://localhost:5000/api/patient/otc/add', {
            method: 'POST',
            headers:{"Content-Type":"application/json",
            "Authorization": "Bearer "+ localStorage.getItem('token')},
            body: JSON.stringify(supp)
        }).then(()=> getOTC())
    }

    //removes otc from patient array
    const removeOtc = (e) => {
        e.preventDefault()
        fetch('http://localhost:5000/api/patient/otc/remove', {
            method: 'POST',
            headers:{"Content-Type":"application/json",
            "Authorization": "Bearer "+ localStorage.getItem('token')},
            body: JSON.stringify(supp)
        }).then(() => getOTC())
    }

    //searches for otc
    const searchOtc = (e) => {
        e.preventDefault()
        fetch('http://localhost:5000/api/patient/otc/search', {
            method: 'POST',
            headers:{"Content-Type":"application/json",
            "Authorization": "Bearer "+ localStorage.getItem('token')},
            body: JSON.stringify(searchSupp)
        }).then(res => res.json())
        .then(data => setOtcList(data))
    }

    //maps otc array to be displayed
    let otcListLayout
    if(Array.isArray(otcList)) {
         otcListLayout= otcList.map(o => <p key={o}>{o}</p>)
    } else {
        otcListLayout= [];
    }

    if( otcListLayout.length === 0) {
        otcListLayout = "Click here to view Over the counter medication"
    }

    var otcInputList = new Array(100);
    for(let i = 0; i < otcInputList.length; i++) {
        otcInputList[i] = `otc ${i+1}`        
    } 
    
    const otcInputOptions = otcInputList.map(
        otcOption => 
            <option value={otcOption}
                key = {otcOption}>{otcOption}</option> )

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
                Supplement or over the counter drugs
                </h4>
                <div className = "infoDisplay" onClick={getOTC}>
                    {otcListLayout}
                </div>
                <div className= "updateInfoLayout">
                    <p>Input current Supplement or over the counter drug:</p>
                    <select name="otc"
                    onChange={inputCurrOTC}
                    value={currOtc}>
                        {otcInputOptions}
                    </select>
                    <button onClick={handleOtc}>Log</button> 
                    <button onClick={removeOtc}>Delete</button>  
                    <button onClick={searchOtc}>Search</button>                 
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