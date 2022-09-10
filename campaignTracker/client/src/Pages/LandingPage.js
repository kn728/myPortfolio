import React from 'react'
import dndCharacter from '../images/dndCharacter.png'
import fantasyTown from '../images/fantasyTown.png'
// <img src={dndCharacter} className='landImage' style={{width: '50%', height:'80vh'}} />
//<img src={fantasyTown} className='landImage' style={{width: '50%', height:'80vh'}}/>

export default function LandingPage() {
    return(
        <div className='page' style={{display:'flex'}}>
           
            <div style={{backgroundColor:'lightgrey', position:'absolute', width:'100%', height:'80vh',display:'flex', justifyContent:'center' }}>
                <div className='landingdndHover' style={{width:'50%', height:'80vh', maxWidth:'1500px'}}>
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