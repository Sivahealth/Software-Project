import '../Activities/Activities.css';
import './Pharmacy.css';
import '../Dashboard/DashBoard.css';
import React, { useEffect, useState } from 'react';
import logo from '../Images/logonoback.png';
import Lilogo from '../Images/Left_icon.png';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Pharmacymenu from './Pharmacymenu';
import axios from 'axios';
import Searchbar from '../Activities/Searchbar';
import Addpharmacy from './Addpharmacy';
import './Pharmacy.css';

function Pharmacy() {
  const [medicines, setMedicines] = useState([]);
  const [searchTerm, setSearchTerm] = useState(''); // New state for search term

  useEffect(() => {
    // Add class to body when component mounts
    document.body.classList.add('activities-background');

    // Remove class from body when component unmounts
    return () => {
      document.body.classList.remove('activities-background');
    };
  }, []);

  const handleSearch = (term) => {
    setSearchTerm(term); // Update search term state
  };

  useEffect(() => {
    // Fetch medicine data from backend
    axios
      .get(`${process.env.REACT_APP_API_URL}/api/medicines/getallmedicines`)
      .then((response) => setMedicines(response.data))
      .catch((error) => console.error('Error fetching medicines:', error));
  }, []);

  const handleStatusChange = async (id, status) => {
    try {
      await axios.put(`${process.env.REACT_APP_API_URL}/api/medicines/getallmedicines/${id}`, { status });
      // Update status locally after successful API call
      setMedicines((prevMedicines) =>
        prevMedicines.map((med) => (med._id === id ? { ...med, status } : med))
      );
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  // Filter medicines based on search term
  const filteredMedicines = medicines.filter((medicine) =>
    medicine.medicineName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className='maindash'>
      <div className='logo_dash'>
        <img src={logo} alt="Logonoback" className="logo1" />
      </div>
      <div className='acsidebar'>
        <div className='dashboardlogoname'>
          <p className='Optimize-text3'>
            <Link to="/dashboard" className='custom_link'>Siva Health Hub</Link>
          </p>
        </div>
        <Pharmacymenu />

        <div className='back'>
          <div className='activitiesmenu'>
            <img src={Lilogo} alt="dashboard-logo" className="aclogo1" />
            <div className='activities_menu_container'>
              <p className='activities-text'>
                <Link to="/dashboard" className='custom_link'>Back to menu</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className='Whitecontainer'>
        <div className='MA_text_rectangle'>
          <div className='MA_text'>
            Pharmacy
          </div>
        </div>
        <Searchbar placeholder="Search medicine..." handleSearch={handleSearch} />
        <Addpharmacy />
        <div className='Table_container'>
          <table>
            <thead>
              <tr>
                <th>Medicine Name</th>
                <th>Batch Number</th>
                <th>Stock Quantity</th>
                <th>Expiry Date</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredMedicines.map((medicine) => (
                <tr key={medicine._id}>
                  <td>{medicine.medicineName}</td>
                  <td>{medicine.batchNumber}</td>
                  <td>{medicine.stockQuantity}</td>
                  <td>{new Date(medicine.expiryDate).toLocaleDateString()}</td>
                  <td>
                    <button
                      className={`status-btn ${medicine.status.toLowerCase().replace(' ', '-')}`}
                      onClick={() => handleStatusChange(medicine._id, medicine.status === 'In Stock' ? 'Discontinued' : 'In Stock')}
                    >
                      {medicine.status}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Pharmacy;
