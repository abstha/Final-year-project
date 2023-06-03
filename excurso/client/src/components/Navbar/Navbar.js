import React from 'react';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import './navbar.css'
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import logo from '../../assets/logo.png'

function Navbar() {
    const history = useNavigate();

    const handleLogout = () => {
      localStorage.removeItem('usertoken');
      localStorage.removeItem('user');
      localStorage.removeItem('ID');
      
      history('/login');
    }
  
  return (
        <nav className="navbar">
            <div className="navbar-left">
                <Link to="/main">
                  <img src={logo} alt= "logo"/>
                </Link>
            </div>
            <div className="navbar-right">
                <Link to="/bookmark">Bookmarks</Link>
                <Link to="/requests">Requests</Link>
               <Button variant='outlined' sx={{width: "100px", marginLeft: "100px"}} onClick={handleLogout}>Log out</Button>
                {/* <Link to="/"><Button variant='contained' sx={{bgcolor: 'black', width: "100px"}}>Sign up</Button></Link> */}
            </div>
        </nav>
   
  )
}

export default Navbar