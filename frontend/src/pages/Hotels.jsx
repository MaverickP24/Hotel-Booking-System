import React, { useState, useMemo, useEffect } from 'react'
import { assets, facilityIcons, roomsDummyData } from '../assets/assets'
import { useNavigate } from 'react-router-dom'
import { useSearchParams } from 'react-router-dom'

const Hotels = () => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    city: '',
    priceRange: '',
    amenities: [],
    sortBy: 'name'
  });
  const itemsPerPage = 9;
  const [searchParams] = useSearchParams();

  // Get unique values for filter options
  const cities = [...new Set(roomsDummyData.map(room => room.hotel.city))];
  const allAmenities = [...new Set(roomsDummyData.flatMap(room => room.amenities))];

  // Apply URL parameters on component mount
  useEffect(() => {
    const cityParam = searchParams.get('city');
    const checkInParam = searchParams.get('checkIn');
    const checkOutParam = searchParams.get('checkOut');
    const guestsParam = searchParams.get('guests');

    if (cityParam) {
      setFilters(prev => ({ ...prev, city: cityParam }));
    }
    
    if (checkInParam || checkOutParam || guestsParam) {
      console.log('Booking details:', { 
        checkIn: checkInParam, 
        checkOut: checkOutParam, 
        guests: guestsParam 
      });
    }
  }, [searchParams]);

  // Filter and search logic
  const filteredHotels = useMemo(() => {
    let filtered = roomsDummyData.filter(room => {
      // Search term filter
      const matchesSearch = searchTerm === '' || 
        room.hotel.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        room.hotel.city.toLowerCase().includes(searchTerm.toLowerCase());

      // City filter - exact match
      const matchesCity = filters.city === '' || room.hotel.city === filters.city;

      // Price range filter
      const matchesPrice = filters.priceRange === '' || (() => {
        const price = room.pricePerNight;
        switch (filters.priceRange) {
          case 'under-200': return price < 200;
          case '200-400': return price >= 200 && price <= 400;
          case '400-600': return price >= 400 && price <= 600;
          case 'over-600': return price > 600;
          default: return true;
        }
      })();

      // Amenities filter
      const matchesAmenities = filters.amenities.length === 0 || 
        filters.amenities.every(amenity => room.amenities.includes(amenity));

      return matchesSearch && matchesCity && matchesPrice && matchesAmenities;
    });

    // Sort results
    filtered.sort((a, b) => {
      switch (filters.sortBy) {
        case 'price-low': return a.pricePerNight - b.pricePerNight;
        case 'price-high': return b.pricePerNight - a.pricePerNight;
        case 'name': return a.hotel.name.localeCompare(b.hotel.name);
        default: return 0;
      }
    });

    return filtered;
  }, [searchTerm, filters]);
  
  // Calculate pagination
  const totalPages = Math.ceil(filteredHotels.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentHotels = filteredHotels.slice(startIndex, endIndex);
  
  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo(0, 0);
  };

  const handleFilterChange = (filterType, value) => {
    setFilters(prev => ({ ...prev, [filterType]: value }));
    setCurrentPage(1);
  };

  const handleAmenityToggle = (amenity) => {
    setFilters(prev => ({
      ...prev,
      amenities: prev.amenities.includes(amenity)
        ? prev.amenities.filter(a => a !== amenity)
        : [...prev.amenities, amenity]
    }));
    setCurrentPage(1);
  };

  const clearFilters = () => {
    setSearchTerm('');
    setFilters({
      city: '',
      priceRange: '',
      amenities: [],
      sortBy: 'name'
    });
    setCurrentPage(1);
  };
  
  return (
    <div className="pt-28 px-4 md:px-16 lg:px-24 xl:px-32 pb-16">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Our Hotels</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Discover our collection of luxury accommodations in the world's most desirable destinations.
        </p>
      </div>

      {/* Search and Filters */}
      <div className="bg-white p-6 rounded-lg shadow-sm border mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          {/* Search */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Search</label>
            <input
              type="text"
              placeholder="Search hotels, cities..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg"
            />
          </div>

          {/* City Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">City</label>
            <select
              value={filters.city}
              onChange={(e) => handleFilterChange('city', e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg"
            >
              <option value="">All Cities</option>
              {cities.map(city => (
                <option key={city} value={city}>{city}</option>
              ))}
            </select>
          </div>

          {/* Price Range Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Price Range</label>
            <select
              value={filters.priceRange}
              onChange={(e) => handleFilterChange('priceRange', e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg"
            >
              <option value="">All Prices</option>
              <option value="under-200">Under $200</option>
              <option value="200-400">$200 - $400</option>
              <option value="400-600">$400 - $600</option>
              <option value="over-600">Over $600</option>
            </select>
          </div>

          {/* Sort By */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Sort By</label>
            <select
              value={filters.sortBy}
              onChange={(e) => handleFilterChange('sortBy', e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg"
            >
              <option value="name">Hotel Name</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>
          </div>

          {/* Clear Filters */}
          <div className="flex items-end">
            <button 
              onClick={clearFilters}
              className="w-full px-4 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-all"
            >
              Clear All
            </button>
          </div>
        </div>

        {/* Amenities Filter */}
        <div className="mt-6">
          <label className="block text-sm font-medium text-gray-700 mb-3">Amenities</label>
          <div className="flex flex-wrap gap-2">
            {allAmenities.map(amenity => (
              <label key={amenity} className="flex items-center">
                <input
                  type="checkbox"
                  checked={filters.amenities.includes(amenity)}
                  onChange={() => handleAmenityToggle(amenity)}
                  className="mr-2"
                />
                <span className="text-sm px-3 py-1 bg-gray-100 rounded-full">{amenity}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Results Counter */}
        <div className="mt-4 text-sm text-gray-600">
          {filteredHotels.length} hotel{filteredHotels.length !== 1 ? 's' : ''} found
        </div>
      </div>

      {currentHotels.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No hotels found matching your criteria.</p>
          <button 
            onClick={clearFilters}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Clear Filters
          </button>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
            {currentHotels.map((room, idx) => (
              <div key={room._id} className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all">
                <div className="relative">
                  <img 
                    src={room.images[0]} 
                    alt={room.hotel.name}
                    className="w-full h-60 object-cover cursor-pointer"
                    onClick={() => {navigate(`/rooms/${room._id}`); scrollTo(0,0)}}
                  />
                  {idx % 3 === 0 && (
                    <div className="absolute top-3 left-3 bg-white px-3 py-1 rounded-full text-xs font-medium">
                      Featured
                    </div>
                  )}
                </div>
                
                <div className="p-5">
                  <div className="flex justify-between items-start mb-2">
                    <h3 
                      className="font-playfair text-xl text-gray-800 cursor-pointer"
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
                className="px-3 py-2 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
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
                className="px-3 py-2 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next
              </button>
            </div>
          )}
          
          {/* Results info */}
          <div className="text-center mt-4 text-gray-500 text-sm">
            Showing {startIndex + 1}-{Math.min(endIndex, filteredHotels.length)} of {filteredHotels.length} hotels
          </div>
        </>
      )}
    </div>
  )
}

export default Hotels
