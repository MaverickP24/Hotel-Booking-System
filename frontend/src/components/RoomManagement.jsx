import React, { useState } from 'react'
import { facilityIcons } from '../assets/assets'
import AddRoomModal from './AddRoomModal'
import EditRoomModal from './EditRoomModal'

const RoomManagement = ({
  hotel,
  rooms,
  isLoading,
  onAddRoom,
  onUpdateRoom,
  onDeleteRoom,
  onToggleAvailability
}) => {
  const [showAddModal, setShowAddModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [selectedRoom, setSelectedRoom] = useState(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleAddRoom = async (payload) => {
    try {
      setIsSubmitting(true)
      await onAddRoom(payload)
      setShowAddModal(false)
    } catch (error) {
      console.error(error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleUpdateRoom = async (payload) => {
    try {
      setIsSubmitting(true)
      await onUpdateRoom(selectedRoom._id, payload)
      setShowEditModal(false)
      setSelectedRoom(null)
    } catch (error) {
      console.error(error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleDelete = (roomId) => {
    if (window.confirm('Are you sure you want to delete this room?')) {
      onDeleteRoom(roomId)
    }
  }

  if (!hotel) {
    return (
      <div className="text-center py-16 bg-white rounded-lg shadow-sm">
        <h3 className="text-xl font-semibold mb-2">No hotel selected</h3>
        <p className="text-gray-600">Please add a hotel to manage its rooms.</p>
      </div>
    )
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">Room Management</h2>
          <p className="text-sm text-gray-500">Managing rooms for {hotel.name}</p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          + Add New Room
        </button>
      </div>

      {isLoading ? (
        <div className="flex justify-center py-20">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-gray-900" />
        </div>
      ) : rooms.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-lg shadow-sm">
          <h3 className="text-xl font-semibold mb-2">No rooms yet</h3>
          <p className="text-gray-600">Add your first room to start receiving bookings.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {rooms.map((room) => (
            <div key={room._id} className="bg-white border rounded-lg overflow-hidden">
              <div className="relative">
                {room.images?.[0] && (
                  <img
                    src={room.images[0]}
                    alt={room.hotel?.name}
                    className="w-full h-48 object-cover"
                  />
                )}
                <div
                  className={`absolute top-3 right-3 px-2 py-1 rounded-full text-xs font-medium ${
                    room.isAvailable ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}
                >
                  {room.isAvailable ? 'Available' : 'Unavailable'}
                </div>
              </div>

              <div className="p-4">
                <h3 className="font-semibold text-lg mb-1">{room.roomType}</h3>
                <p className="text-gray-600 text-sm mb-2">{hotel.name}</p>
                <p className="text-lg font-bold text-blue-600 mb-3">${room.pricePerNight}/night</p>

                <div className="flex flex-wrap gap-1 mb-4">
                  {(room.amenities || []).slice(0, 3).map((amenity, i) => (
                    <span key={i} className="text-xs bg-gray-100 px-2 py-1 rounded flex items-center gap-1">
                      {facilityIcons[amenity] && (
                        <img src={facilityIcons[amenity]} alt={amenity} className="w-3 h-3" />
                      )}
                      {amenity}
                    </span>
                  ))}
                  {(room.amenities || []).length > 3 && (
                    <span className="text-xs text-gray-500">
                      +{(room.amenities || []).length - 3} more
                    </span>
                  )}
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      setSelectedRoom(room)
                      setShowEditModal(true)
                    }}
                    className="flex-1 bg-gray-100 text-gray-700 px-3 py-2 rounded text-sm hover:bg-gray-200"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => onToggleAvailability(room._id, !room.isAvailable)}
                    className={`flex-1 px-3 py-2 rounded text-sm ${
                      room.isAvailable
                        ? 'bg-red-100 text-red-700 hover:bg-red-200'
                        : 'bg-green-100 text-green-700 hover:bg-green-200'
                    }`}
                  >
                    {room.isAvailable ? 'Disable' : 'Enable'}
                  </button>
                  <button
                    onClick={() => handleDelete(room._id)}
                    className="bg-red-100 text-red-700 px-3 py-2 rounded text-sm hover:bg-red-200"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {showAddModal && (
        <AddRoomModal
          hotel={hotel}
          isSubmitting={isSubmitting}
          onClose={() => setShowAddModal(false)}
          onSubmit={handleAddRoom}
        />
      )}

      {showEditModal && selectedRoom && (
        <EditRoomModal
          room={selectedRoom}
          isSubmitting={isSubmitting}
          onClose={() => {
            setShowEditModal(false)
            setSelectedRoom(null)
          }}
          onSubmit={handleUpdateRoom}
        />
      )}
    </div>
  )
}

export default RoomManagement
