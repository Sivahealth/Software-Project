import React from 'react'
import '../Activities/Activities.css'
import '../Dashboard/DashBoard.css'
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';


function Addpatientlist(){

  return (
    <div className='Addapointment_container'> 
    <div className='Addapointment_text'>
    <Link to="/add_patientlist" className='custom_link'> + Add Patients </Link>
    </div>
    </div>
  )
}

export default Addpatientlist