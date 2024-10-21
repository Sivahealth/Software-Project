import React from 'react'
import '../Dashboard/DashBoard'
import './Activities.css';
import dlogo from '../Images/Person.png';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';


function Patientlist() {
  return (
    <div className='Patientlist'>
    <div className='patientlistmenu'>
    <img src={dlogo} alt="dashboard-logo" className="aclogo1"/>
    <div className='patientlist_menu_container'>
      <p className='patientlist-text'><Link to="/patientlist" className='custom_link'>Admit Patient List</Link></p>
    </div>
    </div>
    </div>
  )
}
export default Patientlist