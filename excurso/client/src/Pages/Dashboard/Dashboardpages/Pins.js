import React from 'react'
import axios from 'axios'
import { useEffect, useState, useRef } from 'react'
import { DataGrid } from '@mui/x-data-grid';
import Sidebar from '../../../components/Sidebar/Sidebar';
import '../CSS/pins.css'

const Pins = () => {

    const [Pins, setPins] = useState([]);

    const columns = [
        { field: 'id', headerName: 'ID', width: 120 },
        { field: 'CreatedBy', headerName: 'User Name', width: 130 },
        { field: 'Title', headerName: 'Title', width: 200 },
        { field: 'Rating', headerName: 'Rating', width: 200 },
        { field: 'lat', headerName: 'lat', width: 200 },
        { field: 'lon', headerName: 'lon', width: 200 },
    ]

    useEffect(()=> {
        const getGuide = async() => {
            try{
                const response = await axios.get("http://localhost:5000/api/pins/getPins")
                setPins(response.data)
                console.log(response.data)
            }
            catch(err)
            {
                console.log(err)
            }
        }
    
        getGuide()
    },[])
  return (
    <div className='pinsdash'>
        <div>Pins</div>
        <div className='sidebar'>
            <Sidebar/>
        </div>
        <div style={{ height: "100vh", width:"100%", marginLeft: "250px" }} className='pinstable'>
                    <DataGrid rows={Pins && Pins.map((item) => ({ id: item._id, CreatedBy: item.userName, Title: item.title, Rating: item.rating, lat: item.lat, lon: item.lon}))} columns={columns} pageSize={12} />
        </div>
    </div>
  )
}

export default Pins