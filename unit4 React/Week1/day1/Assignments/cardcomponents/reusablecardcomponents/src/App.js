// src/App.js
import React from "react";
import Card from "./components/card";
// import Card from "./components/Card";

const App = () => {
  return (
    <div style={{ display: "flex", gap: "20px", padding: "20px", flexWrap: "wrap" }}>
      <Card title="About Me">
        <p>Hello! I'm a full-stack developer passionate about React and Firebase.</p>
      </Card>

      <Card title="Project Brewbite">
        <ul>
          <li>E-commerce for coffee & snacks</li>
          <li>Firebase Realtime Database</li>
          <li>Role-based authentication</li>
        </ul>
      </Card>

      <Card title="Contact Info">
        <p>Email: <strong>sumi@example.com</strong></p>
        <p>GitHub: <a href="https://github.com/sowmya-angajala" target="_blank" rel="noopener noreferrer">sowmyaangajala</a></p>
      </Card>
    </div>
  );
};

export default App;
