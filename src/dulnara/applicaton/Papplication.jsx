import React, { useState } from "react";
import patient from "../applicaton/patient.png";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import "../applicaton/Papplication.css";
import { TextField } from "@mui/material";

const Papplication = () => {
  const [Firstname, setFirstname] = useState("");
  const [address, setAdress] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    // Validation logic can be added here
    if (!Firstname || !lastname || !address || !email || !password) {
      alert("Please fill in all fields before submitting.");
      return;
    }

    const payload = {
      first_name: Firstname,
      last_name: lastname,
      address: address,
      email: email,
      password: password,
      type: "patient",
    };

    axiosClient
      .post("/users", payload)
      .then((res) => {
        navigate("/patientotp");
      })
      .catch((err) => {
        console.log(err);
      });
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

      <img style={{ flex: "1" }} src={patient} alt="patient" />
      <div style={{ flex: "1.1" }}>
        <h2 style={{ marginBottom: "30px", fontSize: "60px" }}>
          Patient Application
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
            value={password}
            onChange={(e) => setPassword(e.target.value)}
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

export default Papplication;
