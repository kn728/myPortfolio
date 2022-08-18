import React from "react";
import { useNavigate} from "react-router-dom";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import { List, ListItem, Link } from "@mui/material";
import PrescriptionHistory from './PrescriptionHistory'
import CurrentScripts from './CurrentScripts'
import Contraindications from './Contraindications'
import CloseIcon from '@mui/icons-material/Close';
import DoneIcon from '@mui/icons-material/Done';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';


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

export default function DoctorDashboard() {
    const navigate = useNavigate();
    const [medicare_id, setMedicare_id] = React.useState();

    // to initialise state, so textfields that get updated are in a controlled input state
    const [patientDetails, setPatientDetails] = React.useState({name: ''});
    const [prescriptionHistory, setPrescriptionHistory] = React.useState([])
    const [currentScripts, setCurrentScripts] = React.useState([])
  
    const [name, setName] = React.useState('')
    const [repeat, setRepeat] = React.useState('')
    const [expiry, setExpiry] = React.useState('')

    const [contraindications, setContraindications] = React.useState([]);
    const [warnings, setWarnings] = React.useState([]);
    const [reactions, setReactions] = React.useState([]);
    
    const [isContraindicated, setIsContraindicated] = React.useState(true)

    const handleSubmit = (event) => {
        event.preventDefault();
        
        const patientMedicare = {medicare_id: medicare_id}

        fetch('http://localhost:5000/api/doctor/getPatient', {
            method: 'POST',
            headers:{
                "Content-Type":"application/json",
                "Authorization": "Bearer " + localStorage.getItem("docToken") 
        },
            body: JSON.stringify(patientMedicare)
            
        }).then(res =>  res.json())
            .then(json => {    
            setPatientDetails(json)
            setPrescriptionHistory(json.prescriptions.filter((p)=>{
                const date = new Date(p.expiration).getTime() < Date.now();
                const repeats = p.repeats == 0;
                return (date || repeats)}))
            setCurrentScripts(json.prescriptions.filter(p=>{
                const date = new Date(p.expiration).getTime() >= Date.now();
                const repeats = p.repeats > 0;
                return (date && repeats)
            }));
            }
        )
        
        
    };

    const updatePrescription = (current) =>{

        const data = {prescriptions:prescriptionHistory.concat(current), medicare_id}
        fetch('http://localhost:5000/api/doctor/prescription/update', {
            method: 'POST',
            headers:{
                "Content-Type":"application/json",
                "Authorization": "Bearer " + localStorage.getItem("docToken") 
        },
            body: JSON.stringify(data)
            
        }).then(res =>  {
            console.log(res.json)
            console.log(res.status)
        }
        )

    }

    const checkContraindications = (prescriptions, callback) =>{
        const treatments = prescriptions.map((s)=>s.name);
        fetch('http://localhost:5000/api/doctor/contraindications', {
            method: 'POST',
            headers:{
                "Content-Type":"application/json",
                "Authorization":"Bearer "+ localStorage.getItem("docToken")
            },
            body: JSON.stringify({treatments, medicare_id})
        }).then(res=>res.json())
        .then(json=>{
            console.log(json)
            setContraindications([...json.contraindications]);
            setWarnings([...json.warnings]);
            setReactions([...json.patientReactions]);
            if(json.contraindications.length>0 || json.patientReactions.length>0){
                setIsContraindicated(true);
                return true
            }else{
                setIsContraindicated(false);
                return false
            }
        }).then(callback);
    }
    
    const handleDeleteScript = (prescription) => {
        const newScripts = currentScripts.filter(s=>{
            const nameMatch = prescription.name.localeCompare(s.name) ==0;
            const expirationMatch = prescription.expiration.localeCompare(s.expiration) ==0
            const repeatMatch = prescription.repeats === s.repeats
            const poorMatch = !(nameMatch && expirationMatch && repeatMatch)
            let idMatch = true;
            if(prescription._id){
                idMatch = s._id.localeCompare(prescription._id) ==0
                return(poorMatch && !idMatch)
            }else{
                return poorMatch
            }
        })
        setCurrentScripts(newScripts);
        checkContraindications(newScripts, updatePrescription(newScripts))
        
    }

    const addScript = (e)=>{
        e.preventDefault()
        const scr = {name,expiration:new Date(expiry).toUTCString(),repeats:repeat}
        const send = [scr,...currentScripts]
        setCurrentScripts(send)
        checkContraindications(send, updatePrescription(send))
        
    }

    return (
        <ThemeProvider theme={theme}>    
            <Container component="main" maxWidth="xl" sx={{display:'flex', height:'86vh'}}>
                <Box><button type='submit' onClick={()=>{navigate(-1)}}><ArrowBackIcon/></button></Box>
                <Box>
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'left',
                        mr:2,
                        mt:1
                    }}
                >
                    

                    
                    <Typography style = {{marginBottom: "30px",}}variant="h3">Doctor Dashboard</Typography>
                    <Typography variant="h4">Search Patient</Typography>
                    <Stack 
                        direction="row"
                        spacing={2}
                        justifyContent="left"
                    >
                        <Box component="form" autoComplete = "off" onSubmit={handleSubmit} sx={{ mt: -1 }}>
                            <TextField
                                style={{width:"400px"}}
                                margin="normal"
                                required
                                
                                id="medicare"
                                label="Enter Patient's Medicare Number"
                                name="medicare"
                                
                                autoFocus
                                onChange = {e => setMedicare_id(e.target.value)}
                            />
                           
                            <Button
                                type="submit"
                                style={{width:"150px", height:"40px", alignSelf:"center", marginLeft: "10px"}}
                                variant="contained"
                                sx={{ mt: 1, mb: 2 }}
                                >
                                Search Patient
                            </Button>
                            <Button color = {"secondary"}
                                sx={{ml:2, maxWidth: '200px', maxHeight: '30px', minWidth: '100px', minHeight: '30px'}}
                                onClick ={() => navigate("/DoctorRegisterPatient")}
                                
                                variant="contained"
                                
                                >
                                Register new Patient
                            </Button>
                        </Box>
                    </Stack>        

                    
                    


                </Box>

                <Typography style={{marginTop: "30px" }} variant="h4">Patient Details</Typography>
                <Stack spacing={1}>
                    <TextField
                        style={{width:"400px"}}
                        type="text"
                        
                        value={patientDetails.name ?  'Full Name: ' + patientDetails.name : 'Full Name: '}
                        name="medicare"
                        inputProps={
                            { readOnly: true, }
                        }
                    />
                    <TextField
                        style={{width:"400px"}}
                        type="text"
                        
                        value={patientDetails.name ?  'Age: ' + patientDetails.age : 'Age:'}
                        name="medicare"
                        inputProps={
                            { readOnly: true, }
                        }
                    />
                    <TextField
                        style={{width:"400px"}}
                        type="text"
                        
                        value={patientDetails.name ?  'Email: ' + patientDetails.email : 'Email:'}
                        name="medicare"
                        inputProps={
                            { readOnly: true, }
                        }
                    />
                    <TextField
                        style={{width:"400px"}}
                        type="text"
                        
                        value={patientDetails.name ?   'Phone: ' + patientDetails.phone : 'Phone:'}
                        name="medicare"
                        inputProps={
                            { readOnly: true, }
                        }
                    />
                </Stack>
                </Box>

                <PrescriptionHistory prescriptions={prescriptionHistory}/>
                <CurrentScripts prescriptions={currentScripts} handleDeleteScript={handleDeleteScript}/>

                <Box>
                    <Box component="form" autoComplete = "off" onSubmit={addScript} sx={{ mt: 1 }}>
                    <Typography variant="h4">Prescribe Medication</Typography>
                    <TextField
                        style={{width:"400px"}}
                        margin="normal"
                        required
                        
                        id="prescriptionName"
                        label="Enter Prescription Name"
                        name="prescriptionName"
                        
                        autoFocus
                        onChange = {e => setName(e.target.value)}
                    />
                    <TextField
                        style={{width:"400px"}}
                        margin="normal"
                        required
                        
                        id="repeats"
                        label="Enter Repeats"
                        name="repeats"
                        
                        autoFocus
                        onChange = {e => setRepeat(e.target.value)}
                    />
                    
                    <TextField
                        style={{width:"400px"}}
                        margin="normal"
                        required
                        
                        id="repeats"
                        label="Enter Expiration Date"
                        name="repeats"
                        
                        autoFocus
                        onChange = {e => setExpiry(e.target.value)}
                    />

                    <Button
                        type="submit"
                        style={{width:"150px", height:"40px", alignSelf:"center"}}
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                        
                        >
                        Add Script
                    </Button>
                    {isContraindicated ? <CloseIcon/> : <DoneIcon/>}
                    </Box>
                    <Box>
                        <Contraindications contraindications={contraindications} warnings={warnings} reactions={reactions}/>

                    </Box>
                </Box>

            </Container>
        </ThemeProvider>  
    )
}