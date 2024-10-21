import React, { useState } from 'react';
import './OPD_Doctor.css'
import search_OPD from '../Images/Search.png';


const Searchbar_OPD = ({ placeholder, handleSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
    handleSearch(event.target.value);
  };

  return (
    <div className="search-bar_OPD">
      <input
        type="text"
        placeholder={placeholder}
        value={searchTerm}
        onChange={handleChange}
      />
      <img src={search_OPD} alt="Magnifier" className="slogo1"/>
    </div>
  );
};

export default Searchbar_OPD;