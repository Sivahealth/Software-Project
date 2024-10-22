import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../Add_appointment/Add_appointment.css';
import '../Logmenu/WhiteRec.css';
import './Add_doctor.css';
import '../Sign_up/SignUpForm.css';
import logo from '../Images/logo.png';
import axios from 'axios';

function Add_doctor() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    department: '',
    availableDate: '',
    availableTime: '',
    city: '',
    consultantFee: '',
    description: '',
    experience: '',
    rating: '',
    visingHours: '',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  useEffect(() => {
    // Check the user's status from localStorage
    const user = JSON.parse(localStorage.getItem('user'));
    
    if (user && user.status === 'Doctor') {
      // If the user is a doctor, deny access by redirecting to another page
      alert('Access denied. Doctors are not allowed to access this page.');
      navigate('/dashboard'); // Redirect to the dashboard or any other appropriate page
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/doctors`, formData);
      if (response.status === 201) {
        alert('Doctor added successfully!');
        navigate('/message'); // Navigate to doctors page or any other page
        // Optionally clear form data after successful submission
        setFormData({
          name: '',
          email: '',
          department: '',
          availableDate: '',
          availableTime: '',
          city: '',
          consultantFee: '',
          description: '',
          experience: '',
          rating: '',
          visingHours: '',
        });
      } else {
        alert('Failed to add doctor details.');
      }
    } catch (error) {
      console.error('Error adding doctor:', error);
      alert('Error adding doctor.');
    }
  };

  return (
    <div className='blue-rectangle1'>
      <div className='add_appointment_white-rectangle1'>
        <div className='Add_appointment_logo_Container'>
          <img src={logo} alt="Logo" className="appointment_logo" />
          <p className='Add_appointment_Optimize-text'>Siva Health Hub</p>
        </div>
        <div className='appointment_text_container'>
          <p className='appointment-title'>Please add Doctor Details here</p>
          <form onSubmit={handleSubmit}>
        <div className='getleft-group'>
            <div className="input-group5">
              <label htmlFor="name" className="label6">Doctor Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="input-group5">
              <label htmlFor="email" className="label6">Email</label>
              <input
                type="text"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="input-group5">
              <label htmlFor="department" className="label6">Department</label>
              <input
                type="text"
                id="department"
                name="department"
                value={formData.department}
                onChange={handleChange}
                required
              />
            </div>
            <div className="input-group5">
              <label htmlFor="availableDate" className="label6">Available Date</label>
              <input
                type="date"
                id="availableDate"
                name="availableDate"
                value={formData.availableDate}
                onChange={handleChange}
                required
              />
            </div>
            <div className="input-group5">
              <label htmlFor="availableTime" className="label6">Available Time</label>
              <input
                type="text"
                id="availableTime"
                name="availableTime"
                value={formData.availableTime}
                onChange={handleChange}
                required
              />
            </div>
            <div className="input-group5">
              <label htmlFor="city" className="label6">City</label>
              <input
                type="text"
                id="city"
                name="city"
                value={formData.city}
                onChange={handleChange}
              />
            </div>
            <div className="input-group5">
              <label htmlFor="consultantFee" className="label6">Consultant Fee</label>
              <input
                type="text"
                id="consultantFee"
                name="consultantFee"
                value={formData.consultantFee}
                onChange={handleChange}
              />
            </div>
            </div>
            <div className='getright-group'>
            <div className="input-group5">
              <label htmlFor="description" className="label6">Description</label>
              <input
                type="text"
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
              />
            </div>
            <div className="input-group5">
              <label htmlFor="experience" className="label6">Experience</label>
              <input
                type="text"
                id="experience"
                name="experience"
                value={formData.experience}
                onChange={handleChange}
              />
            </div>
            <div className="input-group5">
              <label htmlFor="rating" className="label6">Rating</label>
              <input
                type="text"
                id="rating"
                name="rating"
                value={formData.rating}
                onChange={handleChange}
              />
            </div>
            <div className="input-group5">
              <label htmlFor="visingHours" className="label6">Visiting Hours</label>
              <input
                type="text"
                id="visingHours"
                name="visingHours"
                value={formData.visingHours}
                onChange={handleChange}
              />
            </div>
            </div>
            <div className="adddoctor-white-rectangle2">
              <button type="submit">Submit</button>
              <div>
                <p className="backlink">
                  <a href="/message">To doctors page</a>
                </p>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Add_doctor;
