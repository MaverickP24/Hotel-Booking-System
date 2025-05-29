import React from 'react'
import { assets, facilityIcons, roomsDummyData } from '../assets/assets'
import { useNavigate } from 'react-router-dom'

const Rooms = () => {
    const navigate = useNavigate();
  return (
    <>
    <div className="flex flex-col-reverse md:flex-row items-start justify-between pt-28 px-4 md:pt-35 md:px-16 lg:px-24 xl:px-32">
        <div>
            <div class="flex flex-col items-start text-left">
                <h1 class="font-playfair text-4xl md:text-[40px]">Hotel Rooms</h1>
                <p class="text-sm md:text-base text-gray-500/90 mt-2 max-w-174">Take advantage of our limited-time offers and special packages to enhance your stay and create unforgettable memories.</p>
            </div>

        {roomsDummyData.map((room)=>(
            <div key={room._id}  class="flex flex-col md:flex-row items-start py-10 gap-6 border-b border-gray-300 last:pb-30 last:border-0">
            <img onClick={() => {navigate(`/rooms/${room._id}`); scrollTo(0,0)}} title="View Room Details" alt="hotel-img" class="max-h-65 md:w-1/2 rounded-xl shadow-lg object-cover cursor-pointer" src={room.images[0]}/>
            <div class="md:w-1/2 flex flex-col gap-2">
                <p class="text-gray-500">{room.hotel.city}</p>
                <p onClick={() => {navigate("/rooms/"+room._id); scrollTo(0,0)}} class="text-gray-800 text-3xl font-playfair cursor-pointer" title="View Room Details">{room.hotel.name}</p>
                
                <div class="flex items-center">
                    
                    <img alt="star-icon" class="w-4.5 h-4.5" src={assets.starIconFilled}/>
                    <img alt="star-icon" class="w-4.5 h-4.5" src={assets.starIconFilled}/>
                    <img alt="star-icon" class="w-4.5 h-4.5" src={assets.starIconFilled}/>
                    <img alt="star-icon" class="w-4.5 h-4.5" src={assets.starIconFilled}/>
                    <img alt="star-icon" class="w-4.5 h-4.5" src={assets.starIconFilled}/>
                    <p class="ml-2">200+ reviews</p>
                </div>
                
                <div class="flex items-center gap-1 text-gray-500 mt-2 text-sm">
                    <img alt="location-icon" src={assets.locationIcon}/><span>{room.hotel.address}</span>
                </div>
                
                <div class="flex flex-wrap items-center mt-3 mb-6 gap-4">
                    {room.amenities.map((item,idx)=>(
                        <div key={idx} class="flex items-center gap-2 px-3 py-2 rounded-lg bg-[#F5F5FF]/70">
                        <img alt={item} class="w-5 h-5" src={facilityIcons[item]}/>
                            <p class="text-xs">{item}</p>
                    </div>
                    ))}
                </div>
                <p class="text-xl font-medium text-gray-700">${room.pricePerNight} /Night</p>
            </div>
        </div>
    ))}
        </div>
        
        
    </div>
    </>
  )
}

export default Rooms