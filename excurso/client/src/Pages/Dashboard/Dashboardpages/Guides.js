import React from 'react'
import axios from 'axios'
import { useEffect, useState, useRef } from 'react'
import { DataGrid } from '@mui/x-data-grid';
import { Button } from '@mui/material';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Sidebar from '../../../components/Sidebar/Sidebar';
import '../CSS/guide.css'

const Guides = () => {
    const [guide, setGuide] = useState([]);

    const nameRef = useRef();
    const destinationRef = useRef();
    const rateRef = useRef();
    const phoneRef = useRef();

    const columns = [
        { field: 'id', headerName: 'ID', width: 120 },
        { field: 'guideName', headerName: 'Guide name', width: 130 },
        { field: 'availableLocations', headerName: 'Locations', width: 200 },
        { field: 'hourlyRate', headerName: 'Hourly rate', width: 200 },
        { field: 'phone', headerName: 'phone', width: 200 },
        {
            field: 'actions',
            headerName: 'Actions',
            width: 100,
            sortable: false,
            renderCell: (params) => (
                <strong>
                    <button onClick={() => removeGuide(params.row.id)}>Remove</button>
                </strong>
            ),
        },
    ]

    const removeGuide = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/api/guides/${id}`);
            setGuide(guide.filter((item) => item._id !== id));
            console.log("user deleted successfully")
        } catch (error) {
            console.log(error);
        }
    }

    const AddnewGuide = async () => {
        try {
          const newGuide = {
            guideName: nameRef.current.value,
            availableLocations: destinationRef.current.value,
            hourlyRate: rateRef.current.value,
            phone: phoneRef.current.value,
          };
          const response = await axios.post("http://localhost:5000/api/guides/RegisterGuide",newGuide);
          setGuide([...guide, response.data]);
          console.log("Guide added successfully");
          setOpen(false)
        } catch (error) {
          console.log(error);
        }
      };


    useEffect(()=> {
        const getGuide = async() => {
            try{
                const response = await axios.get("http://localhost:5000/api/guides")
                setGuide(response.data)
                console.log(response.data)
            }
            catch(err)
            {
                console.log(err)
            }
        }
    
        getGuide()
    },[])

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
      };

    return (
        <div className='guidedash'>
            <div className='sidebar'>
                <Sidebar/>
            </div>
                <Dialog open={open} onClose={handleClose}>
                    <DialogTitle>Add guides</DialogTitle>
                    <DialogContent>
                    <DialogContentText>
                        To add guides fill all the fields below.
                    </DialogContentText>
                    <TextField
                        inputRef={nameRef}
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Guide name"
                        type="text"
                        fullWidth
                        variant="standard"
                    />
                    <TextField
                        inputRef={destinationRef}
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Locations"
                        type="text"
                        fullWidth
                        variant="standard"
                    />
                    <TextField
                        inputRef={rateRef}
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Hourly rate"
                        type="text"
                        fullWidth
                        variant="standard"
                    />
                    <TextField
                        inputRef={phoneRef}
                        autoFocus
                        margin="dense"
                        id="name"
                        label="phone"
                        type="text"
                        fullWidth
                        variant="standard"
                    />
                    </DialogContent>
                    <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={AddnewGuide}>Add</Button>
                    </DialogActions>
                </Dialog>
            
            <div style={{ height: "100vh", width:"100%", marginLeft: "250px" }}>
                <DataGrid rows={guide && guide.map((item) => ({ id: item._id, guideName: item.guideName, availableLocations: item.availableLocations, hourlyRate: item.hourlyRate, phone: item.phone}))} columns={columns} pageSize={12} />
                <Button variant='contained' onClick={handleClickOpen}>Add guides</Button>
            </div>
            
        </div>
    )
}

export default Guides
