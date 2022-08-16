import React, { useEffect } from "react";
import { TextField, Button, Card } from "@mui/material";
import { flexbox } from "@mui/system";



export default function Dice() {
    const [numOfDice, setNum] = React.useState(0)
    
    const [dice, changeDice] = React.useState([]);

    
    function setDice(e) {
        setNum(e.target.value)
    }

    function placeDice() {
        const num = Number(numOfDice)
        if(Number.isInteger(num)) {
            changeDice(() => {
                const temp =  Array(num);
                for(let i= 0; i < temp.length; i++) {
                    temp[i] =1
                }
                return temp;
            })  
            console.log(dice)                 
        }
    }
    const [isAnimated, setIsAnimated] = React.useState("")
   
    let manyDice = dice.map((number, index) => {
           return (
            <div key={index} data-index={index} 
                    style=
                        {{width: '50px', height:'50px', 
                        backgroundColor: "yellow",  
                        color: 'black', 
                        margin: '10px',
                        display:'flex', justifyContent:'center' 
                    , alignItems:'center', padding:'10px'}}
                        onClick={setDiceNumber} 
                        className= {isAnimated}              
                >
                       {number}     
                </div>
    )})
   
    
       
    
//Math.floor(Math.random() * (7 - 1) ) + 1
    function setDiceNumber(e) {
        const x = e.currentTarget.dataset.index
        const copy = [...dice];
        copy[x] = Math.floor(Math.random() * (7 - 1) ) + 1
        e.target.classList.add('diceAnimate')       
        setTimeout(function() {
            e.target.classList.remove("diceAnimate")
            changeDice(copy)
        }, 800)
        
    }
    

    function rollAll() {
        const copy = Array(dice.length)
        for(let i=0; i < copy.length; i++) {            
            copy[i] = Math.floor(Math.random() * (7 - 1) ) + 1
        }       
        setIsAnimated("diceAnimate")
        setTimeout(() => {
            setIsAnimated("")
            changeDice(copy)
        }, 800) 
        
    }
  

    return(
       
        <Card className="diceTable" sx={{backgroundColor:'red'}}>
            <div style ={{width:'100%', display: 'flex', justifyContent:'center'}}>
                <TextField id="outlined-basic" label="Number of Dice" variant="outlined"  sx={{backgroundColor:'white'}} onChange={setDice}/>
                <Button variant="contained" onClick={placeDice}>Place Dice</Button>
           </div>
           <div style={{display:'flex', margin: '20px', flexWrap:'wrap'}}>
             {manyDice}
           </div>
           <Button variant="contained" onClick={rollAll}>roll</Button>
        </Card>
        
    )
}