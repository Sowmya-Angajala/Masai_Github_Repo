import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext.jsx";

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  async function handleLogout() {
    logout();
    navigate("/login");
  }

  return (
    <nav className="nav">
      <div className="nav-left">
        <Link to="/dashboard" className="brand">CountrySearch</Link>
      </div>
      <div className="nav-right">
        <label className="theme-switch">
          <input
            type="checkbox"
            id="themeToggle"
            onChange={(e) => {
              document.documentElement.dataset.theme = e.target.checked ? "dark" : "light";
            }}
          />
          <span>Dark</span>
        </label>
        {user ? (
          <>
            <span className="nav-user">Hi, {user.name}</span>
            <button onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/signup">Sign up</Link>
          </>
        )}
      </div>
    </nav>
  );
}
