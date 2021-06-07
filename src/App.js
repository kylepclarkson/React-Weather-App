import React from "react";

import "./App.css";
import api from "./weather_api.js";

import SearchBar from "./components/SearchBar";
import Weather from "./components/Weather";
import Map from "./components/Map"

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
      `${api.API_BASE_URL}find?lat=${lat}&lon=${lon}&cnt=${NUM_NEIGHBORING_CITIES}&units=metric&appid=${api.API_KEY}`
    );
    if (response.ok) {
      const data = await response.json();
      setNeighborWeather(data);
      console.log("Neighbors", data);
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
        <div className="col-md-8 col-sm-12 map">
          {neighborWeather ? (
            <Map
              cityCoords={cityWeather.coord}
              neighborWeather={neighborWeather}
            />
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
