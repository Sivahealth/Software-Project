import React from 'react'
import '../Dashboard/DashBoard'
import '../Activities/Activities.css'
import uplogo from '../Images/Payments_purple.png'
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';


function Paymentsmenu() {
  return (
    <div className='D_dashboard'>
    <div className='activitiesmenu'>
    <img src={uplogo} alt="dashboard-logo" className="aclogo1"/>
    <div className='activities_menu_container'>
      <p className='activities-text'><Link to="/payments" className='custom_link'>Payments</Link></p>
    </div>
    </div>
    </div>
  )
}
export default Paymentsmenu