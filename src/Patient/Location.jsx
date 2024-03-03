import * as React from 'react';
import { Button, Typography } from "@mui/material"


import './Location.css'

import AddCircleIcon from '@mui/icons-material/AddCircle';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { useState } from 'react';

import Box from '@mui/material/Box';
import { ClickAwayListener } from '@mui/base/ClickAwayListener';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';

import Iframe from 'react-iframe'
import Navbar from '../Navbar';

export default function Location() {

    const pharmacy_location = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.073394073073!2d79.8608103147725!3d6.927079994993073!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae259f3f3f3f3f3%3A0x3e3e3e3e3e3e3e3e!2sColombo%20National%20Hospital!5e0!3m2!1sen!2slk!4v1633943940733!5m2!1sen!2slk"

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
            <div className="info">
        <Iframe url={pharmacy_location} 
        allowfullscreen="" 
        loading="lazy" 
        width="100%"
        height="100%"
        id=""
        className=""
        display="block"
        position="relative"/>
        </div>
        </div>
        </div>
    )
}
