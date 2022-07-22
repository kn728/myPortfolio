import './App.css';
import React, { Fragment } from "react";
import {Button, Card} from '@mui/material'
function App() {
  const [currDeck, setDeck] = React.useState({})
  const [currCards, SetCards] = React.useState([])
  const [total, setTotal] = React.useState(0)
  
  function shuffle() {
    fetch("https://www.deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1")
    .then(res => res.json())
    .then(data =>  setDeck(data))

    SetCards([])
    setTotal(0)
  }

  function getCard() {
    fetch("https://www.deckofcardsapi.com/api/deck/"+ currDeck.deck_id +"/draw/?count=1")
    .then(res => res.json())
    .then(data => {
      console.log(data)
      const v = parseInt(data.cards[0].value)
     
      if(!(v <= 10)) {
        setTotal(prev => (prev + 10))
       } else {
       setTotal(prev => (prev + parseInt(v)))
      }
      SetCards(prev =>[...prev, data.cards[0]])
    })
     
    
  }

  let hand = currCards.map((item, i) => {
    return (
    <img key ={i} src= {item.image} style={{padding: '15px 10px 15px 10px'}} />
    )
  })


  return (
    <React.Fragment>
      <div style={{width: '100%', height:'100%', position:'fixed', backgroundColor:'green'}}>
        <h1>{total}</h1>
        <div style={{top: '60%', width: '100%',position: 'fixed',  display: 'flex', justifyContent: 'center'}}>
          <div style ={{minWidth: '50%',maxWidth: '100%',  display: 'flex', flexDirection:'column'}}>
            <Card sx={{backgroundColor:'darkgreen', display: 'flex', justifyContent:'center'}}>
              {hand}
            </Card>
            <div style={{display: 'flex', justifyContent:'space-around', marginTop: '10px', width: '30%',  alignSelf:'center'}}>
              <Button  variant="contained" onClick ={shuffle}>shuffle</Button>
              <Button  variant="contained" onClick ={getCard}>Hit</Button>
            </div>
          </div>
        </div>          
      </div>
    </React.Fragment> 
  )
}

export default App;
