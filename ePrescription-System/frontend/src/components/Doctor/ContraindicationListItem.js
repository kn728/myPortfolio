import { Card, Button } from '@mui/material'
import React from 'react'

export default function ContraindicationListItem({item1, item2, kind}) {
  return (
    <Card sx={{p: 3}}>
        <div><em>{kind}</em></div>
        <div style={{fontWeight:"500"}}>
        {item1.name}
        </div>
        <div>{item1.type}</div>
        {item2 && <span>
        <br/>
        <div style={{fontWeight:"500"}}>
        {item2.name}
        </div>
        <div>{item2.type}</div></span>
        }
        </Card>
  )
}
