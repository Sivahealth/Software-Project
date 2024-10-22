import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './Add_appointment.css';
import '../Activities/Activities.css';
import '../Logmenu/WhiteRec.css';
import logo from '../Images/logo.png';

function Add_appointment() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    dateOfBirth: { date: '', month: '', year: '' },
    gender: '',
    age: '',
    email: '',
    address: { road: '', city: '', province: '' },
    contactNumber: '',
    selectedDepartment: '',
    selectedDoctor: null,
    selectedDate: '',
    selectedSlot: ''
  });

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    // Load form data from local storage
    const savedData = localStorage.getItem('appointmentFormData');
    if (savedData) {
      setFormData(JSON.parse(savedData));
    }

    if (location.state) {
      const { selectedDoctor, selectedSlot, selectedDate } = location.state;
      setFormData((prev) => ({
        ...prev,
        selectedDoctor,
        selectedSlot,
        selectedDate
      }));
    }
  }, [location.state]);

  useEffect(() => {
    // Save form data to local storage whenever it changes
    localStorage.setItem('appointmentFormData', JSON.stringify(formData));
  }, [formData]);

  const handleNavigation = (e) => {
    e.preventDefault();
    if (formData.selectedDepartment) {
      navigate(`/${formData.selectedDepartment}_doctor`);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const appointmentData = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      dateOfBirth: formData.dateOfBirth,
      gender: formData.gender,
      age: formData.age,
      email: formData.email,
      address: formData.address,
      department: formData.selectedDepartment,
      contactNumber: formData.contactNumber,
      appointmentDate: formData.selectedDate,
      timeSlot: formData.selectedSlot,
      doctorId: formData.selectedDoctor?._id, 
    };

    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/appointments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(appointmentData),
      });

      if (response.ok) {
        // Handle successful booking
        console.log('Appointment booked successfully!');
        alert('Appointment added successfully!');
        navigate('/activities');
      
        // Clear local storage and form data after successful submission
        localStorage.removeItem('appointmentFormData');
        setFormData({
          firstName: '',
          lastName: '',
          dateOfBirth: { date: '', month: '', year: '' },
          gender: '',
          age: '',
          email: '',
          address: { road: '', city: '', province: '' },
          contactNumber: '',
          selectedDepartment: '',
          selectedDoctor: null,
          selectedDate: '',
          selectedSlot: ''
        });
      } else {
        // Handle error
        console.error('Failed to book appointment');
      }
    } catch (error) {
      // Handle error
      console.error('Error:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleDateOfBirthChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      dateOfBirth: {
        ...formData.dateOfBirth,
        [name]: value
      }
    });
  };

  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      address: {
        ...formData.address,
        [name]: value
      }
    });
  };

  return (
    <div className='blue-rectangle1'>
      <div className='add_appointment_white-rectangle1'>
        <div className='Add_appointment_logo_Container'>
          <img src={logo} alt="Logo" className="appointment_logo" />
          <p className='Add_appointment_Optimize-text'>Siva Health Hub</p>
        </div>
        <div className='appointment_text_container'>
          <p className='appointment-title'>Your appointment schedule</p>
          <form onSubmit={handleSubmit}>
            <div className="input-group2">
              <label htmlFor="text" className="label2">Patient's Name</label>
              <input
                type="text1"
                id="firstName"
                name="firstName"
                placeholder='First Name'
                value={formData.firstName}
                onChange={handleChange}
                required
              />
            </div>
            <div className="input-group3">
              <input
                type="text2"
                id="lastName"
                name="lastName"
                placeholder='Last Name'
                value={formData.lastName}
                onChange={handleChange}
                required
              />
            </div>
            <div className="dob-group">
              <label htmlFor="dobDate" className="label2">Date of Birth</label>
              <input
                type="text1"
                id="dobDate"
                name="date"
                placeholder='Date'
                value={formData.dateOfBirth.date}
                onChange={handleDateOfBirthChange}
                required
              />
            </div>
            <div className="dob-group1">
              <input
                type="text2"
                id="dobMonth"
                name="month"
                placeholder='Month'
                value={formData.dateOfBirth.month}
                onChange={handleDateOfBirthChange}
                required
              />
            </div>
            <div className="dob-group2">
              <input
                type="text2"
                id="dobYear"
                name="year"
                placeholder='Year'
                value={formData.dateOfBirth.year}
                onChange={handleDateOfBirthChange}
                required
              />
            </div>
            <div className="gender-group">
              <label htmlFor="gender" className="label2">Gender</label>
              <select
                className="select1"
                id="gender"
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                required
              >
                <option value="" disabled>Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>
            <div className="age-group">
              <label htmlFor="age" className="label2">Age</label>
              <input
                type="text1"
                id="age"
                name="age"
                value={formData.age}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mail-group">
              <label htmlFor="email" className="label3">E-mail</label>
              <input
                type="text1"
                id="email"
                name="email"
                placeholder='myname@example.com'
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="address-group">
              <label htmlFor="road" className="label3">Address</label>
              <input
                type="text1"
                id="road"
                name="road"
                value={formData.address.road}
                onChange={handleAddressChange}
                required
              />
            </div>
            <div className="city-group">
              <input
                type="text2"
                id="city"
                name="city"
                placeholder='City'
                value={formData.address.city}
                onChange={handleAddressChange}
                required
              />
            </div>
            <div className="province-group">
              <input
                type="text2"
                id="province"
                name="province"
                placeholder='Province'
                value={formData.address.province}
                onChange={handleAddressChange}
                required
              />
            </div>
            <div className='select-department'>
              <select
                id="Department"
                name="selectedDepartment"
                value={formData.selectedDepartment}
                onChange={handleChange}
                required
              >
                <option value="" disabled>Select Department</option>
                <option value="OPD">OPD</option>
                <option value="Physiotherapy">Physiotherapy</option>
                <option value="Occupational_therapy">Occupational Therapy</option>
                <option value="Speech_therapy">Speech Therapy</option>
                <option value="Homevisits_councelling">Homevisits and Counselling</option>
                <option value="Elderly_care">Elderly Care</option>
                <option value="Homecare_nursing">Homecare Nursing</option>
                <option value="Post_surgical_care">Post Surgical Care</option>
                <option value="Laboratory_services">Laboratory Services</option>
              </select>
            </div>
            <div className='contact-group'>
              <input
                type="text2"
                id="contactNumber"
                name="contactNumber"
                placeholder='Contact Number'
                value={formData.contactNumber}
                onChange={handleChange}
                required
              />
            </div>
            <div className='label5'>
              Appointment date and time, <a href="#" onClick={(e) => handleNavigation(e)}>click here</a>.
            </div>
            <div className='button-container'>
              <button type="submit" className="submit-button">Book an Appointment</button>
              <p className="backlink">
                <a href="/activities">To doctors page</a>
              </p>
            </div>
          </form>
          <div className="label4">
            Which department would you like to get appointment from?
          </div>
        </div>
      </div>
    </div>
  );
}

export default Add_appointment;
