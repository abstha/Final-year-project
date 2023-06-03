import React from 'react'
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import { Link } from 'react-router-dom';
import './Footer.css'


function Footer() {
  return (
    <Grid2 xs={12}>
        <Grid2 container spacing={2}>
            <Grid2 xs={6}>
                <Grid2 container>
                    <Grid2 xs={12}>
                        About us:
                    </Grid2>
                    <Grid2 xs={12}>
                        We are a tourist guide and itinerary booking service which aims to provide the users guidance and help
                        in choosing their next travel destination with the help of experienced guides and itinerary creation abilities.
                    </Grid2>
                </Grid2>
            </Grid2>
            <Grid2 xs ={3}>
                <Grid2 container>
                    <Grid2 xs={12}>
                        <div className='footer-link'>
                            <b>Links</b> <br/>
                            <Link to='/map' style={{textDecoration: 'none', color: 'white'}}>Map</Link> <br/>
                            <Link to ='/GuidesPage' style={{textDecoration: 'none', color: 'white'}}>View available guides</Link> <br/>
                            <Link to ='/bookmark' style={{textDecoration: 'none', color: 'white'}}>View bookmarks</Link>
                        </div>
                    </Grid2>
                </Grid2>
            </Grid2>
            <Grid2 xs={3}>
                <Grid2 container>
                    <Grid2 xs={3}>
                        <div className='footer-company'>
                            <h2>Excurso</h2>
                            <b>Copyright 2023</b>
                        </div>
                    </Grid2>
                </Grid2>
            </Grid2>
        </Grid2>
    </Grid2>
  )
}

export default Footer