import {React, useEffect, useState} from 'react'
import "./mainpage.css"
import Grid2 from '@mui/material/Unstable_Grid2/Grid2'
import { Button, Container, Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions } from '@mui/material'

import Footer from '../../components/Footer'
import Navbar from '../../components/Navbar/Navbar'
import {Link} from 'react-router-dom';
import axios from 'axios'
import Category from '../../components/Category Dropdown/Category'
import ExploreIcon from '@mui/icons-material/Explore';
import BoltIcon from '@mui/icons-material/Bolt';
import NavigationIcon from '@mui/icons-material/Navigation';

function Mainpage() {
    const [destinations, setDestinations] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [recommendedDestinations, setRecommendedDestinations] = useState([]);
    

    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [selectedDestination, setSelectedDestination] = useState(null);

     // Fetch recommended destinations when selectedCategory changes
  useEffect(() => {
    const fetchRecommendedDestinations = async () => {
      try {
        const response = await axios.post('http://localhost:5001/recommend', {
            category: selectedCategory,
            n: 3, // Number of recommendations to retrieve
        });
        setRecommendedDestinations(response.data.recommended_destinations);
      } catch (error) {
        console.error(error);
      }
    };

    fetchRecommendedDestinations();
  }, [selectedCategory]);

    const handleCardClick = (destination) => {
        setSelectedDestination(destination);
        setIsDialogOpen(true);
    };

    const handleClose = () => {
        setSelectedDestination(null);
        setIsDialogOpen(false);
    };

    useEffect(() => {
        const fetchDestinations = async () => {
          try {
            const response = await axios.get('http://localhost:5000/api/destinations');
            setDestinations(response.data);
            console.log(response)
          } catch (error) {
            console.error(error);
          }
        };
    
        fetchDestinations();
      }, []);

      
    
  return (
    
    <div className='main3'>
        <div className='Hero-section'>
            <div className='mainnavbar'>
                <Navbar/>
            </div>
            <div className='herotext'>
                <Grid2 item xs={12} container>
                    <Grid2 item xs={2}/>
                    <Grid2 item xs={8}>
                        <h2><span className='Explore'>Explore Nepal like never before!</span></h2>
                    </Grid2>
                    <Grid2 item xs={2}/>
                    <Grid2 item xs={2}/>
                    <Grid2 item xs={4}>
                        <h4>Visit mountains, temples and breathtaking views</h4>
                    </Grid2>
                    <Grid2 item xs={6}/>
                    {/* button section */}
                    <Grid2 item xs={2}/>
                    <Grid2 item xs={2}>
                        <Link to="/map"><Button variant='contained' sx={{color:'white', backgroundColor:'black', borderRadius: "20px"}}>Explore now</Button></Link>
                    </Grid2>
                    <Grid2 item xs={8}/>
                    {/* search bar section */}
                </Grid2>
            </div>
        </div>
        <div className='details1'>
            <Container fixed>
                <Grid2 item xs={12} container spacing={3}>
                    <Grid2 item xs={4}>
                        
                            <div className='infocard1'>
                                <ExploreIcon sx={{width: '150px', height: '100px'}}/>
                                <span><h4>Best destinations</h4>Choose the best destinations to you according to your personal preference.</span>
                            </div>
                        
                    </Grid2>
                    <Grid2 item xs={4}>
                        
                            <div className='infocard2'>
                                <BoltIcon sx={{width: '150px', height: '100px'}}/>
                                <span><h4>Quick functionality</h4>Eliminate the need to view different website and save precious time and effort.</span>
                            </div>
                        
                    </Grid2>
                    <Grid2 item xs={4}>
                        
                            <div className='infocard3'>
                                <NavigationIcon sx={{width: '150px', height: '100px'}}/>
                                <span><h4>Ease of access</h4>Hire professional guides and make your next destination more informative.</span>
                            </div>
                        
                    </Grid2>
                </Grid2>
            </Container>
        </div>
        <div className='featured'>
            <div className='modal'>
                <Dialog open={isDialogOpen} onClose={handleClose}>
                    <DialogTitle><h2>{selectedDestination?.name}</h2></DialogTitle>
                    <DialogContent>
                        <img className='modalImg' src={selectedDestination?.imageUrl} alt={selectedDestination?.name} />
                        <DialogContentText><h3>Description:</h3>{selectedDestination?.description}</DialogContentText>
                        <DialogContentText><h3>Category:</h3>{selectedDestination?.category}</DialogContentText>
                        <DialogContentText><h3>Popular for:</h3>{selectedDestination?.popular_for}</DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Link to="/map"><Button >View in map</Button></Link>
                        <Button onClick={handleClose}>Close</Button>
                    </DialogActions>
                </Dialog>
            </div>
            <Grid2 item xs={12} container> 
                <Grid2 xs={5}/>
                <Grid2 xs={7}>
                <h2 className='ft1'>Featured destinations</h2>
                </Grid2>
                {/* Destination cards */}
                <Grid2 xs={3}/>
                <Grid2 xs={6}>
                <Grid2 item xs={12} container spacing={4}>
                    <Grid2 item xs={12} container spacing={4}>
                    {destinations.slice(0, 3).map(destination => (
                        <Grid2 item xs={4} key={destination._id}>
                        
                            <div className="featuredCard" onClick={() => handleCardClick(destination)}>
                            <img src={`${destination.imageUrl}`} alt={destination.name} />
                            <h3>{destination.name}</h3>
                            </div>
                        
                        </Grid2>
                    ))}
                    </Grid2>
                </Grid2>
                </Grid2> 
                <Grid2 xs={3}/>
            </Grid2>
            </div>
        <div className='Recommended'>
            <Container className='cont'>
                <Grid2 container spacing={8}>
                    <Grid2 xs={4}/>
                    <Grid2 xs={4}>
                        <h2>Recommended destinations</h2>
                    </Grid2>
                    <Grid2 xs={4}>
                        <Category setSelectedCategory={setSelectedCategory} />
                    </Grid2>
                    <Grid2 xs={12}>
                        <Grid2 container>
                            {recommendedDestinations.map((destination) => (
                                <Grid2 xs={4} key={destination._id}>
                                <div className='recommended-Card' onClick={() => handleCardClick(destination)}>
                                    <img src={destination.imageUrl} alt={destination.name} />
                                    <h3>{destination.name}</h3>
                                </div>
                                </Grid2>
                            ))}
                        </Grid2>
                    </Grid2>
                </Grid2>
            </Container>
        </div>
        <div className='Guides'>
            <div className='Lside'>
                <span><h1>Going to a new destination?</h1></span>
                <h3>Hire Guides available at the destination of your choice!</h3>
                <Link to="/GuidesPage"><Button variant='contained' sx={{backgroundColor: "black", borderRadius:"20px", width: "200px", marginTop: "50px"}}>Hire now</Button></Link>
            </div>
        </div>
        <div className='footer'>
            <Footer/>
        </div>
    </div>
  )
}

export default Mainpage