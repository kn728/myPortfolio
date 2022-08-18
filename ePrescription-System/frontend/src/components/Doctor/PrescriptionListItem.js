import { Card, Button } from '@mui/material'
import React from 'react'
import ClearIcon from '@mui/icons-material/Clear';

export default function PrescriptionListItem({name, repeats, expiration, canDelete, onClickDelete}) {
    const [hover, setHover] = React.useState(false);

  return (
    <Card sx={{p: 3}}>
        <div style={{fontWeight:"500", ".clearIcon:hover":{backgroundColor:"red"}}}>
        {name}
        {canDelete && <ClearIcon onClick={onClickDelete} onMouseEnter={()=>{setHover(true)}} onMouseLeave={()=>{setHover(false)}} sx={{float:"right", backgroundColor: (hover ? "red" : null)}}/>}
        </div>
        <div>Repeats: {repeats}</div>
        <div>Expiration: {new Date(expiration).toDateString()}</div>
    </Card>
  )
}
