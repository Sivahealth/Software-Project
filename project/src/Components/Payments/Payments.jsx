import '../Activities/Activities.css';
import './Payments.css';
import Addpayment from './Addpayment';
import '../Dashboard/DashBoard.css';
import Searchbar from '../Activities/Searchbar';
import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom'; // for redirection
import logo from '../Images/logonoback.png';
import Lilogo from '../Images/Left_icon.png';
import Paymentsmenu from './Paymentsmenu';
import axios from 'axios';
import { loadStripe } from '@stripe/stripe-js';

// Load the Stripe instance with your public API key
const stripePromise = loadStripe('pk_test_51QCDT9CTH3SLWt7GpHMsZw3kDDijaJDa4htgpKNgj39jhsukqE3CWr3IIZDS6GYJqyYeWoMt88nbTIVVYfKh7A5A00HZ4SsuZj');

function Payments() {
  const [payments, setPayments] = useState([]);
  const navigate = useNavigate(); // React Router hook for navigation

  useEffect(() => {
    // Check the user's status from localStorage
    const user = JSON.parse(localStorage.getItem('user'));
    
    if (user && user.status === 'Doctor') {
      // If the user is a doctor, deny access by redirecting to another page
      alert('Access denied. Doctors are not allowed to access this page.');
      navigate('/dashboard'); // Redirect to the dashboard or any other appropriate page
    }
  }, [navigate]);

  const handleSearch = (searchTerm) => {
    const filtered = payments.filter((payment) =>
      payment.employeeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.accountNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.selectedStatus.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setPayments(filtered);
  };

  useEffect(() => {
    // Add class to body when component mounts
    document.body.classList.add('activities-background');

    // Fetch payment data from the backend
    axios.get(`${process.env.REACT_APP_API_URL}/api/payments/getpay`)
      .then(response => {
        const paymentData = response.data;
        // Initialize local storage for selected status if not already done
        paymentData.forEach(payment => {
          const savedStatus = localStorage.getItem(`paymentStatus-${payment._id}`);
          if (savedStatus) {
            payment.selectedStatus = savedStatus; // Set saved status to payment
          }
        });
        setPayments(paymentData);
      })
      .catch(error => console.error('Error fetching payments:', error));

    // Remove class from body when component unmounts
    return () => {
      document.body.classList.remove('activities-background');
    };
  }, []);

  const handlePayNow = (paymentId, totalAmount) => {
    // Pass the paymentId and amount to the payment form
    console.log('Payment ID:', paymentId, 'Total Amount:', totalAmount); 
    navigate(`/paymentform/${paymentId}`, { state: { totalAmount } });
  };

  const handleStatusChange = async (paymentId, isChecked) => {
    try {
      // Update the local payments state
      setPayments(prevPayments =>
        prevPayments.map(payment =>
          payment._id === paymentId ? { ...payment, isCompleted: isChecked } : payment
        )
      );
  
      // Send the updated status to the backend
      await axios.put(`${process.env.REACT_APP_API_URL}/api/payments/${paymentId}`, { isCompleted: isChecked });
    } catch (error) {
      console.error('Error updating payment completion status:', error);
    }
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
        <Paymentsmenu />

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
            Manage Payments
          </div>
        </div>

        <Searchbar placeholder="Search Employees..." handleSearch={handleSearch} />
        <Addpayment />

        <div className='Table_container'>
          <table>
            <thead>
              <tr>
                <th>Employee Name</th>
                <th>Account Number</th>
                <th>Status</th>
                <th>Man Hours</th>
                <th>Over Time</th>
                <th>Total Amount</th>
                <th>Action</th>
                
              </tr>
            </thead>
            <tbody>
              {payments.map(payment => (
                <tr key={payment._id}>
                  <td>{payment.employeeName}</td>
                  <td>{payment.accountNumber}</td>
                  <td>{payment.selectedStatus}</td>
                  <td>{payment.manHours}</td>
                  <td>{payment.overTime}</td>
                  <td>{payment.totalAmount}</td>
                  <td>
                    <div className="button-group">
                      <button
                        className="pay-now-btn"
                        onClick={() => handlePayNow(payment._id, payment.totalAmount)}
                      >
                        Confirm Payment
                      </button>
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

export default Payments;
