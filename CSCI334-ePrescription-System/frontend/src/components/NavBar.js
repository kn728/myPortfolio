import React from "react"
import logo from '../eP-logo-large.png'
import "./NavBar.css"
import {Box} from '@mui/material'

export default function Navbar(){
    
    return(
        <Box className = "nav">
            <img src= {logo} className = "nav--logo"/>
            <h1 className = "nav--text" > ePrescription System </h1>
        </Box>
    )
}