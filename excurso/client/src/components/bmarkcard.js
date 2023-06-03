import React from 'react'
import axios from 'axios';

import './bmark.css'
import { Container } from '@mui/material';
import image from '../assets/boudha.jpg'

function Bmarkcard() {
    const [pins, setPins] = React.useState([]);

    React.useEffect(() => {
      const fetchData = async () => {
        try {
          const storedUserName = localStorage.getItem('user');
          const userName = storedUserName.replace(/^"(.*)"$/, '$1');
          const response = await axios.get(`http://localhost:5000/api/pins/${userName}`);
          console.log(response)
          setPins(response.data);
        } catch (error) {
          console.error(error);
        }
      };
      fetchData();
    }, []);

  return (
      <Container>
        {pins.length === 0 ? (
          <div className='no-bm'>No bookmarks available</div>
        ) : (
          pins.map((pin) => (
            <div className='bmcard'>
              <img src={image} alt='patan' />
              <div className='bmark_descr'>
                <h1>Title</h1>
                <span>{pin.title}</span>
                <h3>Description:</h3>
                <span>{pin.descr}</span>
                <h3>Rating:</h3>
                <span>{pin.rating}</span>
                <h3>Created by:</h3>
                <span>{pin.userName}</span>
              </div>
            </div>
          ))
        )}
      </Container>
    );
}

export default Bmarkcard