import React from 'react'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { DataGrid } from '@mui/x-data-grid';
import './Usertable.css'
import Sidebar from '../Sidebar/Sidebar';



const Usertable = () => {
    const [user, setUser] = useState([]);
    
    const columns = [
        { field: 'id', headerName: 'ID', width: 300},
        { field: 'userName', headerName: 'User name', width: 130 },
        { field: 'Email', headerName: 'Email name', width: 200 },
        {
            field: 'actions',
            headerName: 'Actions',
            width: 120,
            sortable: false,
            renderCell: (params) => (
                <strong>
                    <button onClick={() => removeUser(params.row.id)}>Remove</button>
                </strong>
            ),
        },
      ];

      const removeUser = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/api/users/${id}`);
            setUser(user.filter((item) => item._id !== id));
            console.log("user deleted successfully")
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(()=> {
        const getUsers = async() => {
            try{
                const response = await axios.get("http://localhost:5000/api/users")
                setUser(response.data)
                console.log(response.data)
            }
            catch(err)
            {
                console.log(err)
            }
        }

        getUsers()
    },[])
    return (
        <div className='userdash'>
            <div className='sidebar'>
                <Sidebar/>
            </div>
           
            <div style={{ height: "100vh", width:"100%", marginLeft: "250px" }}>
            <h1>Users</h1>
                <DataGrid rows={user && user.map((item) => ({ id: item._id, userName: item.userName, Email: item.email}))} columns={columns} pageSize={12} />
                {/* <DataGrid rows={user} columns={columns} pageSize={12}/>             */}
            </div>
        </div>
        

  )
}

export default Usertable