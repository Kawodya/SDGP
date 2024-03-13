import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../applicaton/Resetpass.css';

const Resetpass = () => {
  const [number, setNumber] = useState('');
  const navigate = useNavigate();

  const handleContinue = () => {
    if (number.trim() === '') {
      // Show an alert if the input is empty
      alert('Please enter your email or phone number.');
    } else {
      // Navigate to another page with the entered number
      navigate(`/yee`);
    }
  };

  return (
    <div>
         <div className='ResetPass'> 
        <img className='LOgoRestPass' src="logomedlink.png" alt="main medlink logo" />
          <div> 
         <p className='NewUserResetPass'>New user? </p>
       <Link to=' #'className='SignInRestPass'> sign up </Link></div>
         </div>


      <h2 className='HeadRestPass'>Reset your Password</h2>
      <p className='paraRestPass'>Enter your email that you use with your account to continue.</p>

      <form>
        <input
          type="text"
          id="emailRestPass"
          placeholder="email or phone number"
          value={number}
          onChange={(e) => setNumber(e.target.value)}
        />
        <br />
        <Link to={`/yee`}></Link>
        <button className='RestPasswe' type="button" onClick={handleContinue}>
          continue
        </button>
      </form>
    </div>
  );
};

export default Resetpass;
