import "./test.css";
import * as React from 'react';
import { Link } from 'react-router-dom';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import CloseIcon from '@mui/icons-material/Close';

import './test.css';

export default function Hidepage() {
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

    return (
        <div className="main">
            <div className="red">
                <List>
                    {['New Prescription', 'PregNo01'].map((text, index) => (
                        <ListItem key={text} disablePadding>
                            <ListItemButton>
                                <ListItemIcon>
                                    {index % 2 === 0 ? <AddCircleIcon /> : <InsertDriveFileIcon />}
                                </ListItemIcon>
                                <ListItemText primary={text} />
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
            </div>
            <div className="blue">
                <TextField id="standard-basic" label="Search Prescription " variant="standard" />
            </div>
            <div className="black" style={{width: '100vw'}}>
                <div className="center-content" style={{margin:'auto'}}>
                    {showSearchSubmit && (
                        <>
                            <TextField
                                className="ss"
                                id="standard-basic"
                                label="Enter your prescription number"
                                variant="standard"
                                value={prescriptionNumber}
                                onChange={(e) => setPrescriptionNumber(e.target.value)}
                            />
                            <IconButton color="primary" onClick={handleSearchSubmit}>
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
                            <div style={{  }}>
                                <Button  variant="contained" color="primary" onClick={handleSave}>
                                    Save
                                </Button>
                               
                                <Link to="/selectlocation">
                                    <Button  variant="contained" color="primary">
                                        Next
                                    </Button>
                                </Link> 
                              
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}
