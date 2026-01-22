import React, { useState } from 'react'
import { facilityIcons } from '../assets/assets'

const roomTypes = ['Single Bed', 'Double Bed', 'Suite', 'Deluxe', 'Presidential Suite']
const amenitiesList = Object.keys(facilityIcons)

const AddRoomModal = ({ hotel, onClose, onSubmit, isSubmitting }) => {
  const [formData, setFormData] = useState({
    roomType: roomTypes[0],
    pricePerNight: '',
    amenities: [],
    imageFiles: [],
    maxGuests: 2,
    description: '',
    isAvailable: true
  })

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setFormData(prev => ({ ...prev, imageFiles: [...prev.imageFiles, ...files] }));
  }

  const removeFile = (index) => {
    setFormData(prev => ({
      ...prev,
      imageFiles: prev.imageFiles.filter((_, i) => i !== index)
    }));
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!formData.pricePerNight) {
      alert('Please provide a price per night')
      return
    }

    const data = new FormData();
    data.append('roomType', formData.roomType);
    data.append('pricePerNight', Number(formData.pricePerNight));
    data.append('maxGuests', Number(formData.maxGuests));
    data.append('description', formData.description);
    data.append('isAvailable', formData.isAvailable);

    formData.amenities.forEach(amenity => {
      data.append('amenities', amenity);
    });

    formData.imageFiles.forEach(file => {
      data.append('images', file);
    });

    onSubmit(data)
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
            <label className="block text-sm font-medium text-gray-700 mb-2">Room Images (Max 5)</label>
            <div className="space-y-4">
              <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-xl cursor-pointer hover:border-indigo-500 hover:bg-indigo-50 transition-all group">
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <span className="text-3xl mb-2 group-hover:scale-110 transition-transform">📸</span>
                  <p className="text-xs text-gray-400 font-bold uppercase tracking-widest">Click to upload room photos</p>
                </div>
                <input
                  type="file"
                  className="hidden"
                  multiple
                  accept="image/*"
                  onChange={handleFileChange}
                  disabled={formData.imageFiles.length >= 5}
                />
              </label>

              {formData.imageFiles.length > 0 && (
                <div className="grid grid-cols-5 gap-3">
                  {formData.imageFiles.map((file, idx) => (
                    <div key={idx} className="relative aspect-square rounded-lg overflow-hidden border border-gray-100 group">
                      <img
                        src={URL.createObjectURL(file)}
                        alt="Preview"
                        className="w-full h-full object-cover"
                      />
                      <button
                        type="button"
                        onClick={() => removeFile(idx)}
                        className="absolute top-1 right-1 bg-white/90 text-red-500 p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
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
