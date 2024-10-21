import React from 'react'
import { BrowserRouter as Router, Route, Switch, Link, Routes, BrowserRouter } from 'react-router-dom'
import {Add_appointment, Message, Payments, Reports, WhiteRec,OPD_Doctor,Physiotherapy_Doctor, Newaddreport, Logout, Pharmacy, Add_payment, Addmedicine, My_appointment, Add_doctor, Add_patientlist, ForgotPassword, ResetPassword, Payment_portal,PaymentForm} from './Components'
import {SignUpForm} from './Components'
import {DashBoard} from './Components'
import {Activities} from './Components'
import {PatientList} from './Components'
import { Users } from './Components'
import './index.css';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
const stripePromise = loadStripe('pk_test_51QCDT9CTH3SLWt7GpHMsZw3kDDijaJDa4htgpKNgj39jhsukqE3CWr3IIZDS6GYJqyYeWoMt88nbTIVVYfKh7A5A00HZ4SsuZj');

const App = () => {
  return (
   <div>
    <BrowserRouter>
    <Routes>
      <Route index element={<WhiteRec/>}/>
      <Route path="/home" element={<WhiteRec/>}/>
      <Route path="/create" element={<SignUpForm/>}/>
      <Route path="/dashboard" element={<DashBoard/>}/>
      <Route path="/activities" element={<Activities/>}/>
      <Route path="/patientlist" element={<PatientList/>}/>
      <Route path="/users" element={<Users/>}/>
      <Route path="/pharmacy" element={<Pharmacy/>}/>
      <Route path="/message" element={<Message/>}/>
      <Route path="/payments" element={<Payments/>}/>
      <Route path="/reports" element={<Reports/>}/>
      <Route path="/new_appointment" element={<Add_appointment/>} />
      <Route path="/opd_doctor" element={<OPD_Doctor />} />
      <Route path="/physiotherapy_doctor" element={<Physiotherapy_Doctor />} />
      <Route path="/new_addreport" element={<Newaddreport/>} />
      <Route path="/new_addpayment" element={<Add_payment/>} />
      <Route path="/add_medicine" element={<Addmedicine/>} />
      <Route path="/my_appointment" element={<My_appointment/>} />
      <Route path="/add_doctor" element={<Add_doctor/>} />
      <Route path="/add_patientlist" element={<Add_patientlist/>} />
      <Route path="/forgot-password" element={<ForgotPassword/>} />
      <Route path="/reset-password" element={<ResetPassword/>} />
      <Route path="/payment_portal/:appointmentId" element={<Payment_portal/>} />
      <Route path="/payment_portal/:reportId" element={<Payment_portal/>} />
      <Route path="/paymentform/:paymentId" element={
            <Elements stripe={stripePromise}>
              <PaymentForm />
            </Elements>
          } />
      <Route path="/logout" element={<Logout/>} />


    </Routes>
    
    </BrowserRouter>
    
   </div>
   

    
    
  )
}

export default App
