import React from 'react';
import OTPAuthentication from './OTPAuthentication';
import newdoc from './image/newsdoc.jpg';
import { useNavigate } from 'react-router-dom';

const Doctorotp = () => {
  const navigate = useNavigate();

  const handleNext = () => {
    // Navigate to the next page based on your application's logic
    // Example navigation, customize the URLs accordingly
    navigate('/veridoc');
  };

  return (
    <>
      <img src={newdoc} alt="newdoc" />
      <div>
        <h2>
          Verify your email address to create <br /> your new account
        </h2>
        <p>
          An email with a verification code has been sent to <br />{' '}
          <b>abcd@gmail.com</b> <br /> Enter the code here.
        </p>
      </div>
      <OTPAuthentication handleNext={handleNext} />
    </>
  );
};

export default Doctorotp;
