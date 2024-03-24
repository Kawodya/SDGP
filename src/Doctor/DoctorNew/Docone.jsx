import "./docone.css";
//import the items

import React, { useEffect, useState } from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import TextField from "@mui/material/TextField";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import Navbar from "../../Navbar";
import { Autocomplete } from "@mui/material";
import axiosClient from "../../axios-client";

export default function Docone() {
  const [isNewPrescriptionClicked, setIsNewPrescriptionClicked] =
    React.useState(false);
  const [isCardCreated, setIsCardCreated] = React.useState(false);
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [isPrescriptionCodeOpen, setIsPrescriptionCodeOpen] =
    React.useState(false);
  const [fullName, setFullName] = React.useState("");
  const [age, setAge] = React.useState("");
  const [date, setDate] = React.useState("");
  const [brandName, setBrandName] = React.useState("");
  const [genericName, setGenericName] = React.useState("");
  const [dosage, setDosage] = React.useState("");
  const [quantity, setQuantity] = React.useState("");
  const [useInstructions, setUseInstructions] = React.useState("");
  const [specialInstructions, setSpecialInstructions] = React.useState("");
  const [medicineId, setMedicineId] = React.useState("");
  const [medicineList, setMedicineList] = React.useState([]); // State to hold medicine list
  const [prescriptionCode, setPrescriptionCode] = React.useState("");
  const [formError, setFormError] = React.useState(false); // State to track form errors
  const [prescriptionNumbers, setPrescriptionNumbers] = useState([]); // Sample array of prescription numbers

  const handleNewPrescriptionClick = () => {
    setIsNewPrescriptionClicked(true);
  };

  const handleNextButtonClick = () => {
    if (!fullName || !age || !date) {
      setFormError(true); // Set form error if any field is empty
      return; // Exit function early if form has errors
    }
    setIsCardCreated(true);
  };

  const handleContinueButtonClick = () => {
    const payload = {
      user_name: fullName,
      age: age,
      date: date,
      medicines: medicineList,
      code: generateRandomCode(),
      user_id: selectedPatient.id._id,
    };
    console.log(payload);
    axiosClient
      .post("/prescription", payload)
      .then(() => {
        setIsPrescriptionCodeOpen(true);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleCancelClick = () => {
    setIsNewPrescriptionClicked(false); // Reset form visibility
    setFullName("");
    setAge("");
    setDate("");
    setMedicineList([]);
    setSelectedPatient(null);
    setPrescriptionCode("");
    setIsCardCreated(false);
    setFormError(false); // Reset form error state
  };

  const handleCardClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleSaveMedicineDetails = () => {
    if (
      !brandName ||
      !genericName ||
      !dosage ||
      !quantity ||
      !useInstructions ||
      !medicineId
    ) {
      setFormError(true); // Set form error if any required field is empty
      return; // Exit function early if form has errors
    }

    const newMedicine = {
      name: brandName,
      genericName,
      dosage,
      quantity,
      useInstructions,
      specialInstructions,
      medicineId,
    };
    setMedicineList([...medicineList, newMedicine]); // Add new medicine to the medicine list
    setBrandName("");
    setGenericName("");
    setDosage("");
    setQuantity("");
    setUseInstructions("");
    setSpecialInstructions("");
    setSelectedValue(null);
    setIsModalOpen(false); // Close the modal after saving details
  };
  const generateRandomCode = () => {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let result = "";
    const charactersLength = characters.length;
    for (let i = 0; i < 6; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    setPrescriptionCode(result);
    return result;
  };

  const handleClosePrescriptionCode = () => {
    setIsPrescriptionCodeOpen(false);
  };

  const handleSendPrescriptionCode = () => {
    alert("Code sent successfully"); // Display message indicating code was sent successfully
    setIsPrescriptionCodeOpen(false); // Close Prescription Code dialog
  };

  const [medicineOptions, setMedicineOptions] = useState([]);
  const [patientOptions, setPatientOptions] = useState([]);

  useEffect(() => {
    axiosClient.get("/products").then(({ data }) => {
      const array = [];
      data.data.map((medicine) => {
        const obj = {
          label: `${medicine.brand.brand_name} ${medicine.drug.drug_name} ${medicine.dosage}`,
          id: medicine,
        };
        array.push(obj);
      });
      setMedicineOptions(array);
    });

    axiosClient.get("/users").then(({ data }) => {
      const array = [];
      data.data.map((user) => {
        if (user.roles[0].role === "patient") {
          const obj = {
            label: `${user.first_name} ${user.last_name}`,
            id: user,
          };
          array.push(obj);
        }
      });
      setPatientOptions(array);
    });

    axiosClient
      .get("/prescription")
      .then(({ data }) => {
        setPrescriptionNumbers(data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [isPrescriptionCodeOpen]);

  const [selectedValue, setSelectedValue] = useState(null);
  const [selectedPatient, setSelectedPatient] = useState(null);

  const handleChange = (event, value) => {
    setSelectedValue(value);
    if (value) {
      const medicine = medicineOptions.find((m) => m.id._id === value.id._id);
      setBrandName(medicine.id.brand.brand_name);
      setGenericName(medicine.id.drug.drug_name);
      setDosage(medicine.id.dosage);
      setSpecialInstructions(medicine.id.special_instruction);
      setMedicineId(value.id._id);
    } else {
      setBrandName("");
      setGenericName("");
      setDosage("");
      setSpecialInstructions("");
      setMedicineId("");
    }
  };

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
      setIsNewPrescriptionClicked(false); // Reset form visibility
      setFullName("");
      setAge("");
      setDate("");
      setMedicineList([]);
      setSelectedPatient(null);
      setPrescriptionCode("");
      setIsCardCreated(false);
      setFormError(false); // Reset form error state
    }
  }, [isPrescriptionCodeOpen]);

  return (
    <div className="main">
      <Navbar currentPage={"docin"} /> {/* Render the Navbar component */}
      <div className={`red ${isNewPrescriptionClicked ? "blue" : ""}`}>
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
            marginTop: "5px",
          }}
          onClick={handleNewPrescriptionClick}
        >
          <AddCircleIcon style={{ marginRight: "5px", marginBottom: "-5px" }} />
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
      {!isCardCreated && isNewPrescriptionClicked && (
        <div className="">
          <form style={{ margin: "30px" }}>
            <h2 className="head" style={{ marginBottom: "20px" }}>
              Patient Information
            </h2>
            {formError && (
              <p className="error-message">Please fill in all fields</p>
            )}
            {/* Display error message if form has errors */}
            <div className="form-field" style={{ marginBottom: "20px" }}>
              <Autocomplete
                disablePortal
                id="combo-box-demo"
                options={patientOptions}
                sx={{ width: "full" }}
                style={{ marginBottom: "10px" }}
                value={selectedPatient}
                onChange={(event, value) => {
                  if (value) {
                    setFullName(`${value.id.first_name} ${value.id.last_name}`);
                    setSelectedPatient(value);
                  } else {
                    setSelectedPatient(null);
                    setFullName("");
                  }
                }}
                renderInput={(params) => (
                  <TextField {...params} label="Patient" />
                )}
              />
            </div>
            <div className="form-field" style={{ marginBottom: "20px" }}>
              <TextField
                id="fullName"
                label="Full Name:"
                variant="standard"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />
            </div>
            <div className="form-field" style={{ marginBottom: "20px" }}>
              <TextField
                id="age"
                label="Age:"
                variant="standard"
                value={age}
                onChange={(e) => setAge(e.target.value)}
              />
            </div>
            <div className="form-field" style={{ marginBottom: "20px" }}>
              <TextField
                id="date"
                label="Date:"
                variant="standard"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </div>
            <div
              style={{ display: "flex", justifyContent: "end", gap: "20px" }}
            >
              <div className="">
                <button
                  style={{ margin: "0" }}
                  type="button"
                  onClick={handleNextButtonClick}
                >
                  Next
                </button>
              </div>
              <div className="">
                <button
                  style={{ margin: "0" }}
                  type="button"
                  onClick={handleCancelClick}
                >
                  Cancel
                </button>
              </div>
            </div>
          </form>
        </div>
      )}
      {isCardCreated && (
        <div style={{ margin: "20px", width: "100%" }}>
          <h2 style={{ marginBottom: "10px" }}>Medicine Information</h2>
          {medicineList.map((medicine, index) => (
            <Card
              key={index}
              style={{ width: "100%" }}
              className="medicine-card"
            >
              <CardContent>
                <h4>{medicine.name}</h4>
                <div
                  className="card-content"
                  style={{ padding: "10px", borderRadius: "10px" }}
                >
                  <span>
                    {medicine.genericName}, {medicine.dosage}, Qty
                    {medicine.quantity}
                  </span>
                </div>
              </CardContent>
            </Card>
          ))}
          <Card className="medicine-card" style={{ marginBottom: "10px" }}>
            <CardContent onClick={handleCardClick}>
              <h4>Add New Medicine</h4>
              <div className="card-content">
                <AddCircleIcon className="add-icon" />
              </div>
            </CardContent>
          </Card>
          <div style={{ display: "flex", justifyContent: "end", gap: "20px" }}>
            <div className="">
              <button
                style={{ margin: "0" }}
                type="button"
                onClick={handleContinueButtonClick}
              >
                Save
              </button>
            </div>
            <div className="">
              <button
                style={{ margin: "0" }}
                type="button"
                onClick={handleCancelClick}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
      <Dialog open={isModalOpen} onClose={handleCloseModal}>
        <DialogTitle>Medical Details</DialogTitle>
        <DialogContent>
          <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={medicineOptions}
            sx={{ width: "full" }}
            style={{ marginBottom: "10px" }}
            value={selectedValue}
            onChange={handleChange}
            renderInput={(params) => <TextField {...params} label="Medicine" />}
          />
          <TextField
            fullWidth
            label="Brand Name"
            variant="standard"
            value={brandName}
            onChange={(e) => setBrandName(e.target.value)}
          />
          <TextField
            fullWidth
            label="Generic Name"
            variant="standard"
            value={genericName}
            onChange={(e) => setGenericName(e.target.value)}
          />
          <TextField
            fullWidth
            label="Dosage"
            variant="standard"
            value={dosage}
            onChange={(e) => setDosage(e.target.value)}
          />
          <TextField
            fullWidth
            label="Quantity"
            variant="standard"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
          />
          <TextField
            fullWidth
            label="Use Instructions"
            variant="standard"
            value={useInstructions}
            onChange={(e) => setUseInstructions(e.target.value)}
          />
          <TextField
            fullWidth
            label="Special Instructions"
            variant="standard"
            value={specialInstructions}
            onChange={(e) => setSpecialInstructions(e.target.value)}
          />
          {formError && (
            <p className="error-message">Please fill in all required fields</p>
          )}
          {/* Display error message if any required field is empty */}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModal}>Close</Button>
          <Button onClick={handleSaveMedicineDetails}>Save</Button>
        </DialogActions>
      </Dialog>
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
