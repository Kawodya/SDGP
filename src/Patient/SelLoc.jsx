// Import necessary components and icons
import * as React from 'react';
import { Button, Typography } from "@mui/material";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import Navbar from '../Navbar';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import MapIcon from '@mui/icons-material/Map';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

import './SelLoc.css';

export default function SelLoc() {
  const [showLocationDiv, setShowLocationDiv] = React.useState(false);
  const [viewOnMapClicked, setViewOnMapClicked] = React.useState(false);
  const [selectedDistrict, setSelectedDistrict] = React.useState(""); // State to hold selected district

  const pharmacyLocation = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.073394073073!2d79.8608103147725!3d6.927079994993073!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae259f3f3f3f3f3%3A0x3e3e3e3e3e3e3e3e!2sColombo%20National%20Hospital!5e0!3m2!1sen!2slk!4v1633943940733!5m2!1sen!2slk";

  const handleSelectLocationClick = () => {
    setShowLocationDiv(!showLocationDiv);
  };

  const handleViewOnMapClick = () => {
    setViewOnMapClicked(true);
  };

  const handleCardButtonClick = (name) => {
    console.log(`Button clicked for ${name}`);
  };

  const visibleCards = [
    { name: 'City Pharmacy Colombo', price: 'Rs 600' },
    { name: 'City Pharmacy Colombo', price: 'Rs 600' },
    { name: 'Central Pharmacy', price: 'Rs 800' },
    { name: ' Pharmacy', price: 'Rs 5500' },
  ];

  const medicineInfo = [
    { label: 'USER-001-a', price: 10, image: 'https://fakeimg.pl/100x100', medicine: 'Paracetemol', mg: '500mg', stock: 1000 },
    { label: 'USER-001-b', price: 20, image: 'https://fakeimg.pl/100x100', medicine: 'Aspirin', mg: '500mg', stock: 1000 },
    { label: 'USER-001-c', price: 30, image: 'https://fakeimg.pl/100x100', medicine: 'Ibuprofen', mg: '500mg', stock: 1000 }
  ];

  const [billData, setBillData] = React.useState({});
  const [open, setOpen] = React.useState(false);
  const [prescriptionNumbersArray, setPrescriptionNumbersArray] = React.useState([
    'No 12345',
    'No 67890',
  ]);

  const displayBillList = () => {
    if (prescriptionNumbersArray.length > 0) {
      return prescriptionNumbersArray.map((prescriptionNumber, index) => (
        <div key={index}>
          <Button variant="contained" color="primary"><InsertDriveFileIcon />{prescriptionNumber}</Button>
        </div>
      ));
    }
  };

  const handleClick = () => {
    setOpen((prev) => !prev);
  };

  const handleBillNameChange = (event) => {
    setBillData(event.target.value);
  };

  const handleCreateBill = () => {
    if (billData) {
      setPrescriptionNumbersArray([...prescriptionNumbersArray, billData]);
      setOpen(false);
      setBillData('');
    }
  };

  return (
    <div>
      <Navbar currentPage={"Patient"} />
      <div className="container">
        <div className="bills">
          <button
            style={{
              backgroundColor: 'blue',
              color: 'white',
              padding: '15px',
              borderRadius: '1px',
              cursor: 'pointer',
              border: 'none',
              fontSize: '16px',
              width: '200px'
            }}
            onClick={handleClick}
          >
            <AddCircleIcon style={{ marginRight: '5px', marginBottom: '-5px' }} /> New Prescription
          </button>

          <div className='anobill'>
            {prescriptionNumbersArray.map((prescriptionNumber, index) => (
              <div key={index} style={{ color: 'black', marginLeft: '25px' }}>
                 <InsertDriveFileIcon style={{ marginRight: '5px',marginBottom:'-4px',marginTop:'5px' }} />
                <span>{prescriptionNumber}</span>
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
          {viewOnMapClicked ? (
            <div>
              <iframe
                title="Pharmacy Location"
                src={pharmacyLocation}
              
                style={{ width: '900px', height: '700px',marginLeft:'50px' }}
                allowFullScreen=""
                loading="lazy"
              ></iframe>
            </div>
          ) : (
            <>
              <h4 className="topic">Prescription</h4>
              <div>
                {showLocationDiv ? (
                  <div className="locationDiv">
                    {visibleCards.map((card, index) => (
                      <div key={index} className="locationCard"  >
                        <div className="cardInfo">
                          <div className="name">{card.name}</div>
                          <div className="price" style={{ marginLeft: '450px' }}>{`Price: ${card.price}`}</div>
                        </div>
                        <button className="cardButton"
                          style={{
                            backgroundColor: 'darkblue',  // Apply blue color to the button
                            color: 'white',          // Set text color to white
                            padding: '12px',          // Adjust padding as needed
                            borderRadius: '5px',      // Add border-radius for rounded corners
                            border: 'none',           // Remove button border
                            fontSize: '14px',         // Adjust font size
                          }}
                          onClick={() => {
                            handleCardButtonClick(card.name);
                            handleViewOnMapClick();
                          }}
                        >
                          <MapIcon style={{ marginRight: '6px', marginBottom: '-6px' }} />
                          View on Map
                        </button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <>
                  {/* Add selection box for districts */}
                  <div style={{marginBottom: '10px',marginLeft:'500px'}}>
                    <select
                      value={selectedDistrict}
                      onChange={(e) => setSelectedDistrict(e.target.value)}
                      style={{
                        padding: '10px',
                        borderRadius: '5px',
                        border: '1px solid #ccc',
                        fontSize: '16px',
                        
                        
                      }}
                    >
                      <option value="">Select District</option>
                      <option value="Colombo">Colombo</option>
                      <option value="Gampaha">Gampaha</option>
                      {/* Add more districts as needed */}
                    </select>
                  </div>
                  {/* Change button to Next button */}
                  <button style={{
                    marginLeft: '450px',
                    marginTop: '10px',
                    width: '200px',
                    background: 'darkblue',  // Apply blue color to the button
                    color: 'white',          // Set text color to white
                    padding: '15px',          // Adjust padding as needed
                    borderRadius: '5px',      // Add border-radius for rounded corners
                    border: 'none',           // Remove button border
                    fontSize: '16px',
                  }} className="nextButton" onClick={handleSelectLocationClick}>
                    
                    Next
                    <ArrowForwardIcon style={{ marginLeft: '5px',marginBottom:'-7' }} />
                  </button>
                  </>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
