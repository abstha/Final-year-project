import React, { useState, useEffect } from 'react';

import axios from 'axios';
import '../CSS/destination.css'
import Sidebar from '../../../components/Sidebar/Sidebar';
import { Button, Divider, TextField } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { toast, ToastContainer } from 'react-toastify';



const Destinations = () => {
    const [destinations, setDestinations] = useState([]);
    const [open, setOpen] = React.useState(false);

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

    const [name, setName] = useState('');
    const [popularFor, setPopularFor] = useState('');
    const [category, setCategory] = useState('');
    const [description, setDescription] = useState('');
    const [file, setFile] = useState(null);
    const [preview, setPreview] = useState(null);
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      const formData = new FormData();
      formData.append('name', name);
      formData.append('popular_for', popularFor);
      formData.append('category', category);
      formData.append('description', description);
      formData.append('image', file);
    
      try {
        const response = await axios.post('http://localhost:5000/api/Destinations/AddDest', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
        console.log(response.data);
        toast.success("The destination has been succesfully added",{
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
      });
      } catch (error) {
        console.error(error);
        toast.error("Destination failed to add!",{
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
    };

    //delete destinations
    const handleDelete = async (id) => {
      try {
        const response = await axios.delete(`http://localhost:5000/api/Destinations/deleteDestination/${id}`);
        console.log(response.data);
        // handle success message and redirect to destination list
        toast.success("The destination has been succesfully deleted",{
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
      })

      } catch (error) {
        console.error(error);
        // handle error message
        toast.error("Destination failed to delete!",{
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
    };
    
    const [selectedDestination, setSelectedDestination] = useState(null)
    const [openDialog, setOpenDialog] = useState(false)

    const handleEdit = (destination) => {
      setSelectedDestination(destination);
      setOpenDialog(true);
    };
  
    const handleUpdate = async (e) => {
      e.preventDefault();
    
      try {
        const response = await axios.put(
          `http://localhost:5000/api/destinations/updateDestination`,
          selectedDestination
        );
    
        if (response.status !== 200) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
    
        setSelectedDestination(null);
        setOpenDialog(false);
    
        // reload the destinations from the server
        // ...
      } catch (error) {
        console.error(error);
      }
    };

    const handleFileChange = (e) => {
      setFile(e.target.files[0]);
      setPreview(URL.createObjectURL(e.target.files[0]));
    };

    const handleClick = ()=>{
      setOpen(true);
    }

    const handleClose = () => {
      setOpen(false);
    };
  return (
    <div className="destinations">
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
        <ToastContainer />
        <div className='sidebar'>
            <Sidebar/>
            <Divider orientation='vertical' flexItem/>
        </div>
        <div className='dashdest'>
            <Dialog open={open} onClose={handleClose} sx={{height: '700px'}}>
              <DialogTitle>Add Destinations</DialogTitle>
              <DialogContent>
              <div className='dialogbox'> 
                <form onSubmit={handleSubmit} className="form-container">
                  <div className="input-container">
                    <label htmlFor="name-input">Name:</label>
                    <input
                      type="text"
                      placeholder="Name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      id="name-input"
                      required
                    />
                    <label htmlFor="popular-for-input">Popular For:</label>
                      <input
                        type="text"
                        placeholder="Popular For"
                        value={popularFor}
                        onChange={(e) => setPopularFor(e.target.value)}
                        id="popular-for-input"
                        required
                      />
                    <label htmlFor="category-input">Category: </label>
                    <input
                      type="text"
                      placeholder="Category"
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      id="category-input"
                      required
                    />
                    <label htmlFor="description-input">Description: </label>
                    <textarea
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      id="description-input"
                      required
                    />
                    <div className="input-container">

                    <label htmlFor="image-input">Choose an image:</label>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        required
                        id="image-input"
                      />
                      </div>
                  </div>   
                </form>
              </div>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={handleSubmit}>Add</Button>
              </DialogActions>
            </Dialog>
          
            <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
              <DialogTitle>Edit Destination</DialogTitle>
                <DialogContent>
                  {selectedDestination && (
                    <form onSubmit={handleUpdate}>
                      <TextField
                        label="Name"
                        fullWidth
                        defaultValue={selectedDestination.name}
                        onChange={(e) =>
                          setSelectedDestination({
                            ...selectedDestination,
                            name: e.target.value,
                          })
                        }
                      />
                      <TextField
                        label="Popular for"
                        fullWidth
                        defaultValue={selectedDestination.popular_for}
                        onChange={(e) =>
                          setSelectedDestination({
                            ...selectedDestination,
                            popular_for: e.target.value,
                          })
                        }
                      />
                      <TextField
                        label="Category"
                        fullWidth
                        defaultValue={selectedDestination.category}
                        onChange={(e) =>
                          setSelectedDestination({
                            ...selectedDestination,
                            category: e.target.value,
                          })
                        }
                      />
                      <TextField
                        label="Description"
                        fullWidth
                        multiline
                        rows={4}
                        defaultValue={selectedDestination.description}
                        onChange={(e) =>
                          setSelectedDestination({
                            ...selectedDestination,
                            description: e.target.value,
                          })
                        }
                      />
                      <Button type="submit" variant="contained" color="primary">
                        Update
                      </Button>
                    </form>
                  )}
                </DialogContent>
            </Dialog>
        <div className='nav'>
          <h2>Destinations</h2>
          <Button variant='contained' onClick={handleClick}>Add new destination</Button>
        </div>
          {destinations.map((destination) => (
              <div className="destination" key={destination._id}>
                  <img src={`${destination.imageUrl}`} alt={destination.name} />
                  <div className='right-card'>
                      <h2 className="destination-name">Name:{destination.name}</h2>
                      <p className="destination-popular-for">Popular for:{destination.popular_for}</p>
                      <p className="destination-category">Category: {destination.category}</p>
                      <p className="destination-description">Description: {destination.description}</p>
                      <Button variant='standard' onClick={() => handleEdit(destination)}>Edit Destination</Button>
                      <Button variant='standard' onClick={() => handleDelete(destination._id)}>Delete Destination</Button>
                  </div>
              </div>
          ))}
    </div>
  </div>
);
}

export default Destinations