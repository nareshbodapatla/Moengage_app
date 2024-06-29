import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const BreweryList = () => {
  const [breweries, setBreweries] = useState([]);
  const [searchType, setSearchType] = useState('by_city');
  const [searchValue, setSearchValue] = useState('');

  const handleSearch = async () => {
    try {
      const res = await axios.get(`/api/breweries/search?by=${searchType}&value=${searchValue}`);
      setBreweries(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h2>Search Breweries</h2>
      <select value={searchType} onChange={(e) => setSearchType(e.target.value)}>
        <option value="by_city">By City</option>
        <option value="by_name">By Name</option>
        <option value="by_type">By Type</option>
      </select>
      <input
        type="text"
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>
      <ul>
        {breweries.map((brewery) => (
          <li key={brewery.id}>
            <Link to={`/breweries/${brewery.id}`}>{brewery.name}</Link>
            <p>{brewery.street}, {brewery.city}, {brewery.state}</p>
            <p>{brewery.phone}</p>
            <p><a href={brewery.website_url}>{brewery.website_url}</a></p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BreweryList;
