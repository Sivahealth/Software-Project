import React, { useState } from 'react';
import './WhiteRec.css';
import logo from '../Images/logo.png';
import loginImage from '../Images/login_image.png';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const WhiteRec = () => {

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/login`, formData);
      alert('Login successful');
      const loginTime = new Date().toLocaleString();
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      localStorage.setItem('loginTime', loginTime);
      navigate('/dashboard');
    } catch (error) {
      alert('Login failed: ' + error.response.data.error);
    }
  };

  return (
    <div className='body1'>
      <div className='blue-rectangle'>
        <img src={loginImage} alt="Login" className="login" />
        <div className='white-rectangle-updated'>
          <img src={logo} alt="Logo" className="logo"/>
          <div className='Container'>
            <p className='Optimize-text'>Siva Health Hub</p>
            <p className='Optimize-text1'>Please log in using your employee credentials</p>
          </div>
          <div className="login-container">
            <form onSubmit={handleSubmit}>
              <div className="input-group">
                <label htmlFor="email">Username:</label>
                <input type="text" id="email" name="email" value={formData.email} onChange={handleChange}required />
              </div>
              <div className="input-group">
                <label htmlFor="password">Password:</label>
                <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} required />
              </div>
              <button type="submit">Login</button>
            </form>
            <div>
              <p className="login-link"> <a href="/create">Don't have an account</a></p>
              <p className="forgot-link"><a href="/forgot-password">Forgot Password?</a></p> {/* Add this link */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhiteRec;
