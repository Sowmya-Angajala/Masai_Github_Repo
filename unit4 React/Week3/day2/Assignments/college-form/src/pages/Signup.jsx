import React, { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../contexts/AuthContext'

export default function Signup(){
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)
  const { login } = useContext(AuthContext)
  const nav = useNavigate()

  function handleSubmit(e){
    e.preventDefault()
    if(!name || !email || !password){ 
      setError('All fields required') 
      return 
    }
    // fake signup: create user object, token
    const user = { name, email }
    const token = 'fake-token-' + Date.now()
    login(user, token)
    nav('/dashboard')
  }

  return (
    <div className="card" style={{maxWidth:520, margin:"0 auto", padding:"1rem"}}>
      <h2>Signup</h2>
      <form onSubmit={handleSubmit} style={{display:'grid',gap:8}}>
        <input 
          type="text" 
          placeholder="Name" 
          value={name} 
          onChange={e => setName(e.target.value)} 
        />
        <input 
          type="email" 
          placeholder="Email" 
          value={email} 
          onChange={e => setEmail(e.target.value)} 
        />
        <input 
          type="password" 
          placeholder="Password" 
          value={password} 
          onChange={e => setPassword(e.target.value)} 
        />
        {error && <p style={{color:'red', fontSize:'0.9rem'}}>{error}</p>}
        <button type="submit">Sign Up</button>
      </form>
    </div>
  )
}
