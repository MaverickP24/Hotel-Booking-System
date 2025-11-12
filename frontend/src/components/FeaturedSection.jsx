import React from 'react'
import { roomsDummyData } from '../assets/assets'
import HotelCard from './HotelCard'
import Title from './Title'
import { useNavigate } from 'react-router-dom'

const FeaturedSection = () => {
    const navigate = useNavigate();
  return (
    <div className="flex flex-col items-center px-6 md:px-16 lg:px-24 bg-slate-50 py-20">

        <Title title="Featured Hotels" subTitle="Explore our curated collection of extraordinary properties across the globe, each offering unmatched luxury and unforgettable experiences." />

        <div className='flex flex-wrap items-center justify-center gap-6 mt-20'>
            {roomsDummyData.slice(0,4).map((item,idx)=>(
                <HotelCard key={item._id} room={item} idx = {idx} />
            ))}
        </div>

        <button onClick={()=>(navigate("/featured"))} className="my-16 px-4 py-2 text-sm font-medium border border-gray-300 rounded bg-white hover:bg-gray-50 transition-all cursor-pointer">View All Featured Hotels</button>
        
    </div>
  )
}

export default FeaturedSection
