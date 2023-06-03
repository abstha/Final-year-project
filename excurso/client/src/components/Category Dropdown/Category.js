import { React, useState, useEffect } from 'react';
import axios from 'axios';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const Category = (props) => {
  const [categories, setCategories] = useState([]);
  const [selected, setSelected] = useState('');

  const handleChange = (event) => {
    setSelected(event.target.value);
    props.setSelectedCategory(event.target.value);
  };

  useEffect(() => {
    const fetchDestinations = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/destinations');
        setCategories(response.data);
      } catch (error) {
        console.error(error);
        // handle the error here (e.g., display an error message to the user)
      }
    };

    fetchDestinations();
  }, []);

  const uniqueCategories = [...new Set(categories.map((destination) => destination.category))];

  return (
    <div>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Category</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={selected}
          label="Category"
          onChange={handleChange}
        >
          {uniqueCategories.map((category) => (
            <MenuItem value={category} key={category}>
              {category}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
};

export default Category;