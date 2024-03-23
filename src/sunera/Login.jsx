import React, { useEffect, useState } from "react";
import logo from "./logo.jpeg";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";
import { IconButton, InputAdornment, TextField } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import axiosClient from "../axios-client";
const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (user) {
      if (user.role === "pharmacist") {
        navigate("/dashboard");
      } else if (user.role === "doctor") {
        navigate("/");
      } else {
        navigate("/search");
      }
    }
  }, []);

  const handleLogin = () => {
    if (username.trim() === "" || password.trim() === "") {
      // Show an alert if either username or password is empty
      alert("Please enter both username and password.");
    } else {
      const payload = {
        email: username,
        password: password,
      };
      axiosClient
        .post("/users/login", payload)
        .then(({ data }) => {
          localStorage.setItem("token", data.token);
          localStorage.setItem("user", JSON.stringify(data.user));
          window.location.reload();
        })
        .catch((err) => {
          console.log(err);
        });
      // Navigate to another page
      // navigate("/n");
    }
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div
      className=""
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        gap: "20px",
      }}
    >
      <img
        style={{ flex: "1" }}
        src={logo}
        alt="Login Image"
        className="login-image"
      />
      <div style={{ position: "absolute", top: "20px", right: "50px" }}>
        <span>New user? </span>
        <Link to="/n" className="">
          sign up
        </Link>
      </div>
      <div style={{ display: "flex", flexDirection: "column", flex: "1.1" }}>
        <h1 style={{ fontSize: "60px" }} className="">
          Welcome Medlink
        </h1>
        <h2 className="" style={{ marginBottom: "30px" }}>
          Login to continue
        </h2>
        <form style={{ margin: "0" }} className="">
          <TextField
            label="Username"
            variant="outlined"
            fullWidth={true}
            value={username}
            style={{ marginBottom: "30px" }}
            onChange={(e) => setUsername(e.target.value)}
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
          <button
            style={{
              display: "inline-block",
              margin: "0",
              marginRight: "30px",
            }}
            className=""
            type="button"
            onClick={handleLogin}
          >
            Login
          </button>
          <Link style={{ display: "inline-block" }} to="/r">
            Forget Password
          </Link>
        </form>
      </div>
    </div>
  );
};

export default Login;
