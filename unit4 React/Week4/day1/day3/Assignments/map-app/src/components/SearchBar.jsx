import React, { useCallback, useEffect, useMemo, useState } from "react";
import { geocode } from "../utils/api.js";

const SearchBar = React.memo(function SearchBar({ label = "Search", onPick }) {
  const [q, setQ] = useState("");
  const [results, setResults] = useState([]);
  const [busy, setBusy] = useState(false);

  const canSearch = useMemo(() => q.trim().length >= 3, [q]);

  useEffect(() => {
    const t = setTimeout(async () => {
      if (!canSearch) {
        setResults([]);
        return;
      }
      setBusy(true);
      try {
        const res = await geocode(q);
        setResults(res.slice(0, 8));
      } finally {
        setBusy(false);
      }
    }, 350);
    return () => clearTimeout(t);
  }, [q, canSearch]);

  const pick = useCallback(
    (r) => {
      onPick && onPick(r);
      setQ(r.display_name || "");
      setResults([]);
    },
    [onPick]
  );

  return (
    <div style={{ width: "100%" }}>
      <div className="row">
        <input
          className="input"
          value={q}
          placeholder={`${label} (type 3+ chars)`}
          onChange={(e) => setQ(e.target.value)}
        />
        <span className="kbd">Enter</span>
      </div>
      <div className="list">
        {busy && <div className="small">Searching…</div>}
        {!busy && results.map((r) => (
          <button key={`${r.lat}-${r.lon}-${r.place_id}`} onClick={() => pick(r)} className="card" style={{ textAlign: "left" }}>
            <div style={{ fontWeight: 600 }}>{r.display_name?.split(",")[0]}</div>
            <div className="small">{r.display_name}</div>
          </button>
        ))}
      </div>
    </div>
  );
});

export default SearchBar;
