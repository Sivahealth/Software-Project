import '../Activities/Activities.css';
import './Message.css';
import '../Dashboard/DashBoard.css';
import React, { useEffect,useState } from 'react';
import logo from '../Images/logonoback.png';
import Lilogo from '../Images/Left_icon.png';
import { BrowserRouter as Router, Route, Routes, Link, useNavigate } from 'react-router-dom';
import Messagemenu from './Messagemenu';
import Addmessage from './Addmessage';
import Searchbar from '../Activities/Searchbar';
import '../Reports/Reports.css'
import axios from 'axios';


function Massage(){
  const [doctors, setDoctors] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [filteredDoctors, setFilteredDoctors] = useState(doctors);
  const navigate = useNavigate();
  const handleSearch = (searchTerm) => {
    if (searchTerm.trim() === '') {
      setFilteredDoctors(doctors); // If search is empty, reset to full list
    } else {
      const filtered = doctors.filter((doctor) =>
        doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        doctor.department.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredDoctors(filtered);
    }
  };
  
  useEffect(() => {
    setFilteredDoctors(doctors); // Initialize with full doctor list
  }, [doctors]);
        useEffect(() => {
        // Add class to body when component mounts
        document.body.classList.add('activities-background');
        
    
        // Remove class from body when component unmounts
        return () => {
          document.body.classList.remove('activities-background');
          
        };
      }, []);
      useEffect(() => {
        // Fetch appointments from the backend
        axios.get(`${process.env.REACT_APP_API_URL}/api/print/doctors`)
          .then(response => setDoctors(response.data))
          .catch(error => console.error('Error fetching appointments:', error));
      }, []);

      useEffect(() => {
        // Check the user's status from localStorage
        const user = JSON.parse(localStorage.getItem('user'));
        
        if (user && user.status === 'Doctor') {
          // If the user is a doctor, deny access by redirecting to another page
          alert('Access denied. Doctors are not allowed to access this page.');
          navigate('/dashboard'); // Redirect to the dashboard or any other appropriate page
        }
      }, [navigate]);

      const handleView = (doctor) => {
        setSelectedDoctor(doctor); 
        // Set the selected appointment for viewing
      };
      const handleDelete = async (doctorId) => {
        try {
          await axios.delete(`${process.env.REACT_APP_API_URL}/api/doctors/${doctorId}`);
          // Update the state after deletion
          setDoctors(doctors.filter(doctor => doctor._id !== doctorId));
          setFilteredDoctors(filteredDoctors.filter(doctor => doctor._id !== doctorId));
        } catch (error) {
          console.error('Error deleting doctor:', error);
        }
      };
      

  return (
    <div className='maindash'>
    <div className='logo_dash'>
      <img src={logo} alt="Logonoback" className="logo1"/>
      </div>
    <div className='acsidebar'>
    <div className='dashboardlogoname'>
    <p className='Optimize-text3'><Link to="/dashboard" className='custom_link'>Siva Health Hub</Link></p>
    </div>
    <Messagemenu/>

    <div className='back'>
    <div className='activitiesmenu'>
    <img src={Lilogo} alt="dashboard-logo" className="aclogo1"/>
    <div className='activities_menu_container'>
      <p className='activities-text'><Link to="/dashboard" className='custom_link'>Back to menu</Link></p>
    </div>
    </div>
    </div>




    </div>
    <div className='Whitecontainer'>
    <div className='MA_text_rectangle'>
       <div className='MA_text'>
              Doctors
        </div> 
      </div>
      <Searchbar placeholder="Search doctors..."  handleSearch={handleSearch}/>
      <Addmessage/>
      <div className='Table_container'>
      <table>
        <thead>
          <tr>
            <th>Doctor Name</th>
            <th>Department</th>
            <th>Available Date</th>
            <th>Description</th>
            <th>Rating</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredDoctors.map(doctor => (
            <tr key={doctor._id}>
              <td>{doctor.name}</td>
              <td>{doctor.department}</td>
              <td>{doctor.availableDate}</td>
              <td>{doctor.description}</td>
              <td>{doctor.rating}</td>
              <td>
              <div className="button-group">
                <button className="pay-now-btn" onClick={() => handleView(doctor)}>View</button>
                <button className="book-now-btn" onClick={() => handleDelete(doctor._id)}>Delete Now</button>
  
              </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>

      {selectedDoctor && (
          <div className="modal">
            <div className="modal-content">
              <h2>Doctor Details</h2>
              <p><strong>Available Time:</strong> {selectedDoctor.availableTime}</p>
              <p><strong>Booked Slots:</strong> {selectedDoctor.bookedSlots}</p>
              <p><strong>City:</strong> {selectedDoctor.city}</p>
              <p><strong>Consultant Fee:</strong> {selectedDoctor.consultantFee}</p>
              <p><strong>Experience:</strong> {selectedDoctor.experience}</p>
              <p><strong>Visiting Hours:</strong> {selectedDoctor.visingHours}</p>

              
              
              <button onClick={() => setSelectedDoctor(null)}>Close</button>
            </div>
          </div>
        )}



    </div>
     
    </div>
  )
}

export default Massage