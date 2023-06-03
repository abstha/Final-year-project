import React from 'react'
import { TextField, Button } from '@mui/material'
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import './loginpage.css'
import { useRef } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import { useState, useEffect } from 'react';
import loginuser from '../../assets/loginuser.jpg'
import { Link } from 'react-router-dom';


const CardLeft = () => {
    const [originX, setOriginX] = useState(50); // Initial value is the center of the image
    const [originY, setOriginY] = useState(50);
  
    useEffect(() => {
      const intervalId = setInterval(() => {
        const newOriginX = Math.floor(Math.random() * 100);
        const newOriginY = Math.floor(Math.random() * 100);
        setOriginX(newOriginX);
        setOriginY(newOriginY);
      }, 2000);
  
      return () => clearInterval(intervalId);
    }, []);
}

function Loginpage() {
    const [user, setUser] = useState(null); // state variable to store the logged-in user
    const nameRef = useRef()
    const passRef = useRef()
    const history = useNavigate();

    useEffect(() => {
        console.log(user);
      }, [user]);

    const handleSubmit = async(e) => {
        e.preventDefault()

        const newUser = {
            userName : nameRef.current.value,
            password: passRef.current.value
        }
        try{
            const response = await axios.post("http://localhost:5000/api/users/login", newUser)
            console.log(response)
            localStorage.setItem('user', JSON.stringify(response.data.userName)) // store the user object received from server in localStorage
            localStorage.setItem('usertoken', response.data.token)
            localStorage.setItem('ID', response.data.userID)
            setUser(response.data.userName)
            history("/main");
            
            
        }
        catch(err){
            console.log(err)
            let errorMessage = "Please fill out all the fields.";
            if (err.response && err.response.data) {
                errorMessage = err.response.data;
            }
            toast.error(errorMessage,{
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        }
    }

  return (
    <div className="LoginMain">
        <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
                />
                {/* Same as */}
        <ToastContainer />
        <div className='login-user'>
            <div className='Card-left'>
                <img src={loginuser} alt="login" className='image-animation'/>
            </div>
            <div className='Card-right'>
                <Grid2 container spacing={2} direction= "row" rowSpacing={{xs:1}}>
                    <Grid2 item xs={2}/>
                    <Grid2 item xs={8}>
                        <h2 className='head1'>Login to account</h2>
                    </Grid2>
                    <Grid2 item xs={2}/>
                    <form onSubmit={handleSubmit}>
                        <Grid2 item xs={2}/>
                        <Grid2 item xs={8}>
                            <TextField inputRef = {nameRef} className='Usernamefld' id="standard-basic" label="username" variant="standard" prop sx={{width: "400px", padding:'10px'}}></TextField>
                        </Grid2>
                        <Grid2 item xs={2}/>
                        <Grid2 item xs={2}/>
                        <Grid2 item xs={8}>
                            <TextField inputRef = {passRef} type="password" className='passwordfld' id="standard-basic" label="password" variant="standard" prop sx={{padding: '10px', width: ' 400px', height: '50px'}}></TextField>
                        </Grid2>
                        <Grid2 item xs={2}/>
                        <Grid2 item xs={4}/>
                        <Grid2 item xs={8}>
                            <Link to="#"><p className='forgot'>Forgot password</p></Link>
                        </Grid2>
                        <Grid2 item xs={2}/>
                        <Grid2 item xs={8}>
                           <Button type='submit' variant='contained' className='login-btn' sx={{ width:'400px', padding: '10px', marginTop: '40px'}}>Login</Button>
                        </Grid2>
                        <Grid2 item xs={2}/>
                    </form>
                </Grid2>
            </div>
        </div>
    </div>
  )
}

export default Loginpage