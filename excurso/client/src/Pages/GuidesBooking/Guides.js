import {React, useState, useEffect, useRef} from 'react'
import { Button, Container, Divider, TextField } from '@mui/material'
import Navbar from '../../components/Navbar/Navbar'
import Grid2 from '@mui/material/Unstable_Grid2/Grid2'
import axios from 'axios'
import './Guide.css'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import guideimg from '../../assets/guidedash.png'
import { toast, ToastContainer } from 'react-toastify';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

const GuidesPage = () => {
    const [guides, setGuides] = useState([]);
    const [userID, setUserID] = useState(null);
    const [duration, setDuration] = useState();
    const [open, setOpen] = useState(false);

    //get all guides in the DB

    useEffect(() => {
        axios.get('http://localhost:5000/api/guides')
        .then(response => {
            setGuides(response.data);
        })
        .catch(error => {
            console.error(error);
        });
    }, []);

    //get user ID from local storage

    useEffect(() => {
        const storedID = localStorage.getItem('ID');
        if (storedID) {
          setUserID(storedID);
        }
      }, []);
    
    //handle submission of guide booking

    const handleBookingSubmit = async(event) => {
        event.preventDefault();
        const storedUsername = JSON.parse(localStorage.getItem('user'));
        const formData = new FormData(event.target);
        const guideId = formData.get("guideId");
        const gName = formData.get("guideName");
        const guide = guides.find((guide) => guide._id === guideId);
        const hourlyRate = guide.hourlyRate;
        const totalCost = hourlyRate * duration;
        const bookingData = {
            userId: userID,
            userName: storedUsername,
            guideId: guide,
            guideName: gName,
            date: selectedDate,
            duration: duration,
            totalCost: totalCost,
            status: 'requested', // Set the status to "requested" by default
        }

        try{
            const response = await axios.post('http://localhost:5000/api/bookings', bookingData) 
            console.log(response)
            toast.success("Successfully booked guide",{
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
        catch(err)
        {
            console.log(err)
            toast.error("Failed to book guide",{
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


      //handle selection of date in datepicker

    const [selectedDate, setSelectedDate] = useState(null);

    const handleDateChange = (date) => {
        setSelectedDate(date);
      };

    const handleClick = ()=>{
        setOpen(true);
    }
  
    const handleClose = () => {
        setOpen(false);
    };


    return (
        <Container>
            <Dialog open={open} onClose={handleClose} sx={{height: '700px'}}>
                <DialogTitle>Add Destinations</DialogTitle>
                <DialogContent>
                    <div className='dialogbox'> 
                    </div>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleBookingSubmit}>Add</Button>
                </DialogActions>
            </Dialog>
          
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
            <Grid2 container>
                <Grid2 xs={12}>
                    <Navbar/>
                </Grid2>
                <Grid2 xs={12}>
                    {guides.map(guide => (
                        <div key={guide._id} className='GuideCard'>
                            <img src={guideimg} alt="guideimage"/>
                            <div className='guidedetail'>
                                <h2>{guide.guideName}</h2>
                                <p>Hourly rate: ${guide.hourlyRate}</p>
                                <p>Available locations: {guide.availableLocations.join(', ')}</p>
                                <p>Phone: {guide.phone}</p>
                                <h3>Guide ID: {guide._id}</h3>
                            </div>
                            <Divider orientation='vertical' flexItem/>
                            <div className='right'>
                                <form className="form-container" onSubmit={handleBookingSubmit} >
                                    <input type="hidden" name="guideId" value={guide._id} />
                                    <input type="hidden" name="guideName" value={guide.guideName}/>
                                    <div className='datepicker'>
                                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                                            <DatePicker sx={{width: '100%'}} value={selectedDate} onChange={handleDateChange}/>
                                        </LocalizationProvider>
                                    </div>
                                    <div className="input-container">
                                        <input 
                                            className='input-text'
                                            type="text" 
                                            value={duration}
                                            onChange={(event) => setDuration(event.target.value)}
                                            placeholder="Duration (in hours)" 
                                            />
                                    </div>
                                    <Button variant="outlined" type='submit'>hire guide</Button>
                                </form>
                            </div>
                        </div>
                    ))}
                </Grid2>
            </Grid2>
    </Container> 
    )
}

export default GuidesPage