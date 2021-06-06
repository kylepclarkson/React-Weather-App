import React from "react";
import { BsSearch } from "react-icons/bs";

import "./search-bar.css"

const SearchBar = ({city, setCity, getWeatherData}) => {
  return (
    <div className="search-wrapper">
      <input
        className="search-bar"
        type="text"
        placeholder="Search City..."
        value={city}
        onChange={(e) => setCity(e.target.value)}
        onKeyPress={(e) => {
          if (e.key === "Enter") {
            getWeatherData();
          }
        }}
      />
      <BsSearch className="search-icon" onClick={() => getWeatherData()} />
    </div>
  );
};

export default SearchBar;
