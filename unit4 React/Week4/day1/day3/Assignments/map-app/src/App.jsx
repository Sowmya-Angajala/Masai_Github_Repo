import React, { useCallback, useMemo, useState } from "react";
import MapView from "./components/MapView.jsx";
import SearchBar from "./components/SearchBar.jsx";
import RoutePanel from "./components/RoutePanel.jsx";
import POIList from "./components/POIList.jsx";
import GeofencePanel from "./components/GeofencePanel.jsx";
import { useGeolocation } from "./hooks/useGeolocation.js";
import { getWeather } from "./utils/api.js";

export default function App() {
  const { position, error: geoError, request } = useGeolocation({ enableHighAccuracy: false });
  const [origin, setOrigin] = useState(null);
  const [destination, setDestination] = useState(null);
  const [route, setRoute] = useState(null);
  const [pois, setPois] = useState([]);
  const [selected, setSelected] = useState(null);
  const [weather, setWeather] = useState(null);
  const [geofence, setGeofence] = useState(null);

  const hasRoute = Boolean(route && route.geometry && route.distance);

  const mapMarkers = useMemo(() => {
    const m = [];
    if (origin) m.push({ id: "origin", lngLat: [origin.lon, origin.lat], color: "#3ecf8e" });
    if (destination) m.push({ id: "destination", lngLat: [destination.lon, destination.lat], color: "#ff5d5d" });
    if (selected) m.push({ id: "selected", lngLat: [selected.lon, selected.lat], color: "#51a3ff" });
    return m;
  }, [origin, destination, selected]);

  const onPickOrigin = useCallback((place) => setOrigin(place), []);
  const onPickDestination = useCallback((place) => setDestination(place), []);
  const onClearRoute = useCallback(() => setRoute(null), []);
  const onSetRoute = useCallback((r) => setRoute(r), []);
  const onSetPois = useCallback((items) => setPois(items), []);
  const onSelect = useCallback((p) => setSelected(p), []);
  const onSetGeofence = useCallback((g) => setGeofence(g), []);

  const fetchWeather = useCallback(async (lat, lon) => {
    const data = await getWeather(lat, lon);
    setWeather(data);
  }, []);

  return (
    <div className="app">
      <header className="header">
        <h1>Optimised Map Application</h1>
        <span className="badge">React.memo • useMemo • useCallback</span>
        <span className="badge">OSM + MapLibre + OSRM + Overpass + Open‑Meteo</span>
      </header>

      <aside className="sidebar">
        <div className="section">
          <h2>Location</h2>
          <div className="stack">
            <div className="row">
              <button className="button secondary" onClick={request}>Use My Location</button>
              {geoError && <span className="small">Location error</span>}
            </div>
            <div className="small">{position ? `You: ${position.coords.latitude.toFixed(4)}, ${position.coords.longitude.toFixed(4)}` : "Location unknown"}</div>
            <div className="row">
              <SearchBar label="Origin" onPick={onPickOrigin} />
            </div>
            <div className="row">
              <SearchBar label="Destination" onPick={onPickDestination} />
            </div>
          </div>
        </div>

        <div className="section">
          <h2>Routing</h2>
          <RoutePanel
            origin={origin}
            destination={destination}
            onRoute={onSetRoute}
            onClear={onClearRoute}
          />
          {hasRoute && (
            <div className="card small">
              <div>Distance: {(route.distance / 1000).toFixed(2)} km • Time: {(route.duration / 60).toFixed(0)} min</div>
            </div>
          )}
        </div>

        <div className="section">
          <h2>POI Search</h2>
          <POIList origin={origin || (position && { lat: position.coords.latitude, lon: position.coords.longitude })} onSetPois={onSetPois} onSelect={onSelect} />
        </div>

        <div className="section">
          <h2>Geofencing</h2>
          <GeofencePanel geofence={geofence} setGeofence={onSetGeofence} />
        </div>

        <div className="section">
          <h2>Weather</h2>
          <div className="row">
            <button
              className="button"
              onClick={() => {
                const ref = destination || origin || (position && { lat: position.coords.latitude, lon: position.coords.longitude });
                if (ref) fetchWeather(ref.lat, ref.lon);
              }}
            >
              Get Weather for Current Area
            </button>
            <button className="button ghost" onClick={() => setWeather(null)}>Clear</button>
          </div>
          {weather && (
            <div className="card">
              <div className="small">{new Date(weather.current.time).toLocaleString()}</div>
              <div className="row" style={{ justifyContent: "space-between" }}>
                <div>Temp: {weather.current.temperature_2m}°C</div>
                <div>Windspeed: {weather.current.wind_speed_10m} km/h</div>
              </div>
            </div>
          )}
        </div>

        <div className="footer">
          Built for low data usage: vector tiles + debounced search + memoized markers.
        </div>
      </aside>

      <main className="map">
        <MapView
          userPosition={position}
          markers={mapMarkers}
          route={route}
          pois={pois}
          geofence={geofence}
          onMapClick={setSelected}
        />
      </main>
    </div>
  );
}
