import React from 'react';
import "./landingpagecss.css"
import Button from '@mui/material/Button';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';


export default function Landingpage(){
    return(
        <div className='main2'>
            <div className='hero_image'> 
                <div className='Navbar'>
                    <Grid2 container spacing={2} direction="column" columnSpacing={{xs:1}}>
                        <Grid2 item xs={12} container>
                            <Grid2 item xs={2}/>
                            <Grid2 item xs={1}>
                                logo
                            </Grid2>
                            <Grid2 item xs ={1}>
                                Home
                            </Grid2>
                            <Grid2 item xs={1}>
                                Destinations
                            </Grid2>
                            <Grid2 item xs={1}>
                                About
                            </Grid2>
                            <Grid2 item xs={1}>
                                Pricing
                            </Grid2>
                            <Grid2 item xs ={5}>
                                <input type={Text}></input>
                            </Grid2>
                        </Grid2>
                    </Grid2>
                </div>
                <div className='hero_text'>
                    <h1 className='Title1'>EXPLORE NEPAL</h1>
                    <div className='hero_sub1'>
                        <p>Visit Temples, forests and breathtaking mountains</p>
                    </div>
                    <div className='hero_sub2'>
                        <p>Experience the adventure now</p>
                    </div>
                    <br></br>
                    <div className='btngroup'>
                       <Button variant='contained' className='LoginBtn' sx={{color: 'white', backgroundColor: 'black'}}>
                            Login
                        </Button>
                       <Button variant='contained' className='SignupBtn'>
                            Sign up
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}