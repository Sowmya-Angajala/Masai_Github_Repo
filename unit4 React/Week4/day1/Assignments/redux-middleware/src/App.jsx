// App.jsx
import React, { useState } from "react";
import { CoffeeList } from "./components/CoffeeList";

function App() {
  const [sortBy, setSortBy] = useState("");

  return (
    <div className="app">
      <aside className="sidebar">
        <h2>Sort By</h2>
        <button onClick={() => setSortBy("price")}>Price</button>
        <button onClick={() => setSortBy("title")}>Name</button>
      </aside>
      <main>
        <CoffeeList sortBy={sortBy} />
      </main>
    </div>
  );
}

export default App;
