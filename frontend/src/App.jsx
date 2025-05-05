import { useState } from 'react'
import Navbar from './components/Navbar'
import { Route, Routes, useLocation } from 'react-router-dom'
import LandingPage from './pages/LandingPage';

function App() {
  const isOwner = useLocation().pathname.includes("owner");

  return (
    <>

      {!isOwner && <Navbar/>}

      <div className='min-h-[70vh]'>
        <Routes>
          <Route path="/" element={<LandingPage/>} />
        </Routes>
      </div>
    </>
  )
}

export default App
