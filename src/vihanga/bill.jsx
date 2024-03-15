import * as React from 'react';
import { Button, Typography } from "@mui/material"

import AddCircleIcon from '@mui/icons-material/AddCircle';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import PrintIcon from '@mui/icons-material/Print';

import Box from '@mui/material/Box';
import { ClickAwayListener } from '@mui/base/ClickAwayListener';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import Navbar from './Navbar';


export default function BillSystem() {
    const [selectedMedicine, setSelectedMedicine] = useState(null);
    const [noOfPills, setNoOfPills] = useState(0);
    const [isAddClicked, setIsAddClicked] = useState(false);
    const [addedMedicines, setAddedMedicines] = useState([]); // Use useState to manage added medicines

    const formateMedicine = () => {
        if (selectedMedicine) {
            return (
                <div className="selected-medicine">
                    <div style={{
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                        marginBottom: '10px'
                    }}>
                        <img src={selectedMedicine.image} alt="medicine" />
                        <Typography variant="h4" color="initial">{selectedMedicine.label}</Typography>
                    </div>
                    <Typography variant="h7" color="initial">Per pill price:- Rs.{selectedMedicine.price}.00</Typography>

                </div>
            );
        } else {
            return null;
        }
    }

    const medicineInfo = [
        { label: 'Panadol', price: 10, image: 'https://fakeimg.pl/100x100',medicine:'Paracetemol',mg:'500mg',stock:1000 },
        { label: 'Jam', price: 20, image: 'https://fakeimg.pl/100x100',medicine:'Aspirin',mg:'500mg',stock:1000 },
        { label: 'Bob', price: 30, image: 'https://fakeimg.pl/100x100',medicine:'Ibuprofen',mg:'500mg',stock:1000 }
    ];

    const handleAdd = () => {
        setIsAddClicked(true);
        setAddedMedicines([...addedMedicines, { name: selectedMedicine.label, noOfPills: noOfPills, price: selectedMedicine.price,medicine:selectedMedicine.medicine,mg:selectedMedicine.mg,stock:selectedMedicine.stock}]);
    }
    

    const handleRemove = (index) => {
        const newMedicines = addedMedicines.filter((medicine, i) => i !== index);
        setAddedMedicines(newMedicines);
    }


    const formateBillTotal = () => {
        return (
            <div>
                <Typography variant="h6" color="initial">Total: Rs.{billTotal}.00</Typography>
            </div>
        );
    }

    const formateAddedMedicines = () => {
        return (
            <div>
                <Typography variant="h4" color="initial">Medicine Information</Typography>
                {addedMedicines.map((medicine, index) => (
                    <div className='medicine-name'>
                        <div className='name-close'>
                            <p className='name'>{`${medicine.name}`}</p>
                            <CloseIcon onClick={() => handleRemove(index)} />
                        </div>
                        <div className='medicine-bill-info' key={index}>
                        
                            <p>{medicine.mg}</p>
                            <p>Qrt : {medicine.noOfPills}</p>
                            <p>Rs. {medicine.price*medicine.noOfPills}</p>
                        
                        </div>
                    </div>
                ))}
            </div>
            
        );
    }

    const [billData, setBillData] = React.useState({});

    const [open, setOpen] = React.useState(false);
    const [billList, setBillList] = React.useState([]);
    const [billTotal,setBillTotal] = React.useState(0);




   

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


    React.useEffect(() => {
        setBillTotal(addedMedicines.reduce((acc, medicine) => acc + (medicine.price * medicine.noOfPills), 0));
    }, [addedMedicines]);

    

    return (
        <div >
        <div className="container">
            <div className="bills">
                <ClickAwayListener onClickAway={handleClickAway}>
                    <Box sx={{ position: 'relative' }}>
                        <Button sx={{bgcolor:'lightblue',width:'100%',
            textAlign: 'left',
            justifyContent: 'flex-start',
            color: 'black'
        }} onClick={handleClick}><AddCircleIcon />New Bill</Button>
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
                                    Create Bill
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
                    renderInput={(params) => <TextField {...params} label="Search Medicines" />}
                />
            </div> 
            <div className="info">
                
                <div className="added-medicines">
                    {isAddClicked && formateAddedMedicines()}
                </div>
                <div className="bill-total">
                {((addedMedicines.length > 0 || selectedMedicine) && billTotal !== 0) && (
                <div className="bill-total">
                    {formateBillTotal()}
                </div>
                )}
                {isAddClicked && <Button><PrintIcon/> Print</Button>}
                    </div>
            </div>
        </div>
        </div>
        
    )
}
