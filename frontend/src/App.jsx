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
import AuthModal from './components/AuthModal'

function App() {
  const isOwner = useLocation().pathname.includes("owner");

  return (
    <>
      {!isOwner && <Navbar/>}

      <div className='min-h-[80vh]'>
        <Routes>
          <Route path="/" element={<LandingPage/>} />
          <Route path="/rooms" element={<Rooms/>} />
          <Route path="/rooms/:id" element={<RoomDetails/>} />
          <Route path="/hotels" element={<Hotels/>} />
          <Route path="/experience" element={<Experience/>} />
          <Route path="/about" element={<About/>} />
          <Route path="/owner" element={<OwnerDashboard/>} />
          <Route path="/featured" element={<Featured />} />
          <Route path="/my-bookings" element={<MyBookings />} />
        </Routes>
      </div>
      
      {!isOwner && <Footer/>}
      <AuthModal />
    </>
  )
}

export default App
