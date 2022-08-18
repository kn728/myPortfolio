import React from "react";
import { useNavigate } from "react-router-dom";

export default function PatPrescriptionHistory() {
    const [prescriptions, setPrescriptions ] = React.useState([])
    const [searchQry, setSearchQry] = React.useState("")

    //tracks search items
    function inputSearch(e) {
        setSearchQry(e.target.value)
    }

    //retrieves a list of prescriptions
    function getPrescriptions() {
        fetch('http://localhost:5000/api/patient/prescription', {
            headers: 
            { 
                "Authorization":"Bearer " + localStorage.getItem('token')
            }
        }).then(res => res.json())
        .then(data => { 
            setPrescriptions(data)            
        })
    }

    //gets a specific a prescription
    function searchPrescription() {
        const q = {query: searchQry}
        fetch('http://localhost:5000/api/patient/prescription/search', {
            method: 'POST',
            headers: {"Content-Type":"application/json",
            "Authorization": "Bearer "+ localStorage.getItem('token')},
            body: JSON.stringify(q)
        }).then(res => res.json())
        .then(data => {
            setSearchQry(data)
            setPrescriptions(data)
        })
    }

    
    //navigate pages
    const navigate = useNavigate();
    function changePage(e) {
        if(e.target.value === "back") {
            navigate("/Patient/patHome")
        }
    }


    //map out prescriptions
    let presLayout
    if(Array.isArray(prescriptions)) {
        presLayout = prescriptions.map(
            p => (
                <tr key={p.name}>
                    <td>{p.name}</td>
                    <td>{p.repeats}</td>
                    <td>{p.expiration}</td>
                </tr>
            ))         
    } else {
        presLayout = [];
    }
    if(prescriptions.length === 0 ) {
        presLayout = "click here to see prescriptions!"
    }


    return (
        <div className="pageStructure">
            <div className ="screen">
                <h1 className = "PatLogo">Patient</h1>
                <h4> Prescription History</h4>
                <div className = "infoDisplayPres" onClick={getPrescriptions}>
                    <table>
                        <tr>
                            <th>name</th>
                            <th>repeats</th>
                            <th>expiration</th>
                        </tr>
                     {presLayout}
                     </table>
                </div>
                
                <input type="text" 
                className ="searchIn"
                placeholder="search"
                onChange={inputSearch}></input>
                
                <button className="Enter" onClick={searchPrescription}>Enter</button>
                <div className="backRow">      
                    <button className="back"
                    value ="back"
                    onClick={changePage}>Back</button>                    
                </div> 
                
                
            </div>
            
        </div>
    )
}