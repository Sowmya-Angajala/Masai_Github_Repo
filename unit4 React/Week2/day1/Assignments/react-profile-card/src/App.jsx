import { useState } from 'react'

import './App.css'
import ProfileCard from './Components/ProfileCard'

function App() {
  

  return (
    <>
      <ProfileCard Name="Sowmya Angajala" Age="22" Bio ="I’m currently on a transformative journey with Masai where I’m honing my skills as a full-stack web developer. At Masai I’ve been focusing on mastering MERN stack (MongoDB, Express.js, React, Node.js), along with building real-world projects that emphasize problem-solving, clean coding practices, and industry-standard development workflows.

Through Masai’s rigorous curriculum and daily coding practice, I’ve worked on:

Dynamic React applications with routing and API integration.

Firebase Authentication systems with role-based access.E-Commerce platforms involving vendor/customer dashboards, shopping carts,  and order management.

UI/UX principles to build responsive, interactive web interfaces.

Solving DSA problems daily for 2+ hours, especially focusing on JavaScript fundamentals, recursion dry runs, and efficient code practices.

Masai’s hands-on learning approach, peer code reviews, and project-based modules have helped me gain confidence in both frontend and backend development, preparing me to solve real-world business problems through code."  />
    </>
  )
}

export default App
