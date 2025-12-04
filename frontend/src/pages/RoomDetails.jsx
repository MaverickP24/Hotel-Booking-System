import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { assets, facilityIcons } from '../assets/assets'
import { roomsAPI, bookingsAPI } from '../utils/api'
import { useAuth } from '../context/AuthContext'

const RoomDetails = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { isSignedIn, openSignIn } = useAuth()

  const [room, setRoom] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [checkInDate, setCheckInDate] = useState('')
  const [checkOutDate, setCheckOutDate] = useState('')
  const [guests, setGuests] = useState(1)
  const [bookingLoading, setBookingLoading] = useState(false)

  useEffect(() => {
    const fetchRoom = async () => {
      try {
        setLoading(true)
        setError('')
        const response = await roomsAPI.getById(id)
        setRoom(response.data)
      } catch (err) {
        setError(err.message || 'Room not found')
      } finally {
        setLoading(false)
      }
    }

    fetchRoom()
  }, [id])

  const handleBookNow = async () => {
    if (!isSignedIn) {
      openSignIn()
      return
    }

    if (!checkInDate || !checkOutDate) {
      alert('Please select check-in and check-out dates.')
      return
    }

    const checkIn = new Date(checkInDate)
    const checkOut = new Date(checkOutDate)
    if (checkOut <= checkIn) {
      alert('Check-out date must be after check-in date.')
      return
    }

    try {
      setBookingLoading(true)
      const days = Math.max(
        1,
        Math.round((checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24))
      )
      const totalPrice = (room.pricePerNight || 0) * days

      await bookingsAPI.create({
        room: room._id,
        hotel: room.hotel?._id,
        checkInDate,
        checkOutDate,
        totalPrice,
        guests,
        paymentMethod: 'Pay At Hotel'
      })

      navigate('/my-bookings')
    } catch (err) {
      alert(err.message || 'Failed to create booking')
    } finally {
      setBookingLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="pt-28 flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
      </div>
    )
  }

  if (!room || error) {
    return (
      <div className="pt-28 px-4 md:px-16 lg:px-24 xl:px-32 text-center">
        <h1 className="text-2xl">{error || 'Room not found'}</h1>
        <button onClick={() => navigate('/rooms')} className="mt-4 px-6 py-2 bg-blue-600 text-white rounded">
          Back to Rooms
        </button>
      </div>
    )
  }

  return (
    <div className="pt-28 px-4 md:px-16 lg:px-24 xl:px-32 pb-16">
      {/* Header */}
      <div className="mb-8">
        <button 
          onClick={() => navigate('/rooms')} 
          className="flex items-center gap-2 text-gray-600 hover:text-gray-800 mb-4"
        >
          ← Back to Rooms
        </button>
        <h1 className="font-playfair text-4xl mb-2">{room.hotel?.name}</h1>
        <div className="flex items-center gap-2 text-gray-600">
          <img src={assets.locationIcon} alt="location" className="w-4 h-4" />
          <span>{room.hotel?.address}</span>
        </div>
      </div>

      {/* Image Gallery */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="lg:col-span-2 lg:row-span-2">
          <img 
            src={room.images?.[0]} 
            alt="Main room" 
            className="w-full h-full object-cover rounded-xl"
          />
        </div>
        {(room.images || []).slice(1, 4).map((img, idx) => (
          <img 
            key={idx}
            src={img} 
            alt={`Room view ${idx + 2}`} 
            className="w-full h-48 object-cover rounded-xl"
          />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2">
          {/* Room Info */}
          <div className="mb-8">
            <h2 className="text-2xl font-playfair mb-4">Room Details</h2>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-gray-500">Room Type:</span>
                <p className="font-medium">{room.roomType}</p>
              </div>
              <div>
                <span className="text-gray-500">City:</span>
                <p className="font-medium">{room.hotel.city}</p>
              </div>
            </div>
          </div>

          {/* Amenities */}
          <div className="mb-8">
            <h3 className="text-xl font-playfair mb-4">Amenities</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {(room.amenities || []).map((amenity, idx) => (
                <div key={idx} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <img src={facilityIcons[amenity]} alt={amenity} className="w-5 h-5" />
                  <span className="text-sm">{amenity}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Rating */}
          <div className="mb-8">
            <h3 className="text-xl font-playfair mb-4">Guest Reviews</h3>
            <div className="flex items-center gap-2 mb-2">
              {[...Array(5)].map((_, i) => (
                <img key={i} src={assets.starIconFilled} alt="star" className="w-5 h-5" />
              ))}
              <span className="ml-2 text-gray-600">200+ reviews</span>
            </div>
          </div>
        </div>

        {/* Booking Card */}
        <div className="lg:col-span-1">
          <div className="bg-white border border-gray-200 rounded-xl p-6 sticky top-32">
            <div className="text-center mb-6">
              <p className="text-3xl font-bold text-gray-800">${room.pricePerNight}</p>
              <p className="text-gray-500">per night</p>
            </div>
            
            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Check-in</label>
                <input
                  type="date"
                  value={checkInDate}
                  onChange={(e) => setCheckInDate(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg"
                  min={new Date().toISOString().split('T')[0]}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Check-out</label>
                <input
                  type="date"
                  value={checkOutDate}
                  onChange={(e) => setCheckOutDate(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg"
                  min={checkInDate || new Date().toISOString().split('T')[0]}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Guests</label>
                <select
                  value={guests}
                  onChange={(e) => setGuests(Number(e.target.value))}
                  className="w-full p-3 border border-gray-300 rounded-lg"
                >
                  <option value={1}>1 Guest</option>
                  <option value={2}>2 Guests</option>
                  <option value={3}>3 Guests</option>
                  <option value={4}>4 Guests</option>
                </select>
              </div>
            </div>
            
            <button
              disabled={bookingLoading}
              onClick={handleBookNow}
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors disabled:opacity-60"
            >
              {bookingLoading ? 'Booking...' : 'Book Now'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RoomDetails