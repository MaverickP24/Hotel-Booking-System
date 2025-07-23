import React from 'react'
import { assets } from '../assets/assets'
import Title from '../components/Title'

const Experience = () => {
  const experiences = [
    {
      id: 1,
      title: "Culinary Adventures",
      description: "Immerse yourself in local flavors with our chef-guided cooking classes and food tours.",
      image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
    },
    {
      id: 2,
      title: "Wellness Retreats",
      description: "Rejuvenate your mind and body with our spa treatments, yoga sessions, and meditation retreats.",
      image: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
    },
    {
      id: 3,
      title: "Cultural Immersion",
      description: "Connect with local traditions through guided tours, workshops, and authentic cultural experiences.",
      image: "https://images.unsplash.com/photo-1519451241324-20b4ea2c4220?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
    },
    {
      id: 4,
      title: "Adventure Excursions",
      description: "Explore the natural wonders with our guided hiking, diving, and wildlife observation tours.",
      image: "https://images.unsplash.com/photo-1530866495561-507c9faab2ed?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
    },
    {
      id: 5,
      title: "Luxury Sailing",
      description: "Set sail on private yacht charters to discover hidden coves and pristine beaches.",
      image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
    },
    {
      id: 6,
      title: "Exclusive Events",
      description: "Attend curated events from wine tastings to private concerts in extraordinary settings.",
      image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80"
    }
  ];

  return (
    <div className="pt-28 px-4 md:px-16 lg:px-24 xl:px-32 pb-16">
      <Title 
        title="Unforgettable Experiences" 
        subTitle="Discover extraordinary activities and adventures that will transform your stay into a lifetime memory."
      />
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
        {experiences.map((exp) => (
          <div key={exp.id} className="group relative overflow-hidden rounded-xl shadow-md hover:shadow-lg transition-all">
            <img 
              src={exp.image} 
              alt={exp.title}
              className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-6 text-white">
              <h3 className="font-playfair text-2xl mb-2">{exp.title}</h3>
              <p className="text-sm text-white/90 mb-4">{exp.description}</p>
              <button className="w-fit px-4 py-2 bg-white text-gray-800 rounded-full text-sm font-medium hover:bg-gray-100 transition-colors">
                Explore More
              </button>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-16 bg-slate-50 rounded-xl p-8 md:p-12">
        <div className="flex flex-col md:flex-row gap-8 items-center">
          <div className="md:w-1/2">
            <h2 className="font-playfair text-3xl mb-4">Customize Your Experience</h2>
            <p className="text-gray-600 mb-6">
              Our concierge team is ready to craft personalized experiences tailored to your preferences. 
              From private tours to special celebrations, we'll help you create memories that last a lifetime.
            </p>
            <button className="px-6 py-3 bg-black text-white rounded-full hover:bg-gray-800 transition-colors">
              Contact Concierge
            </button>
          </div>
          <div className="md:w-1/2">
            <img 
              src="https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" 
              alt="Concierge service"
              className="rounded-xl shadow-md w-full h-64 object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Experience
