import axios from "axios";

export async function geocode(q) {
  const url = "https://nominatim.openstreetmap.org/search";
  const { data } = await axios.get(url, {
    params: { q, format: "json", addressdetails: 1, limit: 10 },
    headers: { "Accept-Language": "en", "User-Agent": "optimised-map-app/1.0" }
  });
  return data.map((d) => ({
    lat: parseFloat(d.lat),
    lon: parseFloat(d.lon),
    display_name: d.display_name,
    place_id: d.place_id
  }));
}

export async function routeOSRM([lon1, lat1], [lon2, lat2]) {
  const url = `https://router.project-osrm.org/route/v1/driving/${lon1},${lat1};${lon2},${lat2}`;
  const { data } = await axios.get(url, { params: { overview: "full", alternatives: false, steps: false, geometries: "geojson" } });
  const r = data.routes?.[0];
  if (!r) throw new Error("No route found");
  return {
    geometry: r.geometry,
    distance: r.distance,
    duration: r.duration,
    bbox: r.route_bbox || bboxFromLineString(r.geometry)
  };
}

export async function searchPOI(lat, lon, key = "cafe") {
  const radius = 1500;
  const query = `
    [out:json][timeout:20];
    (
      node["amenity"="${key}"](around:${radius},${lat},${lon});
      way["amenity"="${key}"](around:${radius},${lat},${lon});
      relation["amenity"="${key}"](around:${radius},${lat},${lon});
    );
    out center 20;
  `;
  const { data } = await axios.post("https://overpass-api.de/api/interpreter", query, {
    headers: { "Content-Type": "text/plain" }
  });

  const elements = data.elements || [];
  return elements.slice(0, 20).map((e) => {
    const latlon = e.type === "node" ? { lat: e.lat, lon: e.lon } : { lat: e.center?.lat, lon: e.center?.lon };
    return {
      id: `${e.type}/${e.id}`,
      name: e.tags?.name || e.tags?.brand || key,
      lat: latlon.lat,
      lon: latlon.lon,
      display_name: e.tags?.name || key
    };
  }).filter((p) => isFinite(p.lat) && isFinite(p.lon));
}

export async function getWeather(lat, lon) {
  const { data } = await axios.get("https://api.open-meteo.com/v1/forecast", {
    params: {
      latitude: lat,
      longitude: lon,
      current: "temperature_2m,wind_speed_10m",
      timezone: "auto"
    }
  });
  return data;
}

function bboxFromLineString(geo) {
  if (!geo || geo.type !== "LineString") return null;
  let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
  for (const [x, y] of geo.coordinates) {
    if (x < minX) minX = x;
    if (y < minY) minY = y;
    if (x > maxX) maxX = x;
    if (y > maxY) maxY = y;
  }
  return [minX, minY, maxX, maxY];
}
