import React, { useState } from 'react';
import './DashBoard.css'
import clogo from '../Images/calendar_logo.png';
import dlogoHovered from '../Images/Calendar_purple.png'
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';

function D_calendar() {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <div className='D_calendar'>
    <div
            className={`dashboardmenu ${isHovered ? 'hovered' : ''}`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
    <img
          src={isHovered ? dlogoHovered : clogo} // Conditionally render the image
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
      <Link to="/pharmacy" className='custom_link'>Pharmacy</Link>
    </div>
    </div>
    </div>
    </div>
  )
}

export default D_calendar