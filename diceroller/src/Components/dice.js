import React from "react";




export default function Dice() {
    const [num, changeNum] = React.useState(1);

    function setDiceNumber() {
        changeNum(Math.floor(Math.random() * (7 - 1) ) + 1)
    }

    function Dices () {
        return (
            <div style=
                    {{width: 50, height: 50, 
                    backgroundColor: "yellow",  
                    color: 'black', textAlign:'center',
                    marginRight: '10px'
                    }}
                onClick={setDiceNumber}
            >
                        {num}
            </div>
        )
    }

    return(
        <div className = "diceHolder">
           <Dices />
           <Dices />
           <Dices />
        </div>
    )
}