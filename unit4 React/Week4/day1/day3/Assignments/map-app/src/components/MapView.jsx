import React, { useEffect, useRef, useMemo } from "react";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";

const MapView = React.memo(function MapView({ userPosition, markers, route, pois, geofence, onMapClick }) {
  const mapRef = useRef(null);
  const mapDivRef = useRef(null);
  const routeSourceId = "route";
  const poiSourceId = "pois";
  const geofenceSourceId = "geofence";

  const initialCenter = useMemo(() => {
    if (userPosition) return [userPosition.coords.longitude, userPosition.coords.latitude];
    return [77.5946, 12.9716];
  }, [userPosition]);

  useEffect(() => {
    if (mapRef.current) return;
    const map = new maplibregl.Map({
      container: mapDivRef.current,
      style: "https://demotiles.maplibre.org/style.json",
      center: initialCenter,
      zoom: 11,
      attributionControl: true
    });
    map.addControl(new maplibregl.NavigationControl({ visualizePitch: true }), "bottom-right");
    map.on("click", (e) => {
      onMapClick && onMapClick({ lat: e.lngLat.lat, lon: e.lngLat.lng, display_name: `Dropped Pin (${e.lngLat.lat.toFixed(4)}, ${e.lngLat.lng.toFixed(4)})` });
    });
    mapRef.current = map;
    return () => map.remove();
  }, [initialCenter, onMapClick]);

  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;
    map.setCenter(initialCenter);
  }, [initialCenter]);

  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;

    const existing = document.querySelectorAll(".ml-marker");
    existing.forEach((el) => el.remove());

    markers.forEach((m) => {
      const el = document.createElement("div");
      el.className = "ml-marker";
      el.style.width = "14px";
      el.style.height = "14px";
      el.style.borderRadius = "50%";
      el.style.border = "2px solid #000";
      el.style.background = m.color || "#51a3ff";
      new maplibregl.Marker(el).setLngLat(m.lngLat).addTo(map);
    });

    if (userPosition) {
      const u = document.createElement("div");
      u.className = "ml-marker";
      u.style.width = "12px";
      u.style.height = "12px";
      u.style.borderRadius = "50%";
      u.style.border = "2px solid #000";
      u.style.background = "#ffd644";
      new maplibregl.Marker(u).setLngLat([userPosition.coords.longitude, userPosition.coords.latitude]).addTo(map);
    }
  }, [markers, userPosition]);

  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;

    if (map.getLayer("route-line")) {
      map.removeLayer("route-line");
    }
    if (map.getSource(routeSourceId)) {
      map.removeSource(routeSourceId);
    }
    if (!route || !route.geometry) return;

    map.addSource(routeSourceId, {
      type: "geojson",
      data: {
        type: "Feature",
        properties: {},
        geometry: route.geometry
      }
    });

    map.addLayer({
      id: "route-line",
      type: "line",
      source: routeSourceId,
      paint: {
        "line-color": "#51a3ff",
        "line-width": 5
      }
    });

    const bbox = route.bbox || undefined;
    if (bbox) {
      map.fitBounds([[bbox[0], bbox[1]], [bbox[2], bbox[3]]], { padding: 40, duration: 500 });
    }
  }, [route]);

  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;

    if (map.getLayer("poi-circle")) map.removeLayer("poi-circle");
    if (map.getSource(poiSourceId)) map.removeSource(poiSourceId);
    if (!pois || !pois.length) return;

    map.addSource(poiSourceId, {
      type: "geojson",
      data: {
        type: "FeatureCollection",
        features: pois.map((p) => ({
          type: "Feature",
          properties: { title: p.name || p.display_name },
          geometry: { type: "Point", coordinates: [p.lon, p.lat] }
        }))
      }
    });
    map.addLayer({
      id: "poi-circle",
      type: "circle",
      source: poiSourceId,
      paint: {
        "circle-radius": 5,
        "circle-color": "#3ecf8e",
        "circle-stroke-width": 1,
        "circle-stroke-color": "#000000"
      }
    });
  }, [pois]);

  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;

    if (map.getLayer("geofence-fill")) map.removeLayer("geofence-fill");
    if (map.getLayer("geofence-outline")) map.removeLayer("geofence-outline");
    if (map.getSource(geofenceSourceId)) map.removeSource(geofenceSourceId);
    if (!geofence) return;

    const { center, radius } = geofence;
    const steps = 64;
    const coords = [];
    for (let i = 0; i <= steps; i++) {
      const angle = (i / steps) * 360;
      const d = radius / 1000;
      const dx = (d / 111.32) * Math.cos((angle * Math.PI) / 180);
      const dy = (d / 110.57) * Math.sin((angle * Math.PI) / 180);
      coords.push([center.lon + dx, center.lat + dy]);
    }

    map.addSource(geofenceSourceId, {
      type: "geojson",
      data: {
        type: "Feature",
        geometry: { type: "Polygon", coordinates: [coords] }
      }
    });
    map.addLayer({
      id: "geofence-fill",
      type: "fill",
      source: geofenceSourceId,
      paint: { "fill-color": "#ff5d5d", "fill-opacity": 0.15 }
    });
    map.addLayer({
      id: "geofence-outline",
      type: "line",
      source: geofenceSourceId,
      paint: { "line-color": "#ff5d5d", "line-width": 2 }
    });
  }, [geofence]);

  useEffect(() => {
    if (!geofence || !userPosition) return;
    const { center, radius } = geofence;
    const dist = haversine(center.lat, center.lon, userPosition.coords.latitude, userPosition.coords.longitude);
    const inside = dist <= radius;
    if (inside && !geofence._wasInside) {
      alert("Entered geofenced area");
      geofence._wasInside = true;
    } else if (!inside && geofence._wasInside) {
      alert("Exited geofenced area");
      geofence._wasInside = false;
    }
  }, [geofence, userPosition]);

  return <div id="map" ref={mapDivRef} />;
});

function haversine(lat1, lon1, lat2, lon2) {
  const toRad = (d) => (d * Math.PI) / 180;
  const R = 6371000;
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a = Math.sin(dLat / 2) ** 2 + Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) ** 2;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

export default MapView;
