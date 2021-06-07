import React from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import { DivIcon } from "leaflet";
// CSS
import "leaflet/dist/leaflet.css";
import "./map.css";

const Map = ({ cityCoords, neighborWeather }) => {
  // Child component of map. Updates map center such that all neighboring cities are visible
  // and that max zoom is achieved
  const UpdateMapView = () => {
    const map = useMap();
    const bounds = neighborWeather.list.map((city) => [
      city.coord.lat,
      city.coord.lon,
    ]);
    map.flyToBounds(bounds);
    return null;
  };

  return (
    <div className="map-container">
      <MapContainer center={[cityCoords.lat, cityCoords.lon]} zoom={8}>
        <UpdateMapView />
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
          url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager_labels_under/{z}/{x}/{y}{r}.png"
        />

        {neighborWeather.list.map((city) => (
          <Marker
            key={city.id}
            position={[city.coord.lat, city.coord.lon]}
            icon={
              new DivIcon({
                className: "map-icon",
                iconSize: [42, 42],
                html: `<strong>${Math.round(city.main.temp)}°C</strong>`,
              })
            }
          >
            <Popup position={[city.coord.lat, city.coord.lon]}>
              <strong>{city.name}</strong>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default Map;
