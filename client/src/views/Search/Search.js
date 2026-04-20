import React, { useEffect, useState } from 'react';
import { parseTreeNav } from './../loadData';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';

const Search = (props) => {
  const [timeout, setTimeout] = useState(false);

  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     findData(searchTerm);
  //   }, 1000);
  //   return () => clearTimeout(timer);
  // }, []);
  const findData = (searchTerm) => {
    searchTerm = searchTerm.toLowerCase();
    // var searchText = searchTerm.target.value; // this is the search text
    if (timeout) clearTimeout(timeout);

    var newData = null;

    var timeout = setTimeout(() => {
      if (searchTerm) {
        newData = props.data.filter((obj) => {
          if (obj['Type']) {
            return (
              obj['Type'].toLowerCase().includes(searchTerm) ||
              obj['Variable / Field Name'].toLowerCase().includes(searchTerm) ||
              obj['Field Label'].toLowerCase().includes(searchTerm) ||
              obj['Form Name'].toLowerCase().includes(searchTerm) ||
              obj['Choices Calculations OR Slider Labels']
                .toLowerCase()
                .includes(searchTerm)
            );
          }
        });

        props.setSearchData(newData);
        props.setTreeNav(parseTreeNav(newData));
      } else {
        props.setSearchData(props.data);
        props.setTreeNav(parseTreeNav(props.data));
      }
    }, 300);
  };

  // const findData = (searchTerm) => {};
  const BarStyling = {
    width: '20rem',
    background: '#F2F1F9',
    border: 'none',
    padding: '0.5rem',
    paddingLeft: '10px',
    outline: 'none',
  };
  return (
    <FormControl sx={{ m: 1, width: '260px' }} variant="outlined">
      <InputLabel>Search</InputLabel>
      <OutlinedInput
        onChange={(e) => findData(e.target.value)}
        endAdornment={
          <InputAdornment position="end">
            <SearchOutlinedIcon />
          </InputAdornment>
        }
        label="Password"
      />
    </FormControl>
  );
};

export default Search;
