import React, { useState } from 'react'
import { facilityIcons } from '../assets/assets'

const roomTypes = ['Single Bed', 'Double Bed', 'Suite', 'Deluxe', 'Presidential Suite']
const amenitiesList = Object.keys(facilityIcons)

const AddRoomModal = ({ hotel, onClose, onSubmit, isSubmitting }) => {
  const [formData, setFormData] = useState({
    roomType: roomTypes[0],
    pricePerNight: '',
    amenities: [],
    imageUrls: '',
    maxGuests: 2,
    description: '',
    isAvailable: true
  })

  const handleAmenityToggle = (amenity) => {
    setFormData((prev) => ({
      ...prev,
      amenities: prev.amenities.includes(amenity)
        ? prev.amenities.filter((a) => a !== amenity)
        : [...prev.amenities, amenity]
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!formData.pricePerNight) {
      alert('Please provide a price per night')
      return
    }

    const images = formData.imageUrls
      .split('\n')
      .map((url) => url.trim())
      .filter(Boolean)

    onSubmit({
      roomType: formData.roomType,
      pricePerNight: Number(formData.pricePerNight),
      amenities: formData.amenities,
      images,
      maxGuests: Number(formData.maxGuests),
      description: formData.description,
      isAvailable: formData.isAvailable
    })
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-xl font-semibold">Add Room</h2>
            <p className="text-sm text-gray-500">Hotel: {hotel?.name}</p>
          </div>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Room Type</label>
              <select
                value={formData.roomType}
                onChange={(e) => setFormData((prev) => ({ ...prev, roomType: e.target.value }))}
                className="w-full p-3 border border-gray-300 rounded-lg"
              >
                {roomTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Price per night *</label>
              <input
                type="number"
                required
                value={formData.pricePerNight}
                onChange={(e) => setFormData((prev) => ({ ...prev, pricePerNight: e.target.value }))}
                className="w-full p-3 border border-gray-300 rounded-lg"
                min={0}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Max guests</label>
              <input
                type="number"
                min={1}
                value={formData.maxGuests}
                onChange={(e) => setFormData((prev) => ({ ...prev, maxGuests: e.target.value }))}
                className="w-full p-3 border border-gray-300 rounded-lg"
              />
            </div>

            <div className="flex items-center space-x-2 pt-6">
              <input
                type="checkbox"
                id="add-room-available"
                checked={formData.isAvailable}
                onChange={(e) => setFormData((prev) => ({ ...prev, isAvailable: e.target.checked }))}
                className="rounded"
              />
              <label htmlFor="add-room-available" className="text-sm font-medium text-gray-700">
                Room is available
              </label>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Amenities</label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {amenitiesList.map((amenity) => (
                <label key={amenity} className="flex items-center space-x-2 cursor-pointer text-sm">
                  <input
                    type="checkbox"
                    checked={formData.amenities.includes(amenity)}
                    onChange={() => handleAmenityToggle(amenity)}
                    className="rounded"
                  />
                  <span>{amenity}</span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Images (one URL per line)</label>
            <textarea
              rows={3}
              value={formData.imageUrls}
              onChange={(e) => setFormData((prev) => ({ ...prev, imageUrls: e.target.value }))}
              className="w-full p-3 border border-gray-300 rounded-lg"
              placeholder="https://example.com/image-1.jpg"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea
              rows={3}
              value={formData.description}
              onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
              className="w-full p-3 border border-gray-300 rounded-lg"
              placeholder="Share highlights of this room..."
            />
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-60"
            >
              {isSubmitting ? 'Saving...' : 'Add Room'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AddRoomModal
