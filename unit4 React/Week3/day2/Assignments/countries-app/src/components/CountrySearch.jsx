import React, { useEffect, useState, useRef, useCallback } from "react";
import useDebounce from "../hooks/useDebounce";

/*
 Features:
 - search (by name or code)
 - debounce requests
 - toggle: pagination or infinite scroll
 - error handling
 - suggestions dropdown as you type
*/

const API = "https://api.first.org/data/v1/countries";

export default function CountrySearch() {
  const [query, setQuery] = useState("");
  const debouncedQuery = useDebounce(query, 500);
  const [countries, setCountries] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [error, setError] = useState("");
  const [mode, setMode] = useState("pagination"); // or "infinite"
  const [page, setPage] = useState(1);
  const pageSize = 20;
  const loaderRef = useRef(null);

  // fetch entire dataset once (small enough for this API)
  useEffect(() => {
    setError("");
    fetch(API)
      .then((r) => r.json())
      .then((data) => {
        if (!data || !data.data) throw new Error("Bad data");
        // data.data is keyed object; convert to array
        const arr = Object.entries(data.data).map(([code, info]) => ({
          code,
          name: info.country,
          region: info.region || ""
        }));
        setCountries(arr);
        setFiltered(arr);
      })
      .catch((err) => {
        setError("Failed to fetch countries: " + err.message);
      });
  }, []);

  // filter on debounced query
  useEffect(() => {
    if (!debouncedQuery) {
      setFiltered(countries);
      setPage(1);
      return;
    }
    const q = debouncedQuery.toLowerCase();
    const res = countries.filter(
      (c) => c.name.toLowerCase().includes(q) || c.code.toLowerCase().includes(q)
    );
    setFiltered(res);
    setPage(1);
  }, [debouncedQuery, countries]);

  // suggestions for dropdown
  const suggestions = filtered.slice(0, 6);

  // Pagination slice
  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const paged = filtered.slice((page - 1) * pageSize, page * pageSize);

  // Infinite scroll observer
  const handleObserver = useCallback((entries) => {
    const target = entries[0];
    if (target.isIntersecting) {
      setPage((p) => {
        if (p * pageSize >= filtered.length) return p;
        return p + 1;
      });
    }
  }, [filtered.length]);

  useEffect(() => {
    if (mode !== "infinite") return;
    const observer = new IntersectionObserver(handleObserver, { threshold: 1.0 });
    const el = loaderRef.current;
    if (el) observer.observe(el);
    return () => {
      if (el) observer.unobserve(el);
    };
  }, [handleObserver, mode]);

  // Display list depending on mode
  const displayList = mode === "pagination" ? paged : filtered.slice(0, page * pageSize);

  return (
    <div className="search-card">
      <div className="search-controls">
        <input
          placeholder="Search countries by name or code..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <div className="small-note">Suggestions:</div>
        <div className="suggestions">
          {suggestions.map((s) => (
            <button key={s.code} onClick={() => setQuery(s.name)} className="pill">
              {s.name} ({s.code})
            </button>
          ))}
          {suggestions.length === 0 && <small>No suggestions</small>}
        </div>

        <div style={{ marginTop: 8 }}>
          <label>
            <input type="radio" checked={mode === "pagination"} onChange={()=>{setMode("pagination"); setPage(1);}}/> Pagination
          </label>
          <label style={{ marginLeft: 12 }}>
            <input type="radio" checked={mode === "infinite"} onChange={()=>{setMode("infinite"); setPage(1);}}/> Infinite scroll
          </label>
        </div>
      </div>

      <div className="list">
        {error && <div className="error">{error}</div>}
        <div className="list-grid">
          {displayList.map((c) => (
            <div key={c.code} className="country-card">
              <strong>{c.name}</strong>
              <div>Code: {c.code}</div>
              <div>Region: {c.region || "—"}</div>
            </div>
          ))}
        </div>

        {mode === "pagination" && (
          <div className="pagination">
            <button onClick={()=>setPage(p=>Math.max(1,p-1))} disabled={page===1}>Prev</button>
            <span>Page {page} / {totalPages}</span>
            <button onClick={()=>setPage(p=>Math.min(totalPages,p+1))} disabled={page===totalPages}>Next</button>
          </div>
        )}

        {mode === "infinite" && (
          <>
            <div ref={loaderRef} style={{ height: 1 }} />
            <div style={{ marginTop: 10 }}>
              Showing {Math.min(filtered.length, page * pageSize)} of {filtered.length}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
