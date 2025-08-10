import React, { useContext } from 'react'
import { Navigate } from 'react-router-dom'
import { AuthContext } from '../contexts/AuthContext'

export default function PrivateRoute({ children }){
  const { state } = useContext(AuthContext)
  if(!state.isAuthenticated) return <Navigate to="/login" replace />
  return children
}