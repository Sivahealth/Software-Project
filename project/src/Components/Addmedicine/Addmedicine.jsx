import React, { useState,useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import '../Sign_up/SignUpForm.css';
import './Addmedicine.css'

import axios from 'axios';

const Addmedicine = () => {
    const [formData, setFormData] = useState({
        medicineName: '',
        category: '',
        batchNumber: '',
        stockQuantity: '',
        unitPrice: '',
        expiryDate: new Date(),
        dateReceived: new Date(),
        manufacturer: '',
        status: 'In Stock', // Default value
      });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };
 
  const handleDateChange = (date, field) => {
    setFormData({
      ...formData,
      [field]: date
    });
  };

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user')); // Assuming the user is stored in localStorage under 'user'
    if (user && user.status === 'Doctor') {
      alert('Access denied: Doctors are not allowed to add medicines.');
      navigate('/dashboard'); // Redirect to home or any other page
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const medicineData = {
        medicineName: formData.medicineName,
        category: formData.category,
        batchNumber: formData.batchNumber,
        stockQuantity: formData.stockQuantity,
        unitPrice: formData.unitPrice,
        expiryDate: formData.expiryDate,
        dateReceived: formData.dateReceived,
        manufacturer: formData.manufacturer,
        status: formData.status,
      };
      try {
        const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/medicines/medicines`, medicineData);
        
        if (response.status === 201) {
          // Handle successful insertion
          alert('Medicine details added successfully!');
          navigate('/pharmacy'); // Redirect to the pharmacy page or inventory page
  
          // Optionally clear form data after successful submission
          setFormData({
            medicineName: '',
            category: '',
            batchNumber: '',
            stockQuantity: '',
            unitPrice: '',
            expiryDate: new Date(),
            dateReceived: new Date(),
            manufacturer: '',
            status: 'In Stock',
          });
        } else {
          // Handle error
          console.error('Failed to add medicine details');
        }
      } catch (error) {
        // Handle error
        console.error('Error:', error);
      }
    };


  return (
    <div className='blue-rectangle1'>
      <div className='white-rectangle1'>
        <div className="root-container">
          <div className="signup-container">
            <p className='Optimize-text2'>Please add medicine details</p>
            <div className='totalformpharmacy'>
            <form onSubmit={handleSubmit}>
          
            <div className="input-group6">
            <label htmlFor="medicineName" className="label6" >Medicine Name</label>
            <input type="text" id="medicineName" name="medicineName" value={formData.medicineName} onChange={handleChange} required />
          </div>
          <div className="input-group6">
            <label htmlFor="category" className="label6">Category</label>
            <input type="text" id="category" name="category" value={formData.category} onChange={handleChange} required />
          </div>
          <div className="input-group6">
            <label htmlFor="batchNumber" className="label6">Batch Number</label>
            <input type="text" id="batchNumber" name="batchNumber" value={formData.batchNumber} onChange={handleChange} required />
          </div>
          <div className="input-group6">
            <label htmlFor="stockQuantity" className="label6">Stock Quantity</label>
            <input type="number" id="stockQuantity" name="stockQuantity" value={formData.stockQuantity} onChange={handleChange} required />
          </div>
          <div className="input-group6">
            <label htmlFor="unitPrice" className="label6" >Unit Price</label>
            <input type="number" id="unitPrice" name="unitPrice" value={formData.unitPrice} onChange={handleChange} required />
          </div>
          <div className="input-group6">
            <label htmlFor="expiryDate" className="label6" >Expiry Date</label>
            <DatePicker selected={formData.expiryDate} onChange={(date) => handleDateChange(date, 'expiryDate')} required />
          </div>
          <div className="input-group6">
            <label htmlFor="dateReceived" className="label6" >Date Received</label>
            <DatePicker selected={formData.dateReceived} onChange={(date) => handleDateChange(date, 'dateReceived')} required />
          </div>
          <div className="input-group6">
            <label htmlFor="manufacturer" className="label6" >Manufacturer</label>
            <input type="text" id="manufacturer" name="manufacturer" value={formData.manufacturer} onChange={handleChange} required />
          </div>
          <div className="input-group6">
            <label htmlFor="status" className="label6" >Status</label>
            <select id="status" name="status" value={formData.status} onChange={handleChange}>
              <option value="In Stock">In Stock</option>
              <option value="Expired">Expired</option>
              <option value="Discontinued">Discontinued</option>
            </select>
          </div>
          <div className="white-rectangle2">
            <button type="submit">Submit</button>
            <div>
                  <p className="backlink"> <a href="/pharmacy">To Pharmacy page</a></p>
                </div>
          </div>

            </form>
           </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Addmedicine;