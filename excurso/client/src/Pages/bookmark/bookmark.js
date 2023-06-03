import React from 'react'
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import Container from '@mui/material/Container';
import Bmarkcard from '../../components/bmarkcard';
import Divider from '@mui/material/Divider';
import Navbar from '../../components/Navbar/Navbar';
import './bookmark.css'
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';

function Bookmark() {
  return (
    <Container fixed>
         <Grid2 container spacing={2}>
                <Grid2 xs ={12}>
                    <Navbar />
                </Grid2>
                <Grid2 xs={12}>
                    <Bmarkcard/>
                </Grid2>
                <Divider/>
        </Grid2>
    </Container>
  )
}

export default Bookmark