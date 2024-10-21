import React from 'react'
import '../Activities/Activities.css'
import '../Dashboard/DashBoard.css'
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';


function Addreports(){

  return (
    <div className='Addapointment_container'> 
    <div className='Addapointment_text'>
    <Link to="/new_addreport" className='custom_link'> + Add Report </Link>
    </div>
    </div>
  )
}

export default Addreports
