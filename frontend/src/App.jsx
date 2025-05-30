import { useState } from 'react'
import Navbar from './components/Navbar'
import { Route, Routes, useLocation } from 'react-router-dom'
import LandingPage from './pages/LandingPage';
import Footer from './components/Footer'
import Rooms from './pages/Rooms';
import Hotels from './pages/Hotels';
import Experience from './pages/Experience';
import About from './pages/About';

function App() {
  const isOwner = useLocation().pathname.includes("owner");

  return (
    <>

      {!isOwner && <Navbar/>}

      <div className='min-h-[80vh]'>
        <Routes>
          <Route path="/" element={<LandingPage/>} />
          <Route path="/rooms" element={<Rooms/>} />
          <Route path="/hotels" element={<Hotels/>} />
          <Route path="/experience" element={<Experience/>} />
          <Route path="/about" element={<About/>} />
        </Routes>
      </div>
        <Footer/>
    </>
  )
}

export default App
