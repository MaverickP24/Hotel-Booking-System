import React, { useState } from 'react'

const initialState = {
  name: '',
  city: '',
  address: '',
  contact: '',
  description: '',
  imageFiles: []
}

const HotelFormModal = ({ title = 'Add Hotel', onClose, onSubmit, isSubmitting }) => {
  const [formData, setFormData] = useState(initialState)

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
    if (!formData.name || !formData.city || !formData.address || !formData.contact) {
      alert('Please fill in all required fields.')
      return
    }

    const data = new FormData();
    data.append('name', formData.name);
    data.append('city', formData.city);
    data.append('address', formData.address);
    data.append('contact', formData.contact);
    data.append('description', formData.description);

    formData.imageFiles.forEach(file => {
      data.append('images', file);
    });

    onSubmit(data)
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-xl">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">{title}</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Hotel Name *</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                className="w-full p-3 border border-gray-300 rounded-lg"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">City *</label>
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
            <label className="block text-sm font-medium text-gray-700 mb-1">Address *</label>
            <input
              type="text"
              value={formData.address}
              onChange={(e) => setFormData((prev) => ({ ...prev, address: e.target.value }))}
              className="w-full p-3 border border-gray-300 rounded-lg"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Contact Number *</label>
            <input
              type="text"
              value={formData.contact}
              onChange={(e) => setFormData((prev) => ({ ...prev, contact: e.target.value }))}
              className="w-full p-3 border border-gray-300 rounded-lg"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Property Images (Max 5)</label>
            <div className="space-y-4">
              <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-xl cursor-pointer hover:border-indigo-500 hover:bg-indigo-50 transition-all group">
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <span className="text-3xl mb-2 group-hover:scale-110 transition-transform">📸</span>
                  <p className="text-xs text-gray-400 font-bold uppercase tracking-widest">Click to upload property photos</p>
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
              {isSubmitting ? 'Saving...' : 'Save Hotel'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default HotelFormModal

