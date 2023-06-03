import { Button, TextField } from '@mui/material'
import {React, useState} from 'react'
import './Searchbox.css'
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import RoomIcon from '@mui/icons-material/Room';

const NOMINATIM_BASE_URL = "https://nominatim.openstreetmap.org/search?"
const params = {
    q: '',
    format: 'json',
    addressdetails: "addressdetails"
}

const Searchbox = ( props) => {
    const [searchText, setSearchText] = useState("");
    const [listPlace, SetListPlace] = useState([]);
    const {selectPosition, setSelectPosition} = props;
    console.log(searchText)
  return (
    <div className='Searchbox'>
        <h1>Search</h1>
        <span><TextField id="outlined-basic" label="Search location" variant="outlined" value={searchText} onChange={(event) => {
            setSearchText(event.target.value);
        }} />
        <Button variant='contained' color='primary' onClick={() => {
            const params = {
                q:searchText,
                format: 'json',
                addressdetails:1,
                polygon_geojson : 0
            };
            const queryString = new URLSearchParams(params).toString();
            const requestOptions = {
                method: "GET",
                redirect : "follow"
            };
            fetch(`${NOMINATIM_BASE_URL}${queryString}`, requestOptions)
                .then((response) => response.text())
                .then((result) => {
                    console.log(JSON.parse(result));
                    SetListPlace(JSON.parse(result));
                })
                .catch((err) => console.log("err: ", err))
        }}>Search</Button></span>
        <Box sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
            <nav aria-label="main mailbox folders">
                <List>
                    {listPlace.map((item)=>{
                        return(
                            <div key={item?.place_id}>
                                <ListItem disablePadding>
                                    <ListItemButton onClick={() => {
                                        setSelectPosition(item);
                                    }}>
                                    <ListItemIcon>
                                        <RoomIcon  sx={{width: '50px' , height: '30px'}}/>
                                    </ListItemIcon>
                                    <ListItemText primary={item?.display_name} />
                                    </ListItemButton>
                                </ListItem>
                                <Divider />
                            </div>
                        )
                    })}
                </List>
                
            </nav>
        </Box>
    </div>
  )
}

export default Searchbox