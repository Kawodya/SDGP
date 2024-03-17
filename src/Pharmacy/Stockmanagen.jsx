import * as React from 'react';
import { Button, Typography, colors } from "@mui/material"
import InventoryIcon from '@mui/icons-material/Inventory';
import Divider from '@mui/material/Divider';
import './Pharmacy.css'
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { useState } from 'react';
import CancelIcon from '@mui/icons-material/Cancel';
import SaveIcon from '@mui/icons-material/Save';
import {FormControl,FormLabel} from '@mui/material';
import { AddCircle } from '@mui/icons-material';
import { green } from '@mui/material/colors';
import Navbar from './Navbar';
export default function Stockmanagen() {

    const [isFormValid, setIsFormValid] = useState(true); // State to check if form is valid
    const [showForm, setShowForm] = useState(false); // State to check if form is visible

    const [productId, setProductId] = useState("");
    const [productName, setProductName] = useState("");
    const [scientificName, setScientificName] = useState("");
    const [openingStock, setOpeningStock] = useState("");
    const [addStock, setAddStock] = useState("");
    const [removeStock, setRemoveStock] = useState("");
    const [finalStock, setFinalStock] = useState("");

    const [medicineInfo, setMedicineInfo] = useState([
        { label: productName, scientificName: scientificName,productId:productId, openingStock: openingStock, finalStock: finalStock }
    ]);

    const addMedicine = () => {
        setShowForm(true);
    }


   // Function to handle adding new medicine
   const handleAdd = () => {
    // Checking if all required fields are filled
    if (
        productId !== "" &&
        productName !== "" &&
        scientificName !== "" &&
        openingStock !== "" &&
        addStock !== "" &&
        removeStock !== "" &&
        finalStock !== ""
    ) {
        // If all fields are filled, add the medicine
        setMedicineInfo([...medicineInfo, {
            label: productName,
            scientificName: scientificName,
            stock: openingStock,
            finalStock: finalStock
        }]);
        setIsFormValid(true); // Update form validation status
    } else {
        setIsFormValid(false); // Update form validation status
        alert("Please fill all required fields"); // Alert user to fill all required fields
    }
}

 
    return (

        <div> 
            <Navbar />
        <div className="container" style={{width: '100%'}}>
            <div className="bills">
            <Button startIcon={<InventoryIcon/> }sx={{bgcolor:'lightgreen',width:'100%',
            textAlign: 'left',
            justifyContent: 'flex-start'
        }}variant='filled'>All Stock Medicine</Button>

            </div>
            {/*  */}
            {/* <div className="medicine"> */}
            <Autocomplete
    disablePortal
    id="combo-box-demo"
    options={medicineInfo}
    getOptionLabel={(option) => option.label}
    sx={{ width: 300 }}
    onChange={(event, value) => {
        if (value) {
            setProductId(value.productId);
            setProductName(value.label);
            setScientificName(value.scientificName);
            setOpeningStock(value.openingStock);
            setFinalStock(value.finalStock);
        } else {
            setProductId("");
            setProductName("");
            setScientificName("");
            setOpeningStock("");
            setFinalStock("");
        }
    }}
    renderInput={(params) => <TextField {...params} label="Search Medicines" />}
/>

            {/* </div> */}
            <div className="info" style={{
                width: '80%',
            }}>
                <Button onClick={addMedicine} startIcon={<AddCircle/>}>Add</Button>

                {showForm &&<div>
                    <FormControl style={{
                        display: 'grid',
                        gridTemplateColumns: '1fr 2fr',
                        alignItems: 'center'
                    }}>
                        <FormLabel className='form-label' >Product ID: </FormLabel>
                        <TextField className='form-label' id="filled-basic" label="Product ID" variant="filled" value={productId} onChange={(e) => setProductId(e.target.value)} required />
                        <FormLabel className='form-label'>Product Name: </FormLabel>
                        <TextField className='form-label' id="filled-basic" label="Product Name" variant="filled" value={productName} onChange={(e) => setProductName(e.target.value)} required />
                        <FormLabel className='form-label'>Scientific Name: </FormLabel>
                        <TextField className='form-label' id="filled-basic" label="Scientific Name" variant="filled" value={scientificName} onChange={(e) => setScientificName(e.target.value)} required/>
                        <FormLabel className='form-label'>Opening Stock: </FormLabel>
                        <TextField className='form-label' id="filled-basic" label="Opening Stock" variant="filled" value={openingStock} onChange={(e) => setOpeningStock(e.target.value)} required/>
                        <FormLabel className='form-label'>Add Stock: </FormLabel>
                        <TextField className='form-label' id="filled-basic" label="Add Stock" variant="filled" value={addStock} onChange={(e) => setAddStock(e.target.value)} required/>
                        <FormLabel className='form-label'>Remove Stock: </FormLabel>
                        <TextField className='form-label' id="filled-basic" label="Remove Stock" variant="filled" value={removeStock} onChange={(e) => setRemoveStock(e.target.value)} required/>
                        <FormLabel className='form-label'>Final Stock: </FormLabel>
                        <TextField className='form-label' id="filled-basic" label="Final Stock" variant="filled" value={finalStock} onChange={(e) => setFinalStock(e.target.value)} required/>
                    </FormControl>
                    <div>
                        <Button variant='outlined' onClick={handleAdd} startIcon={<SaveIcon />}>Save</Button>
                        <Button variant='outlined' startIcon={<CancelIcon />} >Cancel</Button>
                    </div>
                </div>}
            </div>
        </div>
        </div>
    )
}
