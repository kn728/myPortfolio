import React from 'react'
import { AppBar, Toolbar, Button } from '@mui/material'
import logo from '../images/logo.png'
import {useNavigate} from "react-router-dom"

export default function Navbar() {
let nav = useNavigate()
function changePage(e) {
    const t= e.target.value
    if (t === 'login') {
        nav('/login')
    }else if(t === 'register') {
        nav('/register')
    }
}
    return (
        <AppBar className = 'test' sx={{backgroundColor: 'black', height:'10vh'}}>
            <Toolbar sx={{justifyContent:'space-between',  height:'100%'}}>
                <img src={logo} />
                <Toolbar>
                    <Button variant='contained' onClick={changePage} value='login'
                    sx={{backgroundColor:'red', fontFamily: 'Oswald, sans-serif', letterSpacing:'2px', margin:'20px'}}> Log In</Button>
                    <Button variant='contained' onClick={changePage} value='register'
                    sx={{backgroundColor:'red', fontFamily: 'Oswald, sans-serif', letterSpacing:'2px'}}> Sign Up</Button>

                </Toolbar>
            </Toolbar>
        </AppBar>
    )
}