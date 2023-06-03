import {React, useState} from 'react'
import { Link } from 'react-router-dom'
import './Sidebar.css'
import Divider from '@mui/material/Divider';
import PersonIcon from '@mui/icons-material/Person';
import PlaceIcon from '@mui/icons-material/Place';
import NearMeIcon from '@mui/icons-material/NearMe';
import MapIcon from '@mui/icons-material/Map';
import { Button } from '@mui/material'

const Sidebar = () => {
  const [admin, setAdmin] = useState("abhinav");
  return (
    <div className='Sidebar'>
        <div className='CurrentAdmin'>
          <h2>Welcome {admin}</h2>
          <Divider sx={{backgroundColor:"white"}} flexItem/>
        </div>
        
        <div className='SideItems'>
          <div className='Item'>
            {/* <img src={user} alt="user"/> */}
            <PersonIcon/>
            <Link to="/admin/usertable" style={{textDecoration: 'none', color:'rgb(179, 179, 179)'}}><h3>Users</h3></Link>
          </div>
          <div className='Item'>
            <PlaceIcon/>
            <Link to ="/admin/pins" style={{textDecoration: 'none' , color:'rgb(179, 179, 179)'}}><h3>Pins</h3></Link>
          </div>
          <div className='Item'>
            <NearMeIcon/>
            <Link to ="/admin/guides" style={{textDecoration: 'none' , color:'rgb(179, 179, 179)'}}><h3>Guides</h3></Link>
          </div>
          <div className='Item'>
              <MapIcon/>
            <Link to ="/admin/destinations" style={{textDecoration: 'none', color:'rgb(179, 179, 179)'}}><h3>Destination</h3></Link>
          </div>
          <div className='Item'>
              <Link to="/admin"><Button variant='contained'>Log out</Button></Link>
          </div>
        </div>
    </div>
  )
}

export default Sidebar