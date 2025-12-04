import React, { useEffect, useState } from 'react'

const HotelSettings = ({ hotel, onUpdate, onDelete, isSaving }) => {
  const [formData, setFormData] = useState({
    name: '',
    city: '',
    address: '',
    contact: '',
    description: '',
    imageUrl: ''
  })

  useEffect(() => {
    if (hotel) {
      setFormData({
        name: hotel.name || '',
        city: hotel.city || '',
        address: hotel.address || '',
        contact: hotel.contact || '',
        description: hotel.description || '',
        imageUrl: hotel.images?.[0] || ''
      })
    }
  }, [hotel])

  if (!hotel) {
    return (
      <div className="text-center py-16 bg-white rounded-lg shadow-sm">
        <h3 className="text-xl font-semibold mb-2">No hotel selected</h3>
        <p className="text-gray-600">Add or select a hotel to manage its settings.</p>
      </div>
    )
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const payload = {
      name: formData.name,
      city: formData.city,
      address: formData.address,
      contact: formData.contact,
      description: formData.description,
      images: formData.imageUrl ? [formData.imageUrl] : hotel.images
    }
    onUpdate(hotel._id, payload)
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-900">Hotel Settings</h2>
        <button
          onClick={() => {
            if (window.confirm('Are you sure you want to delete this hotel?')) {
              onDelete(hotel._id)
            }
          }}
          className="px-4 py-2 rounded-lg border border-red-200 text-red-600 hover:bg-red-50 transition-colors"
        >
          Delete Hotel
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Hotel Name</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
              className="w-full p-3 border border-gray-300 rounded-lg"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">City</label>
            <input
              type="text"
              value={formData.city}
              onChange={(e) => setFormData((prev) => ({ ...prev, city: e.target.value }))}
              className="w-full p-3 border border-gray-300 rounded-lg"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
          <input
            type="text"
            value={formData.address}
            onChange={(e) => setFormData((prev) => ({ ...prev, address: e.target.value }))}
            className="w-full p-3 border border-gray-300 rounded-lg"
            required
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Contact Number</label>
            <input
              type="text"
              value={formData.contact}
              onChange={(e) => setFormData((prev) => ({ ...prev, contact: e.target.value }))}
              className="w-full p-3 border border-gray-300 rounded-lg"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Hero Image URL</label>
            <input
              type="url"
              value={formData.imageUrl}
              onChange={(e) => setFormData((prev) => ({ ...prev, imageUrl: e.target.value }))}
              className="w-full p-3 border border-gray-300 rounded-lg"
              placeholder="https://example.com/hotel.jpg"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
          <textarea
            rows={4}
            value={formData.description}
            onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
            className="w-full p-3 border border-gray-300 rounded-lg"
          />
        </div>

        <div className="flex gap-3 pt-4">
          <button
            type="submit"
            disabled={isSaving}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-60"
          >
            {isSaving ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </form>
    </div>
  )
}

export default HotelSettings
