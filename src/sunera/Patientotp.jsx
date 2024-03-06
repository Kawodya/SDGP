import React from 'react'
import OTPAuthentication from './OTPAuthentication'
import { useNavigate } from 'react-router-dom';

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
    <h2>Verify your email address to create <br /> your new account </h2>
    <p>An email with a verification code has been sent to <br /> <b>abcd@gmail.com</b> <br /> Enter the code here.</p>
    </div>
    <img src="potpimg.jpeg" alt="potpimg" />
    <OTPAuthentication handleNext={handleNext} />
    
    </>
  )
}

export default Patientotp