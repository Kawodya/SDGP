// Import necessary components and icons
import React, { useEffect, useState } from "react";
import { Button, List, Typography } from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import Navbar from "../Navbar";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import MapIcon from "@mui/icons-material/Map";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

import "./SelLoc.css";
import axiosClient from "../axios-client";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

export default function SelLoc() {
  const [showLocationDiv, setShowLocationDiv] = React.useState(false);
  const [viewOnMapClicked, setViewOnMapClicked] = React.useState(false);
  const [selectedDistrict, setSelectedDistrict] = React.useState(null); // State to hold selected district
  const [pharmacyList, setPharmacyList] = useState([]);
  const navigate = useNavigate();

  const [pharmacyLocation, setPharmacyLocation] = useState("");

  const handleSelectLocationClick = () => {
    getCurrentPosition()
      .then(({ longitude, latitude }) => {
        const prescriptionId = localStorage.getItem("prescriptionId");
        if (selectedDistrict) {
          axiosClient
            .get(
              `/prescription/get-pharmacists-by-prescription/${selectedDistrict}/${prescriptionId}/${longitude}/${latitude}`
            )
            .then(({ data }) => {
              localStorage.removeItem("prescriptionId");
              setPharmacyList(data.data);
            })
            .catch((err) => {
              console.log(err);
            });
          setShowLocationDiv(!showLocationDiv);
        } else {
          Swal.fire({
            text: "Please select a district !",
            icon: "error",
          });
        }
      })
      .catch((error) => {
        Swal.fire({
          text: "Please give access for location",
          icon: "error",
        });
      });
  };

  const handleViewOnMapClick = (lat, long) => {
    localStorage.setItem(
      "googleAddress",
      `http://maps.google.com/maps?q=${lat},${long}`
    );
    navigate("/map");
  };

  const handleCardButtonClick = (name) => {
    console.log(`Button clicked for ${name}`);
  };

  const visibleCards = [
    { name: "City Pharmacy Colombo", price: "Rs 600" },
    { name: "City Pharmacy Colombo", price: "Rs 600" },
    { name: "Central Pharmacy", price: "Rs 800" },
    { name: " Pharmacy", price: "Rs 5500" },
  ];

  const medicineInfo = [
    {
      label: "USER-001-a",
      price: 10,
      image: "https://fakeimg.pl/100x100",
      medicine: "Paracetemol",
      mg: "500mg",
      stock: 1000,
    },
    {
      label: "USER-001-b",
      price: 20,
      image: "https://fakeimg.pl/100x100",
      medicine: "Aspirin",
      mg: "500mg",
      stock: 1000,
    },
    {
      label: "USER-001-c",
      price: 30,
      image: "https://fakeimg.pl/100x100",
      medicine: "Ibuprofen",
      mg: "500mg",
      stock: 1000,
    },
  ];

  const [billData, setBillData] = React.useState({});
  const [open, setOpen] = React.useState(false);
  const [prescriptionNumbersArray, setPrescriptionNumbersArray] =
    React.useState(["No 12345", "No 67890"]);

  const displayBillList = () => {
    if (prescriptionNumbersArray.length > 0) {
      return prescriptionNumbersArray.map((prescriptionNumber, index) => (
        <div key={index}>
          <Button variant="contained" color="primary">
            <InsertDriveFileIcon />
            {prescriptionNumber}
          </Button>
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
      setBillData("");
    }
  };

  const districts = [
    "Ampara",
    "Anuradhapura",
    "Badulla",
    "Batticaloa",
    "Colombo",
    "Galle",
    "Gampaha",
    "Hambantota",
    "Jaffna",
    "Kalutara",
    "Kandy",
    "Kegalle",
    "Kilinochchi",
    "Kurunegala",
    "Mannar",
    "Matale",
    "Matara",
    "Monaragala",
    "Mullaitivu",
    "Nuwara Eliya",
    "Polonnaruwa",
    "Puttalam",
    "Ratnapura",
    "Trincomalee",
    "Vavuniya",
  ];

  const [prescriptionNumbers, setPrescriptionNumbers] = useState([]);

  useEffect(() => {
    const patient = JSON.parse(localStorage.getItem("user"));
    const patientId = patient.user_id;

    axiosClient
      .get("/prescription")
      .then(({ data }) => {
        setPrescriptionNumbers(
          data.data.filter((prescription) => prescription._id !== patientId)
        );
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const getCurrentPosition = () => {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const longitude = position.coords.longitude;
          const latitude = position.coords.latitude;
          resolve({ longitude, latitude });
        },
        (error) => {
          reject(error);
        },
        { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
      );
    });
  };

  return (
    <div>
      <Navbar currentPage={"Patient"} />
      <div className="container">
        <div className={`red`}>
          <button
            style={{
              backgroundColor: "blue",
              color: "white",
              padding: "15px",
              borderRadius: "1px",
              cursor: "pointer",
              border: "none",
              fontSize: "16px",
              width: "100%",
              margin: "0",
            }}
          >
            <AddCircleIcon
              style={{ marginRight: "5px", marginBottom: "-5px" }}
            />
            New Prescription
          </button>
          <List>
            {prescriptionNumbers.map((prescription, index) => (
              <>
                <Button
                  className="prescription-buttons"
                  style={{ color: "black", width: "100%" }}
                  onClick={() => selectPrescription(prescription.code)}
                >
                  <InsertDriveFileIcon /> {prescription.code}
                </Button>
                <br />
              </>
            ))}
          </List>
        </div>

        <div className="info">
          {/* {viewOnMapClicked ? (
            <div>
              <iframe
                title="Pharmacy Location"
                src={pharmacyLocation}
                style={{ width: "900px", height: "700px", marginLeft: "50px" }}
                allowFullScreen=""
                loading="lazy"
              ></iframe>
            </div>
          ) : ( */}
          <>
            <div style={{ height: "100%" }}>
              {showLocationDiv ? (
                <div style={{ marginLeft: "100px", marginTop: "20px" }}>
                  {pharmacyList.length !== 0 ? (
                    pharmacyList.map((pharmacy, index) => (
                      <div
                        key={index}
                        style={{
                          display: "flex",
                          gap: "100px",
                          marginBottom: "20px",
                          background: "lightgray",
                          width: "60%",
                          padding: "20px",
                          borderRadius: "20px",
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            flex: "1",
                            justifyContent: "space-between",
                            alignItems: "center",
                          }}
                        >
                          <div style={{ fontSize: "18px", fontWeight: "bold" }}>
                            {pharmacy.pharmacy?.name}
                          </div>
                          <div
                            style={{ fontSize: "18px", fontWeight: "bold" }}
                          >{`Distance: ${pharmacy.distance}`}</div>
                          <div
                            style={{ fontSize: "18px", fontWeight: "bold" }}
                          >{`Price: ${pharmacy.totalPrice}`}</div>
                        </div>
                        <div style={{}}>
                          <a
                            className=""
                            style={{
                              margin: "0",
                              backgroundColor: "darkblue", // Apply blue color to the button
                              color: "white", // Set text color to white
                              padding: "12px", // Adjust padding as needed
                              borderRadius: "5px", // Add border-radius for rounded corners
                              border: "none", // Remove button border
                              fontSize: "14px", // Adjust font size
                              textDecoration: "none",
                            }}
                            href={`http://maps.google.com/maps?q=${pharmacy.roles[0].latitude},${pharmacy.roles[0].longitude}`}
                            target="_blank"
                          >
                            <MapIcon
                              style={{
                                marginRight: "6px",
                                marginBottom: "-6px",
                              }}
                            />
                            View on Map
                          </a>
                        </div>
                      </div>
                    ))
                  ) : (
                    <span style={{ fontSize: "50px" }}>
                      Pharmacy Cannot Found
                    </span>
                  )}
                </div>
              ) : (
                <>
                  {/* Add selection box for districts */}
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      height: "100%",
                      gap: "20px",
                    }}
                  >
                    <div style={{ display: "flex", gap: "20px" }}>
                      <Autocomplete
                        disablePortal
                        id="combo-box-demo"
                        options={districts}
                        sx={{ width: "300px" }}
                        value={selectedDistrict}
                        onChange={(event, value) => {
                          if (value) {
                            setSelectedDistrict(value);
                          } else {
                            setSelectedDistrict(null);
                          }
                        }}
                        renderInput={(params) => (
                          <TextField {...params} label="District" />
                        )}
                      />
                      <button
                        style={{
                          margin: "0",
                          width: "100px",
                          background: "darkblue", // Apply blue color to the button
                          color: "white", // Set text color to white
                          padding: "0px", // Adjust padding as needed
                          borderRadius: "5px", // Add border-radius for rounded corners
                          border: "none", // Remove button border
                          fontSize: "16px",
                        }}
                        // className="nextButton"
                        onClick={handleSelectLocationClick}
                      >
                        Search
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          </>
          {/* )} */}
        </div>
      </div>
    </div>
  );
}
