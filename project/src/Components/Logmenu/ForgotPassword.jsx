import React, { useState, } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../Add_appointment/Add_appointment.css';
import '../Sign_up/SignUpForm.css';
import logo from '../Images/logo.png';
import './WhiteRec.css'
import '../Activities/Activities.css'

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        await axios.post(`${process.env.REACT_APP_API_URL}/api/forgot-password`, { email });
        alert('Reset code sent successfully. You will be redirected to reset your password.');
        // Navigate to the ResetPassword component after a short delay
        setTimeout(() => {
          navigate('/reset-password');
        }, 3000); // Redirect after 3 seconds
      } catch (error) {
        setMessage('Error: ' + error.response.data.error);
      }
  };

  return (
    <div className='blue-rectangle1'>
      <div className='add_appointment_white-rectangle-resetpassword'>
        <div className='add_appointment_logo_Container-resetpassword'>
          <img src={logo} alt="Logo" className="appointment_logo" />
          <p className='Add_appointment_Optimize-text'>Siva Health Hub</p>
          </div>
          <div className='MA_text_rectangle'>
       <div className='MA_text'>
              Forgot Password
        </div> 
      </div>
    <div className="forgot-password-container">
      <form onSubmit={handleSubmit}>
        <div className="input-group9">
          <label htmlFor="email">Enter your email:</label>
          <input
            type="text"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className='button-forgotpassword'>
        <button type="submit">Send Reset Code</button>
        </div>
      </form>
      {message && <p>{message}</p>}
    </div>
    </div>
    </div>
    

  );
};

export default ForgotPassword;