import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    setError("");
    try {
      login(form);
      navigate("/dashboard");
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <div className="card">
      <h2>Log in</h2>
      {error && <div className="error">{error}</div>}
      <form onSubmit={handleSubmit} className="form">
        <label>Email<input value={form.email} onChange={(e)=>setForm({...form, email:e.target.value})} type="email" /></label>
        <label>Password<input value={form.password} onChange={(e)=>setForm({...form, password:e.target.value})} type="password" /></label>
        <button type="submit">Login</button>
      </form>
    </div>
  );
}
