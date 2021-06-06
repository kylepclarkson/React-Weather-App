import React from "react";

import "./App.css";
import api from "./weather_api.js";

import SearchBar from "./components/SearchBar";
import Weather from "./components/Weather";

function App() {
  // The city to query weather data.
  const [city, setCity] = React.useState("");
  // The weather for the queried city.
  const [cityWeather, setCityWeather] = React.useState(null);
  // Weather of neighboring cities.
  const [neighborWeather, setNeighborWeather] = React.useState(null);
  // Loading data
  const [loadingData, setLoadingData] = React.useState(false);

  const NUM_NEIGHBORING_CITIES = 20;

  // Fetch weather data from API using queried city.
  const getWeatherData = async () => {
    setLoadingData(true);
    const response = await fetch(
      `${api.API_BASE_URL}weather?q=${city}&units=metric&appid=${api.API_KEY}`
    );
    if (response.ok) {
      const data = await response.json();
      setCityWeather(data);
      getNeighboringWeatherData(data.coord);
    } else {
      // TODO display error.
      console.log("Error fetching data.");
    }
    setLoadingData(false);
  };

  const getNeighboringWeatherData = async ({ lat, lon }) => {
    const response = await fetch(
      `${api.API_BASE_URL}find?lat=${lat}&lon=${lon}&cnt=${NUM_NEIGHBORING_CITIES}&appid=${api.API_KEY}`
    );
    if (response.ok) {
      const data = await response.json();
      console.log("Neighbors", data);
    } else {
      console.log("Error fetching data for cities.");
    }
  };

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
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-4 col-sm-12 city-weather">
          <SearchBar
            city={city}
            setCity={setCity}
            getWeatherData={getWeatherData}
          />
          {cityWeather ? (
            <Weather cityWeather={cityWeather} />
          ) : (
            // Empty
            ""
          )}
        </div>
        <div className="col-md-8 col-sm-12 map">
          {neighborWeather ? (
            <div></div>
          ) : (
            // Empty
            ""
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
