//// This is a free template signin page provided by Material UI, a React library
// the templates are found here: https://mui.com/material-ui/getting-started/templates/
// this page is based off of the sign up template

import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
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

export default function DoctorRegisterPatient() {
    const [name, setName] = React.useState();
    const [medicare, setMedicare] = React.useState();
    const [password, setPassword] = React.useState();
    const [phone, setPhone] = React.useState();
    const [email, setEmail] = React.useState();
    const [age, setAge] = React.useState();

    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();
        const patientDetails= {name:name, medicare_id:medicare, password:password, phone:phone, email:email, age:age}
        console.log(patientDetails)

        fetch('http://localhost:5000/api/doctor/registerPatient', {
        method: 'POST',
        headers:{"Content-Type":"application/json"},
        body: JSON.stringify(patientDetails)
        
    }).then((response) => {
        if(response.status===200){
            console.log("register successful")
            navigate(-1) //goes back to doctor dashboard
        }else{
            console.log("not successful")
        }
        
    })

    };
    

    

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
            <Typography component="h1" variant="h4">
                New Patient Details
            </Typography>
            <Box component="form" autoComplete = "off" onSubmit={handleSubmit} sx={{ mt: 3 }}>
                <Grid container spacing={2}>
                <Grid item xs={12}>
                    <TextField
                    required
                    fullWidth
                    id="fullName"
                    label="Full Name"
                    name="fullName"
                    
                    onChange = {e => setName(e.target.value)}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                    required
                    fullWidth
                    id="medicare"
                    label="Medicare Number"
                    name="medicare"
                    inputProps={{minLength:11}}
                    onChange = {e => setMedicare(e.target.value)}
                    />
                </Grid>
                
                <Grid item xs={12}>
                    <TextField
                    required
                    fullWidth
                    name="password"
                    label="Temporary Password"
                    type="password"
                    id="password"
                    
                    onChange = {e => setPassword(e.target.value)}
                    />
                </Grid>

                <Grid item xs={12}>
                    <TextField
                    required
                    fullWidth
                    id="phone"
                    label="Phone Number"
                    name="phone"
                    
                    onChange = {e => setPhone(e.target.value)}
                    />
                </Grid>

                <Grid item xs={12}>
                    <TextField
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    
                    onChange = {e => setEmail(e.target.value)}
                    />
                </Grid>
                
                <Grid item xs={12}>
                    <TextField
                    required
                    fullWidth
                    id="age"
                    label="Age"
                    name="age"
                    
                    onChange = {e => setAge(e.target.value)}
                    />
                </Grid>

                </Grid>
                <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                >
                Register
                </Button>
                <Button
                onClick ={() => navigate(-1)} // goes back 1 page (previous page)
                
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                >
                Back
                </Button>
                <Grid container justifyContent="flex-end">
                
                </Grid>
            </Box>
            </Box>
            <Copyright sx={{ mt: 5 }} />
        </Container>
        </ThemeProvider>
    );
}