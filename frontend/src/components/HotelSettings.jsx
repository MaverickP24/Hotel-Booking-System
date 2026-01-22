import React, { useEffect, useState } from 'react'

const HotelSettings = ({ hotel, onUpdate, onDelete, isSaving }) => {
  const [formData, setFormData] = useState({
    name: '',
    city: '',
    address: '',
    contact: '',
    description: '',
    existingImages: [],
    imageFiles: []
  })

  useEffect(() => {
    if (hotel) {
      setFormData({
        name: hotel.name || '',
        city: hotel.city || '',
        address: hotel.address || '',
        contact: hotel.contact || '',
        description: hotel.description || '',
        existingImages: hotel.images || [],
        imageFiles: []
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

  const removeExistingImage = (index) => {
    setFormData(prev => ({
      ...prev,
      existingImages: prev.existingImages.filter((_, i) => i !== index)
    }));
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const data = new FormData();
    data.append('name', formData.name);
    data.append('city', formData.city);
    data.append('address', formData.address);
    data.append('contact', formData.contact);
    data.append('description', formData.description);

    // Existing images
    formData.existingImages.forEach(img => {
      data.append('images', img);
    });

    // New image files
    formData.imageFiles.forEach(file => {
      data.append('images', file);
    });

    onUpdate(hotel._id, data)
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
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Property Images (Max 5)</label>
          <div className="space-y-4">
            <label className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-gray-300 rounded-2xl cursor-pointer hover:border-indigo-500 hover:bg-indigo-50 transition-all group">
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <span className="text-4xl mb-2 group-hover:scale-110 transition-transform">📸</span>
                <p className="text-sm text-gray-400 font-bold uppercase tracking-widest">Add more property photos</p>
              </div>
              <input
                type="file"
                className="hidden"
                multiple
                accept="image/*"
                onChange={handleFileChange}
                disabled={(formData.existingImages.length + formData.imageFiles.length) >= 5}
              />
            </label>

            {(formData.existingImages.length > 0 || formData.imageFiles.length > 0) && (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
                {/* Existing Images */}
                {formData.existingImages.map((img, idx) => (
                  <div key={`existing-${idx}`} className="relative aspect-square rounded-2xl overflow-hidden border border-gray-100 group shadow-sm">
                    <img
                      src={img}
                      alt="Existing"
                      className="w-full h-full object-cover"
                    />
                    <button
                      type="button"
                      onClick={() => removeExistingImage(idx)}
                      className="absolute top-2 right-2 bg-white/90 text-red-500 p-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-md"
                    >
                      ✕
                    </button>
                    <div className="absolute bottom-0 left-0 right-0 bg-black/40 text-[10px] text-white py-1 text-center font-bold">SAVED</div>
                  </div>
                ))}
                {/* New Image Files */}
                {formData.imageFiles.map((file, idx) => (
                  <div key={`new-${idx}`} className="relative aspect-square rounded-2xl overflow-hidden border-2 border-indigo-200 group shadow-sm">
                    <img
                      src={URL.createObjectURL(file)}
                      alt="Preview"
                      className="w-full h-full object-cover"
                    />
                    <button
                      type="button"
                      onClick={() => removeFile(idx)}
                      className="absolute top-2 right-2 bg-white/90 text-red-500 p-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-md"
                    >
                      ✕
                    </button>
                    <div className="absolute bottom-0 left-0 right-0 bg-indigo-600/80 text-[10px] text-white py-1 text-center font-bold">NEW</div>
                  </div>
                ))}
              </div>
            )}
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
