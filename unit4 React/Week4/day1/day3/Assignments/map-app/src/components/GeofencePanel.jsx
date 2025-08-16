import React, { useCallback, useState } from "react";

const GeofencePanel = React.memo(function GeofencePanel({ geofence, setGeofence }) {
  const [radius, setRadius] = useState(500);

  const setHere = useCallback(() => {
    if (!geofence || !geofence.center) return;
    setGeofence({ center: geofence.center, radius });
  }, [geofence, radius, setGeofence]);

  const fromClipboard = useCallback(async () => {
    try {
      const text = await navigator.clipboard.readText();
      const [lat, lon] = text.split(",").map((x) => parseFloat(x.trim()));
      if (!isFinite(lat) || !isFinite(lon)) return;
      setGeofence({ center: { lat, lon }, radius });
    } catch {}
  }, [radius, setGeofence]);

  return (
    <div className="stack">
      <div className="row">
        <input
          type="number"
          className="input"
          min="50"
          step="50"
          value={radius}
          onChange={(e) => setRadius(parseInt(e.target.value || "0", 10))}
          placeholder="Radius (m)"
        />
        <span className="kbd">m</span>
      </div>
      <div className="row">
        <button
          className="button"
          onClick={() => setGeofence((prev) => prev?.center ? { center: prev.center, radius } : prev)}
          disabled={!geofence?.center}
        >
          Update Radius
        </button>
        <button className="button ghost" onClick={() => setGeofence(null)}>Clear</button>
      </div>
      <div className="small">Tip: Click on the map to set a center, then update radius. Or paste "lat, lon" from clipboard.</div>
      <div className="row">
        <button className="button secondary" onClick={fromClipboard}>Use Clipboard Coords</button>
      </div>
    </div>
  );
});

export default GeofencePanel;
