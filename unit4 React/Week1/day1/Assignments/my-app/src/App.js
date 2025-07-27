import React, { useState } from "react";
import "./App.css";
import Navbar from "./Components/NavBar";

function App() {
  const [activePage, setActivePage] = useState("home");

  const renderPage = () => {
    switch (activePage) {
      case "home":
        return <h2 className="page-content">Welcome to Home</h2>;
      case "about":
        return <h2 className="page-content">About Us</h2>;
      case "contact":
        return <h2 className="page-content">Contact Us</h2>;
      default:
        return <h2 className="page-content">Welcome</h2>;
    }
  };

  return (
    <div className="App">
      <Navbar onNavigate={setActivePage} />
      {renderPage()}
    </div>
  );
}

export default App;
