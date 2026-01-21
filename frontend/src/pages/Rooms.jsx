import React, { useState, useMemo, useEffect } from 'react'
import { assets, facilityIcons } from '../assets/assets'
import { useNavigate } from 'react-router-dom'
import { roomsAPI } from '../utils/api'

const Rooms = () => {
    const navigate = useNavigate();
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');
    const [rooms, setRooms] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [filters, setFilters] = useState({
        city: '',
        roomType: '',
        priceRange: '',
        amenities: [],
        sortBy: 'name'
    });
    const itemsPerPage = 6;

    useEffect(() => {
        const fetchRooms = async () => {
            try {
                setLoading(true);
                setError('');
                const response = await roomsAPI.getAll({ available: true });
                setRooms(response.data || []);
            } catch (err) {
                setError(err.message || 'Failed to load rooms');
            } finally {
                setLoading(false);
            }
        };

        fetchRooms();
    }, []);

    // Get unique values for filter options
    const cities = [...new Set(rooms.map(room => room.hotel?.city).filter(Boolean))];
    const roomTypes = [...new Set(rooms.map(room => room.roomType).filter(Boolean))];
    const allAmenities = [...new Set(rooms.flatMap(room => room.amenities || []))];

    // Filter and search logic
    const filteredRooms = useMemo(() => {
        let filtered = rooms.filter(room => {
            // Search term filter
            const matchesSearch = searchTerm === '' ||
                room.hotel?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                room.hotel?.city?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                room.roomType.toLowerCase().includes(searchTerm.toLowerCase());

            // City filter
            const matchesCity = filters.city === '' || room.hotel?.city === filters.city;

            // Room type filter
            const matchesRoomType = filters.roomType === '' || room.roomType === filters.roomType;

            // Price range filter
            const matchesPrice = filters.priceRange === '' || (() => {
                const price = room.pricePerNight || 0;
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

            return matchesSearch && matchesCity && matchesRoomType && matchesPrice && matchesAmenities;
        });

        // Sort results
        filtered.sort((a, b) => {
            switch (filters.sortBy) {
                case 'price-low': return a.pricePerNight - b.pricePerNight;
                case 'price-high': return b.pricePerNight - a.pricePerNight;
                case 'name': return (a.hotel?.name || '').localeCompare(b.hotel?.name || '');
                default: return 0;
            }
        });

        return filtered;
    }, [searchTerm, filters]);

    // Calculate pagination
    const totalPages = Math.ceil(filteredRooms.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentRooms = filteredRooms.slice(startIndex, endIndex);

    const handlePageChange = (page) => {
        setCurrentPage(page);
        window.scrollTo(0, 0);
    };

    const handleFilterChange = (filterType, value) => {
        setFilters(prev => ({ ...prev, [filterType]: value }));
        setCurrentPage(1); // Reset to first page when filtering
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
            roomType: '',
            priceRange: '',
            amenities: [],
            sortBy: 'name'
        });
        setCurrentPage(1);
    };

    if (loading) {
        return (
            <div className="pt-28 flex justify-center items-center min-h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
            </div>
        );
    }

    return (
        <>
            <div className="flex flex-col-reverse lg:flex-row items-start justify-between pt-28 px-4 md:pt-35 md:px-16 lg:px-24 xl:px-32">
                {/* Filters Sidebar */}
                <div className="w-full lg:w-80 lg:mr-8 mb-8 lg:mb-0">
                    <div className="bg-white p-6 rounded-lg shadow-sm border">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-lg font-semibold">Filters</h3>
                            <button
                                onClick={clearFilters}
                                className="text-sm text-blue-600 hover:text-blue-800"
                            >
                                Clear All
                            </button>
                        </div>

                        {/* Search */}
                        <div className="mb-6">
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
                        <div className="mb-6">
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

                        {/* Room Type Filter */}
                        <div className="mb-6">
                            <label className="block text-sm font-medium text-gray-700 mb-2">Room Type</label>
                            <select
                                value={filters.roomType}
                                onChange={(e) => handleFilterChange('roomType', e.target.value)}
                                className="w-full p-3 border border-gray-300 rounded-lg"
                            >
                                <option value="">All Room Types</option>
                                {roomTypes.map(type => (
                                    <option key={type} value={type}>{type}</option>
                                ))}
                            </select>
                        </div>

                        {/* Price Range Filter */}
                        <div className="mb-6">
                            <label className="block text-sm font-medium text-gray-700 mb-2">Price Range</label>
                            <select
                                value={filters.priceRange}
                                onChange={(e) => handleFilterChange('priceRange', e.target.value)}
                                className="w-full p-3 border border-gray-300 rounded-lg"
                            >
                                <option value="">All Prices</option>
                                <option value="under-200">Under ₹200</option>
                                <option value="200-400">₹200 - ₹400</option>
                                <option value="400-600">₹400 - ₹600</option>
                                <option value="over-600">Over ₹600</option>
                            </select>
                        </div>

                        {/* Amenities Filter */}
                        <div className="mb-6">
                            <label className="block text-sm font-medium text-gray-700 mb-2">Amenities</label>
                            <div className="space-y-2 max-h-40 overflow-y-auto">
                                {allAmenities.map(amenity => (
                                    <label key={amenity} className="flex items-center">
                                        <input
                                            type="checkbox"
                                            checked={filters.amenities.includes(amenity)}
                                            onChange={() => handleAmenityToggle(amenity)}
                                            className="mr-2"
                                        />
                                        <span className="text-sm">{amenity}</span>
                                    </label>
                                ))}
                            </div>
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
                    </div>
                </div>

                {/* Main Content */}
                <div className="flex-1">
                    <div className="flex flex-col items-start text-left mb-8">
                        <h1 className="font-playfair text-4xl md:text-[40px]">Hotel Rooms</h1>
                        <p className="text-sm md:text-base text-gray-500/90 mt-2 max-w-174">
                            Take advantage of our limited-time offers and special packages to enhance your stay and create unforgettable memories.
                        </p>
                        <div className="mt-4 text-sm text-gray-600">
                            {filteredRooms.length} room{filteredRooms.length !== 1 ? 's' : ''} found
                        </div>
                    </div>

                    {error && (
                        <div className="mb-6 w-full p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
                            {error}
                        </div>
                    )}

                    {currentRooms.length === 0 ? (
                        <div className="text-center py-12">
                            <p className="text-gray-500 text-lg">No rooms found matching your criteria.</p>
                            <button
                                onClick={clearFilters}
                                className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                            >
                                Clear Filters
                            </button>
                        </div>
                    ) : (
                        <>
                            {currentRooms.map((room) => (
                                <div key={room._id} className="flex flex-col md:flex-row items-start py-10 gap-6 border-b border-gray-300 last:pb-30 last:border-0">
                                    <img onClick={() => { navigate(`/rooms/${room._id}`); scrollTo(0, 0) }} title="View Room Details" alt="hotel-img" className="max-h-65 md:w-1/2 rounded-xl shadow-lg object-cover cursor-pointer" src={room.images?.[0]} />
                                    <div className="md:w-1/2 flex flex-col gap-2">
                                        <p className="text-gray-500">{room.hotel?.city}</p>
                                        <p onClick={() => { navigate("/rooms/" + room._id); scrollTo(0, 0) }} className="text-gray-800 text-3xl font-playfair cursor-pointer" title="View Room Details">{room.hotel?.name}</p>
                                        <div className="flex items-center gap-1">
                                            <img src={assets.starIconFilled} alt="rating" className="w-4 h-4" />
                                            <img src={assets.starIconFilled} alt="rating" className="w-4 h-4" />
                                            <img src={assets.starIconFilled} alt="rating" className="w-4 h-4" />
                                            <img src={assets.starIconFilled} alt="rating" className="w-4 h-4" />
                                            <img src={assets.starIconFilled} alt="rating" className="w-4 h-4" />
                                            <span className="text-sm ml-1">4.8 (200+ reviews)</span>
                                        </div>

                                        <div className="flex flex-wrap items-center mt-3 mb-6 gap-4">
                                            {(room.amenities || []).map((item, idx) => (
                                                <div key={idx} className="flex items-center gap-2 px-3 py-2 rounded-lg bg-[#F5F5FF]/70">
                                                    <img alt={item} className="w-5 h-5" src={facilityIcons[item]} />
                                                    <p className="text-xs">{item}</p>
                                                </div>
                                            ))}
                                        </div>
                                        <p className="text-xl font-medium text-gray-700">₹{room.pricePerNight} /Night</p>
                                    </div>
                                </div>
                            ))}

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
                                                className={`px-3 py-2 rounded-lg border ${currentPage === page
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
                            <div className="text-center mt-4 mb-8 text-gray-500 text-sm">
                                Showing {startIndex + 1}-{Math.min(endIndex, filteredRooms.length)} of {filteredRooms.length} rooms
                            </div>
                        </>
                    )}
                </div>
            </div>
        </>
    )
}

export default Rooms
