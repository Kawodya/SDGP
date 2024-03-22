import React from "react";
import { Link, useNavigate } from "react-router-dom";
import radioimg from "../applicaton/radioimg.jpeg";
import "../applicaton/NextP.css";

const NextP = () => {
  const Navigate = useNavigate();
  return (
    <>
      <div style={{ position: "absolute", top: "20px", left: "20px" }}>
        <img
          className="Medlinklogo"
          src="logomedlink.png"
          alt="main medlink logo"
        />
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "90vh",
          gap: "50px",
          margin: "20px",
        }}
      >
        <img style={{ flex: "1" }} className="" src={radioimg} alt="" />
        <div style={{ flex: "1" }}>
          <h2 style={{ fontSize: "100px", marginBottom: "20px" }} className="">
            Sign in as a ?
          </h2>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginBottom: "30px",
              justifyContent: "space-between",
              width: "400px",
            }}
          >
            <label style={{ fontSize: "40px" }} htmlFor="Doctor">
              Doctor
            </label>
            <button
              style={{ margin: "0" }}
              className=""
              onClick={() => Navigate("/dapplication")}
            >
              select
            </button>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginBottom: "30px",
              justifyContent: "space-between",
              width: "400px",
            }}
          >
            <label style={{ fontSize: "40px" }} htmlFor="Doctor">
              Patient
            </label>
            <button
              style={{ margin: "0" }}
              className=""
              onClick={() => Navigate("/papplication")}
            >
              select
            </button>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginBottom: "30px",
              justifyContent: "space-between",
              width: "400px",
            }}
          >
            <label style={{ fontSize: "40px" }} htmlFor="Doctor">
              Pharmacy
            </label>
            <button
              style={{ margin: "0" }}
              className=""
              onClick={() => Navigate("/phapplication")}
            >
              select
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default NextP;
