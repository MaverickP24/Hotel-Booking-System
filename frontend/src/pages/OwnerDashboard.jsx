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
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm border-b">
        <div className="px-6 py-4 flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
          <div>
          <h1 className="text-2xl font-bold text-gray-900">Owner Dashboard</h1>
            <p className="text-gray-600">Manage your hotels, rooms, and bookings</p>
          </div>
          <button
            onClick={() => setShowHotelModal(true)}
            className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors"
          >
            + Add Hotel
          </button>
        </div>
      </div>

      <div className="px-6 py-6 space-y-6">
        {notification.message && (
          <div
            className={`p-4 rounded-lg ${
              notification.type === 'error' ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-800'
            }`}
          >
            {notification.message}
          </div>
        )}

        <div className="flex items-center gap-3 overflow-x-auto pb-2">
          {loadingHotels ? (
            <div className="animate-pulse h-10 w-32 bg-white rounded-full border" />
          ) : hotels.length === 0 ? (
            <p className="text-gray-500">Add your first hotel to get started.</p>
          ) : (
            hotels.map((hotel) => (
              <button
                key={hotel._id}
                onClick={() => setSelectedHotelId(hotel._id)}
                className={`px-4 py-2 rounded-full border ${
                  hotel._id === selectedHotelId
                    ? 'bg-blue-600 text-white border-blue-600'
                    : 'bg-white text-gray-700 border-gray-200'
                }`}
              >
                {hotel.name}
              </button>
            ))
          )}
          </div>
          
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard label="Total Rooms" value={stats.totalRooms} icon="🏨" color="bg-blue-100" />
          <StatCard label="Available Rooms" value={stats.availableRooms} icon="✅" color="bg-green-100" />
          <StatCard label="Total Bookings" value={stats.totalBookings} icon="📅" color="bg-yellow-100" />
          <StatCard
            label="Monthly Revenue"
            value={`$${stats.monthlyRevenue}`}
            icon="💰"
            color="bg-purple-100"
          />
        </div>

        <div className="bg-white rounded-lg shadow-sm">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  <span className="mr-2">{tab.icon}</span>
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>

          <div className="p-6">
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
          title="Add Hotel"
          isSubmitting={actionLoading}
          onClose={() => setShowHotelModal(false)}
          onSubmit={handleHotelCreate}
        />
      )}
    </div>
  )
}

const StatCard = ({ label, value, icon, color }) => (
  <div className="bg-white p-6 rounded-lg shadow-sm">
    <div className="flex items-center">
      <div className={`p-2 ${color} rounded-lg`}>
        <span className="text-2xl">{icon}</span>
      </div>
      <div className="ml-4">
        <p className="text-sm text-gray-600">{label}</p>
        <p className="text-2xl font-bold text-gray-900">{value}</p>
      </div>
    </div>
  </div>
)

export default OwnerDashboard
