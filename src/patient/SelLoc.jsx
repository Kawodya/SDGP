import * as React from 'react';
import { Button, Typography } from "@mui/material"


import './SelLoc.css'

import AddCircleIcon from '@mui/icons-material/AddCircle';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { useState } from 'react';

import Box from '@mui/material/Box';
import { ClickAwayListener } from '@mui/base/ClickAwayListener';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import { Link } from 'react-router-dom';
import Navbar from '../Navbar';
export default function SelLoc() {

    const [showLocationDiv, setShowLocationDiv] = React.useState(false);

  const handleSelectLocationClick = () => {
    setShowLocationDiv(!showLocationDiv);
  };

  const handleCardButtonClick = (name) => {
    // Handle button click for each card
    console.log(`Button clicked for ${name}`);
    // Navigate to another page, you can replace '/map' with your desired route
  };

  const visibleCards = [
    { name: 'City Pharmacy Colombo', price: 'Rs 600' },
    { name: 'City Pharmacy Colombo', price: 'Rs 600' },
    { name: 'Central Pharmacy', price: 'Rs 800' },
    { name: ' Pharmacy', price: 'Rs 5500' },
    // Add more cards as needed
  ];

    const medicineInfo = [
        { label: 'USER-001-a', price: 10, image: 'https://fakeimg.pl/100x100',medicine:'Paracetemol',mg:'500mg',stock:1000 },
        { label: 'USER-001-b', price: 20, image: 'https://fakeimg.pl/100x100',medicine:'Aspirin',mg:'500mg',stock:1000 },
        { label: 'USER-001-c', price: 30, image: 'https://fakeimg.pl/100x100',medicine:'Ibuprofen',mg:'500mg',stock:1000 }
    ];

    

 


    const [billData, setBillData] = React.useState({});

    const [open, setOpen] = React.useState(false);
    const [billList, setBillList] = React.useState([]);




    const displayBillList = () => {
        if (billList.length > 0) {
            return billList.map((bill, index) => (
                <div key={index}>
                    <Button variant="contained" color="primary"><InsertDriveFileIcon />{bill}</Button>
                </div>
            ));
        }
    }

    const handleClick = () => {
        setOpen((prev) => !prev);
    };

    const handleClickAway = () => {
        setOpen(false);
    };

    const handleBillNameChange = (event) => {
        setBillData(event.target.value);
    };

    const handleCreateBill = () => {
        if (billData) {
            setBillList([...billList, billData]);
            setOpen(false);
            setBillData('');
        }
    };



    const styles = {
        position: 'absolute',
        top: 28,
        right: 0,
        left: 0,
        zIndex: 1,
        border: '1px solid',
        p: 1,
        bgcolor: 'background.paper',
    };

    return (
        <div>
          <Navbar currentPage={"Patient"}/>
        <div className="container">
            <div className="bills">
                <ClickAwayListener onClickAway={handleClickAway}>
                    <Box sx={{ position: 'relative' }}>
                        <Button onClick={handleClick}><AddCircleIcon />New Prescription</Button>
                        {open ? (
                            <Box sx={styles}>
                                <TextField
                                    sx={{ width: '100%', marginBottom: '10px' }}
                                    id="outlined-basic"
                                    label="Enter Bill Name"
                                    variant="outlined"
                                    value={billData}
                                    onChange={handleBillNameChange}
                                />
                                <Button onClick={handleCreateBill} variant="contained" color="primary">
                                    Create Prescription
                                </Button>
                            </Box>
                        ) : null}
                    </Box>
                </ClickAwayListener>

                <div>
                    {displayBillList()}
                </div>
            </div>
            <div className="medicine">
                <Autocomplete
                    disablePortal
                    id="combo-box-demo"
                    options={medicineInfo}
                    getOptionLabel={(option) => option.label}
                    sx={{ width: 300 }}
                    onChange={(event, value) => setSelectedMedicine(value)}
                    renderInput={(params) => <TextField {...params} label="Search Prescription" />}
                />
            </div>
            <div className="info" >
            <h4 className="topic">Prescription</h4>
            <div>   
        {showLocationDiv ? (
          <div className="locationDiv">
            {visibleCards.map((card, index) => (
              <div key={index} className="locationCard">
                <div className="cardInfo">
                  <div className="name">{card.name}</div>
                  <div className="price">{`Price: ${card.price}`}</div>
                </div>
                {/* Use Link to navigate to another page */}
                <Link to="/location">
                  <button className="cardButton" onClick={() => handleCardButtonClick(card.name)}>
                    View on Map
                  </button>
                </Link>
              </div>
            ))}
          </div>
        ) : (
          <button style={{
            marginLeft:'400px',
            marginTop: '250px',
            width:'300px'
            
          }} className="selectLocationButton" onClick={handleSelectLocationClick}>
            Select Location
          </button>
        )}
        </div>
        </div>
        </div>
        </div>
    )
}
