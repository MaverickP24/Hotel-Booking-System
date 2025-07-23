import React, { useState } from 'react'
import { assets, facilityIcons } from '../assets/assets'
import AddRoomModal from './AddRoomModal'
import EditRoomModal from './EditRoomModal'

const RoomManagement = ({ rooms, setRooms }) => {
  const [showAddModal, setShowAddModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [selectedRoom, setSelectedRoom] = useState(null)

  const handleEditRoom = (room) => {
    setSelectedRoom(room)
    setShowEditModal(true)
  }

  const handleDeleteRoom = (roomId) => {
    if (window.confirm('Are you sure you want to delete this room?')) {
      setRooms(rooms.filter(room => room._id !== roomId))
    }
  }

  const toggleRoomAvailability = (roomId) => {
    setRooms(rooms.map(room => 
      room._id === roomId 
        ? { ...room, isAvailable: !room.isAvailable }
        : room
    ))
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-900">Room Management</h2>
        <button
          onClick={() => setShowAddModal(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          + Add New Room
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {rooms.map((room) => (
          <div key={room._id} className="bg-white border rounded-lg overflow-hidden">
            <div className="relative">
              <img 
                src={room.images[0]} 
                alt={room.hotel.name}
                className="w-full h-48 object-cover"
              />
              <div className={`absolute top-3 right-3 px-2 py-1 rounded-full text-xs font-medium ${
                room.isAvailable 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-red-100 text-red-800'
              }`}>
                {room.isAvailable ? 'Available' : 'Unavailable'}
              </div>
            </div>
            
            <div className="p-4">
              <h3 className="font-semibold text-lg mb-2">{room.hotel.name}</h3>
              <p className="text-gray-600 text-sm mb-2">{room.roomType}</p>
              <p className="text-lg font-bold text-blue-600 mb-3">${room.pricePerNight}/night</p>
              
              <div className="flex flex-wrap gap-1 mb-4">
                {room.amenities.slice(0, 3).map((amenity, i) => (
                  <span key={i} className="text-xs bg-gray-100 px-2 py-1 rounded">
                    {amenity}
                  </span>
                ))}
                {room.amenities.length > 3 && (
                  <span className="text-xs text-gray-500">+{room.amenities.length - 3} more</span>
                )}
              </div>
              
              <div className="flex gap-2">
                <button
                  onClick={() => handleEditRoom(room)}
                  className="flex-1 bg-gray-100 text-gray-700 px-3 py-2 rounded text-sm hover:bg-gray-200"
                >
                  Edit
                </button>
                <button
                  onClick={() => toggleRoomAvailability(room._id)}
                  className={`flex-1 px-3 py-2 rounded text-sm ${
                    room.isAvailable
                      ? 'bg-red-100 text-red-700 hover:bg-red-200'
                      : 'bg-green-100 text-green-700 hover:bg-green-200'
                  }`}
                >
                  {room.isAvailable ? 'Disable' : 'Enable'}
                </button>
                <button
                  onClick={() => handleDeleteRoom(room._id)}
                  className="bg-red-100 text-red-700 px-3 py-2 rounded text-sm hover:bg-red-200"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {showAddModal && (
        <AddRoomModal 
          onClose={() => setShowAddModal(false)}
          onAdd={(newRoom) => {
            setRooms([...rooms, { ...newRoom, _id: Date.now().toString() }])
            setShowAddModal(false)
          }}
        />
      )}

      {showEditModal && selectedRoom && (
        <EditRoomModal
          room={selectedRoom}
          onClose={() => {
            setShowEditModal(false)
            setSelectedRoom(null)
          }}
          onUpdate={(updatedRoom) => {
            setRooms(rooms.map(room => 
              room._id === updatedRoom._id ? updatedRoom : room
            ))
            setShowEditModal(false)
            setSelectedRoom(null)
          }}
        />
      )}
    </div>
  )
}

export default RoomManagement