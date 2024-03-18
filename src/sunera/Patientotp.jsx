import React from 'react'
import OTPAuthentication from './OTPAuthentication'
import { useNavigate } from 'react-router-dom';
import './../CSS/Patientotp.css'
import { Link } from 'react-router-dom';
const Patientotp = () => {
  const navigate = useNavigate();

  const handleNext = () => {
    // Navigate to the next page based on your application's logic
    // Example navigation, customize the URLs accordingly
    navigate('/verip');
  }



  return (
    <>
    <div>
      <img className='LogoPatientotp' src="logomedlink.png" alt="main medlink logo" />
      <div> <Link to=' #' className='signinPatientotp'> sign up </Link></div>
      <p className='NewUserPatientotp'>New user? </p>
      
    <div>
    <h2 className='HeadPatientotp'>Verify your email address to create <br /> your new account </h2>
    <p className='paraPatientotp'>An email with a verification code has been sent to <br /> <b>abcd@gmail.com</b> <br /> Enter the code here.</p>
    </div>
    <img className='PatientimgPatientotp' src="potpimg.jpeg" alt="potpimg" />
    <OTPAuthentication handleNext={handleNext} />
    </div>
    
    </>
  )
}

export default Patientotp