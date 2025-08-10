import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

const STORAGE_KEY = "rcsa_auth_user";

/*
 Simple localStorage-based auth.
 user object: { email, name }
*/

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) setUser(JSON.parse(raw));
  }, []);

  function signup({ name, email, password }) {
    // Store users in localStorage for demo
    const users = JSON.parse(localStorage.getItem("rcsa_users") || "{}");
    if (users[email]) {
      throw new Error("Email already registered");
    }
    users[email] = { name, email, password };
    localStorage.setItem("rcsa_users", JSON.stringify(users));
    const u = { name, email };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(u));
    setUser(u);
  }

  function login({ email, password }) {
    const users = JSON.parse(localStorage.getItem("rcsa_users") || "{}");
    const account = users[email];
    if (!account || account.password !== password) {
      throw new Error("Invalid credentials");
    }
    const u = { name: account.name, email };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(u));
    setUser(u);
  }

  function logout() {
    localStorage.removeItem(STORAGE_KEY);
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, signup, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
