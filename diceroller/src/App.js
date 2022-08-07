import logo from './logo.svg';
import './App.css';
import Dice from "./Components/dice"
import React from "react"


function App() {
  return (
    <div style = {{position: 'absolute', width: "100%", 
          height: "100%", display: 'flex', justifyContent:'center'}}>
        <Dice />
    </div>
  );
}

export default App;
