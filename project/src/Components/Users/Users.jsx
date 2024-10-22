import '../Activities/Activities.css';
import './Users.css';
import '../Dashboard/DashBoard.css';
import React, { useEffect,useState } from 'react';
import logo from '../Images/logonoback.png';
import Lilogo from '../Images/Left_icon.png';
import { BrowserRouter as Router, Route, Routes, Link,useNavigate } from 'react-router-dom';
import Usermenu from './Usermenu';
import Searchbar from '../Activities/Searchbar';
import axios from 'axios';

function Users(){
  const [users, setUsers] = useState([]);
  const [loginTime, setLoginTime] = useState('');
  const navigate = useNavigate();

  
  useEffect(() => {
    // Check the user's status from localStorage
    const user = JSON.parse(localStorage.getItem('user'));
    
    if (user && user.status === 'Doctor') {
      // If the user is a doctor, deny access by redirecting to another page
      alert('Access denied. Doctors are not allowed to access this page.');
      navigate('/dashboard'); // Redirect to the dashboard or any other appropriate page
    }
  }, [navigate]);

        useEffect(() => {
        // Add class to body when component mounts
        document.body.classList.add('activities-background');
        
    
        // Remove class from body when component unmounts
        return () => {
          document.body.classList.remove('activities-background');
          
        };
      }, []);

      const handleSearch = (searchTerm) => {
        const filtered = users.filter((user) =>
          user.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          user.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          user.status.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setUsers(filtered);
      };

      useEffect(() => {
        // Fetch appointments from the backend
        axios.get(`${process.env.REACT_APP_API_URL}/api/users`)
          .then(response => setUsers(response.data))
          .catch(error => console.error('Error fetching appointments:', error));

          const storedLoginTime = localStorage.getItem('loginTime');
    setLoginTime(storedLoginTime || 'Not available');
      }, []);


      

  return (
    <div className='maindash'>
    <div className='logo_dash'>
      <img src={logo} alt="Logonoback" className="logo1"/>
      </div>
    <div className='acsidebar'>
    <div className='dashboardlogoname'>
    <p className='Optimize-text3'><Link to="/dashboard" className='custom_link'>Siva Health Hub</Link></p>
    </div>
    <Usermenu/>

    <div className='back'>
    <div className='activitiesmenu'>
    <img src={Lilogo} alt="dashboard-logo" className="aclogo1"/>
    <div className='activities_menu_container'>
      <p className='activities-text'><Link to="/dashboard" className='custom_link'>Back to menu</Link></p>
    </div>
    </div>
    </div>




    </div>
    <div className='Whitecontainer'>
    <div className='MA_text_rectangle'>
       <div className='MA_text'>
              Users
        </div> 
      </div>
      <Searchbar placeholder="Search users..."  handleSearch={handleSearch}/>

      {/* Display the login time */}
      <div className='login-time'>
          <p>Login Time: {loginTime}</p>
        </div>

        <div className='Table_container'>
      <table>
        <thead>
          <tr>
            <th>No</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Account Created Date</th>
            <th>Last Login Date</th>
            <th>Last Login Time</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={user._id}>
              <td>{index + 1}</td>
              <td>{user.firstName}</td>
              <td>{user.lastName}</td>
              <td>{new Date(user.joinedAt).toLocaleDateString()}</td>
              <td>{new Date(user.joinedTime).toLocaleDateString()}</td>
              <td>{new Date(user.joinedTime).toLocaleTimeString()}</td>
              <td>
                <span className={`status ${user.status.toLowerCase()}`}>
                  {user.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>

    </div>
     
    </div>
  )
}

export default Users