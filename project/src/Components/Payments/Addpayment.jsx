import React from 'react'
import '../Activities/Activities.css'
import '../Dashboard/DashBoard.css'
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';


function Addpayment(){

  return (
    <div className='Addapointment_container'> 
    <div className='Addapointment_text'>
    <Link to="/new_addpayment" className='custom_link'> + Add Payment </Link>
    </div>
    </div>
  )
}

export default Addpayment