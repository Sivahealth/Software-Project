import React, { useState } from 'react';
import './DashBoard.css'
import plogo from '../Images/payments_logo.png';
import dlogoHovered from '../Images/Payments_purple.png'
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';

function D_payments() {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <div className='D_payments'>
    <div
            className={`dashboardmenu ${isHovered ? 'hovered' : ''}`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
    <img
          src={isHovered ? dlogoHovered : plogo} // Conditionally render the image
          alt="dashboard-logo"
          className="dlogo1"
        />
    <div
            className={`dashboard_menu_container ${isHovered ? 'hovered' : ''}`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
      <div
            className={`dashboard-text ${isHovered ? 'hovered' : ''}`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
      <Link to="/payments" className='custom_link'>Payments</Link>
      </div>
    </div>
    </div>
    </div>
  )
}

export default D_payments