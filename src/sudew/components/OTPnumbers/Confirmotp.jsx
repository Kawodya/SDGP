import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Confirmotp = () => {
  const navigate = useNavigate();
  const [otp, setOtp] = useState(['', '', '', '', '', '']);

  const handleInputChange = (index, value) => {
    if (!isNaN(value) && value.length <= 1) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      // Move to the next input box
      if (index < 5 && value !== '') {
        document.getElementById(`otp-input-${index + 1}`).focus();
      }
    }
  };

  const handleBackspace = (index) => {
    if (index > 0) {
      const newOtp = [...otp];
      newOtp[index - 1] = '';
      setOtp(newOtp);
      document.getElementById(`otp-input-${index - 1}`).focus();
    }
  };

  const handleKeyPress = (e, index) => {
    if (e.key === 'Backspace') {
      handleBackspace(index);
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text/plain').trim().slice(0, 6);
    const newOtp = Array.from({ length: 6 }, (_, i) => (pastedData[i] ? pastedData[i] : ''));
    setOtp(newOtp);
  };

  const handleContinueButton = () => {
    // Validation logic
    if (otp.some((digit) => digit === '')) {
      alert('Please enter the complete OTP before proceeding.');
    } else {
      // Navigate to the desired page using navigate function
      navigate('/resetpage');
    }
  };

  const handleCancelButton = () => {
    // Navigate to the cancel page using navigate function
    navigate('/resetpage');
  };

  return (
    <div>
  <header>
      <img src="logomedlink.png" alt="main medlink logo" />
                    
     </header>
      
      <h2>Check Your Email</h2>
      <p>enter the number sent by email </p>
      <div>
        {otp.map((digit, index) => (
          <input
            key={index}
            id={`otp-input-${index}`}
            type="text"
            value={digit}
            onChange={(e) => handleInputChange(index, e.target.value)}
            onKeyPress={(e) => handleKeyPress(e, index)}
            onPaste={handlePaste}
            maxLength="1"
            style={{ width: '30px', height: '30px', textAlign: 'center', fontSize: '16px', margin: '10px'}}
          />
        ))}
      </div>
      <br />

      <button onClick={handleCancelButton}>Cancel</button>
      <button onClick={handleContinueButton}>Continue</button>
    </div>
  );
};

export default Confirmotp;
