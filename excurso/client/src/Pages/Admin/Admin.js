import {React, useState} from 'react'
import axios from 'axios';
import { Navigate, useNavigate } from 'react-router-dom';
import './Admin.css'

const Admin = () => {
    const [userName, setuserName] = useState('');
    const [password, setPassword] = useState('');
    const history  = useNavigate();
  
    const handleSubmit = async(event) => {
      event.preventDefault();
      // add code to handle login here
      try {
        const response = await axios.post("http://localhost:5000/api/admin/adminlogin", { userName, password });
        console.log(response);
        history('/dashboard')
        
       } catch (error) {
        //Handle failed login here
        console.error(error);
      }
    };
  
    return (
      <div className='admin'>
          <div className='login-card'>
            <form onSubmit={handleSubmit}>
                <h1>Welcome back admin</h1>
                <input placeholder='username' type="text" value={userName} onChange={(event) => setuserName(event.target.value)} /><br/>
                <input placeholder='password' type="password" value={password} onChange={(event) => setPassword(event.target.value)} /><br/>
                <button type="submit">Login</button>
            </form>
          </div>
        </div>
    );
};

export default Admin