import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../Add_appointment/Add_appointment.css';
import '../Sign_up/SignUpForm.css';
import '../Logmenu/WhiteRec.css';
import '../Newaddreport/Newaddreport.css'
import logo from '../Images/logo.png';
import './Add_payment.css'
import axios from 'axios';

function Add_payment() {
    const [formData, setFormData] = useState({
        employeeName: '',
        accountNumber: '',
        selectedStatus: '',
        manHours: '',
        overTime: '',
        totalAmount: '',
      });
    
      // Handle form field changes
      const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
          ...formData,
          [name]: value,
        });
      };
    
      // Handle form submission
      const handleSubmit = async (e) => {
        e.preventDefault();
    
        try {
          const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/payments/add`, formData);
          console.log('Payment added successfully:', response.data);
          alert('Payment added successfully!');
          // Optionally clear the form after submission
          setFormData({
            employeeName: '',
            accountNumber: '',
            selectedStatus: '',
            manHours: '',
            overTime: '',
            totalAmount: '',
          });
        } catch (error) {
          console.error('Error adding payment:', error);
          alert('Failed to add payment.');
        }
      };
  
  return (
    <div className='blue-rectangle1'>
      <div className='add_appointment_white-rectangle1'>
        <div className='Add_appointment_logo_Container'>
          <img src={logo} alt="Logo" className="appointment_logo" />
          <p className='Add_appointment_Optimize-text'>Siva Health Hub</p>
        </div>
        <div className='appointment_text_container'>
          <p className='appointment-title'>Add payment that you want:</p>
          <form onSubmit={handleSubmit}>
            <div className="finalpaymentform">
              <div className="input-group6">
                <label htmlFor="employeeName" className="label6">Employee Name</label>
                <input type="text" id="employeeName" name="employeeName" value={formData.employeeName} onChange={handleChange} required />
              </div>
              <div className="input-group6">
                <label htmlFor="accountNumber" className="label6">Account Number</label>
                <input type="text" id="accountNumber" name="accountNumber" value={formData.accountNumber} onChange={handleChange} required />
              </div>
              <div className="input-group6">
              <label htmlFor="status" className="label6">Status</label>
              <select
                id="Status"
                name="selectedStatus"
                value={formData.selectedStatus}
                onChange={handleChange}
                required
              >
                <option value="" disabled>Select Status</option>
                <option value="Doctor">Doctor</option>
                <option value="Employee">Employee</option>
                
              </select>
              </div>
              <div className="input-group6">
                <label htmlFor="manHours" className="label6">Man Hours</label>
                <input type="text" id="manHours" name="manHours"  value={formData.manHours}  onChange={handleChange} required />
              </div>
              <div className="input-group6">
                <label htmlFor="overTime" className="label6">Over Time</label>
                <input type="text" id="overTime" name="overTime" value={formData.overTime}  onChange={handleChange} required />
              </div>
              <div className="input-group6">
                <label htmlFor="totalAmount" className="label6">Total Amount</label>
                <input type="text" id="totalAmount" name="totalAmount" value={formData.totalAmount} onChange={handleChange} required />
              </div>
              <div className="white-rectangle_payment">
                <button type="submit">Submit</button>
                <div>
                  <p className="backlink"> <a href="/payments">To payments page</a></p>
                </div>
              </div>
            </div>

            </form>
   
        </div>
      </div>
    </div>
  );
}

export default Add_payment;