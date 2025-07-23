import React, { useState } from 'react'
import { cities } from '../assets/assets'
import Footer from './Footer'
import { useNavigate } from 'react-router-dom'

const Landing = () => {
  const navigate = useNavigate();
  const [searchData, setSearchData] = useState({
    destination: '',
    checkIn: '',
    checkOut: '',
    guests: 1
  });

  const handleInputChange = (field, value) => {
    setSearchData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSearch = (e) => {
    e.preventDefault();
    
    // Create URL parameters for search
    const params = new URLSearchParams();
    if (searchData.destination) params.set('city', searchData.destination);
    if (searchData.checkIn) params.set('checkIn', searchData.checkIn);
    if (searchData.checkOut) params.set('checkOut', searchData.checkOut);
    if (searchData.guests) params.set('guests', searchData.guests);
    
    // Navigate to hotels page with search parameters
    navigate(`/hotels?${params.toString()}`);
    scrollTo(0, 0);
  };

  return (
    <>
      <div className="flex flex-col items-start justify-center px-6 md:px-16 lg:px-24 xl:px-32 text-white bg-[url(/src/assets/heroImage.png)] bg-no-repeat bg-cover bg-center h-screen">
        <p className="bg-[#49B9FF]/50 px-3.5 py-1 rounded-full mt-20">The Ultimate Hotel Experience</p>
        <h1 className="font-playfair text-2xl md:text-5xl md:text-[56px] md:leading-[56px] font-bold md:font-extrabold max-w-xl mt-4">Discover Your Perfect Gateway Destination</h1>
        <p className="max-w-130 mt-2 text-sm md:text-base">Unparalleled luxury and comfort await at the world's most exclusive hotels and resorts. Start your journey today.</p>

        <form onSubmit={handleSearch} className='bg-white text-gray-500 rounded-lg px-6 py-4 flex flex-col md:flex-row max-md:items-start gap-4 max-md:mx-auto mt-5'>
          <div>
            <div className='flex items-center gap-2'>
              <svg className="w-4 h-4 text-gray-800" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 13a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"/>
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.8 13.8 21 17l-3.2-3.2M3 17l3.2-3.2"/>
              </svg>
              <label htmlFor="destinationInput">Destination</label>
            </div>
            <input 
              list='destinations' 
              id="destinationInput" 
              type="text" 
              className="rounded border border-gray-200 px-3 py-1.5 mt-1.5 text-sm outline-none" 
              placeholder="Type here" 
              value={searchData.destination}
              onChange={(e) => handleInputChange('destination', e.target.value)}
              required 
            />
            <datalist id="destinations">
              {cities.map((city, idx) => <option key={idx} value={city} />)}
            </datalist>
          </div>

          <div>
            <div className='flex items-center gap-2'>
              <svg className="w-4 h-4 text-gray-800" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 10h16M8 14h8m-4-7V4M7 7V4m10 3V4M5 20h14a1 1 0 0 0 1-1V7a1 1 0 0 0-1-1H5a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1Z"/>
              </svg>
              <label htmlFor="checkIn">Check in</label>
            </div>
            <input 
              id="checkIn" 
              type="date" 
              className="rounded border border-gray-200 px-3 py-1.5 mt-1.5 text-sm outline-none"
              value={searchData.checkIn}
              onChange={(e) => handleInputChange('checkIn', e.target.value)}
              min={new Date().toISOString().split('T')[0]}
            />
          </div>

          <div>
            <div className='flex items-center gap-2'>
              <svg className="w-4 h-4 text-gray-800" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 10h16M8 14h8m-4-7V4M7 7V4m10 3V4M5 20h14a1 1 0 0 0 1-1V7a1 1 0 0 0-1-1H5a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1Z"/>
              </svg>
              <label htmlFor="checkOut">Check out</label>
            </div>
            <input 
              id="checkOut" 
              type="date" 
              className="rounded border border-gray-200 px-3 py-1.5 mt-1.5 text-sm outline-none"
              value={searchData.checkOut}
              onChange={(e) => handleInputChange('checkOut', e.target.value)}
              min={searchData.checkIn || new Date().toISOString().split('T')[0]}
            />
          </div>

          <div className='flex md:flex-col max-md:gap-2 max-md:items-center'>
            <label htmlFor="guests">Guests</label>
            <input 
              min={1} 
              max={4} 
              id="guests" 
              type="number" 
              className="rounded border border-gray-200 px-3 py-1.5 mt-1.5 text-sm outline-none max-w-16" 
              placeholder="1"
              value={searchData.guests}
              onChange={(e) => handleInputChange('guests', e.target.value)}
            />
          </div>

          <button type="submit" className='flex items-center justify-center gap-1 rounded-md bg-black py-3 px-4 text-white my-auto cursor-pointer max-md:w-full max-md:py-1'>
            <svg className="w-4 h-4 text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
            </svg>
            <span>Search</span>
          </button>
        </form>
      </div>
    </>
  )
}

export default Landing
