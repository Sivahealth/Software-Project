import './Activities.css';
import '../Dashboard/DashBoard.css';
import React, { useEffect, useState } from 'react';
import logo from '../Images/logonoback.png';
import Moppointments from './Moppointment';
import Patientlist from './Patientlist';
import Addappointment from './Addappointment';
import Myappointment from './Myappointment';
import Lilogo from '../Images/Left_icon.png';
import Searchbar from './Searchbar';
import axios from 'axios';
import { BrowserRouter as Router, Route, Routes, Link, useNavigate } from 'react-router-dom';

function Activities() {
  const [appointments, setAppointments] = useState([]);
  const [filteredAppointments, setFilteredAppointments] = useState(appointments);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [amount, setAmount] = useState(''); // New state for payment amount
  const [showAmountModal, setShowAmountModal] = useState(false); // Modal visibility state
  const [doctorName, setDoctorName] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    document.body.classList.add('dashboard-background');
    return () => {
      document.body.classList.remove('dashboard-background');
    };
  }, []);

  const handleSearch = (searchTerm) => {
    const filtered = appointments.filter((item) =>
      item.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.contactNumber.includes(searchTerm) // Assuming contact number is a string of digits
    );
    setFilteredAppointments(filtered);
  };

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_URL}/api/`)
      .then(response => {
        setAppointments(response.data);
        setFilteredAppointments(response.data);
      })
      .catch(error => console.error('Error fetching appointments:', error));
  }, []);

  const handleView = (appointment) => {
    setSelectedAppointment(appointment);
    if (appointment.doctorId) {
      axios.get(`${process.env.REACT_APP_API_URL}/api/doctors/${appointment.doctorId}`)
        .then(response => {
          setDoctorName(response.data.name);
        })
        .catch(error => console.error('Error fetching doctor details:', error));
    }
  };

  const handlePayNow = (appointmentId) => {
    if (!amount) {
      alert("Please enter an amount.");
      return;
    }

    // Navigate to payment page with the selected appointment ID and entered amount
    navigate(`/paymentform/${appointmentId}`, { state: { totalAmount: amount } });
  };

  const handleDelete = async (appointmentId) => {
    try {
      await axios.delete(`${process.env.REACT_APP_API_URL}/appointments/delete/${appointmentId}`);
      setAppointments(appointments.filter(appointment => appointment._id !== appointmentId));
      setFilteredAppointments(filteredAppointments.filter(appointment => appointment._id !== appointmentId));
    } catch (error) {
      console.error('Error deleting appointment:', error);
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
        <Moppointments/>
        <Patientlist/>

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
            Manage Appointments
          </div> 
        </div>

        <Searchbar placeholder="Search appointments..." handleSearch={handleSearch}/>
        <Addappointment/>
        <Myappointment/>
        <div className='Table_container'>
          <table>
            <thead>
              <tr>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Phone Number</th>
                <th>Appointment Date</th>
                <th>Appointment Time</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredAppointments.map(appointment => (
                <tr key={appointment._id}>
                  <td>{appointment.firstName}</td>
                  <td>{appointment.lastName}</td>
                  <td>{appointment.contactNumber}</td>
                  <td>{appointment.appointmentDate}</td>
                  <td>{appointment.timeSlot}</td>
                  <td>
                    <div className="button-group">
                      <button className="view-btn" onClick={() => handleView(appointment)}>View</button>
                      <button className="pay-now-btn" onClick={() => {
                        setSelectedAppointment(appointment);
                        setShowAmountModal(true);
                      }}>Pay Now</button>
                      <button className="book-now-btn" onClick={() => handleDelete(appointment._id)}>Delete Now</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {selectedAppointment && (
          <div className="modal">
            <div className="modal-content">
              <h2>Appointment Details</h2>
              <p><strong>First Name:</strong> {selectedAppointment.firstName}</p>
              <p><strong>Last Name:</strong> {selectedAppointment.lastName}</p>
              <p><strong>Age:</strong> {selectedAppointment.age}</p>
              <p><strong>Gender:</strong> {selectedAppointment.gender}</p>
              <p><strong>Email:</strong> {selectedAppointment.email}</p>
              <p><strong>Phone Number:</strong> {selectedAppointment.contactNumber}</p>
              <p><strong>Department:</strong> {selectedAppointment.department}</p>
              <p><strong>Appointment Date:</strong> {selectedAppointment.appointmentDate}</p>
              <p><strong>Timeslot:</strong> {selectedAppointment.timeSlot}</p>
              <p><strong>Doctor:</strong> {doctorName}</p>
              <button onClick={() => setSelectedAppointment(null)}>Close</button>
            </div>
          </div>
        )}

        {showAmountModal && (
          <div className="modal">
            <div className="modal-content">
              <h2>Enter Amount</h2>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="Enter amount"
              />
              <button onClick={() => {
                handlePayNow(selectedAppointment._id);
                setShowAmountModal(false); // Close modal
              }}>Submit</button>
              <button onClick={() => setShowAmountModal(false)}>Cancel</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Activities;
