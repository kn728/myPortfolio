import React from 'react'
import {List, ListItem, Paper, Typography, Box} from '@mui/material'
import PrescriptionListItem from './PrescriptionListItem';

export default function CurrentScripts({prescriptions, handleDeleteScript}) {
    const items = [];
    for(const p of prescriptions){
        items.push((<ListItem key={p.name}><PrescriptionListItem {...p} canDelete onClickDelete={()=>{handleDeleteScript(p)}}/></ListItem>))
    }
  
    return (
        <Box sx={{ p:1, width: "30vw", borderLeft:1, borderRight:1, pl:2, mr:2}}>
            <Typography  variant="h4">Current Scripts</Typography>
            <Box sx={{width:"19vw"}}>
                <List style={{display:'flex', maxHeight:'77vh', flexDirection:'column', overflow:'auto'}}>
                    {items}
                </List>
            </Box>
        </Box>
    )
}
