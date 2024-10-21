import React, { useState } from 'react';
import './Activities.css'
import search from '../Images/Search.png';


const Searchbar = ({ placeholder, handleSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
    handleSearch(event.target.value);
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder={placeholder}
        value={searchTerm}
        onChange={handleChange}
      />
      <img src={search} alt="Magnifier" className="slogo1"/>
    </div>
  );
};

export default Searchbar;