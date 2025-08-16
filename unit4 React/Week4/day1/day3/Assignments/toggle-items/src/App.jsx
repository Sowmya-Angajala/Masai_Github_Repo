import React from "react";
import useToggleItems from "./useToggleItems";

function App() {
  const [state, toggleState] = useToggleItems(["A", "B", "C"], 1);

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>useToggleItems Hook Demo</h2>
      <p>
        Current Item: <strong>{state}</strong>
      </p>
      <button
        onClick={toggleState}
        style={{
          padding: "10px 20px",
          fontSize: "16px",
          cursor: "pointer",
          marginTop: "10px",
        }}
      >
        Toggle Item
      </button>
    </div>
  );
}

export default App;
