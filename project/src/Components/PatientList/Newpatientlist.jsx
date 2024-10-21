import './PatientList.css';
import dlogo from '../Images/Person_purple.png';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';


function Newpatientlist() {
  return (
    <div className='new-patientlist'>
    <div className='new-patientlist-menu'>
    <img src={dlogo} alt="dashboard-logo" className="aclogo1"/>
    <div className='new-patientlist_menu_container'>
      <p className='new-patientlist-text'>Admit Patient List</p>
    </div>
    </div>
    </div>
  )
}
export default Newpatientlist