import React, { useState, useMemo } from 'react'
import { assets, facilityIcons, roomsDummyData } from '../assets/assets'
import { useNavigate } from 'react-router-dom'
import Title from '../components/Title'

const Featured = () => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // Get featured rooms (first 8 rooms as featured)
  const featuredRooms = useMemo(() => {
    return roomsDummyData.slice(0, 8);
  }, []);

  // Calculate pagination
  const totalPages = Math.ceil(featuredRooms.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentRooms = featuredRooms.slice(startIndex, startIndex + itemsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo(0, 0);
  };

  return (
    <div className="pt-28 px-4 md:px-16 lg:px-24 xl:px-32 pb-16">
      <Title 
        title="Featured Hotels" 
        subTitle="Discover our handpicked selection of extraordinary properties offering unmatched luxury and unforgettable experiences."
      />

      <div className="mt-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {currentRooms.map((room, idx) => (
            <div key={room._id} className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all">
              <div className="relative">
                <img 
                  src={room.images[0]} 
                  alt={room.hotel.name}
                  className="w-full h-60 object-cover cursor-pointer"
                  onClick={() => {navigate(`/rooms/${room._id}`); scrollTo(0,0)}}
                />
                <div className="absolute top-3 left-3 bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-3 py-1 rounded-full text-xs font-medium">
                  ⭐ Featured
                </div>
              </div>
              
              <div className="p-5">
                <div className="flex justify-between items-start mb-2">
                  <h3 
                    className="font-playfair text-xl text-gray-800 cursor-pointer hover:text-blue-600"
                    onClick={() => {navigate(`/rooms/${room._id}`); scrollTo(0,0)}}
                  >
                    {room.hotel.name}
                  </h3>
                  <div className="flex items-center gap-1">
                    <img src={assets.starIconFilled} alt="rating" className="w-4 h-4" />
                    <span className="text-sm">4.8</span>
                  </div>
                </div>
                
                <div className="flex items-center gap-1 text-gray-500 text-sm mb-3">
                  <img src={assets.locationIcon} alt="location" className="w-4 h-4" />
                  <span>{room.hotel.city}</span>
                </div>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {room.amenities.slice(0, 3).map((amenity, i) => (
                    <span key={i} className="text-xs bg-[#F5F5FF]/70 px-2 py-1 rounded-md flex items-center gap-1">
                      <img src={facilityIcons[amenity]} alt={amenity} className="w-3 h-3" />
                      {amenity}
                    </span>
                  ))}
                </div>
                
                <div className="flex justify-between items-center">
                  <p className="text-gray-700"><span className="text-lg font-medium">${room.pricePerNight}</span> /night</p>
                  <button 
                    onClick={() => {navigate(`/rooms/${room._id}`); scrollTo(0,0)}}
                    className="px-4 py-2 text-sm border border-gray-300 rounded-full hover:bg-gray-50 transition-all"
                  >
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center mt-12 gap-2">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-3 py-2 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-50 disabled:opacity-50"
            >
              Previous
            </button>
            
            {[...Array(totalPages)].map((_, index) => {
              const page = index + 1;
              return (
                <button
                  key={page}
                  onClick={() => handlePageChange(page)}
                  className={`px-3 py-2 rounded-lg border ${
                    currentPage === page
                      ? 'bg-blue-600 text-white border-blue-600'
                      : 'border-gray-300 text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  {page}
                </button>
              );
            })}
            
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-3 py-2 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-50 disabled:opacity-50"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default Featured