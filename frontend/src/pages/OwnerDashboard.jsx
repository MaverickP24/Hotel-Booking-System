import React, { useEffect, useMemo, useState } from 'react'
import RoomManagement from '../components/RoomManagement'
import BookingManagement from '../components/BookingManagement'
import HotelSettings from '../components/HotelSettings'
import HotelFormModal from '../components/HotelFormModal'
import { hotelsAPI, roomsAPI, bookingsAPI } from '../utils/api'

const tabs = [
  { id: 'rooms', label: 'Room Management', icon: '🏨' },
  { id: 'bookings', label: 'Bookings', icon: '📅' },
  { id: 'settings', label: 'Hotel Settings', icon: '⚙️' }
]

const StatCard = ({ label, value, icon, color, trend }) => (
  <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 group">
    <div className="flex items-start justify-between mb-4">
      <div className={`p-3 ${color} rounded-xl text-2xl group-hover:scale-110 transition-transform duration-300`}>
        {icon}
      </div>
      {trend && (
        <span className={`text-xs font-medium px-2 py-1 rounded-full ${trend.startsWith('+') ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'}`}>
          {trend}
        </span>
      )}
    </div>
    <div>
      <p className="text-sm font-medium text-gray-500 mb-1">{label}</p>
      <p className="text-3xl font-bold text-gray-900 tracking-tight">{value}</p>
    </div>
  </div>
)

