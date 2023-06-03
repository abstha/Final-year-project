import React from 'react'
import './Signupcss.css'
import { TextField, Button } from '@mui/material'
import GoogleIcon from '@mui/icons-material/Google';
import FacebookIcon from '@mui/icons-material/Facebook';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import { useRef } from "react";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import {Link, Navigate, useNavigate} from 'react-router-dom';

export default function Signup() {

    const nameRef = useRef()
    const emailRef = useRef()
    const passRef = useRef()
    const navigate = useNavigate();


    const handleRegister = async(e) => {
        e.preventDefault()

        const newUser = {
            userName : nameRef.current.value,
            password : passRef.current.value,
            email : emailRef.current.value,
        }
        try{
            const response = await axios.post("http://localhost:5000/api/users/register", newUser)
            console.log(response)
            toast.success('User registered successfully', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            });
            navigate("/login")
        }
        catch(err)
        {
            console.log(err)
            toast.error('Failed to register user!', {
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
    <body>
        <div className='Main'>
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
            <div className='Card'>
                <div className='Rightside'>
                    <Grid2 container spacing={2} direction="column" columnSpacing={{xs:1}}>
                        <Grid2 item xs={12} container>
                            <Grid2 item xs={2}/>
                            <Grid2 item xs={8}>
                                <h2>Create Account</h2>
                            </Grid2>
                            <Grid2 item xs = {2}/>
                        </Grid2>
                        <form onSubmit={handleRegister}>
                            <Grid2 item xs = {12} container>
                                <Grid2 item xs={2}/>
                                <Grid2 item xs={8}>
                                    <TextField inputRef={nameRef} id="standard-basic" label="Firstname" variant="standard" prop sx={{width: 400}}/>
                                </Grid2>
                                <Grid2 item xs = {2}/>
                            </Grid2>
                            <Grid2 item xs = {12} container>
                                <Grid2 item xs={2}/>
                                <Grid2 item xs={8}>
                                    <TextField inputRef={emailRef} id="standard-basic" label="Email address" variant="standard" prop sx={{width: 400}}/>
                                </Grid2>
                                <Grid2 item xs = {2}/>
                            </Grid2>
                            <Grid2 item xs = {12} container>
                                <Grid2 item xs={2}/>
                                <Grid2 item xs={8}>
                                    <TextField inputRef={passRef} id="standard-basic" label="Password" variant="standard" prop sx={{width: 400}}/>
                                </Grid2>
                                <Grid2 item xs = {2}/>
                            </Grid2>
                            <Grid2 item xs={12} container>
                                <Grid2 item xs={2}/>
                                <Grid2 item xs={8}>
                                    <Button type='submit' variant='contained' >Submit</Button>
                                </Grid2>
                                <Grid2 item xs={2}/>
                            </Grid2>
                        </form>
                        
                        <Grid2 item xs={12} container className="logindirect">
                            <Grid2 item xs={2}/>
                            <Grid2 item xs={6}>
                                Already have an account?<Link to="/login">login</Link>
                            </Grid2>
                            <Grid2 item xs={4}/>
                            <Grid2 item xs={2}/>
                            <Grid2 item xs={6}>
                                Not a User?<Link to="/guides/register">Guides</Link>
                            </Grid2>
                            <Grid2 item xs={4}/>
                        </Grid2>
                    </Grid2>
                </div>
                <div className = 'leftside'>
                    <div className='text1'>
                        <h1>Start travelling where you want!</h1>
                    </div>
                    <div className = 'pngimage'>
                    </div>
                </div>
            </div>
        </div>
    </body>
  )
}
