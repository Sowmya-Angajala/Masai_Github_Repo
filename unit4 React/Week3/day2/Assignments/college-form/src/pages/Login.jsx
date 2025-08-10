import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const { login } = useContext(AuthContext);
  const nav = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    if (!email || !password) {
      setError("All fields are required");
      return;
    }

    // fake auth logic: in real apps, check credentials via API
    const user = { name: email.split("@")[0], email };
    const token = "fake-token-" + Date.now();
    login(user, token);

    nav("/dashboard");
  }

  return (
    <div className="card" style={{ maxWidth: 520, margin: "0 auto", padding: "1rem" }}>
      <h2>Login</h2>
      <form onSubmit={handleSubmit} style={{ display: "grid", gap: 8 }}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {error && <p style={{ color: "red", fontSize: "0.9rem" }}>{error}</p>}

        <button type="submit">Login</button>
      </form>
    </div>
  );
}
