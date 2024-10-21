import './DashBoard.css';
import React, { useState } from 'react';
import dlogo from '../Images/dashboard_logo.png';
import dlogoHovered from '../Images/Dashboard_purple.png'
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';

function D_dashboard() {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <div className='D_dashboard'>
    <div
            className={`dashboardmenu ${isHovered ? 'hovered' : ''}`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
    

    <img
          src={isHovered ? dlogoHovered : dlogo} // Conditionally render the image
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
      <Link to="/dashboard" className='custom_link'>Dashboard</Link>
      </div>
    </div>
    </div>
    </div>
  )
}
export default D_dashboard
