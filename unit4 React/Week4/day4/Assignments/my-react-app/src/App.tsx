import React from "react";
import Timer from "./components/Timer";

const App: React.FC = () => {
  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>React + TypeScript Timer (CRA)</h1>
      <Timer />
    </div>
  );
};

export default App;
