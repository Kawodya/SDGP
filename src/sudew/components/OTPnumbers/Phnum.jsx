import React from 'react'
import OTPAuthentication from '../OTPAuthentication'
import phnum from '../OTPnumbers/phnumimg.jpeg'
const Phnum = () => {
  return (

    <>
    <img src= {phnum} alt="pharamacy num otp " />
    
    <div>
      <h3> verify phone number to finish setting up your new account </h3>
      <p> enter the verification code sent to <br></br> <b> +94******767</b> <br>
      </br></p>
      <label> Enter the code here</label>
    </div>
    <OTPAuthentication/>
    </>
  )
}

export default Phnum