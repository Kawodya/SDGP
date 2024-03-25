import React, { useEffect, useState } from "react";
import {
  Button,
  Typography,
  IconButton,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import Box from "@mui/material/Box";
import Navbar from "../Navbar";
import { Link, useNavigate } from "react-router-dom";
import SaveIcon from "@mui/icons-material/Save";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

import "./Search.css";
import axiosClient from "../axios-client";
import Swal from "sweetalert2";

export default function Search() {
  const navigate = useNavigate();
  const [medicineInfo, setMedicineInfo] = React.useState([]);

  const [showSearchSubmit, setShowSearchSubmit] = React.useState(true);
  const [showResult, setShowResult] = React.useState(false);
  const [prescriptionNumber, setPrescriptionNumber] = React.useState("");
  const [showCards, setShowCards] = React.useState(false);
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [date, setDate] = useState("");

  const handleSearchSubmit = () => {
    if (showSearchSubmit && prescriptionNumber.trim() === "") {
      Swal.fire({
        text: "Please enter a prescription number",
        icon: "error",
      });
      return;
    }

    axiosClient
      .get(`/prescription/get-prescription-by-code/${prescriptionNumber}`)
      .then(({ data }) => {
        setName(data.data.user_name);
        setAge(data.data.age);
        setDate(data.data.date);

        const array = [];
        data.data.medicines.forEach((medicine) => {
          const newMedicine = {
            brand: medicine.product.brand.brand_name,
            genericName: medicine.product.drug.drug_name,
            dosage: medicine.product.dosage,
            user_instruction: medicine.user_instruction,
            special_instruction: medicine.product.special_instruction,
          };
          array.push(newMedicine);
        });

        setMedicineInfo(array);

        setShowSearchSubmit(false);
        setShowResult(true);
        setShowCards(true);
      })
      .catch(() => {
        Swal.fire({
          text: "Invalid Prescription Number !",
          icon: "error",
        });
      });
  };

  const handleCloseCard = () => {
    setShowCards(false);
  };

  const handleSave = () => {
    alert("Information already saved");
  };

  const handleAddMedicine = () => {
    setMedicineInfo([
      ...medicineInfo,
      { label: "New Medicine", dosage: "10 mg" },
    ]);
  };

  const handleRemoveMedicine = (index) => {
    const updatedMedicineInfo = [...medicineInfo];
    updatedMedicineInfo.splice(index, 1);
    setMedicineInfo(updatedMedicineInfo);
  };

  const [prescriptionNumbers, setPrescriptionNumbers] = useState([]);
  const [fullName, setFullName] = useState("");
  const [prescriptionCode, setPrescriptionCode] = useState("");
  const [medicineList, setMedicineList] = useState([]);
  const [isPrescriptionCodeOpen, setIsPrescriptionCodeOpen] = useState(false);

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
  }, [isPrescriptionCodeOpen]);

  const selectPrescription = (prescriptionId) => {
    axiosClient
      .get(`/prescription/get-prescription-by-code/${prescriptionId}`)
      .then(({ data }) => {
        setFullName(data.data.user_name);
        setAge(data.data.age);
        setPrescriptionCode(data.data.code);
        setDate(data.data.date);

        const array = [];
        data.data.medicines.forEach((medicine) => {
          const newMedicine = {
            name: medicine.product.brand.brand_name,
            genericName: medicine.product.drug.drug_name,
            dosage: medicine.product.dosage,
            quantity: medicine.product.qty,
            useInstructions: medicine.product.user_instruction,
            specialInstructions: medicine.product.special_instruction,
            medicineId: medicine.product._id,
          };
          array.push(newMedicine);
        });

        setMedicineList(array);

        setIsPrescriptionCodeOpen(true);
      });
  };

  useEffect(() => {
    if (!isPrescriptionCodeOpen) {
      setFullName("");
      setAge("");
      setDate("");
      setMedicineList([]);
      setPrescriptionCode("");
      setShowResult(false);
      setShowSearchSubmit(true);
      setPrescriptionNumber("");
    }
  }, [isPrescriptionCodeOpen]);

  const handleClosePrescriptionCode = () => {
    setIsPrescriptionCodeOpen(false);
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
        <div className="" style={{ width: "100%" }}>
          <div style={{ height: "98%" }}>
            {showSearchSubmit && (
              <div
                style={{
                  width: "100%",
                  height: "100%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: "1200px",
                  }}
                >
                  <TextField
                    className="ss"
                    id="standard-basic"
                    label="Enter your prescription number"
                    variant="standard"
                    value={prescriptionNumber}
                    onChange={(e) => {
                      if (e.target.value.length < 7) {
                        setPrescriptionNumber(e.target.value);
                      }
                    }}
                    style={{ width: "300px" }}
                  />
                  <IconButton color="primary" onClick={handleSearchSubmit}>
                    <CheckCircleOutlineIcon />
                  </IconButton>
                </div>
              </div>
            )}
            {showResult && showCards && (
              <>
                {/* Patient Information Card */}
                <Card
                  style={{
                    backgroundColor: "silver",
                    marginTop: "30px",
                    marginLeft: "100px",
                    width: "400px",
                  }}
                >
                  <CardContent
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      flexDirection: "column",
                    }}
                  >
                    <Typography variant="h5" component="div">
                      Patient Information
                      <IconButton
                        style={{
                          position: "absolute",
                          top: "5px",
                          right: "5px",
                        }}
                        onClick={handleCloseCard}
                      />
                    </Typography>
                    <Typography color="text.secondary">
                      Name: {name} <br />
                      Age: {age} <br />
                      Date: {date}
                    </Typography>
                  </CardContent>
                </Card>

                {/* Medicine Cards */}
                {medicineInfo.map((medicine, index) => (
                  <Card
                    key={index}
                    style={{
                      backgroundColor: "silver",
                      marginTop: "30px",
                      marginLeft: "100px",
                      width: "400px",
                    }}
                  >
                    <CardContent>
                      <Typography variant="h5" component="div">
                        {medicine.brand} {medicine.genericName}
                        <IconButton
                          style={{
                            position: "absolute",
                            top: "5px",
                            right: "5px",
                          }}
                          onClick={() => handleRemoveMedicine(index)}
                        ></IconButton>
                      </Typography>
                      <Typography color="text.secondary">
                        Dosage: {medicine.dosage}
                      </Typography>
                      <Typography color="text.secondary">
                        User Instructions: {medicine.user_instruction}
                      </Typography>
                      {medicine.special_instruction !== "" && (
                        <Typography color="text.secondary">
                          Special Instructions: {medicine.special_instruction}
                        </Typography>
                      )}
                    </CardContent>
                  </Card>
                ))}

                {/* Buttons */}
                <div style={{ marginTop: "10px", textAlign: "center" }}>
                  {/* <Button
                    variant="contained"
                    color="primary"
                    style={{ background: "blue" }}
                    onClick={handleSave}
                    startIcon={<SaveIcon />}
                  >
                    Save
                  </Button>
                  <span style={{ marginRight: "10px" }}></span> */}
                  {/* <Link to="/selLoc"> */}
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => {
                      localStorage.setItem(
                        "prescriptionId",
                        prescriptionNumber
                      );
                      navigate("/selLoc");
                    }}
                    style={{ background: "blue" }}
                  >
                    Next
                    <ArrowForwardIcon style={{ marginLeft: "5px" }} />
                  </Button>
                  {/* </Link> */}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
      <Dialog
        open={isPrescriptionCodeOpen}
        onClose={handleClosePrescriptionCode}
      >
        <DialogTitle
          style={{
            textAlign: "center",
            paddingLeft: "100px",
            paddingRight: "100px",
            fontSize: "50px",
          }}
        >
          Prescription
        </DialogTitle>
        <DialogContent>
          <div style={{ marginBottom: "20px" }}>
            <p style={{ fontSize: "20px", marginBottom: "5px" }}>
              Patient Name : {fullName}
            </p>
            <p style={{ fontSize: "20px", marginBottom: "5px" }}>
              Patient Age : {age}
            </p>
            <p style={{ fontSize: "20px", marginBottom: "5px" }}>
              Date : {date}
            </p>
            <p style={{ fontSize: "20px", marginBottom: "5px" }}>
              Prescription Code : {prescriptionCode}
            </p>
          </div>
          <div>
            {medicineList.map((m) => {
              return (
                <p style={{ fontSize: "20px", marginBottom: "5px" }}>
                  {m.name} {m.genericName} {m.dosage} - {m.quantity}
                </p>
              );
            })}
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClosePrescriptionCode}>Cancel</Button>
          {/* <Button onClick={handleSendPrescriptionCode}>Send</Button> */}
        </DialogActions>
      </Dialog>
    </div>
  );
}
