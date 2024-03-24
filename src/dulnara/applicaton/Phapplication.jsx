import React, { useState } from "react";
import pharmacy from "../applicaton/pharmacy.jpeg";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import "../applicaton/Phapplication.css";
import {
  Autocomplete,
  IconButton,
  InputAdornment,
  TextField,
} from "@mui/material";
import axiosClient from "../../axios-client";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import Swal from "sweetalert2";
const Phapplication = () => {
  const [Firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [address, setAdress] = useState("");
  const [pharmacyID, setPharmacyID] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [district, setDistrict] = useState(null);
  const [longitude, setLongitude] = useState("");
  const [latitude, setLatitude] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    // Validation logic can be added here
    if (
      !Firstname ||
      !lastname ||
      !address ||
      !pharmacyID ||
      !email ||
      !pharmacyID ||
      !district ||
      !longitude ||
      !latitude
    ) {
      Swal.fire({
        text: "Please fill in all fields before submitting.",
        icon: "error",
      });
    }
    const payload = {
      first_name: Firstname,
      last_name: lastname,
      address: address,
      uniqueId: pharmacyID,
      email: email,
      password: password,
      district: district,
      longitude: parseFloat(longitude),
      latitude: parseFloat(latitude),
      type: "pharmacist",
    };

    axiosClient
      .post("/users", payload)
      .then((res) => {
        navigate("/dotp");
      })
      .catch((err) => {
        console.log(err);
      });
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

  const handleChange = (event, value) => {
    setDistrict(value);
  };

  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        gap: "150px",
      }}
    >
      <img
        style={{ position: "absolute", top: "20px", left: "50px" }}
        className="Medlinklog"
        src="logomedlink.png"
        alt="main medlink logo"
      />
      <div style={{ position: "absolute", top: "20px", right: "50px" }}>
        <span>New user? </span>
        <Link to=" #" className="">
          sign up
        </Link>
      </div>

      <img style={{ flex: "1" }} src={pharmacy} alt="patient" />
      <div style={{ flex: "1.1" }}>
        <h2 style={{ marginBottom: "30px", fontSize: "60px" }}>
          Pharmacist Application
        </h2>
        <form style={{ margin: "0" }} action="/" className="">
          <TextField
            label="First name"
            variant="outlined"
            fullWidth={true}
            style={{ marginBottom: "30px" }}
            value={Firstname}
            onChange={(e) => setFirstname(e.target.value)}
          />
          <TextField
            label="Last name"
            variant="outlined"
            fullWidth={true}
            style={{ marginBottom: "30px" }}
            value={lastname}
            onChange={(e) => setLastname(e.target.value)}
          />
          <TextField
            label="Address"
            variant="outlined"
            fullWidth={true}
            style={{ marginBottom: "30px" }}
            value={address}
            onChange={(e) => setAdress(e.target.value)}
          />

          <TextField
            label="Pharmacist ID / Registerd No"
            variant="outlined"
            fullWidth={true}
            style={{ marginBottom: "30px" }}
            value={pharmacyID}
            onChange={(e) => setPharmacyID(e.target.value)}
          />
          <TextField
            label="Email"
            variant="outlined"
            fullWidth={true}
            style={{ marginBottom: "30px" }}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            label="Password"
            variant="outlined"
            fullWidth={true}
            style={{ marginBottom: "30px" }}
            type={showPassword ? `text` : `password`}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={toggleShowPassword}
                    edge="end"
                  >
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={districts}
            fullWidth={true}
            style={{ marginBottom: "30px" }}
            value={district}
            onChange={handleChange}
            renderInput={(params) => <TextField {...params} label="District" />}
          />
          <div style={{ display: "flex", gap: "30px" }}>
            <TextField
              label="Longitude"
              variant="outlined"
              style={{ marginBottom: "30px" }}
              value={longitude}
              onChange={(e) => setLongitude(e.target.value)}
            />
            <TextField
              label="Latitude"
              variant="outlined"
              style={{ marginBottom: "30px" }}
              value={latitude}
              onChange={(e) => setLatitude(e.target.value)}
            />
          </div>
          <div style={{ display: "flex", gap: "30px" }}>
            <button style={{ margin: "0" }} type="button" onClick={handleLogin}>
              Submit
            </button>
            <button
              style={{ margin: "0" }}
              onClick={() => navigate("/n")}
              title="back to previous page"
            >
              Back
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Phapplication;
