import { Link } from "react-router-dom";
import Otpimg from "./otp.jpeg";
import { useNavigate } from "react-router-dom";
import "../sunera/Photp.css";
import OTPAuthentication from "./OTPAuthentication";

const Photp = () => {
  const handleNext = () => {};

  return (
    <>
      <div>
        <img
          style={{ position: "absolute", top: "20px", left: "50px" }}
          className="Medlinklog"
          src="logomedlink.png"
          alt="main medlink logo"
        />
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <img style={{ flex: "1" }} src={Otpimg} alt="newdoc" />
          <div
            style={{ display: "flex", flexDirection: "column", flex: "1.1" }}
          >
            <h2 className="">
              Verify your email address to create <br /> your new account
            </h2>
            <p className="">
              An email with a verification code has been sent to <br />
              <b>your email</b> <br /> Enter the code here.
            </p>
            <OTPAuthentication />
          </div>
        </div>
      </div>
    </>
  );
};

export default Photp;
