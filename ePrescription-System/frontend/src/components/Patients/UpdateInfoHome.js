import React from "react";
import { useNavigate } from "react-router-dom";

export default function UpdateInfoHome() {
    const navigate = useNavigate() 
    //navigate pages
    function changePage(e) {
        if(e.target.value === "conditon") {
            navigate("/Patient/physicalCondition")
        } else if(e.target.value === "reactions") {
            navigate("/Patient/allergiesAndDrugsAdverseReactions")
        } else if(e.target.value === "otc") {
            navigate("/Patient/OTC")
        }  else if(e.target.value === "home") {
            navigate("/Patient/patHome")
        }

    }

    

    return (
        <div className = "pageStructure">
            <div className = "screen">
                <h1 className = "PatLogo">Patient</h1>
                <p className = "updateP">what you can update:</p>                    
                <button className="updateb1" 
                    value="conditon"
                    onClick={changePage}
                >Physical Condition</button>
            
                <button className="updateb2"
                    value="reactions"
                    onClick={changePage}
                >allergies and drug adverse reactions
                </button>  
                
                <button className="updateb3"
                        value="otc"
                        onClick={changePage}
                    >over the counter drugs</button> 
                <div className= "buttonRow2">
                    <button className="back"
                    value="home"
                    onClick={changePage}>Back</button>                
                       
                </div>      
            </div>

        </div>
    )
}