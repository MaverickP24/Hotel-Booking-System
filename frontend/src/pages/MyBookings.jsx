import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { bookingsAPI } from '../utils/api';
import { useNavigate } from 'react-router-dom';
import { assets } from '../assets/assets';

const MyBookings = () => {
  const { user, isSignedIn } = useAuth();
  const navigate = useNavigate();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    if (!isSignedIn) {
      navigate('/');
      return;
    }
    fetchBookings();
  }, [isSignedIn]);

  const fetchBookings = async () => {
    try {
      setLoading(true);
      const response = await bookingsAPI.getUserBookings();
      setBookings(response.data || []);
    } catch (err) {
      setError(err.message || 'Failed to fetch bookings');
      console.error('Error fetching bookings:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleCancelBooking = async (bookingId) => {
    if (!window.confirm('Are you sure you want to cancel this booking?')) {
      return;
    }

    try {
      await bookingsAPI.cancelBooking(bookingId);
      // Refresh bookings
      fetchBookings();
    } catch (err) {
      alert(err.message || 'Failed to cancel booking');
    }
  };

  const filteredBookings = bookings.filter(booking => {
    if (filter === 'all') return true;
    return booking.status === filter;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'confirmed':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      case 'completed':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="pt-28 px-4 md:px-16 lg:px-24 xl:px-32 pb-16 min-h-screen">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-28 px-4 md:px-16 lg:px-24 xl:px-32 pb-16 min-h-screen bg-gray-50">
      {/* Header */}
      <div className="mb-8">
        <h1 className="font-playfair text-4xl mb-2">My Bookings</h1>
        <p className="text-gray-600">View and manage your hotel reservations</p>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-4 mb-6 border-b border-gray-200">
        {['all', 'confirmed', 'pending', 'completed', 'cancelled'].map((status) => (
          <button
            key={status}
            onClick={() => setFilter(status)}
            className={`pb-3 px-2 capitalize transition-all ${
              filter === status
                ? 'border-b-2 border-black font-medium'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            {status}
            {status === 'all' && ` (${bookings.length})`}
            {status !== 'all' && ` (${bookings.filter(b => b.status === status).length})`}
          </button>
        ))}
      </div>

      {/* Error Message */}
      {error && (
        <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
          {error}
        </div>
      )}

      {/* Bookings List */}
      {filteredBookings.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-lg shadow-sm">
          <div className="mb-4">
            <svg className="w-16 h-16 mx-auto text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
          </div>
          <h3 className="text-xl font-medium text-gray-900 mb-2">No bookings found</h3>
          <p className="text-gray-500 mb-6">
            {filter === 'all' 
              ? "You haven't made any bookings yet." 
              : `You don't have any ${filter} bookings.`}
          </p>
          <button
            onClick={() => navigate('/hotels')}
            className="px-6 py-3 bg-black text-white rounded-full hover:bg-gray-800 transition-all"
          >
            Browse Hotels
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredBookings.map((booking) => (
            <div key={booking._id} className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-all">
              <div className="p-6">
                <div className="flex flex-col md:flex-row gap-6">
                  {/* Hotel Image */}
                  {booking.room?.images?.[0] && (
                    <div className="md:w-48 h-32 rounded-lg overflow-hidden flex-shrink-0">
                      <img
                        src={booking.room.images[0]}
                        alt={booking.hotel?.name || 'Hotel'}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}

                  {/* Booking Details */}
                  <div className="flex-1">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className="font-playfair text-2xl mb-1">
                          {booking.hotel?.name || 'Hotel Name'}
                        </h3>
                        <p className="text-gray-600">
                          {booking.room?.roomType || 'Room Type'}
                        </p>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(booking.status)}`}>
                        {booking.status}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                      <div>
                        <p className="text-sm text-gray-500">Check-in</p>
                        <p className="font-medium">{formatDate(booking.checkInDate)}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Check-out</p>
                        <p className="font-medium">{formatDate(booking.checkOutDate)}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Guests</p>
                        <p className="font-medium">{booking.guests} {booking.guests === 1 ? 'Guest' : 'Guests'}</p>
                      </div>
                    </div>

                    <div className="flex justify-between items-center pt-4 border-t border-gray-200">
                      <div>
                        <p className="text-sm text-gray-500">Total Price</p>
                        <p className="text-2xl font-bold">${booking.totalPrice}</p>
                      </div>
                      <div className="flex gap-3">
                        {booking.status === 'confirmed' && (
                          <button
                            onClick={() => handleCancelBooking(booking._id)}
                            className="px-4 py-2 border border-red-500 text-red-500 rounded-full hover:bg-red-50 transition-all"
                          >
                            Cancel Booking
                          </button>
                        )}
                        <button
                          onClick={() => navigate(`/rooms/${booking.room?._id}`)}
                          className="px-4 py-2 border border-gray-300 rounded-full hover:bg-gray-50 transition-all"
                        >
                          View Details
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyBookings;

