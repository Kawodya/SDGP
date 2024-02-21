import React from 'react'
import OTPAuthentication from '../OTPAuthentication'
import dnumimg from '../OTPnumbers/dnumimg.jpeg'
import {Link , useNavigate } from 'react-router-dom'

const Docnum = () => {
  const Navigate  = useNavigate ();
  return (

    <>

  <img src= {dnumimg} alt="" />
    <div>
      <h3> verify phone number to finish setting up your new account </h3>
      <p> enter the verification code sent to <br></br> <b> +94******767</b> <br>
      </br></p>
      <label> Enter the code here</label>
    </div>
    <OTPAuthentication/>
    <button className= 'docnumbutton' onClick={()=> Navigate('/veridoc')}>Next</button>
    </>
  )
}

export default Docnum