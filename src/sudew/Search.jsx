import * as React from 'react';
import { Button, Typography } from "@mui/material"
import { Link } from 'react-router-dom';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
// import Typography from '@mui/material/Typography';
// import Button from '@mui/material/Button';
import CloseIcon from '@mui/icons-material/Close';


import './Search.css'

// import AddCircleIcon from '@mui/icons-material/AddCircle';
// import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { useState } from 'react';

import Box from '@mui/material/Box';
import { ClickAwayListener } from '@mui/base/ClickAwayListener';
import Navbar from '../Navbar';
// import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';


export default function Search() {

   

    const medicineInfo = [
        { label: 'USER-001-a' }

    ];

    const [showSearchSubmit, setShowSearchSubmit] = React.useState(true);
    const [showResult, setShowResult] = React.useState(false);
    const [prescriptionNumber, setPrescriptionNumber] = React.useState('');
    const [showCards, setShowCards] = React.useState(false);

    const handleSearchSubmit = () => {
        // Check if prescription number is empty
        if (showSearchSubmit && prescriptionNumber.trim() === '') {
            alert('Please enter a prescription number');
            return; // Stop further execution if prescription number is empty
        }

        // Perform any necessary actions here
        // For now, let's just toggle the visibility of search/submit and result
        setShowSearchSubmit(false);
        setShowResult(true);
        setShowCards(true);
    };

    const handleCloseCard = () => {
        setShowCards(false);
    };

    const handleSave = () => {
        // Implement save functionality here
        alert('Save button clicked');
    };


    

 


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
                                    label="Enter prescription num"
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
            <div className="center-content" style={{margin:'auto'}}>
                    {showSearchSubmit && (
                        <>
                            <TextField
                                className="ss"
                                id="standard-basic"
                                label="Enter your prescription number   😊  "
                                variant="standard"
                                value={prescriptionNumber}
                                onChange={(e) => setPrescriptionNumber(e.target.value)}
                                style={{width:'300px', marginTop:'250px'}}

                            />
                            <IconButton color="primary" onClick={handleSearchSubmit} style={{marginTop:'260px'}}>
                                <CheckCircleOutlineIcon />
                            </IconButton>
                        </>
                    )}
                    {showResult && showCards && (
                        <>
                            {/* Patient Information Card */}
                            <Card style={{ backgroundColor: 'silver', marginTop: '10px' }}>
                                <CardContent>
                                    <Typography variant="h5" component="div">
                                        Patient Information
                                        <IconButton
                                            style={{ position: 'absolute', top: '5px', right: '5px' }}
                                            onClick={handleCloseCard}
                                        >
                                            <CloseIcon />
                                        </IconButton>
                                    </Typography>
                                    <Typography color="text.secondary">
                                        Name: John Doe <br />
                                        Age: 30 <br />
                                        Location: City, Country
                                    </Typography>
                                </CardContent>
                            </Card>
                                        
                            {/* Panadol Card */}
                            <Card style={{ backgroundColor: 'silver', marginTop: '10px' }}>
                                <CardContent>
                                    <Typography variant="h5" component="div">
                                        Medication: Panadol
                                        <IconButton
                                            style={{ position: 'absolute', top: '5px', right: '5px' }}
                                            onClick={handleCloseCard}
                                        >
                                            <CloseIcon />
                                        </IconButton>
                                    </Typography>
                                    <Typography color="text.secondary">Dosage: 1 tablet</Typography>
                                </CardContent>
                            </Card>

                            {/* Paracetamol Card */}
                            <Card style={{ backgroundColor: 'silver', marginTop: '10px', }}>
                                <CardContent>
                                    <Typography variant="h5" component="div">
                                        Medication: Paracetamol
                                        <IconButton
                                            style={{ position: 'absolute', top: '5px', right: '5px' }}
                                            onClick={handleCloseCard}
                                        >
                                            <CloseIcon />
                                        </IconButton>
                                    </Typography>
                                    <Typography color="text.secondary">Dosage: 30 mg</Typography>
                                </CardContent>
                            </Card>

                            {/* Buttons */}
                            <div style={{ marginTop:'20px'  }}>
                                <Button  variant="contained" color="primary" onClick={handleSave}>
                                    Save
                                </Button>
                               
                                <Link to="/selLoc">
                                    <Button  variant="contained" color="primary" style={{marginLeft:'10px'}}> 
                                        Next
                                    </Button>
                                </Link> 
                              
                            </div>
                        </>
                    )}
                </div>


            
        </div>
        </div>
        </div>
    )
}
