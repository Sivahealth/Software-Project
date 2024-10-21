import React from 'react'
import '../Dashboard/DashBoard'
import './Activities.css';
import dlogo from '../Images/Mo.png';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';


function Moppointments() {
  return (
    <div className='D_dashboard'>
    <div className='activitiesmenu'>
    <img src={dlogo} alt="dashboard-logo" className="aclogo1"/>
    <div className='activities_menu_container'>
      <p className='activities-text'><Link to="/activities" className='custom_link'>Manage Appointment</Link></p>
    </div>
    </div>
    </div>
  )
}
export default Moppointments