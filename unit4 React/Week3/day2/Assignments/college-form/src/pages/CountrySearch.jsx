import React, { useEffect, useState, useRef } from "react";
import useDebounce from "../hooks/useDebounce";

const API_URL = "https://api.first.org/data/v1/countries";

export default function CountrySearch() {
  const [query, setQuery] = useState("");
  const debouncedQuery = useDebounce(query, 500);
  const [results, setResults] = useState([]); // full country array
  const [filtered, setFiltered] = useState([]); // result page
  const [page, setPage] = useState(1);
  const pageSize = 20;
  const [mode, setMode] = useState("pagination"); // or 'infinite'
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // fetch once (or fetch on debouncedQuery for server-side filtering)
  useEffect(() => {
    async function fetchCountries() {
      setLoading(true);
      try {
        const res = await fetch(API_URL);
        const json = await res.json();
        // API returns data object keyed by code; convert to array
        const arr = Object.entries(json.data || {}).map(([code, obj]) => ({ code, ...obj }));
        setResults(arr);
        setError(null);
        setPage(1);
      } catch (err) {
        setError("Failed to fetch countries");
      } finally {
        setLoading(false);
      }
    }
    fetchCountries();
  }, []);

  useEffect(() => {
    // apply client-side filter using debouncedQuery
    const q = debouncedQuery.trim().toLowerCase();
    const filteredAll = q
      ? results.filter(c => c.country.toLowerCase().includes(q) || (c.region || "").toLowerCase().includes(q))
      : results;
    if (mode === "pagination") {
      const start = (page - 1) * pageSize;
      setFiltered(filteredAll.slice(start, start + pageSize));
    } else {
      // infinite: accumulate pages
      const end = page * pageSize;
      setFiltered(filteredAll.slice(0, end));
    }
  }, [debouncedQuery, results, page, mode]);

  // infinite scroll handler
  const observerRef = useRef();
  useEffect(() => {
    if (mode !== "infinite") return;
    const rc = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        setPage(prev => prev + 1);
      }
    }, { root: null, rootMargin: "200px", threshold: 0.1 });

    if (observerRef.current) rc.observe(observerRef.current);
    return () => rc.disconnect();
  }, [mode]);

  // switch mode: reset page/filtered
  const toggleMode = () => {
    setMode(m => (m === "pagination" ? "infinite" : "pagination"));
    setPage(1);
  };

  return (
    <div>
      <div style={{ display: "flex", gap: 8 }}>
        <input value={query} onChange={e => setQuery(e.target.value)} placeholder="Search countries..." />
        <button onClick={toggleMode}>Mode: {mode}</button>
      </div>

      {loading && <p>Loading countries...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      <div>
        {filtered.map(c => (
          <div key={c.code} style={{ padding: 8, borderBottom: "1px solid #eee" }}>
            <strong>{c.country}</strong> — {c.region || "—"}
          </div>
        ))}
      </div>

      {mode === "pagination" && (
        <div style={{ marginTop: 12 }}>
          <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1}>Prev</button>
          <span style={{ margin: "0 8px" }}>Page {page}</span>
          <button onClick={() => setPage(p => p + 1)} disabled={(page * pageSize) >= results.length}>Next</button>
        </div>
      )}

      {mode === "infinite" && <div ref={observerRef} style={{ height: 1 }} />}
    </div>
  );
}
