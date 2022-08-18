// This is a free template signin page provided by Material UI, a React library
// the templates are found here: https://mui.com/material-ui/getting-started/templates/
// this is based off of the sign in template

import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {Link as RouterLink, useNavigate } from "react-router-dom";



function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        ePrescription System
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme({
    palette:{
        primary: {
            main: '#00b3ff'
        }
    },
    typography: {
      fontFamily: "inter",
      fontSize: 12,
    },
  });

  

export default function DoctorLogin() {
  const [email, setEmail] = React.useState();
  const [password, setPassword] = React.useState();

  const navigate = useNavigate();
  const handleSubmit = (event) => {
    event.preventDefault();
    

    const DoctorDets = {email:email,  password:password}
    let doctorToken

    fetch('http://localhost:5000/api/doctor/login', {
        method: 'POST',
        headers:{"Content-Type":"application/json"},
        body: JSON.stringify(DoctorDets)
        
    }).then(async res =>  res.json())
        .then(res => {                
        doctorToken = res.jwt;

      // login is successful when a token is returned from the fetch
      // so if the doctor token exists, that means they're a registered user and this will route them to
      // doctor dashboard
      if(doctorToken){
        localStorage.setItem('docToken', doctorToken)   
        navigate("/DoctorDashboard")
        console.log("success") 
        
      }
        
    })

  };

  

 
  // test account
  const DoctorObject = {email:"test123",  password:"test123"}
  const testRegister = (e) => {
        e.preventDefault();
        
        
        fetch('http://localhost:5000/api/doctor/register', {
            method: 'POST',
            headers:{"Content-Type":"application/json"},
            body: JSON.stringify(DoctorObject)
        }).then(() => {
            console.log("register successful")
        })
    }

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <img style={{width: "40px"}}src="./eP-logo.png"/>
          </Avatar>
          <Typography component="h1" variant="h5">
            Doctor Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              onChange = {e => setEmail(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange = {e => setPassword(e.target.value)}
            />
            
            
            
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                
              >
                Sign In
              </Button>

            <Button
              onClick ={() => navigate(-1)}
              
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Back
            </Button>
            
            
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}

