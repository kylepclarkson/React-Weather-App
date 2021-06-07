import React from "react";

import "./App.css";
import api from "./weather_api.js";

import SearchBar from "./components/SearchBar";
import Weather from "./components/Weather";
import Map from "./components/Map";

function App() {
  // The city to query weather data.
  const [city, setCity] = React.useState("");
  // The weather for the queried city.
  const [cityWeather, setCityWeather] = React.useState(null);
  // Weather of neighboring cities.
  const [neighborWeather, setNeighborWeather] = React.useState(null);

  const NUM_NEIGHBORING_CITIES = 20;

  // Fetch weather data from API using queried city.
  const getWeatherData = async () => {
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
  };

  const getNeighboringWeatherData = async ({ lat, lon }) => {
    const response = await fetch(
      `${api.API_BASE_URL}find?lat=${lat}&lon=${lon}&cnt=${NUM_NEIGHBORING_CITIES}&units=metric&appid=${api.API_KEY}`
    );
    if (response.ok) {
      const data = await response.json();
      setNeighborWeather(data);
    } else {
      console.log("Error fetching data for cities.");
    }
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
        <div className="col-md-8 col-sm-12 vh-100">
          {neighborWeather ? (
            <Map
              cityCoords={cityWeather.coord}
              neighborWeather={neighborWeather}
            />
          ) : (
            <div className="d-flex h-100 justify-content-center align-items-center">
              <div className="placeholder-wrapper">
                <div className="text-center">
                  <h2>React Weather</h2>
                  <p>
                    A weather app built with React, Leaflet, and the OpenWeather
                    API.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
