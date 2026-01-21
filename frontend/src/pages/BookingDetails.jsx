import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { bookingsAPI } from '../utils/api'
import { assets } from '../assets/assets'

const BookingDetails = () => {
  const { id } = useParams()
  const navigate = useNavigate()

  const [booking, setBooking] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchBooking = async () => {
      try {
        setLoading(true)
        setError('')
        const response = await bookingsAPI.getById(id)
        setBooking(response.data)
      } catch (err) {
        setError(err.message || 'Failed to load booking')
      } finally {
        setLoading(false)
      }
    }

    fetchBooking()
  }, [id])

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  if (loading) {
    return (
      <div className="pt-28 flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900" />
      </div>
    )
  }

  if (!booking || error) {
    return (
      <div className="pt-28 px-4 md:px-16 lg:px-24 xl:px-32 pb-16 min-h-screen flex flex-col items-center justify-center text-center">
        <h1 className="text-2xl font-semibold mb-4">{error || 'Booking not found'}</h1>
        <button
          onClick={() => navigate('/my-bookings')}
          className="px-6 py-3 bg-black text-white rounded-full hover:bg-gray-800 transition-all"
        >
          Back to My Bookings
        </button>
      </div>
    )
  }

  const nights =
    Math.max(
      1,
      Math.round(
        (new Date(booking.checkOutDate).getTime() - new Date(booking.checkInDate).getTime()) /
        (1000 * 60 * 60 * 24)
      )
    ) || 1

  return (
    <div className="pt-28 px-4 md:px-16 lg:px-24 xl:px-32 pb-16 min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={() => navigate('/my-bookings')}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
          >
            ← Back to My Bookings
          </button>
          <button
            onClick={() => window.print()}
            className="inline-flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-full text-sm hover:bg-gray-100"
          >
            <span>Print Receipt</span>
          </button>
        </div>

        {/* Receipt Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
          {/* Top banner */}
          <div className="bg-black text-white px-6 py-4 flex items-center justify-between">
            <div>
              <h1 className="text-xl font-semibold">Booking Receipt</h1>
              <p className="text-xs text-gray-300">
                Booking ID: {booking._id.slice(0, 8).toUpperCase()}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <img src={assets.logo} alt="logo" className="w-8 h-8 rounded-full object-cover" />
              <span className="text-sm font-medium">HotelBooking</span>
            </div>
          </div>

          <div className="p-6 md:p-8 space-y-8">
            {/* Hotel & Room Info */}
            <div className="flex flex-col md:flex-row gap-6">
              {booking.room?.images?.[0] && (
                <img
                  src={booking.room.images[0]}
                  alt={booking.hotel?.name || 'Room'}
                  className="w-full md:w-56 h-40 object-cover rounded-xl"
                />
              )}

              <div className="flex-1">
                <h2 className="text-2xl font-playfair mb-1">
                  {booking.hotel?.name || 'Hotel Name'}
                </h2>
                <p className="text-gray-600 text-sm mb-2">
                  {booking.hotel?.address || booking.hotel?.city}
                </p>
                <p className="text-gray-800 font-medium">
                  {booking.room?.roomType || 'Room Type'}
                </p>
                <p className="text-sm text-gray-500">
                  {booking.guests} {booking.guests === 1 ? 'Guest' : 'Guests'} · {nights} night
                  {nights !== 1 ? 's' : ''}
                </p>

                <div className="mt-3">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-gray-100 text-gray-700">
                    Status: {booking.status}
                  </span>
                </div>
              </div>
            </div>

            {/* Dates & Guest Info */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div className="p-4 rounded-lg bg-gray-50">
                <p className="text-gray-500 mb-1">Check-in</p>
                <p className="font-medium">{formatDate(booking.checkInDate)}</p>
              </div>
              <div className="p-4 rounded-lg bg-gray-50">
                <p className="text-gray-500 mb-1">Check-out</p>
                <p className="font-medium">{formatDate(booking.checkOutDate)}</p>
              </div>
              <div className="p-4 rounded-lg bg-gray-50">
                <p className="text-gray-500 mb-1">Nights</p>
                <p className="font-medium">{nights}</p>
              </div>
            </div>

            {/* Guest & Payment */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
              <div>
                <h3 className="text-sm font-semibold text-gray-800 mb-2">Guest Details</h3>
                <div className="space-y-1">
                  <p className="text-gray-700">
                    {booking.user?.username || booking.user?.name || 'Guest'}
                  </p>
                  {booking.user?.email && (
                    <p className="text-gray-500 text-xs">{booking.user.email}</p>
                  )}
                </div>
              </div>

              <div>
                <h3 className="text-sm font-semibold text-gray-800 mb-2">Payment Details</h3>
                <div className="space-y-1">
                  <p className="text-gray-700">
                    Method: {booking.paymentMethod || 'Pay At Hotel'}
                  </p>
                  <p className="text-gray-500 text-xs">
                    Paid: {booking.isPaid ? 'Yes' : 'No (pay at property)'}
                  </p>
                </div>
              </div>
            </div>

            {/* Price Summary */}
            <div className="border-t border-gray-200 pt-4">
              <h3 className="text-sm font-semibold text-gray-800 mb-3">Price Summary</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">
                    Room ({nights} night{nights !== 1 ? 's' : ''} × ₹{booking.room?.pricePerNight})
                  </span>
                  <span className="text-gray-800">
                    ₹{booking.totalPrice?.toFixed ? booking.totalPrice.toFixed(2) : booking.totalPrice}
                  </span>
                </div>
                <div className="flex justify-between font-semibold text-base pt-2 border-t border-dashed border-gray-200 mt-2">
                  <span>Total</span>
                  <span>
                    ₹{booking.totalPrice?.toFixed ? booking.totalPrice.toFixed(2) : booking.totalPrice}
                  </span>
                </div>
              </div>
            </div>

            {/* Footer note */}
            <p className="text-xs text-gray-400 text-center pt-4">
              This receipt is generated by HotelBooking for your reference. For any changes or
              cancellations, please refer to your booking details in the app.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BookingDetails


