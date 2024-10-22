import React, { useState } from 'react';
import '../Add_appointment/Add_appointment.css';
import '../Sign_up/SignUpForm.css';
import logo from '../Images/logo.png';
import './WhiteRec.css'
import '../Activities/Activities.css'

import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ResetPassword = () => {
  const [resetCode, setResetCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/reset-password`, {
        resetCode,
        newPassword,
      });
      alert('Password reset successfully.');
      navigate('/home');
    } catch (error) {
      setMessage('Error: ' + error.response.data.error);
    }
  };

  return (
    <div className='blue-rectangle1'>
      <div className='add_appointment_white-rectangle-resetpassword'>
        <div className='add_appointment_logo_Container-resetpasswordnew'>
          <img src={logo} alt="Logo" className="appointment_logo" />
          <p className='Add_appointment_Optimize-text'>Siva Health Hub</p>
          </div>
          <div className='MA_text_rectangle'>
       <div className='MA_text'>
                Reset Password
        </div> 
      </div>
    <div className="reset-password-container">
      
      <form onSubmit={handleSubmit}>
        <div className="input-group10">
          <label htmlFor="resetCode">Reset Code:</label>
          <input
            type="text"
            id="resetCode"
            name="resetCode"
            value={resetCode}
            onChange={(e) => setResetCode(e.target.value)}
            required
          />
        </div>
        <div className="input-group11">
          <label htmlFor="newPassword">New Password:</label>
          <input
            type="password"
            id="newPassword"
            name="newPassword"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
        </div>
        <div className='button-resetpassword'>
        <button type="submit">Reset Password</button>
        </div>
      </form>
      {message && <p>{message}</p>}
    </div>
    </div>
    </div>
    
  );
};

export default ResetPassword;
