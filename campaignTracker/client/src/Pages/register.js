import React from 'react'
import {Card, Stack, TextField, Button} from '@mui/material'
import { Reg } from '../functions'

export default function Register() {
    const [name, setName] = React.useState('')
    const [email,setEmail] = React.useState('')
    const [userName, setUsername] = React.useState('')
    const [password, setPassword] = React.useState('')

    return (
        <div className = 'page' style={{display: 'grid', placeItems:'center'}}>
            <Card sx={{height: '700px',  minWidth:'600px'}}>
                    <div style ={{width: '100%', display: 'flex', justifyContent:'center'}}>
                        <div style={{width:'80%'}}>
                            <h1 style={{ fontSize:'2em', textAlign:'center' ,marginBottom:'0'}}>"Come, come. I haven't got all day."</h1>
                            <p style={{textAlign: 'right', marginTop:'0'}}>-MaleOldGrumpy, Skyrim</p>
                        </div>
                    </div>
                    <Stack spacing={3} alignItems='center' sx={{marginTop: '30px'}}>
                        <TextField label= 'Full Name' sx={{width:'70%'}} onChange={(e) => setName(e.target.value)}/>
                        <TextField label= 'Email' sx={{width:'70%'}} onChange={(e) => setEmail(e.target.value)}/>
                        <TextField label= 'user name' sx={{width:'70%'}} onChange={(e) => setUsername(e.target.value)}/>
                        <TextField label= 'password' type='password'  sx={{width:'70%'}} onChange={(e) => setPassword(e.target.value)}/>
                        <div style={{display: 'flex', justifyContent:'center', width:'70%', margin: '40px'}}>                             
                            <Button variant='contained' onClick={() => Reg(name, userName, email, password)}
                            sx={{backgroundColor: 'red', width:'40%', height:'50px'}} >Register</Button>
                        </div>
                    </Stack>
                    
                </Card>    
        </div>
    )
}
