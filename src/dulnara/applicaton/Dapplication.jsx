import React, { useState } from "react";
import doctor from "../applicaton/doctor.jpeg";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import "../applicaton/Dapplication.css";
import axiosClient from "../../axios-client";
import { IconButton, InputAdornment, TextField } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const Dapplication = () => {
  const [Firstname, setFirstname] = useState("");
  const [address, setAdress] = useState("");
  const [lastname, setLastname] = useState("");
  const [doctorId, setDoctorID] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    // Validation logic
    if (!Firstname || !lastname || !address || !doctorId || !email) {
      alert("Please fill in all fields before submitting.");
      return;
    }

    const payload = {
      first_name: Firstname,
      last_name: lastname,
      address: address,
      uniqueId: doctorId,
      email: email,
      password: password,
      type: "doctor",
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
        <span>Already have an Account?</span>
        <Link to="/login" className="">
          sign in
        </Link>
      </div>

      <img style={{ flex: "1" }} src={doctor} alt="doctor" />
      <div style={{ flex: "1.1" }}>
        <h2 style={{ marginBottom: "30px", fontSize: "60px" }}>
          Doctor Application
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
            label="DoctorId / Registerd No"
            variant="outlined"
            fullWidth={true}
            style={{ marginBottom: "30px" }}
            value={doctorId}
            onChange={(e) => setDoctorID(e.target.value)}
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

export default Dapplication;
