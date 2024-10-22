import './DashBoard.css';
import '../Activities/Activities.css'
import React, {  useEffect,useState } from 'react';
import logo from '../Images/logonoback.png';
import D_dashboard from './D-dashboard';
import D_activities from './D-activities';
import D_users from './D-users';
import D_calendar from './D-calendar';
import D_messages from './D-messages';
import D_payments from './D-payments';
import D_reports from './D-reports';
import  UserCountChart from './UserCountChart';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import axios from 'axios';

import img5 from '../Images/building.png';
import img6 from '../Images/image2.png';
import img3 from '../Images/image3.png';

function DashBoard () {
  const maxUsers =50;
    useEffect(() => {
        // Add class to body when component mounts
        document.body.classList.add('dashboard-background');
        
    
        // Remove class from body when component unmounts
        return () => {
          document.body.classList.remove('dashboard-background');
          
        };
      }, []);

      const [userCount, setUserCount] = useState(0);
      const [appointmentCount,setAppointmentCount]=useState(0);
      const [patientCount,setPatientCount]=useState(0);
      const [reportCount,setReportCount]=useState(0);
      const [currentImageIndex, setCurrentImageIndex] = useState(0);
      const [fade, setFade] = useState(true); // State for fade effect
      const [userDetails, setUserDetails] = useState({}); 

      const images = [img3, img5, img6];

    useEffect(() => {
        fetchUserCount();
        fetchappointmentCount();
        fetchpatientCount();
        fetchreportCount();
        fetchUserDetails();
        const intervalId = setInterval(() => {
          setFade(false); // Start fade-out transition
          setTimeout(() => {
            setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length); // Change image
            setFade(true); // Start fade-in transition
          }, 500); // Duration of fade-out transition
        }, 3500); // Total interval including transition time
    
        return () => clearInterval(intervalId); // Clean up on unmount
    }, []);

    const fetchUserDetails = () => {
      const user = JSON.parse(localStorage.getItem('user'));
      if (user) {
        setUserDetails(user);
      }
    };
    const fetchUserCount = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/users/count`);
            setUserCount(response.data.count);
        } catch (error) {
            console.error('Error fetching user count:', error);
        }
    };
   
    const fetchappointmentCount = async () => {
      try {
          const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/appointments/count`);
          setAppointmentCount(response.data.count);
      } catch (error) {
          console.error('Error fetching user count:', error);
      }
  };

  const fetchpatientCount = async () => {
    try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/patients/count`);
        setPatientCount(response.data.count);
    } catch (error) {
        console.error('Error fetching user count:', error);
    }
};

const fetchreportCount = async () => {
  try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/reports/count`);
      setReportCount(response.data.count);
  } catch (error) {
      console.error('Error fetching user count:', error);
  }
};
 
   
    const progressPercentage =( (userCount) / maxUsers) * 100;
    const appointmentPercentage=((appointmentCount)/maxUsers)*100;
    const patientPerecentage=((patientCount)/maxUsers)*100;
    const reportPerecentage=((reportCount)/maxUsers)*100;

  return (
    <div className='maindash'>
    <div className='logo_dash'>
      <img src={logo} alt="Logonoback" className="logo1"/>
      </div>
    <div className='sidebar'>
    <div className='dashboardlogoname'>
    <p className='Optimize-text3'><Link to="/dashboard" className='custom_link'>Siva Health Hub</Link></p>
    </div>
    <D_dashboard/>
    <D_activities/>
    <D_users/>
    <D_reports/>
    <D_calendar/>
    <D_messages/>
    <D_payments/>
    </div>
    <div className='Whitecontainer'>
    <div className='newcountcontainer'>
      </div>
      <div className="user-info">
                          <Link to="/logout" className='custom_link'><p>Welcome, {userDetails.firstName || 'User'}</p></Link>
            </div>

      <div className='MA_text_rectangle'>
       <div className='MA_text'>
              Dashboard
        </div> 
      </div>
        <div className="dashboard-grid">
          <div className="column">
            <div className="dashboard-slot">
              <h3>Users</h3>
              <p>{userCount}</p>
              <div className="progress-bar-container">
                <div
                  className="progress-bar purple"
                  style={{ width: `${progressPercentage}%` }}
                ></div>
              </div>
            </div>
            <div className="dashboard-slot">
            <h3>Appointments</h3>
            <p>{appointmentCount}</p>
              <div className="progress-bar-container">
                <div
                  className="progress-bar green"
                  style={{ width:`${appointmentPercentage}%`}}
                ></div>
              </div>
            </div>
          </div>
          <div className="column">
            <div className="dashboard-slot">
            <h3>Admit Patients</h3>
            <p>{patientCount}</p>
              <div className="progress-bar-container">
                <div
                  className="progress-bar red"
                  style={{ width: `${patientPerecentage}%` }}
                ></div>
              </div>
            </div>
          

            <div className="dashboard-slot">
            <h3>Reports</h3>
            <p>{reportCount}</p>
              <div className="progress-bar-container">
                <div
                  className="progress-bar blue"
                  style={{ width: `${reportPerecentage}%` }}
                ></div>
              </div>
            </div>


          </div>
        </div>

        
       <div className={`slideshow-container ${fade ? 'fade-in' : 'fade-out'}`}>
                <img
                  src={images[currentImageIndex]}
                  alt="Slideshow"
                  className="slideshow-image"
                />
        </div>
          
    



    </div>
     
    </div>
  )
}

export default DashBoard
