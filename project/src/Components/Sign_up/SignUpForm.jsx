import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './SignUpForm.css';
import axios from 'axios';

const SignUpForm = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    gender: '',
    dob: null,
    status:'',
    password: '',
    confirmPassword: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };
 
  const handleDateChange = (date) => {
    setFormData({
      ...formData,
      dob: date
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/register`, formData);
      alert(response.data.message);
      // Optionally reset form after successful submission
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        gender: '',
        dob: null,
        status:'',
        password: '',
        confirmPassword: ''
      });
    } catch (error) {
      alert(error.response.data.message);
    }
  };

  return (
    <div className='blue-rectangle1'>
      <div className='white-rectangle1'>
        <div className="root-container">
          <div className="signup-container">
            <p className='Optimize-text2'>Please log in using your employee credentials</p>
            <form onSubmit={handleSubmit}>
              <div className="input-group1">
                <label htmlFor="firstname" className="label1">First Name</label>
                <input type="text" id="firstname" name="firstName" value={formData.firstName} onChange={handleChange} required />
              </div>
              <div className="input-group1">
                <label htmlFor="lastname" className="label1">Last Name</label>
                <input type="text" id="lastname" name="lastName" value={formData.lastName} onChange={handleChange} required />
              </div>
              <div className="input-group1">
                <label htmlFor="email" className="label1">E-mail</label>
                <input type="text" id="email" name="email" value={formData.email} onChange={handleChange} required />
              </div>
              <div className="input-group1">
                <label htmlFor="gender" className="label1">Gender</label>
                <select id="gender" name="gender" value={formData.gender} onChange={handleChange} required>
                  <option value="" disabled>Select</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
              </div>
              <div className="input-group1">
                <label htmlFor="dob" className="label1">Date of Birth</label>
                <DatePicker
                  id="dob"
                  selected={formData.dob}
                  onChange={handleDateChange} // Corrected onChange handling
                  dateFormat="dd/MM/yyyy"
                  placeholderText="Select your date of birth"
                  className="datepicker"
                />
              </div>
              <div className="newgroup">
                <label htmlFor="status" className="labelnew">Status</label>
                <select id="status" name="status" className='selectnew' value={formData.status} onChange={handleChange} required>
                  <option value="" disabled>Select</option>
                  <option value="Doctor">Doctor</option>
                  <option value="Employee">Employee</option>
                  <option value="Patient">Patient</option>
                </select>
              </div>
              <div className="input-group1">
                <label htmlFor="password" className="label1">Create Password</label>
                <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} required />
              </div>
              <div className="input-group1">
                <label htmlFor="confirmPassword" className="label1">Confirm Password</label>
                <input type="password" id="confirmPassword" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} required />
              </div>
              <div className="white-rectangle2">
                <button type="submit">Create An Account</button>
                <div>
                  <p className="backlink"> <a href="/home">Back to Home</a></p>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpForm;