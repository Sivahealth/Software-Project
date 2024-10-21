import React, { useState } from 'react';
import './DashBoard.css'
import alogo from '../Images/activities_logo.png';
import dlogoHovered from '../Images/activities_purple.png'
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';

function D_activities() {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <div className='D_activities'>
     <div
            className={`dashboardmenu ${isHovered ? 'hovered' : ''}`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
    <img
          src={isHovered ? dlogoHovered : alogo} // Conditionally render the image
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
      <Link to="/activities" className='custom_link'>Activities</Link>
      </div>
    </div>
    </div>
    </div>
  )
}

export default D_activities
