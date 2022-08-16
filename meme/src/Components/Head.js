import React from "react"

export default function Head() {
    return(
        <nav className="Head">
            <img src={require("../images/troll.png")} className ="troll" />
            <div className="headWords">
                <h2> Meme generator</h2>
                <h4> React Course-project 3</h4>
            </div>
        </nav>
    )
}