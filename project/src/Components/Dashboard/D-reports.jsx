import React, { useState } from 'react';
import './DashBoard.css'
import rlogo from '../Images/reports_logo.png';
import dlogoHovered from '../Images/Reports_purple.png'
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';


function D_reports() {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <div className='D_reports'>
    <div
            className={`dashboardmenu ${isHovered ? 'hovered' : ''}`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
    <img
          src={isHovered ? dlogoHovered : rlogo} // Conditionally render the image
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
      <Link to="/reports" className='custom_link'>Reports</Link>
      </div>
    </div>
    </div>
    </div>
  )
}

export default D_reports