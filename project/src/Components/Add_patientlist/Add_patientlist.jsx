import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import DatePicker from 'react-datepicker'; // Import the DatePicker component
import 'react-datepicker/dist/react-datepicker.css'; // Import the CSS for the DatePicker
import '../Sign_up/SignUpForm.css';
import axios from 'axios';

const Add_patientlist = () => {
  const [formData, setFormData] = useState({
    no: '', // This will be auto-updated
    name: '',
    assignedDoctor: '',
    dateOfAdmit: '',
    diseases: '',
    roomNo: '',
  });

  const [selectedDate, setSelectedDate] = useState(null); // State to manage the selected date
  const [doctors, setDoctors] = useState([]); // State to hold the list of doctors
  const navigate = useNavigate();

  // Function to fetch the latest patient number from the database
  const fetchLatestPatientNo = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/patients/latest`); // Endpoint to get latest patient
      if (response.data) {
        const latestPatientNo = response.data.no; // Get the latest patient number
        setFormData((prevData) => ({
          ...prevData,
          no: latestPatientNo + 1, // Increment by 1 for the new patient
        }));
      }
    } catch (error) {
      console.error('Error fetching latest patient number:', error);
    }
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
  
  useEffect(() => {
    // Fetch latest patient number when the component mounts
    fetchLatestPatientNo();

    // Fetch doctor names from the database
    const fetchDoctors = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/print/doctors`); // Adjust the endpoint accordingly
        if (response.data) {
          setDoctors(response.data); // Store the fetched doctor data in the state
        }
      } catch (error) {
        console.error('Error fetching doctor data:', error);
      }
    };
    fetchDoctors();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
    setFormData({
      ...formData,
      dateOfAdmit: date ? date.toISOString().split('T')[0] : '' // Format date to "YYYY-MM-DD"
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const patientData = {
      no: formData.no, // Auto-updated patient number
      name: formData.name,
      assignedDoctor: formData.assignedDoctor,
      dateOfAdmit: formData.dateOfAdmit,
      diseases: formData.diseases,
      roomNo: formData.roomNo,
    };

    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/patients`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(patientData),
      });

      if (response.ok) {
        console.log('Patient details added successfully!');
        alert('Patient details added successfully!');
        navigate('/patientlist');
        // Clear form data
        setFormData({
          no: '',
          name: '',
          assignedDoctor: '',
          dateOfAdmit: '',
          diseases: '',
          roomNo: '',
        });
        setSelectedDate(null); // Reset date picker
      } else {
        console.error('Failed to add patient details');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className='blue-rectangle1'>
      <div className='white-rectangle1'>
        <div className="root-container">
          <div className="signup-container">
            <p className='Optimize-text2'>Please add patient details</p>
            <form onSubmit={handleSubmit}>
              <div className="input-group5">
                <label htmlFor="no" className="label6">Patient No</label>
                <input type="text" id="no" name="no" value={formData.no} onChange={handleChange} readOnly required />
              </div>
              <div className="input-group5">
                <label htmlFor="name" className="label6">Patient Name</label>
                <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required />
              </div>
              <div className="input-group5">
                <label htmlFor="assignedDoctor" className="label6">Assigned Doctor</label>
                <select id="assignedDoctor" name="assignedDoctor" value={formData.assignedDoctor} onChange={handleChange} required>
                  <option value="">Select a doctor</option>
                  {doctors.map((doctor) => (
                    <option key={doctor._id} value={doctor.name}>
                      {doctor.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="input-group5">
                <label htmlFor="dateOfAdmit" className="label6">Date of Admit</label>
                <DatePicker
                  selected={selectedDate}
                  onChange={handleDateChange}
                  dateFormat="yyyy-MM-dd" // Display format
                  placeholderText="Select a date"
                  className="form-control"
                  required
                />
              </div>
              <div className="input-group5">
                <label htmlFor="diseases" className="label6">Diseases</label>
                <input type="text" id="diseases" name="diseases" value={formData.diseases} onChange={handleChange} required />
              </div>
              <div className="input-group5">
                <label htmlFor="roomNo" className="label6">Room No</label>
                <input type="text" id="roomNo" name="roomNo" value={formData.roomNo} onChange={handleChange} required />
              </div>
              <div className="white-rectangle2">
                <button type="submit">Submit</button>
                <div>
                  <p className="backlink"> <a href="/patientlist">To patient list page</a></p>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Add_patientlist;
