import React, { createContext, useReducer, useEffect } from 'react'
import { authReducer, initialAuthState } from '../reducer/authReducer'

export const AuthContext = createContext()

export function AuthProvider({ children }){
  const [state, dispatch] = useReducer(authReducer, initialAuthState, ()=>{
    try{
      const stored = localStorage.getItem('auth')
      return stored ? JSON.parse(stored) : initialAuthState
    }catch(e){
      return initialAuthState
    }
  })

  useEffect(()=>{
    localStorage.setItem('auth', JSON.stringify(state))
  },[state])

  const login = (user, token) => dispatch({ type:'LOGIN_SUCCESS', payload:{ user, token } })
  const logout = ()=>{
    dispatch({ type:'LOGOUT' })
    localStorage.removeItem('auth')
  }

  return (
    <AuthContext.Provider value={{ state, dispatch, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}