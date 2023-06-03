import React, { useState, useRef, useEffect } from 'react'
import Grid2 from '@mui/material/Unstable_Grid2/Grid2'
import GuideReg from '../../../assets/guideReg.jpg'
import { Button, TextField } from '@mui/material'
import './GuideLogin.css'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { toast, ToastContainer } from 'react-toastify';

const GuidesLogin = () => {
    const [guide, setGuide] = useState(null);
    const nameRef = useRef()
    const passRef = useRef()
    const navigate = useNavigate()

    useEffect(() => {
        console.log(guide);
    },[guide]);

    const handleGuidesSubmit = async(e) => {
        e.preventDefault()

        const newGuide = {
            guideName : nameRef.current.value,
            password: passRef.current.value
        }
        try{
            const response = await axios.post("http://localhost:5000/api/guides/loginGuide", newGuide)
            console.log(response)
            localStorage.setItem('Guide', JSON.stringify(response.data.guideName)) // store the user object received from server in localStorage
            localStorage.setItem('token', response.data.token)
            localStorage.setItem('GuideID', response.data.guideID)
            setGuide(response.data.guideName)
            navigate("/guides/guidesMain");
             
        }
        catch(err){
            console.log(err)
            toast.error("please fill out all the fields",{
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
    <div className='register-guide'>
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
        <div className='guidesLeft'>
            <img src={GuideReg} alt="register"></img>
        </div>
        <div className='guides-right'>
            <div className='RegCard'>
                <Grid2 container>
                    <Grid2 xs={2}/>
                    <Grid2 xs={8}>
                        <h1>Login guide</h1>
                    </Grid2>
                     <form onSubmit={handleGuidesSubmit}>
                        <Grid2 item xs = {12} container>
                            <Grid2 item xs={2}/>
                            <Grid2 item xs={8}>
                               <TextField inputRef={nameRef} id="standard-basic" label="Fullname" prop sx={{width: 400, marginTop: "50px"}}/>
                            </Grid2>
                            <Grid2 item xs = {2}/>
                        </Grid2>
                        <Grid2 item xs = {12} container>
                            <Grid2 item xs={2}/>
                            <Grid2 item xs={8}>
                                <TextField inputRef={passRef} id="standard-basic" label="Password" type='password' prop sx={{width: 400, marginTop: "60px", marginBottom: '60px'}}/>
                            </Grid2>
                            <Grid2 item xs = {2}/>
                        </Grid2>
                        <Grid2 item xs = {12} container>
                            <Grid2 item xs={2}/>
                            <Grid2 item xs={8}>
                                <span>Don't have an account? <Link to="/guides/register">Signup</Link></span>
                            </Grid2>
                            <Grid2 item xs = {2}/>
                        </Grid2>
                        <Grid2 item xs={12} container>
                            <Grid2 item xs={2}/>
                            <Grid2 item xs={8}>
                                <Button type='submit' variant='contained' sx={{marginTop: '30px'}} >Submit</Button>
                            </Grid2>
                            <Grid2 item xs={2}/>
                        </Grid2>
                    </form>
                </Grid2>                
            </div>
        </div>
    </div>
  )
}

export default GuidesLogin