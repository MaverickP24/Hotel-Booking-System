import React, { useState } from 'react'

const HotelSettings = () => {
  const [hotelData, setHotelData] = useState({
    name: 'Grand Hotel & Resort',
    city: 'New York',
    address: '123 Main Street, Manhattan, NY 10001',
    description: 'A luxury hotel offering world-class amenities and exceptional service in the heart of the city.',
    phone: '+1 (555) 123-4567',
    email: 'info@grandhotel.com'
  })
  const [isEditing, setIsEditing] = useState(false)

  const handleSave = (e) => {
    e.preventDefault()
    setIsEditing(false)
    alert('Hotel settings saved successfully!')
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-900">Hotel Settings</h2>
        <button
          onClick={() => setIsEditing(!isEditing)}
          className={`px-4 py-2 rounded-lg ${
            isEditing 
              ? 'bg-gray-100 text-gray-700 hover:bg-gray-200' 
              : 'bg-blue-600 text-white hover:bg-blue-700'
          }`}
        >
          {isEditing ? 'Cancel' : 'Edit'}
        </button>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Hotel Name
            </label>
            <input
              type="text"
              value={hotelData.name}
              onChange={(e) => setHotelData(prev => ({ ...prev, name: e.target.value }))}
              disabled={!isEditing}
              className="w-full p-3 border border-gray-300 rounded-lg disabled:bg-gray-50"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              City
            </label>
            <input
              type="text"
              value={hotelData.city}
              onChange={(e) => setHotelData(prev => ({ ...prev, city: e.target.value }))}
              disabled={!isEditing}
              className="w-full p-3 border border-gray-300 rounded-lg disabled:bg-gray-50"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Address
          </label>
          <input
            type="text"
            value={hotelData.address}
            onChange={(e) => setHotelData(prev => ({ ...prev, address: e.target.value }))}
            disabled={!isEditing}
            className="w-full p-3 border border-gray-300 rounded-lg disabled:bg-gray-50"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Description
          </label>
          <textarea
            rows={4}
            value={hotelData.description}
            onChange={(e) => setHotelData(prev => ({ ...prev, description: e.target.value }))}
            disabled={!isEditing}
            className="w-full p-3 border border-gray-300 rounded-lg disabled:bg-gray-50"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Phone
            </label>
            <input
              type="tel"
              value={hotelData.phone}
              onChange={(e) => setHotelData(prev => ({ ...prev, phone: e.target.value }))}
              disabled={!isEditing}
              className="w-full p-3 border border-gray-300 rounded-lg disabled:bg-gray-50"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email
            </label>
            <input
              type="email"
              value={hotelData.email}
              onChange={(e) => setHotelData(prev => ({ ...prev, email: e.target.value }))}
              disabled={!isEditing}
              className="w-full p-3 border border-gray-300 rounded-lg disabled:bg-gray-50"
            />
          </div>
        </div>

        {isEditing && (
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={() => setIsEditing(false)}
              className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Save Changes
            </button>
          </div>
        )}
      </form>
    </div>
  )
}

export default HotelSettings