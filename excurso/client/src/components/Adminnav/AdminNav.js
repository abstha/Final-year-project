import {React, useState} from 'react'
import './Adminnav.css'
import MenuIcon from '@mui/icons-material/Menu';
import Sidebar from '../Sidebar/Sidebar'


const AdminNav = ({ onSidebarToggle }) => {

  return (
    <div className='admin-navbar'>
        <MenuIcon className='menu' onClick={onSidebarToggle} sx={{ width: '70px', height: '50px' }} />
        <h2>Welcome back Admin</h2>
    </div>
  )
}

export default AdminNav