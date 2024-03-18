import React from 'react';
import OTPAuthentication from './OTPAuthentication';
import newdoc from './image/newsdoc.jpg';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import '../sunera/Doctorotp.css'

const Doctorotp = () => {
  const navigate = useNavigate();

  const handleNext = () => {
    // Navigate to the next page based on your application's logic
    // Example navigation, customize the URLs accordingly
    navigate('/veridoc');
  };

  return (
    <>
    <div>

      <img className='Pharmacyotpwall' src={newdoc} alt="newdoc" />
      <p className='Newuserdocotp'>New user? </p>
      <div>
      <img className='DotpMedlinklogo' src="logomedlink.png" alt="main medlink logo" />
      <div>    <Link to=' #' className='signinDoctorotp'> sign up </Link></div>
        <h2 className='HeadDoctorotp'>
          Verify your email address to create <br /> your new account
        </h2>
        <p className='Paradocotp'>
          An email with a verification code has been sent to <br />{' '}
          <b>abcd@gmail.com</b> <br /> Enter the code here.
        </p>
      </div>
      <OTPAuthentication handleNext={handleNext} />
      </div>
    </>
  );
};

export default Doctorotp;
