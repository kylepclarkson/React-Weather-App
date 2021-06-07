import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { DivIcon } from "leaflet"
// CSS
import "leaflet/dist/leaflet.css";
import "./map.css";

const Map = ({ cityCoords, neighborWeather }) => {

  const [activeCity, setActiveCity] = React.useState(null);

  return (
    <div className="map-container">
      <MapContainer center={[cityCoords.lat, cityCoords.lon]} zoom={8}>
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {neighborWeather.list.map((city) => (
          <Marker
            key={city.id}
            position={[city.coord.lat, city.coord.lon]}
            icon={new DivIcon({
                className: "map-icon",
                iconSize: [50, 50],
                html: `<strong>${Math.round(city.main.temp)}°C</strong>`
            })}
          >
            <Popup
              position={[city.coord.lat, city.coord.lon]}
            >
              <strong>{city.name}</strong>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default Map;
