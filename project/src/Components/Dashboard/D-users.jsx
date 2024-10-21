import './DashBoard.css';
import React, { useState } from 'react';
import ulogo from '../Images/Users_logo.png'
import dlogoHovered from '../Images/Users_purple.png'
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';

function D_users() {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <div className='D_users'>
    <div
            className={`dashboardmenu ${isHovered ? 'hovered' : ''}`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
    <img src={ulogo} alt="users-logo" className="dlogo1"/>
    <img
          src={isHovered ? dlogoHovered : ulogo} // Conditionally render the image
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
      <Link to="/users" className='custom_link'>Users</Link>
      </div>
    </div>
    </div>
    </div>
  )
}
export default D_users