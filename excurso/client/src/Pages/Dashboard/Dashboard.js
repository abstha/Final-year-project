import { Divider, Paper } from '@mui/material'
import Grid2 from '@mui/material/Unstable_Grid2/Grid2'
import {React, useEffect, useState} from 'react'
import Sidebar from '../../components/Sidebar/Sidebar'
import './Dashboard.css'
import axios from 'axios'
import AdminNav from '../../components/Adminnav/AdminNav'
import PersonIcon from '@mui/icons-material/Person';
import TourIcon from '@mui/icons-material/Tour';
import ExploreIcon from '@mui/icons-material/Explore';
import { PieChart, Pie, Cell, Legend } from 'recharts';

const Dashboard = () => {

    const [userCount, setUserCount] = useState(0);
    const [guideCount, setGuideCount] = useState(0);
    const [destinationCount, setDestinationCount] = useState(0);

    // Define the colors to use for the pie chart slices
    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#E20E45'];


    useEffect(() => {
    const fetchUserData = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/users');
            setUserCount(response.data.length);
        } catch (error) {
            console.log(error);
        }
    };
    fetchUserData();
    }, []);


    useEffect(() => {
    const fetchDestinationData = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/destinations');
            setDestinationCount(response.data.length);
        } catch (error) {
            console.log(error);
        }
    };
    fetchDestinationData();
    }, []);


    const [data, setData] = useState([]);

    // Fetch data using Axios and update the state
    useEffect(() => {
        const fetchData = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/destinations');
            setData(response.data);
        } catch (error) {
            console.log(error);
        }
        };
        fetchData();
    }, []);
    

    useEffect(() => {
        const fetchGuideData = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/guides');
            setGuideCount(response.data.length);
        } catch (error) {
            console.log(error);
        }
        };
        fetchGuideData();
    }, []);

    const [showSidebar, setShowSidebar] = useState(false);

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };
  
  return (
    <div className='Dashboard'>
        <div className='dash-nav'>
            <AdminNav onSidebarToggle={toggleSidebar} />
        </div>
        {showSidebar ? (
            <div className='sidebar'>
            <Sidebar />
            </div>
        ) : (
            <div className='maindash'>
            {/* Render the other components here */}
                <div className='user-count'>
                    <PersonIcon className='icon' sx={{width:'200px', height: '100px'}}/>
                    <h3>{`Current users in the system: (${userCount})`}</h3>
                </div>
                <div className='destination-count'>
                    <TourIcon className='icon' sx={{width:'200px', height: '100px'}}/><br/>
                    <h3>{`Current Destinations in the system: (${destinationCount})`}</h3> 
                </div>
                <div className='guide-count'>
                    <ExploreIcon className='icon' sx={{width:'200px', height: '100px'}}/>
                    <h3>{`Current guides in the system: (${guideCount})`}</h3>
                </div>   
            </div>
        )}
    </div>
)
}

export default Dashboard