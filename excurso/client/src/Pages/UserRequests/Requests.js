import {React, useState, useEffect} from 'react'
import Navbar from '../../components/Navbar/Navbar'
import './Requests.css'
import { Container } from '@mui/material'
import Grid2 from '@mui/material/Unstable_Grid2/Grid2'
import axios from 'axios'
import ClearIcon from '@mui/icons-material/Clear';
import nothing from '../../assets/2953962.jpg'

const Requests = () => {

    const [bookings, setBookings] = useState([]);

    useEffect(() => {
        const userId = localStorage.getItem('ID');
        axios.get(`http://localhost:5000/api/bookings/getRequests?userId=${userId}`)
          .then(res => setBookings(res.data))
          .catch(err => console.log(err));
      }, []);
  return (
    <div className='user-requests'>
    <Container>
      <Grid2 container>
        <Grid2 xs={12}>
          <Navbar/>
        </Grid2>
        <Grid2 xs={12}>
          {bookings.length === 0 ? (
            <div class="nothing">
                <img src={nothing} alt= "error" style={{width: "50%", height: "100%"}}/>
                <h3>Hire guides to see the details of the bookings!</h3>
                <a href="/GuidesPage">Hire now!</a>
            </div>
            ) : (
            <ol>
              {bookings.map((booking) => (
                <div className='user-books'>
                  <li> 
                    <div key={booking._id}>
                      <h1>Booking for {booking.guideName} on {booking.date}</h1>
                      <h3 className={`status-${booking.status.toLowerCase()}`}>{booking.status}</h3>
                      <h3>Contact guide for further assistance and details</h3>
                    </div>
                  </li>
                  <ClearIcon className='Clear'/>
                </div>
              ))}
            </ol>
          )}
        </Grid2>
      </Grid2>
    </Container>
  </div>
  )
}

export default Requests