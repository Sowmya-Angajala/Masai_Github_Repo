import React, { useCallback, useState } from "react";
import { routeOSRM } from "../utils/api.js";

const RoutePanel = React.memo(function RoutePanel({ origin, destination, onRoute, onClear }) {
  const [busy, setBusy] = useState(false);

  const getRoute = useCallback(async () => {
    if (!origin || !destination) return;
    setBusy(true);
    try {
      const res = await routeOSRM([origin.lon, origin.lat], [destination.lon, destination.lat]);
      onRoute(res);
    } finally {
      setBusy(false);
    }
  }, [origin, destination, onRoute]);

  return (
    <div className="stack">
      <div className="row">
        <button className="button" onClick={getRoute} disabled={!origin || !destination || busy}>
          {busy ? "Routing…" : "Get Route"}
        </button>
        <button className="button ghost" onClick={onClear}>Clear</button>
      </div>
      <div className="small">
        Uses OSRM demo API, prioritizes shortest travel time. For production, host OSRM or use a key-based service.
      </div>
    </div>
  );
});

export default RoutePanel;
