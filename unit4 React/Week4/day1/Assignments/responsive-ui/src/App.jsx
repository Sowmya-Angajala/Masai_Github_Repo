import React from "react";
import Navbar from "./components/Navbar";
import Card from "./components/Card";
import "./App.css";

export default function App() {
  return (
    <div className="app">
      <Navbar />
      <main className="main-content">
        <Card title="Card 1" />
        <Card title="Card 2" />
        <Card title="Card 3" />
      </main>
    </div>
  );
}
