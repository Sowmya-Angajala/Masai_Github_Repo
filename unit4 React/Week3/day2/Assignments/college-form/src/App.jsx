import React from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Dashboard from './pages/Dashboard'
import CountrySearch from './pages/CountrySearch'
import CollegeForm from './pages/CollegeForm'
import PrivateRoute from './components/PrivateRoute'
import ThemeToggle from './components/ThemeToggle'
import { useContext } from 'react'
import { AuthContext } from './contexts/AuthContext'

export default function App() {
  const { state, logout } = useContext(AuthContext)
  return (
    <div className="app-root">
      <header className="app-header">
        <Link to="/">Home</Link>
        <nav>
          <Link to="/countries">Countries</Link>
          <Link to="/college">College Form</Link>
          {state.isAuthenticated ? (
            <>
              <span className="user">{state.user?.name || 'User'}</span>
              <button onClick={logout}>Logout</button>
            </>
          ) : (
            <>
              <Link to="/login">Login</Link>
              <Link to="/signup">Signup</Link>
            </>
          )}
          <ThemeToggle />
        </nav>
      </header>

      <main className="app-main">
        <Routes>
          <Route path="/" element={<div style={{padding:20}}>Welcome! Use the nav to open features.</div>} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          <Route
            path="/countries"
            element={<PrivateRoute><CountrySearch /></PrivateRoute>}
          />

          <Route
            path="/college"
            element={<PrivateRoute><CollegeForm /></PrivateRoute>}
          />

          <Route
            path="/dashboard"
            element={<PrivateRoute><Dashboard /></PrivateRoute>}
          />

          <Route path="*" element={<div style={{padding:20}}>Not found</div>} />
        </Routes>
      </main>

      <footer className="app-footer">Made for assignment — useReducer, auth, debounce, pagination</footer>
    </div>
  )
}