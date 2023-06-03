import React, { useState } from 'react';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import { TextField, Button } from '@mui/material';
import { useRef } from 'react';
import axios from 'axios';


function Addbm() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [rating, setRating] = useState(0);

    const TitleRef = useRef();
    const DescRef = useRef();
    const latRef = useRef();
    const longRef = useRef();
    const RatingRef = useRef(); 
  
    const handleSubmit = async(event) => {
      event.preventDefault();
      const currentUser = JSON.parse(localStorage.getItem('user'))
      // handle form submit logic here
      const newBM = {
        userName : currentUser,
        title : TitleRef.current.value,
        rating: RatingRef.current.value,
        lat : latRef.current.value,
        lon: longRef.current.value,
        descr : DescRef.current.value
      }
      try{
        const response = await axios.post("http://localhost:5000/api/pins/bookmarks", newBM)
        console.log(response);
      }
      catch(err){
        console.log(err)
      } 
    };
  
    return (
      <div className='Card1'>
      <Grid2 container spacing={2} direction= "row" rowSpacing={{xs:1}}>
          <Grid2 item xs={2}/>
          <Grid2 item xs={8}>
              <h2 className='head1'>Add bookmarks</h2>
          </Grid2>
          <Grid2 item xs={2}/>
          <form onSubmit={handleSubmit}>
              <Grid2 item xs={2}/>
              <Grid2 item xs={8}>
                  <TextField inputRef = {TitleRef} className='Usernamefld' id="standard-basic" label="title" variant="standard" prop sx={{width: 400}}></TextField>
              </Grid2>
              <Grid2 item xs={2}/>
              <Grid2 item xs={2}/>
              <Grid2 item xs={8}>
                  <TextField inputRef = {RatingRef} className='Usernamefld' id="standard-basic" label="Rating" variant="standard" prop sx={{width: 400}}></TextField>
              </Grid2>
              <Grid2 item xs={2}/>
              <Grid2 item xs={2}/>
              <Grid2 item xs={8}>
                  <TextField inputRef = {latRef} className='Usernamefld' id="standard-basic" label="latitude" variant="standard" prop sx={{width: 400}}></TextField>
              </Grid2>
              <Grid2 item xs={2}/>
              <Grid2 item xs={2}/>
              <Grid2 item xs={8}>
                  <TextField inputRef = {longRef} className='Usernamefld' id="standard-basic" label="longitude" variant="standard" prop sx={{width: 400}}></TextField>
              </Grid2>
              <Grid2 item xs={2}/>
              <Grid2 item xs={2}/>
              <Grid2 item xs={8}>
                  <TextField inputRef = {DescRef} className='Usernamefld' id="standard-basic" label="Description" variant="standard" prop sx={{width: 400}}></TextField>
              </Grid2>
              <Grid2 item xs={2}/>
              <Grid2 item xs={2}/>
              <Grid2 item xs={8}>
                  <Button type='submit' variant='contained' className='login_btn'>Add Bookmark</Button>
              </Grid2>
              <Grid2 item xs={2}/>
          </form>
          
      </Grid2>
  </div>
    );
}


export default Addbm