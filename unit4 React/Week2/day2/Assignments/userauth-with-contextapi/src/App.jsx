import React from 'react'
import './App.css'
import { AuthProvider } from './context/AuthContext'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Main from './components/Main'

function App() {


  return (
    <>
      <AuthProvider>
       
          <Navbar/>
          <Main/>
          <Footer/>
        
      </AuthProvider>
    </>
  )
}

export default App
