import React from "react";
import Card from "./components/Card";
import "./App.css";

function App() {
  return (
    <div className="app">
      <Card
        title="Beautiful Sunset"
        image="https://images.unsplash.com/photo-1501973801540-537f08ccae7b"
        description="A breathtaking view of the sunset over the ocean."
      />
    </div>
  );
}

export default App;
