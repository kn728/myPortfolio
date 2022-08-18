import React from 'react'
import {List, ListItem, Paper, Typography, Box} from '@mui/material'
import ContraindicationListItem from './ContraindicationListItem';

export default function PrescriptionHistory({contraindications, warnings, reactions}) {
    const items = [];
    for(const p of contraindications){
        items.push((<ListItem key={p.name}>
            <ContraindicationListItem {...p} kind={"Contraindication"}/>
            </ListItem>))
    }
    for(const p of warnings){
        items.push((<ListItem key={p.name}>
            <ContraindicationListItem {...p} kind={"Warning"}/>
            </ListItem>))
    }
    for(const p of reactions){
        items.push((<ListItem key={p.name}>
            <ContraindicationListItem {...p} kind={"Patient Reaction"}/>
            </ListItem>))
    }
  
    return (
        <Box sx={{ p:1, maxHeight:"100"}}>
            <Typography  variant="h4">Contraindications</Typography>
            <Box sx={{width:"19vw"}}>
                <List sx={{display:'flex', flexDirection:'column', overflow:'auto', maxHeight:"30vh", width:"100%"}}>
                    {items}
                </List>
            </Box>
        </Box>
    )
}
