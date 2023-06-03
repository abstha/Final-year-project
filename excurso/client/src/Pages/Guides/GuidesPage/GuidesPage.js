import {React,useEffect,useState} from 'react'
import Guidesnav from '../../../components/GuidesNav/Guidesnav'
import Grid2 from '@mui/material/Unstable_Grid2/Grid2'
import { Container } from '@mui/material'
import './GuidesPage.css'
import { Link } from 'react-router-dom'
import axios from 'axios'
import image from '../../../assets/Vectorimg.jpg'


const GuidesPage = () => {

    const currentGuide = JSON.parse(localStorage.getItem('Guide'))
    const[bookings, setBookings] = useState([]);
    const guideId = localStorage.getItem('GuideID'); // get guide ID from local storage

    useEffect(() => {
        axios.get(`http://localhost:5000/api/bookings?guideId=${guideId}`)
        .then(response => {
            setBookings(response.data);
            console.log(response)
        })
        .catch(error => {
            console.error(error);
        });
    }, [guideId]);


    return (
        <div className='guides-page'>
            <div className='guides-nav'>
                <Guidesnav/>
            </div>
            <Container>
                <div className='guides-main'>
                   <div className='hero-image'>
                        <div className='guides-display'>                         
                            <h1 className='h1-color'>Welcome back</h1> <h3>{currentGuide}</h3> 
                        </div>
                   </div>
                   <div className='guides-request'>
                        <div className='left-request'>
                            <h1 className='h1-color'>You currently have {bookings.length} requests</h1>
                            <Link to='/guides/guidesRequests'><h3 className='link-request'>Click here to view the requests</h3></Link>
                        </div>
                        <div className='right-request'>
                            <img src={image} alt='photo'/>
                        </div>
                        
                    </div>
                </div>
            </Container>
        </div>
    )
}

export default GuidesPage


// <Grid2 container columnSpacing={12}>
// <Grid2 xs={4}>
//     <div className='guides-display'>
//         <h1>Welcome back</h1> <h3>{currentGuide}</h3> 
//     </div>
// </Grid2>
// <Grid2 xs={8}>
//     
// </Grid2>
// <Grid2 xs={12}>
//     <div className='guides-completed'>
//         <h1>Total guides completed:</h1>
//         <h3>You have succesfully accepted 14 guide requests</h3>
//     </div>
// </Grid2>
// </Grid2>