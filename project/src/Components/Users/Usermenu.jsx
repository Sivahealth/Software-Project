import React from 'react'
import '../Dashboard/DashBoard'
import '../Activities/Activities.css'
import uplogo from '../Images/Users_purple.png'
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';


function Usermenu() {
  return (
    <div className='D_dashboard'>
    <div className='activitiesmenu'>
    <img src={uplogo} alt="dashboard-logo" className="aclogo1"/>
    <div className='activities_menu_container'>
      <p className='activities-text'><Link to="/users" className='custom_link'>Users</Link></p>
    </div>
    </div>
    </div>
  )
}
export default Usermenu