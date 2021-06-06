import React from "react";

import "./weather.css"

const Weather = ({cityWeather}) => {

  // Converts wind direction (0,360 deg) to compass direction (90 E, 180 S, etc.)
  const getWindDirection = (deg) => {
    if (22.5 <= deg && deg < 67.5) {
      return "NE";
    } else if (67.5 <= deg && deg < 112.5) {
      return "E";
    } else if (112.5 <= deg && deg < 157.5) {
      return "SE";
    } else if (157.5 <= deg && deg < 202.5) {
      return "S";
    } else if (202.5 <= deg && deg < 247.5) {
      return "SW";
    } else if (247.5 <= deg && deg < 292.5) {
      return "W";
    } else if (292.5 <= deg && deg < 337.5) {
      return "NW";
    } else {
      return "N";
    }
  };

  // Returns unix_time to local time string.
  const convertTime = (unix_time) => {
    const seconds_offset = new Date(0).setUTCSeconds(unix_time);
    return new Date(seconds_offset).toLocaleTimeString();
  };
  return (
    <div className="container text-center weather-wrapper">
      <div className="row mb-4">
        <div className="col font-title">
          {cityWeather.name}, {cityWeather.sys.country}
        </div>
      </div>
      <div className="row mb-4 justify-content-between align-items-center font-title">
        <div className="col">{cityWeather.weather[0].main}</div>
        <div className="col">{Math.round(cityWeather.main.temp)}°C</div>
      </div>
      <div className="row mb-3 justify-content-between align-items-center">
        <div className="col">Low {Math.floor(cityWeather.main.temp_min)}°C</div>
        <div className="col">High {Math.ceil(cityWeather.main.temp_max)}°C</div>
      </div>
      <div className="row mb-3 justify-content-between align-items-center">
        <div className="col">Wind {Math.round(cityWeather.wind.speed)}m/s</div>
        <div className="col">{getWindDirection(cityWeather.wind.deg)}</div>
      </div>
      <div className="row mb-4 justify-content-between align-items-center">
        <div className="col">
          Sunrise {convertTime(cityWeather.sys.sunrise)}
        </div>
        <div className="col">Sunset {convertTime(cityWeather.sys.sunset)}</div>
      </div>
    </div>
  );
};

export default Weather;
