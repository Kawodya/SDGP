import * as React from 'react';
import { Button, Typography, IconButton, Card, CardContent } from "@mui/material"
import AddCircleIcon from '@mui/icons-material/AddCircle';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import Box from '@mui/material/Box';
import Navbar from '../Navbar';
import { Link } from 'react-router-dom';
import SaveIcon from '@mui/icons-material/Save';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';



import './Search.css';

export default function Search() {
    const [medicineInfo, setMedicineInfo] = React.useState([
        { label: 'Panadol', dosage: '1 tablet' },
        { label: 'Paracetamol', dosage: '30 mg' },
        { label: 'Pana', dosage: '1 tablet' },
        { label: 'Paracetamol', dosage: '30 mg' },
    ]);

    const [showSearchSubmit, setShowSearchSubmit] = React.useState(true);
    const [showResult, setShowResult] = React.useState(false);
    const [prescriptionNumber, setPrescriptionNumber] = React.useState('');
    const [showCards, setShowCards] = React.useState(false);
    const [prescriptionNumbersArray, setPrescriptionNumbersArray] = React.useState([
        'No 12345', // Sample data, replace with actual data from the database
        'No 67890', // Sample data, replace with actual data from the database
        // Add more prescription numbers as needed
    ]);

    const handleSearchSubmit = () => {
        if (showSearchSubmit && prescriptionNumber.trim() === '') {
            alert('Please enter a prescription number');
            return;
        }

        setShowSearchSubmit(false);
        setShowResult(true);
        setShowCards(true);
    };

    const handleCloseCard = () => {
        setShowCards(false);
    };

    const handleSave = () => {
        alert('Information already saved');
    };

    const handleAddMedicine = () => {
        setMedicineInfo([...medicineInfo, { label: 'New Medicine', dosage: '10 mg' }]);
    };

    const handleRemoveMedicine = (index) => {
        const updatedMedicineInfo = [...medicineInfo];
        updatedMedicineInfo.splice(index, 1);
        setMedicineInfo(updatedMedicineInfo);
    };

    return (
        <div>
            <Navbar currentPage={"Patient"}/>
            <div className="container">
                <div className="bills">
                    <Button 
                        style={{
                            backgroundColor: 'blue',
                            color: 'white',
                            padding: '15px',
                            borderRadius: '1px',
                            cursor: 'pointer',
                            border: 'none',
                            fontSize: '13px',
                            width:'200px',
                        }}
                        onClick={handleAddMedicine}   
                    >
                        <AddCircleIcon style={{ marginRight: '5px' }} /> 
                        New Prescription
                    </Button>

                    <div className='anobill'>
                            {prescriptionNumbersArray.map((prescriptionNumber, index) => (
                            <div key={index} style={{ color: 'black', marginLeft: '25px' }}>
    
                            <Button
                              variant="contained"
                              color="primary"
                              startIcon={<InsertDriveFileIcon />}
                              style={{ marginBottom: '5px',background:'white',color:'black', '&:hover': {
                              backgroundColor: 'blue',color:'white'}
                                }}
                            >
                            {prescriptionNumber}
        {/* If you don't need text inside the buttons, you can remove it */}
      </Button>
    </div>
  ))}
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
                    <div className="center-content" >
                        {showSearchSubmit && (
                            <div style={{marginTop:'250px', marginLeft:'400px'}}>
                                <TextField
                                    className="ss"
                                    id="standard-basic"
                                    label="Enter your prescription number !!!!!!!!  😊  "
                                    variant="standard"
                                    value={prescriptionNumber}
                                    onChange={(e) => setPrescriptionNumber(e.target.value)}
                                    style={{width:'300px' }}
                                    
                                />
                                <IconButton color="primary" onClick={handleSearchSubmit} >
                                    <CheckCircleOutlineIcon />
                                </IconButton>
                            </div>
                        )}
                        {showResult && showCards && (
                            <>
                                {/* Patient Information Card */}
                                <Card style={{ backgroundColor: 'silver', marginTop: '10px',marginLeft:'30px', marginRight:'50px' }}>
                                    <CardContent>
                                        <Typography variant="h5" component="div">
                                            Patient Information
                                            <IconButton
                                                style={{ position: 'absolute', top: '5px', right: '5px' }}
                                                onClick={handleCloseCard}
                                            />
                                        </Typography>
                                        <Typography  color="text.secondary">
                                            Name: SUDEW ABHYAPALA <br />
                                            Age: 30 <br />
                                            Location: City, Country
                                        </Typography>
                                    </CardContent>
                                </Card>

                                {/* Medicine Cards */}
                                {medicineInfo.map((medicine, index) => (
                                    <Card key={index} style={{ backgroundColor: 'silver', marginTop: '10px',marginLeft:'30px',marginRight:'50px' }}>
                                        <CardContent>
                                            <Typography variant="h5" component="div">
                                                 {medicine.label}
                                                <IconButton
                                                    style={{ position: 'absolute', top: '5px', right: '5px' }}
                                                    onClick={() => handleRemoveMedicine(index)}
                                                >
                                                </IconButton>
                                            </Typography>
                                            <Typography color="text.secondary">Dosage: {medicine.dosage}</Typography>
                                        </CardContent>
                                    </Card>
                                ))}

                                {/* Buttons */}
                                <div style={{marginTop:'10px',marginLeft:'300px'}}>
                                    <Button  variant="contained" color="primary" style={{background:'blue'}} onClick={handleSave} startIcon={<SaveIcon />}>
                                        Save
                                    </Button>
                                    <span style={{ marginRight: '10px' }}></span>
                                    <Link to="/selLoc">
                                        <Button  variant="contained" color="primary" style={{background:'blue'}}> 
                                            Next
                                            <ArrowForwardIcon style={{ marginLeft: '5px' }} />
                                        </Button>
                                    </Link> 
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
