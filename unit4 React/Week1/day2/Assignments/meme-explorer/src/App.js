import React, { useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [memes, setMemes] = useState([]);
  const [filteredMemes, setFilteredMemes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [sortOption, setSortOption] = useState("");
  const [filterOption, setFilterOption] = useState("");
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  // Manually update body class based on initial theme
  document.body.className = theme;

  const fetchMemes = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await axios.get("https://api.imgflip.com/get_memes");
      const memesData = response.data.data.memes;
      setMemes(memesData);
      setFilteredMemes(memesData);
    } catch (err) {
      setError("Failed to fetch memes.");
    } finally {
      setLoading(false);
    }
  };

  const handleThemeToggle = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.body.className = newTheme;
  };

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearch(value);
    applyFilters(memes, value, sortOption, filterOption);
  };

  const handleSort = (e) => {
    const value = e.target.value;
    setSortOption(value);
    applyFilters(memes, search, value, filterOption);
  };

  const handleFilter = (e) => {
    const value = e.target.value;
    setFilterOption(value);
    applyFilters(memes, search, sortOption, value);
  };

  const applyFilters = (data, searchText, sortOpt, filterOpt) => {
    let temp = [...data];

    if (filterOpt === "width") {
      temp = temp.filter((meme) => meme.width > 500);
    } else if (filterOpt === "height") {
      temp = temp.filter((meme) => meme.height > 500);
    }

    if (searchText) {
      temp = temp.filter((meme) =>
        meme.name.toLowerCase().includes(searchText.toLowerCase())
      );
    }

    if (sortOpt === "name") {
      temp.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortOpt === "width") {
      temp.sort((a, b) => a.width - b.width);
    }

    setFilteredMemes(temp);
  };

  const handleReset = () => {
    setSearch("");
    setSortOption("");
    setFilterOption("");
    setFilteredMemes(memes);
  };

  return (
    <div className={`app ${theme}`}>
      <header>
        <h1>Meme Explorer</h1>
        <button onClick={handleThemeToggle}>
          Toggle {theme === "light" ? "Dark" : "Light"} Mode
        </button>
      </header>

      <div className="controls">
        <button onClick={fetchMemes}>Load Memes</button>
        <input
          type="text"
          placeholder="Search memes..."
          value={search}
          onChange={handleSearch}
        />
        <select value={sortOption} onChange={handleSort}>
          <option value="">Sort By</option>
          <option value="name">Name</option>
          <option value="width">Width</option>
        </select>
        <select value={filterOption} onChange={handleFilter}>
          <option value="">Filter By</option>
          <option value="width">Width > 500</option>
          <option value="height">Height > 500</option>
        </select>
        <button onClick={handleReset}>Reset</button>
      </div>

      {loading && <p className="status">Loading memes...</p>}
      {error && <p className="status error">{error}</p>}
      {!loading && filteredMemes.length === 0 && (
        <p className="status">No memes found.</p>
      )}

      <div className="grid">
        {filteredMemes.map((meme) => (
          <div className="card" key={meme.id}>
            <img src={meme.url} alt={meme.name} />
            <p>{meme.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
