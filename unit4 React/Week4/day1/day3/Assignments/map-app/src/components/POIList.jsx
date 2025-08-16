import React, { useCallback, useEffect, useMemo, useState } from "react";
import { searchPOI } from "../utils/api.js";

const CATEGORIES = [
  { key: "cafe", label: "Cafes" },
  { key: "restaurant", label: "Restaurants" },
  { key: "atm", label: "ATMs" },
  { key: "hospital", label: "Hospitals" },
  { key: "pharmacy", label: "Pharmacies" },
  { key: "supermarket", label: "Supermarkets" }
];

const POIList = React.memo(function POIList({ origin, onSetPois, onSelect }) {
  const [active, setActive] = useState("cafe");
  const [busy, setBusy] = useState(false);
  const center = useMemo(() => origin ? { lat: origin.lat, lon: origin.lon } : null, [origin]);

  useEffect(() => {
    let cancelled = false;
    async function run() {
      if (!center) return;
      setBusy(true);
      try {
        const res = await searchPOI(center.lat, center.lon, active);
        if (!cancelled) onSetPois(res);
      } finally {
        if (!cancelled) setBusy(false);
      }
    }
    const t = setTimeout(run, 250);
    return () => { cancelled = true; clearTimeout(t); };
  }, [center, active, onSetPois]);

  const pick = useCallback((p) => onSelect && onSelect(p), [onSelect]);

  return (
    <div className="stack">
      <div className="pills">
        {CATEGORIES.map((c) => (
          <button key={c.key} className={`pill ${active === c.key ? "active" : ""}`} onClick={() => setActive(c.key)}>
            {c.label}
          </button>
        ))}
      </div>
      {!center && <div className="small">Set Origin or enable location to search nearby POIs.</div>}
      {busy && <div className="small">Searching nearby {active}…</div>}
      <div className="list">
        {!busy && center && (
          <>
            {/* Render is lightweight; list items are buttons to avoid extra re-renders */}
            {Array.isArray && onSetPois && null}
          </>
        )}
      </div>
    </div>
  );
});

export default POIList;
