import React from 'react'
import './Activities.css'
import '../Dashboard/DashBoard.css'
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';


function Addappointment(){

  return (
    <div className='Addapointment_container'> 
    <div className='Addapointment_text'>
    <Link to="/new_appointment" className='custom_link'> + Add Appointment </Link>
    </div>
    </div>
  )
}

export default Addappointment
