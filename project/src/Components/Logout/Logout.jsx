import '../Dashboard/DashBoard.css'
import '../Activities/Activities.css'
import './Logout.css'
import React, { useEffect, useState } from 'react';
import logo from '../Images/logonoback.png';
import Lilogo from '../Images/Left_icon.png';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

function Logout() {
    const [userDetails, setUserDetails] = useState(null);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        // Add class to body when component mounts
        document.body.classList.add('activities-background');

        // Remove class from body when component unmounts
        return () => {
            document.body.classList.remove('activities-background');
        };
    }, []);

    useEffect(() => {
            const fetchUserDetails = () => {
                const user = JSON.parse(localStorage.getItem('user'));
                if (user) {
                  setUserDetails(user);
                }
              };
        

        fetchUserDetails();
    }, []);

    const handleLogout = () => {
        // Clear the local storage
        localStorage.clear();

        // Redirect to the home page
        navigate('/home');
    };

    const imageUrl = userDetails ? `/images/${userDetails.firstName}.jpg` : '/images/default.png';

    return (
        <div className='maindash'>
            <div className='logo_dash'>
                <img src={logo} alt="Logonoback" className="logo1" />
            </div>
            <div className='acsidebar'>
                <div className='dashboardlogoname'>
                    <p className='Optimize-text3'><Link to="/dashboard" className='custom_link'>Siva Health Hub</Link></p>
                </div>
                <div className='back'>
                    <div className='activitiesmenu'>
                        <img src={Lilogo} alt="dashboard-logo" className="aclogo1" />
                        <div className='activities_menu_container'>
                            <p className='activities-text'><Link to="/dashboard" className='custom_link'>Back to menu</Link></p>
                        </div>
                    </div>
                </div>
            </div>
            <div className='Whitecontainer'>
                <div className='MA_text_rectangle'>
                    <div className='MA_text'>
                        Logout
                    </div>
                </div>
                <div className='detailstitle'>
                    Profile Details
                </div>
                <img
                    src={imageUrl}
                    alt="User profile"
                    className="user-profile-img"
                />
                <div className='details'>
                    {error && <p>{error}</p>}
                    {userDetails ? (
                        <div>
                            <p>First Name: {userDetails.firstName}</p>
                            <p>Last Name: {userDetails.lastName}</p>
                            <p>Email: {userDetails.email}</p>
                            <p>Logged Date: {new Date(userDetails.joinedTime).toLocaleDateString()}</p>
                            <p>Logged Time: {new Date(userDetails.joinedTime).toLocaleTimeString()}</p>
                            <p>Status: {userDetails.status}</p>
                            {/* Display other user details if needed */}
                        </div>
                    ) : (
                        <p>Loading user details...</p>
                    )}
                </div>

                {/* Logout Button */}
                <div className='logout-button-container'>
                    <button className='logout-button' onClick={handleLogout}>Logout</button>
                </div>
            </div>
        </div>
    );
}

export default Logout;
