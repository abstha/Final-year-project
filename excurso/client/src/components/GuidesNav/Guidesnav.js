import React from 'react'
import logo from '../../assets/logo.png'
import { Button, Container } from '@mui/material'
import Badge from '@mui/material/Badge';
import MailIcon from '@mui/icons-material/Mail';
import './GuidesNav.css'
import { useNavigate } from 'react-router-dom';

const Guidesnav = () => {
  const history = useNavigate();

    const handleLogout = () => {
      localStorage.removeItem('token');
      localStorage.removeItem('Guide');
      localStorage.removeItem('GuideID')
      
      history('/guides/login');
    }
  return (
    <div className='Guides-nav'>
        <Container>
            <div className='nav-guides'>
                <img src={logo} alt='logo'></img>
                <Button variant="standard" onClick={handleLogout}>log out</Button>
            </div>
        </Container>
        
    </div>
  )
}

export default Guidesnav