const OwnerDashboard = () => {
  const [activeTab, setActiveTab] = useState('rooms')
  const [hotels, setHotels] = useState([])
  const [selectedHotelId, setSelectedHotelId] = useState('')
  const [rooms, setRooms] = useState([])
  const [bookings, setBookings] = useState([])
  const [loadingHotels, setLoadingHotels] = useState(true)
  const [loadingRooms, setLoadingRooms] = useState(false)
  const [loadingBookings, setLoadingBookings] = useState(false)
  const [showHotelModal, setShowHotelModal] = useState(false)
  const [actionLoading, setActionLoading] = useState(false)
  const [notification, setNotification] = useState({ type: '', message: '' })

  const selectedHotel = hotels.find((hotel) => hotel._id === selectedHotelId) || null

  useEffect(() => {
    fetchHotels()
  }, [])

  useEffect(() => {
    if (selectedHotelId) {
      fetchRooms(selectedHotelId)
      fetchBookings(selectedHotelId)
    } else {
      setRooms([])
      setBookings([])
    }
  }, [selectedHotelId])

  const fetchHotels = async () => {
    try {
      setLoadingHotels(true)
      const response = await hotelsAPI.getMine()
      const data = response.data || []
      setHotels(data)
      if (data.length && !selectedHotelId) {
        setSelectedHotelId(data[0]._id)
      } else if (!data.length) {
        setSelectedHotelId('')
      }
    } catch (error) {
      setNotification({ type: 'error', message: error.message || 'Failed to load hotels' })
    } finally {
      setLoadingHotels(false)
    }
  }

  const fetchRooms = async (hotelId) => {
    try {
      setLoadingRooms(true)
      const response = await roomsAPI.getByHotel(hotelId)
      setRooms(response.data || [])
    } catch (error) {
      setNotification({ type: 'error', message: error.message || 'Failed to load rooms' })
    } finally {
      setLoadingRooms(false)
    }
  }

  const fetchBookings = async (hotelId) => {
    try {
      setLoadingBookings(true)
      const response = await bookingsAPI.getByHotel(hotelId)
      setBookings(response.data || [])
    } catch (error) {
      setNotification({ type: 'error', message: error.message || 'Failed to load bookings' })
    } finally {
      setLoadingBookings(false)
    }
  }

  const stats = useMemo(() => {
    const confirmedRevenue = bookings.reduce((sum, booking) => {
      if (booking.status === 'confirmed' || booking.status === 'completed') {
        return sum + (booking.totalPrice || 0)
      }
      return sum
    }, 0)
    return {
      totalRooms: rooms.length,
      availableRooms: rooms.filter((room) => room.isAvailable).length,
      totalBookings: bookings.length,
      monthlyRevenue: confirmedRevenue
    }
  }, [rooms, bookings])

  const handleHotelCreate = async (hotelData) => {
    try {
      setActionLoading(true)
      await hotelsAPI.create(hotelData)
      setShowHotelModal(false)
      setNotification({ type: 'success', message: 'Hotel created successfully' })
      fetchHotels()
    } catch (error) {
      setNotification({ type: 'error', message: error.message || 'Failed to create hotel' })
    } finally {
      setActionLoading(false)
    }
  }

  const handleHotelUpdate = async (hotelId, payload) => {
    try {
      await hotelsAPI.update(hotelId, payload)
      setNotification({ type: 'success', message: 'Hotel updated successfully' })
      fetchHotels()
    } catch (error) {
      setNotification({ type: 'error', message: error.message || 'Failed to update hotel' })
    }
  }

  const handleHotelDelete = async (hotelId) => {
    try {
      await hotelsAPI.delete(hotelId)
      setNotification({ type: 'success', message: 'Hotel deleted successfully' })
      if (hotelId === selectedHotelId) {
        setSelectedHotelId('')
      }
      fetchHotels()
    } catch (error) {
      setNotification({ type: 'error', message: error.message || 'Failed to delete hotel' })
    }
  }

  const handleAddRoom = async (payload) => {
    try {
      await roomsAPI.create({ ...payload, hotel: selectedHotelId })
      setNotification({ type: 'success', message: 'Room added successfully' })
      fetchRooms(selectedHotelId)
    } catch (error) {
      setNotification({ type: 'error', message: error.message || 'Failed to add room' })
    }
  }

  const handleUpdateRoom = async (roomId, payload) => {
    try {
      await roomsAPI.update(roomId, payload)
      setNotification({ type: 'success', message: 'Room updated successfully' })
      fetchRooms(selectedHotelId)
    } catch (error) {
      setNotification({ type: 'error', message: error.message || 'Failed to update room' })
    }
  }

  const handleDeleteRoom = async (roomId) => {
    try {
      await roomsAPI.delete(roomId)
      setNotification({ type: 'success', message: 'Room deleted successfully' })
      fetchRooms(selectedHotelId)
    } catch (error) {
      setNotification({ type: 'error', message: error.message || 'Failed to delete room' })
    }
  }

  const handleToggleRoom = async (roomId, isAvailable) => {
    try {
      await roomsAPI.update(roomId, { isAvailable })
      fetchRooms(selectedHotelId)
    } catch (error) {
      setNotification({ type: 'error', message: error.message || 'Failed to update room status' })
    }
  }

  const handleBookingStatusUpdate = async (bookingId, status) => {
    try {
      await bookingsAPI.update(bookingId, { status })
      fetchBookings(selectedHotelId)
    } catch (error) {
      setNotification({ type: 'error', message: error.message || 'Failed to update booking status' })
    }
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] pb-12 pt-28">
      {/* Dashboard container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header & Main Actions */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 tracking-tight mb-2">Welcome back, Owner</h1>
            <p className="text-lg text-gray-500 font-medium">Here's what's happening with your properties today.</p>
          </div>
          <button
            onClick={() => setShowHotelModal(true)}
            className="flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-xl font-semibold shadow-lg shadow-indigo-200 transition-all duration-300 transform hover:-translate-y-1"
          >
            <span className="text-xl">+</span> Add New Property
          </button>
        </div>

        {/* Global Notifications */}
        {notification.message && (
          <div
            className={`mb-8 p-4 rounded-2xl flex items-center justify-between border ${notification.type === 'error'
                ? 'bg-red-50 border-red-100 text-red-700'
                : 'bg-emerald-50 border-emerald-100 text-emerald-800'
              } animate-in fade-in slide-in-from-top-4 duration-300`}
          >
            <div className="flex items-center gap-3">
              <span className="text-xl">{notification.type === 'error' ? '⚠️' : '✅'}</span>
              <p className="font-medium">{notification.message}</p>
            </div>
            <button
              onClick={() => setNotification({ type: '', message: '' })}
              className="text-gray-400 hover:text-gray-600 px-2"
            >
              ✕
            </button>
          </div>
        )}

        {/* Hotel Selection Tabs */}
        <div className="mb-10 overflow-hidden">
          <div className="flex items-center gap-3 overflow-x-auto no-scrollbar pb-4 -mb-4">
            {loadingHotels ? (
              Array(3).fill(0).map((_, i) => (
                <div key={i} className="animate-pulse h-12 w-40 bg-white rounded-2xl border border-gray-100 shadow-sm" />
              ))
            ) : hotels.length === 0 ? (
              <div className="bg-white border-2 border-dashed border-gray-200 rounded-2xl p-6 text-center w-full">
                <p className="text-gray-500 font-medium italic">No properties registered yet. Click "Add New Property" to begin.</p>
              </div>
            ) : (
              hotels.map((hotel) => (
                <button
                  key={hotel._id}
                  onClick={() => setSelectedHotelId(hotel._id)}
                  className={`whitespace-nowrap px-6 py-3 rounded-2xl font-semibold border-2 transition-all duration-300 ${hotel._id === selectedHotelId
                      ? 'bg-white border-indigo-600 text-indigo-600 shadow-md transform scale-[1.02]'
                      : 'bg-white border-transparent text-gray-500 hover:border-gray-200 hover:text-gray-700 shadow-sm'
                    }`}
                >
                  {hotel.name}
                </button>
              ))
            )}
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <StatCard label="Total Rooms" value={stats.totalRooms} icon="🏢" color="bg-indigo-50 text-indigo-600" />
          <StatCard label="Live Availability" value={stats.availableRooms} icon="✨" color="bg-emerald-50 text-emerald-600" trend="+2 today" />
          <StatCard label="Active Bookings" value={stats.totalBookings} icon="📍" color="bg-orange-50 text-orange-600" />
          <StatCard
            label="Revenue (Selected)"
            value={`₹${stats.monthlyRevenue.toLocaleString()}`}
            icon="💎"
            color="bg-purple-50 text-purple-600"
            trend="+12%"
          />
        </div>

        {/* Main Content Area */}
        <div className="bg-white rounded-[2rem] border border-gray-100 shadow-xl shadow-gray-100/50 overflow-hidden">
          <div className="px-8 pt-6 border-b border-gray-100 bg-gray-50/50">
            <nav className="flex space-x-12">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`group relative py-6 px-2 font-bold text-sm uppercase tracking-wider transition-all duration-300 ${activeTab === tab.id
                      ? 'text-indigo-600'
                      : 'text-gray-400 hover:text-gray-600'
                    }`}
                >
                  <div className="flex items-center gap-2">
                    <span className={`text-lg transition-transform duration-300 ${activeTab === tab.id ? 'scale-110' : 'group-hover:scale-110'}`}>
                      {tab.icon}
                    </span>
                    {tab.label}
                  </div>
                  {activeTab === tab.id && (
                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-indigo-600 rounded-t-full shadow-[0_-2px_8px_rgba(79,70,229,0.3)] animate-in fade-in zoom-in-95 duration-300" />
                  )}
                </button>
              ))}
            </nav>
          </div>

          <div className="p-8 sm:p-10 min-h-[400px]">
            {activeTab === 'rooms' && (
              <RoomManagement
                hotel={selectedHotel}
                rooms={rooms}
                isLoading={loadingRooms}
                onAddRoom={handleAddRoom}
                onUpdateRoom={handleUpdateRoom}
                onDeleteRoom={handleDeleteRoom}
                onToggleAvailability={handleToggleRoom}
              />
            )}
            {activeTab === 'bookings' && (
              <BookingManagement
                hotel={selectedHotel}
                bookings={bookings}
                isLoading={loadingBookings}
                onStatusChange={handleBookingStatusUpdate}
              />
            )}
            {activeTab === 'settings' && (
              <HotelSettings
                hotel={selectedHotel}
                onUpdate={handleHotelUpdate}
                onDelete={handleHotelDelete}
                isSaving={actionLoading}
              />
            )}
          </div>
        </div>
      </div>

      {showHotelModal && (
        <HotelFormModal
          title="Create New Property"
          isSubmitting={actionLoading}
          onClose={() => setShowHotelModal(false)}
          onSubmit={handleHotelCreate}
        />
      )}
    </div>
  )
}

export default OwnerDashboard
