import React, { useState } from 'react';
import logo from "../images/logo.jpeg";
import { Link, useNavigate } from 'react-router-dom';
import '../CSS/Login.css'
const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleLogin = () => {
    if (username.trim() === '' || password.trim() === '') {
      // Show an alert if either username or password is empty
      alert('Please enter both username and password.');
    } else {
      // Navigate to another page
      navigate('/n');
    }
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="login-container">

      <h2 className='LoginTopic'>Welcome Medlink</h2>
      <p className='LoginPara'>Login to continue</p>
      <img src={logo} alt="Login Image" className="login-image" />
      <form className="login-form">
       
        <input
          type="text"
          id="Loginusername"
          placeholder="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <br></br>
        
        <div className="password-container">
          <input
            type={showPassword ? "text" : "password"}
            id="Loginpassword"
            placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <br />
          <button className='LoginShowpassword' type="button" onClick={toggleShowPassword}>
            {showPassword ? "Hide password" : "Show password"}
          </button>
        </div>
        <br/>

        <button className='Loginbtn' type="button" onClick={handleLogin}>Login</button>
      </form>

      <div className='LoginForgetpassword'> <Link to="/r"> Forget Password </Link></div>
      
    </div>
  );
};

export default Login;
