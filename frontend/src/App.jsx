import { useState } from 'react'
import Navbar from './components/Navbar'
import { useLocation } from 'react-router-dom'

function App() {
  const isOwner = useLocation().pathname.includes("owner");

  return (
    <>

      {!isOwner && <Navbar/>}
    </>
  )
}

export default App
