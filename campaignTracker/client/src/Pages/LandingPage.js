import React from 'react'
import { useNavigate } from 'react-router'

export default function LandingPage() {
    let nav = useNavigate()
    

    return(
        <div className='page' style={{display:'flex'}}>
           
            <div style={{backgroundColor:'lightgrey', position:'absolute', width:'100%',minWidth:'1000px', height:'80vh',display:'flex', justifyContent:'center' }}>
                <div className='landingdndHover'  onClick={() => nav('/charLanding')}
                style={{width:'50%', height:'80vh', maxWidth:'1500px'}}>
                    <div style={{ height:'25vh', display:'grid', placeItems:'center'}}>
                        <h1 style={{color:'white'}}> Characters</h1>
                    </div>
                </div>
                <div className='landingcampHover' style={{width:'50%', height:'80vh', maxWidth:'1500px'}}>
                    <div style={{  height:'25vh', display:'grid', placeItems:'center'}}>
                        <h1 style={{color:'black'}}> Campaigns</h1>
                    </div>
                </div>
            </div>
        </div>
    )
}