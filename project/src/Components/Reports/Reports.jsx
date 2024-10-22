import '../Activities/Activities.css';
import './Reports.css';
import '../Dashboard/DashBoard.css';
import Addreports from './Addreports';
import React, { useEffect, useState } from 'react';
import logo from '../Images/logonoback.png';
import Lilogo from '../Images/Left_icon.png';
import { BrowserRouter as Router, Route, Routes, Link, useNavigate } from 'react-router-dom';
import Reportsmenu from './Reportsmenu';
import Searchbar from '../Activities/Searchbar';
import axios from 'axios';

function Reports() {
  const [reports, setReports] = useState([]);
  const [filteredReports, setFilteredReports] = useState([]);
  const navigate = useNavigate(); 

  const handleSearch = (searchTerm) => {
    if (searchTerm) {
      const filtered = reports.filter((report) =>
        report.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        report.doctorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        report.contactNumber.includes(searchTerm)
      );
      setFilteredReports(filtered);
    } else {
      setFilteredReports(reports); // If search is empty, show all reports
    }
  };

  useEffect(() => {
    // Add class to body when component mounts
    document.body.classList.add('activities-background');
    
    // Remove class from body when component unmounts
    return () => {
      document.body.classList.remove('activities-background');
    };
  }, []);

  useEffect(() => {
    // Fetch reports from the backend
    axios.get(`${process.env.REACT_APP_API_URL}/api/reports/getreport`)
      .then(response => {
        setReports(response.data);
        setFilteredReports(response.data); // Initialize filtered reports with all data
      })
      .catch(error => console.error('Error fetching reports:', error));
  }, []);

  const handlePayNow = (reportId, totalCharge) => {
    // Navigate to the payment form with reportId and totalCharge
    navigate(`/paymentform/${reportId}`, { state: { totalAmount: totalCharge } });
  };

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
        <Reportsmenu />

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
            Reports
          </div> 
        </div>
        <Searchbar placeholder="Search reports..." handleSearch={handleSearch} />
        <Addreports />
        <div className='Table_container'>
          <table>
            <thead>
              <tr>
                <th>Patient Name</th>
                <th>Doctor Name</th>
                <th>Contact Number</th>
                <th>Total Charge</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredReports.map(report => (
                <tr key={report._id}>
                  <td>{report.patientName}</td>
                  <td>{report.doctorName}</td>
                  <td>{report.contactNumber}</td>
                  <td>{report.totalCharge}</td>
                  <td>
                    <div className="button-group">
                      <button 
                        className="pay-now-btn" 
                        onClick={() => handlePayNow(report._id, report.totalCharge)}
                      >
                        Pay Now
                      </button>
                      <a href={report.attachedPdf} target="_blank" rel="noopener noreferrer">
                        <button className="book-now-btn">Download</button>
                      </a>
                    </div>
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

export default Reports;
