import React, { useState,useEffect } from 'react';

import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import axios from 'axios';
import { useLocation,useNavigate } from 'react-router-dom';
import './PaymentForm.css'; // Create and import your CSS file


function PaymentForm() {
  const stripe = useStripe();
  const elements = useElements();
  const location = useLocation();
  const navigate = useNavigate();
  const { totalAmount } = location.state || { totalAmount: 0 };
  

  useEffect(() => {
    // Add class to body when component mounts
    document.body.classList.add('dashboard-background');
    

    // Remove class from body when component unmounts
    return () => {
      document.body.classList.remove('dashboard-background');
      
    };
  }, []);
  
  

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }
    console.log('Total Amount:', totalAmount);

    // Create a payment intent on your backend
    const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/payments/create-payment-intent`, {
        amount: totalAmount * 100,  // Ensure amount is in cents
      });

    const clientSecret = response.data.clientSecret;

    const cardElement = elements.getElement(CardElement);

    const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: cardElement,
      },
    });

    if (error) {
      console.error(error);
      alert('Payment failed');
    } else if (paymentIntent.status === 'succeeded') {
      alert('Payment successful');
      navigate('/dashboard');
      // You can update the payment status in the database here
    }
  };

  return (
    <div className="payment-form-container">
      <h2>Complete Your Payment</h2>
      <form onSubmit={handleSubmit} className="payment-form">
        <CardElement className="card-element" />
        <button type="submit" disabled={!stripe} className="pay-now-btn">Pay Now</button>
      </form>
    </div>
  );
}

export default PaymentForm;
