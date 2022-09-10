import React from 'react'
import { loginUser} from './redux/features/user.js'


export function LogIn(userName, password, dispatch, nav) {
    const user = {userName, password}
     
    fetch('http://localhost:5000/login', {
        method: 'POST',
        headers: {"Content-Type":"application/json"},
        body: JSON.stringify(user)
    }).then(res => res.json()).then(data => {
        if(data) {
            dispatch(loginUser({id: data._id, name: data.name, userName: data.userName, email: data.email, campaigns: data.campaigns}))
            nav('/landing')
        }
    })
    
}

export function Reg(name, userName, email, password) {
    const user = {name, userName, email, password}
    fetch('http://localhost:5000/register', {
        method: 'POST',
        headers: {"Content-Type":"application/json"},
        body: JSON.stringify(user)
    }).then(res => res.json()).then(data => console.log(data))
}