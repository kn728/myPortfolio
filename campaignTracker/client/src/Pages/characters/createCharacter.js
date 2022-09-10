import React from 'react'
import {TextField, Button} from '@mui/material'
import FileBase from 'react-file-base64'

export default function CreateCharacter() {
    
    const [character, setCharacter] = React.useState({
        name:'',
        age:'',
        photo:'',
        description:''
    })

    function sendCharacter() {
        fetch("http://localhost:5000/character", {
            method: 'POST',
            headers:{"Content-Type":"application/json"},
            body: JSON.stringify(character)
        }).then(res=> res.json())
        .then(data => console.log(data))
    }
   

    return (
    <div style={{width:'100%', height:'90vh', display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'center'}}>
       <TextField label='name' onChange={e => setCharacter(prev => ({...prev, name: e.target.value}))} />
       <TextField label='age'  onChange={e => setCharacter(prev => ({...prev, age: e.target.value}))}/>
        <FileBase 
            type='file'
            multiple={false}
            onDone={({base64}) => setCharacter(prev => ({...prev, photo: base64}))}
        />
       <TextField label='description'  onChange={e => setCharacter(prev => ({...prev, description: e.target.value}))} />
       <Button onClick={() => sendCharacter()}>Submit</Button>

    </div>
    )
}