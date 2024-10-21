import React from 'react'
import '../Dashboard/DashBoard'
import '../Activities/Activities.css'
import uplogo from '../Images/Reports_purple.png'
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';


function Reportsmenu() {
  return (
    <div className='D_dashboard'>
    <div className='activitiesmenu'>
    <img src={uplogo} alt="dashboard-logo" className="aclogo1"/>
    <div className='activities_menu_container'>
      <p className='activities-text'><Link to="/reports" className='custom_link'>Reports</Link></p>
    </div>
    </div>
    </div>
  )
}
export default Reportsmenu