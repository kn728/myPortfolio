import React from 'react'
import {Card, Stack, TextField, Button} from '@mui/material'
import { useSelector, useDispatch } from 'react-redux'
import { LogIn } from '../functions'
import { useNavigate } from 'react-router'

export default function Login() {
    const [userName, setUsername] = React.useState('')
    const [password, setPassword] = React.useState('')
    const currUser = useSelector((state) => state.user)
    const dispatch = useDispatch()  
    const nav = useNavigate()
    

    return (
        <div className = 'page' style={{display: 'grid', placeItems:'center'}}>
            <Card sx={{height: '500px',  minWidth:'500px'}}>
                    <div style ={{width: '100%', display: 'flex', justifyContent:'center'}}>
                        <div style={{width:'80%'}}>
                            <h1 style={{ fontSize:'2em', textAlign:'center' ,marginBottom:'0'}}>"Good to see you again, friend"</h1>
                            <p style={{textAlign: 'right', marginTop:'0'}}>-MaleCommoner, Skyrim</p>
                        </div>
                    </div>
                    <Stack spacing={3} alignItems='center' sx={{marginTop: '30px'}}>
                        <TextField label= 'user name' sx={{width:'70%'}} onChange={(e) => setUsername(e.target.value)}/>
                        <TextField label= 'password' type='password'  sx={{width:'70%'}} onChange={(e) => setPassword(e.target.value)}/>
                        <div style={{display: 'flex', justifyContent:'space-between', width:'70%'}}>
                            <Button sx={{color: 'red'}} onClick={() => console.log(currUser)}>Forgotten Password?</Button>   
                            <Button variant='contained' sx={{backgroundColor: 'red'}} onClick={() => LogIn(userName, password, dispatch, nav)}>Sign In</Button>
                        </div>
                    </Stack>
                    
                </Card>    
        </div>
    )
}