import React from 'react'
import {List, ListItem, Paper, Typography, Box} from '@mui/material'
import PrescriptionListItem from './PrescriptionListItem';

export default function PrescriptionHistory({prescriptions}) {
    const items = [];
    for(const p of prescriptions){
        items.push((<ListItem key={p.name}><PrescriptionListItem {...p}/></ListItem>))
    }
  
    return (
        <Box sx={{ p:1, width: "30vw", borderLeft:1, pl:2, maxHeight:"100"}}>
            <Typography  variant="h4">Prescription History</Typography>
            <Box sx={{width:"19vw"}}>
                <List sx={{display:'flex', flexDirection:'column', overflow:'auto', maxHeight:"77vh"}}>
                    {items}
                </List>
            </Box>
        </Box>
    )
}
