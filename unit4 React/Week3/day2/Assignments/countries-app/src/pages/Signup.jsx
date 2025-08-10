import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export default function Signup() {
  const { signup } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "", confirm: "" });
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    if (!form.name || !form.email || !form.password) {
      return setError("Please fill all required fields");
    }
    if (form.password.length < 6) return setError("Password must be 6+ chars");
    if (form.password !== form.confirm) return setError("Passwords do not match");

    try {
      signup({ name: form.name, email: form.email, password: form.password });
      navigate("/dashboard");
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <div className="card">
      <h2>Sign up</h2>
      {error && <div className="error">{error}</div>}
      <form onSubmit={handleSubmit} className="form">
        <label>Name<input value={form.name} onChange={(e)=>setForm({...form, name:e.target.value})} /></label>
        <label>Email<input value={form.email} onChange={(e)=>setForm({...form, email:e.target.value})} type="email" /></label>
        <label>Password<input value={form.password} onChange={(e)=>setForm({...form, password:e.target.value})} type="password" /></label>
        <label>Confirm Password<input value={form.confirm} onChange={(e)=>setForm({...form, confirm:e.target.value})} type="password" /></label>
        <button type="submit">Create account</button>
      </form>
    </div>
  );
}
