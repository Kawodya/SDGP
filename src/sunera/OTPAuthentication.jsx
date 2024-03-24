import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./OTPAuthentication.css";
import axiosClient from "../axios-client";

const OTPAuthentication = () => {
  const navigate = useNavigate();
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);

  const handleInputChange = (index, value) => {
    if (!isNaN(value) && value.length <= 1) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      // Move to the next input box
      if (index < 5 && value !== "") {
        document.getElementById(`otp-input-${index + 1}`).focus();
      }
    }
  };

  const handleBackspace = (index) => {
    if (index > 0) {
      const newOtp = [...otp];
      newOtp[index - 1] = "";
      setOtp(newOtp);
      document.getElementById(`otp-input-${index - 1}`).focus();
    }
  };

  const handleKeyPress = (e, index) => {
    if (e.key === "Backspace") {
      handleBackspace(index);
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text/plain").trim().slice(0, 6);
    const newOtp = Array.from({ length: 6 }, (_, i) =>
      pastedData[i] ? pastedData[i] : ""
    );
    setOtp(newOtp);
  };

  const handleNextButton = () => {
    // Validation logic
    if (otp.some((digit) => digit === "")) {
      alert("Please enter the complete OTP before proceeding.");
    } else {
      const otpText = otp.join("");

      axiosClient
        .post("/users/user-verifired", { otp: otpText })
        .then(() => {
          navigate("/login");
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <div>
      <div>
        {otp.map((digit, index) => (
          <input
            key={index}
            id={`otp-input-${index}`}
            type="text"
            className="TheboxesOTPAuthentication"
            value={digit}
            onChange={(e) => handleInputChange(index, e.target.value)}
            onKeyPress={(e) => handleKeyPress(e, index)}
            onPaste={handlePaste}
            maxLength="1"
            style={{
              width: "30px",
              height: "30px",
              textAlign: "center",
              fontSize: "16px",
              margin: "10px",
            }}
          />
        ))}
      </div>
      <div className="">
        <Link to="/v"> Didn't get a code </Link>{" "}
      </div>

      <br />

      <button className="" style={{ margin: "0" }} onClick={handleNextButton}>
        Next
      </button>
      {/* get code */}
    </div>
  );
};

export default OTPAuthentication;
