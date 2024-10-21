import React, { useState } from 'react';
import './DashBoard.css'
import mlogo from '../Images/messages_logo.png';
import dlogoHovered from '../Images/Messages_purple.png'
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';

function D_messages() {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <div className='D_messages'>
   <div
            className={`dashboardmenu ${isHovered ? 'hovered' : ''}`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
    <img
          src={isHovered ? dlogoHovered : mlogo} // Conditionally render the image
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
      <Link to="/message" className='custom_link'>Doctors</Link>
      </div>
    </div>
    </div>
    </div>
  )
}

export default D_messages