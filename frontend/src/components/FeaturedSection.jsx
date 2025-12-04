import React, { useEffect, useState } from 'react'
import HotelCard from './HotelCard'
import Title from './Title'
import { useNavigate } from 'react-router-dom'
import { roomsAPI } from '../utils/api'

const FeaturedSection = () => {
    const navigate = useNavigate();
    const [rooms, setRooms] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')

    useEffect(() => {
        const fetchRooms = async () => {
            try {
                setLoading(true)
                setError('')
                const response = await roomsAPI.getAll({ available: true })
                setRooms((response.data || []).slice(0, 4))
            } catch (err) {
                setError(err.message || 'Failed to load featured hotels')
            } finally {
                setLoading(false)
            }
        }

        fetchRooms()
    }, [])

  return (
    <div className="flex flex-col items-center px-6 md:px-16 lg:px-24 bg-slate-50 py-20">

        <Title title="Featured Hotels" subTitle="Explore our curated collection of extraordinary properties across the globe, each offering unmatched luxury and unforgettable experiences." />

        {error && (
            <div className="mt-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg text-center w-full md:w-auto">
                {error}
            </div>
        )}

        <div className='flex flex-wrap items-center justify-center gap-6 mt-20'>
            {loading
                ? [...Array(4)].map((_, idx) => (
                    <div key={idx} className="h-64 w-72 bg-white rounded-xl shadow animate-pulse" />
                  ))
                : rooms.map((item,idx)=>(
                <HotelCard key={item._id} room={item} idx = {idx} />
            ))}
        </div>

        <button onClick={()=>(navigate("/featured"))} className="my-16 px-4 py-2 text-sm font-medium border border-gray-300 rounded bg-white hover:bg-gray-50 transition-all cursor-pointer">View All Featured Hotels</button>
        
    </div>
  )
}

export default FeaturedSection
