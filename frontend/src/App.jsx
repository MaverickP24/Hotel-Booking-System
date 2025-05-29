import { useState } from 'react'
import Navbar from './components/Navbar'
import { Route, Routes, useLocation } from 'react-router-dom'
import LandingPage from './pages/LandingPage';
import Footer from './components/Footer'
import Rooms from './pages/Rooms';

function App() {
  const isOwner = useLocation().pathname.includes("owner");

  return (
    <>

      {!isOwner && <Navbar/>}

      <div className='min-h-[80vh]'>
        <Routes>
          <Route path="/" element={<LandingPage/>} />
          <Route path="/rooms" element={<Rooms/>} />
        </Routes>
      </div>
        <Footer/>
    </>
  )
}

export default App
