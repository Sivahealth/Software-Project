import React from 'react'
import '../Dashboard/DashBoard'
import './PatientList.css';
import dlogo from '../Images/Mo_white.png';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';


function NewMoppointments() {
  return (
    <div className='D_dashboard'>
    <div className='new-Manage-Oppointment-menu'>
    <img src={dlogo} alt="dashboard-logo" className="aclogo1"/>
    <div className='new-Managment-Oppointment_menu_container'>
      <p className='new-Manage-Oppointment-text'><Link to="/activities" className='custom_link'>Manage Oppointment</Link></p>
    </div>
    </div>
    </div>
  )
}
export default NewMoppointments