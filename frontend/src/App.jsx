import React, { useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import LandingPage from './pages/LandingPage'
import Rooms from './pages/Rooms'
import RoomDetails from './pages/RoomDetails'
import Hotels from './pages/Hotels'
import Experience from './pages/Experience'
import About from './pages/About'
import OwnerDashboard from './pages/OwnerDashboard'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Featured from './pages/Featured'
import MyBookings from './pages/MyBookings'
import BookingDetails from './pages/BookingDetails'
import AuthModal from './components/AuthModal'
import { useAuth } from './context/AuthContext'
import OwnerRoute from './components/OwnerRoute'

function App() {
  const location = useLocation();
  const { closeAuthModal } = useAuth();
  const isOwner = location.pathname.includes("owner");

  // Handle Google OAuth callback
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get('token');
    const authStatus = params.get('auth');

    if (token && authStatus === 'success') {
      // Store token in localStorage
      localStorage.setItem('token', token);

      // Clean URL parameters and reload page
      // The AuthContext useEffect will fetch user details on mount
      window.history.replaceState({}, document.title, '/');
      window.location.reload();
    } else if (authStatus === 'failed') {
      const error = params.get('error') || 'Google authentication failed';
      alert(error);

      // Clean URL
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  }, []);

  return (
    <>
      <Navbar />

      <div className='min-h-[80vh]'>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/rooms" element={<Rooms />} />
          <Route path="/rooms/:id" element={<RoomDetails />} />
          <Route path="/hotels" element={<Hotels />} />
          <Route path="/experience" element={<Experience />} />
          <Route path="/about" element={<About />} />
          <Route
            path="/owner"
            element={
              <OwnerRoute>
                <OwnerDashboard />
              </OwnerRoute>
            }
          />
          <Route path="/featured" element={<Featured />} />
          <Route path="/my-bookings" element={<MyBookings />} />
          <Route path="/bookings/:id" element={<BookingDetails />} />
        </Routes>
      </div>

      {!isOwner && <Footer />}
      <AuthModal />
    </>
  )
}

export default App
