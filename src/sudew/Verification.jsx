import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link} from 'react-router-dom';
import './Verification.css'
const Verification = () => {
  const [newPassword, setNewPassword] = useState('');
  const navigate = useNavigate();
 

  const handleContinue = () => {
    if (!newPassword.trim()) {
      alert('Please fill in the password field before continuing.');
    } else {
      // You can replace '/next-page' with the desired path
      navigate('/');
    }
  };

  return (
    <div className="verification-container">
    

      <h1 className='VerificationS'>Verification Successfully !!</h1>
      
      <form className='Verificationform'>
        <label htmlFor=" password">Enter your new password:</label>
        <br />
        <input
          type="password"
          id="password"
          placeholder="New Password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required
        />
        <br />
      </form>

      <button onClick={handleContinue}>signin</button>
    </div>
  );
};

export default Verification;
