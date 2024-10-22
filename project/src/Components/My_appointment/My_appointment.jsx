import '../Activities/Activities.css';
import '../Dashboard/DashBoard.css';
import './My_appointment.css';
import React, { useEffect, useState } from 'react';
import logo from '../Images/logonoback.png';
import Lilogo from '../Images/Left_icon.png';
import { Link, useNavigate } from 'react-router-dom';
import Searchbar from '../Activities/Searchbar';
import axios from 'axios';

function My_appointment() {
  const [appointments, setAppointments] = useState([]);
  const [doctorId, setDoctorId] = useState(null);
  const navigate = useNavigate();
  const [filteredAppointments, setFilteredAppointments] = useState([]);

  // Fetch logged-in user data from local storage
  const storedUserData = JSON.parse(localStorage.getItem('user'));
  const userEmail = storedUserData && storedUserData.email ? storedUserData.email : null;

  useEffect(() => {
    // Add class to body when component mounts
    document.body.classList.add('activities-background');
    

    // Remove class from body when component unmounts
    return () => {
      document.body.classList.remove('activities-background');
      
    };
  }, []);

  useEffect(() => {
    // Check the user's status from localStorage
    const user = JSON.parse(localStorage.getItem('user'));
    
    if (user && user.status === 'Employee') {
      // If the user is a doctor, deny access by redirecting to another page
      alert('Access denied. Employees are not allowed to access this page.');
      navigate('/dashboard'); // Redirect to the dashboard or any other appropriate page
    }
  }, [navigate]);

  // Fetch doctor data based on email and set doctorId
  useEffect(() => {
    if (userEmail) {
      // Make an API request to get the doctor by email
      axios.get(`${process.env.REACT_APP_API_URL}/api/doctors/email/${userEmail}`)
        .then(response => {
          if (response.data && response.data._id) {
            setDoctorId(response.data._id);  // Set doctorId from the doctor database
          } else {
            alert('Doctor not found!');
            navigate('/dashboard');  // Redirect to login if doctor not found
          }
        })
        .catch(error => {
          console.error('Error fetching doctor data:', error);
          navigate('/dashboard');  // Redirect to login on error
        });
    } else {
      alert("User email not found in local storage.");
      navigate('/dashboard');
    }
  }, [userEmail, navigate]);

  // Fetch appointments based on doctorId
  useEffect(() => {
    if (doctorId) {
      axios.get(`${process.env.REACT_APP_API_URL}/api/appointments/doctor/${doctorId}`)
        .then(response => {
          setAppointments(response.data); // Set the appointments for the logged-in doctor
        })
        .catch(error => console.error('Error fetching appointments:', error));
    }
  }, [doctorId]);

  const handleSearch = (searchTerm) => {
    if (searchTerm.trim() === '') {
      setFilteredAppointments(appointments); // Reset to full list if search is cleared
    } else {
      const filtered = appointments.filter(appointment =>
        appointment.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        appointment.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        appointment.department.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredAppointments(filtered);
    }
  };
  
  useEffect(() => {
    setFilteredAppointments(appointments); // Initialize with full appointment list
  }, [appointments]);
  

  return (
    <div className='maindash'>
      <div className='logo_dash'>
        <img src={logo} alt="Logonoback" className="logo1" />
      </div>
      <div className='acsidebar'>
        <div className='dashboardlogoname'>
          <p className='Optimize-text3'><Link to="/dashboard" className='custom_link'>Siva Health Hub</Link></p>
        </div>
        <div className='back'>
          <div className='activitiesmenu'>
            <img src={Lilogo} alt="dashboard-logo" className="aclogo1" />
            <div className='activities_menu_container'>
              <p className='activities-text'><Link to="/dashboard" className='custom_link'>Back to menu</Link></p>
            </div>
          </div>
        </div>
      </div>
      <div className='Whitecontainer'>
        <div className='MA_text_rectangle'>
          <div className='MA_text'>
            My appointments
          </div>
        </div>
        <Searchbar placeholder="Search patients..." handleSearch={handleSearch} />

        {/* Display the appointments */}
        <div className='Table_container'>
          <table>
            <thead>
              <tr>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Appointment Date</th>
                <th>Time Slot</th>
                <th>Department</th>
                <th>Contact Number</th>
              </tr>
            </thead>
            <tbody>
              {filteredAppointments.map(appointment => (
                <tr key={appointment._id}>
                  <td>{appointment.firstName}</td>
                  <td>{appointment.lastName}</td>
                  <td>{appointment.appointmentDate}</td>
                  <td>{appointment.timeSlot}</td>
                  <td>{appointment.department}</td>
                  <td>{appointment.contactNumber}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default My_appointment;
