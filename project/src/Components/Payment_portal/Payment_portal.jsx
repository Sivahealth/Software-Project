// Payment.js
import React, { useState,useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './Payment_portal.css'; // For styling the payment form
import "../Activities/Activities.css"

function Payment_portal() {
  const { appointmentId } = useParams(); // Get the appointmentId from the route
  const navigate = useNavigate();
  
  const [paymentDetails, setPaymentDetails] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardHolderName: '',
  });

  useEffect(() => {
    // Add class to body when component mounts
    document.body.classList.add('dashboard-background');
    

    // Remove class from body when component unmounts
    return () => {
      document.body.classList.remove('dashboard-background');
      
    };
  }, []);
  const handleChange = (e) => {
    setPaymentDetails({
      ...paymentDetails,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Payment details submitted:", paymentDetails);
    // You can send the payment details to the backend for processing if needed.
    // In this dummy case, we'll just navigate back to appointments after submission.
    alert('Payment successful for appointment: ' + appointmentId);
    navigate('/activities'); // Navigate back to the appointments page after payment
  };

  return (
    <div className="payment-container">
      <h2>Enter Payment Details</h2>
      <form onSubmit={handleSubmit} className="payment-form">
        <label>
          Card Holder Name:
          <input 
            type="text" 
            name="cardHolderName" 
            value={paymentDetails.cardHolderName} 
            onChange={handleChange} 
            required 
          />
        </label>
        <label>
          Card Number:
          <input 
            type="text" 
            name="cardNumber" 
            value={paymentDetails.cardNumber} 
            onChange={handleChange} 
            required 
          />
        </label>
        <label>
          Expiry Date:
          <input 
            type="text" 
            name="expiryDate" 
            value={paymentDetails.expiryDate} 
            onChange={handleChange} 
            required 
          />
        </label>
        <label>
          CVV:
          <input 
            type="text" 
            name="cvv" 
            value={paymentDetails.cvv} 
            onChange={handleChange} 
            required 
          />
        </label>
        <button type="submit" className="submit-btn">Submit Payment</button>
      </form>
    </div>
  );
}

export default Payment_portal;
