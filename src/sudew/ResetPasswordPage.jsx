import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './../CSS/ResetPasswordPage.css'

const ResetPasswordPage = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError('Passwords do not match');
    } else {
      setError('');
      // Add your logic to handle password reset

      // Redirect or navigate to the next page
      navigate('/');
    }
  };

  return (
    <div>
       <div> 
        <img className='logoResetPasswordPage' src="logomedlink.png" alt="main medlink logo" />
         
         </div>


      <h2 className='HeadtagResetpasswordPage'>Reset Password</h2>
      <form onSubmit={handleSubmit}>
        <div className='NewPasswordResetPage'>
          <label >New Password:</label>
          <input
            type={showPassword ? 'text' : 'password'}
            id='LabelNewpass'
            onChange={handlePasswordChange}
            required
          />
        </div>
        <div className='ConformPasswordResetPasswordPage'>
          <label>Confirm Password:</label>
          <input
            type={showPassword ? 'text' : 'password'}
            id='ConformPass'
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
            required
          />
        </div>
        <br />
        <div className='cheakboxResetPasswordPage'>
          <input
            type="checkbox"
            id="showPassword"
            checked={showPassword}
            onChange={handleTogglePasswordVisibility}
            
          />
          <label className='ShowPasswordResetPasswordPage' htmlFor="showPassword">Show Password</label>
        </div>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <br />
        <button className='ContinueResetPasswordPage' type="submit">Continue</button>
      </form>
    </div>
  );
};

export default ResetPasswordPage;
