import React from 'react'
import './Activities.css'
import '../Dashboard/DashBoard.css'
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';



function Myappointment(){

    return (
      <div className='Addapointment_container1'> 
      <div className='Addapointment_text'>
      <Link to="/my_appointment" className='custom_link'> My appointment </Link>
      </div>
      </div>
    )
  }
  
  export default Myappointment