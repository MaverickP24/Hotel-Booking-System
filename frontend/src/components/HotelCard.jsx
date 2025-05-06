import React from 'react'
import { Link } from 'react-router-dom'
import { assets } from '../assets/assets'

const HotelCard = ({room,idx}) => {
  return (
    <>
        <Link to={"/rooms"+room._id} key={room._id} onClick={()=> scrollTo(0,0)}>
        <div className='relative max-w-70 w-full rounded-xl overflow-hidden bg-white text-gray-500/90 shadow-[0px_4px_4px_rgba(0,0,0,0.05)]'>
        <img src={room.images[0]} alt=""  />
        { idx%2 ===0 && <p className='px-3 py-1 text-xs absolute top-3 left-3 bg-white text-gray-800 font-medium rounded-full'>Best Seller</p>}

        <div class="p-4 pt-5 flex flex-col ">
            <div class="flex items-center justify-between">
                <p class="font-playfair text-xl font-medium text-gray-800">{room.hotel.name}</p>
                <div class="flex items-center gap-1">
                    <img alt="star-icon" src={assets.starIconFilled}/> 4.5
                </div>
            </div>
        <div class="flex items-center gap-1 text-sm">
            <img alt="location-icon" src={assets.locationIcon}/><span>{room.hotel.address}</span>
        </div>
            <div class="flex items-center justify-between mt-4">
                <p><span class="text-xl text-gray-800">{room.pricePerNight}</span>/night</p>
                <button class="px-4 py-2 text-sm font-medium border border-gray-300 rounded hover:bg-gray-50 transition-all cursor-pointer">Book Now</button>
            </div>
        </div>
        </div>
        </Link>
    </>
  )
}

export default HotelCard
