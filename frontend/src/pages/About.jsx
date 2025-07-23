import React from 'react'
import { assets } from '../assets/assets'
import Title from '../components/Title'

const About = () => {
  const teamMembers = [
    {
      id: 1,
      name: "Emma Thompson",
      role: "Founder & CEO",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=988&q=80"
    },
    {
      id: 2,
      name: "Michael Chen",
      role: "Chief Operations Officer",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
    },
    {
      id: 3,
      name: "Sophia Rodriguez",
      role: "Head of Customer Experience",
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1061&q=80"
    },
    {
      id: 4,
      name: "James Wilson",
      role: "Chief Marketing Officer",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=987&q=80"
    }
  ];

  const values = [
    { id: 1, title: "Excellence", description: "We strive for excellence in every aspect of our service." },
    { id: 2, title: "Authenticity", description: "We create genuine experiences that reflect local culture and traditions." },
    { id: 3, title: "Sustainability", description: "We are committed to responsible tourism and environmental stewardship." },
    { id: 4, title: "Innovation", description: "We continuously evolve to enhance the guest experience." }
  ];

  return (
    <div className="pt-28 px-4 md:px-16 lg:px-24 xl:px-32 pb-16">
      <Title 
        title="About ApnaStays" 
        subTitle="Discover our story, our mission, and the team behind our commitment to exceptional hospitality."
      />
      
      {/* Hero Section */}
      <div className="mt-12 relative rounded-xl overflow-hidden">
        <img 
          src="https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" 
          alt="About ApnaStays"
          className="w-full h-96 object-cover"
        />
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
          <div className="text-center text-white max-w-2xl px-4">
            <h2 className="font-playfair text-4xl mb-4">Our Journey</h2>
            <p className="text-lg">
              Founded in 2015, ApnaStays has grown from a single boutique hotel to a collection of luxury properties across the globe.
            </p>
          </div>
        </div>
      </div>
      
      {/* Our Story */}
      <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div>
          <h2 className="font-playfair text-3xl mb-4">Our Story</h2>
          <p className="text-gray-600 mb-4">
            ApnaStays began with a simple vision: to create extraordinary spaces where travelers could experience authentic luxury. 
            Our founder, Emma Thompson, was inspired by her own travels and the memorable stays that transformed her journeys.
          </p>
          <p className="text-gray-600 mb-4">
            What started as a single boutique hotel has evolved into a curated collection of properties, each with its own unique character 
            but united by our commitment to exceptional service, attention to detail, and authentic experiences.
          </p>
          <p className="text-gray-600">
            Today, we continue to expand our presence while staying true to our founding principles. Every ApnaStays property is 
            thoughtfully designed to reflect its location's culture and heritage while providing the comfort and luxury our guests expect.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <img 
            src="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" 
            alt="Our story"
            className="rounded-xl h-full object-cover"
          />
          <img 
            src="https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" 
            alt="Our story"
            className="rounded-xl h-full object-cover"
          />
          <img 
            src="https://images.unsplash.com/photo-1564501049412-61c2a3083791?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" 
            alt="Our story"
            className="rounded-xl h-full object-cover"
          />
          <img 
            src="https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2080&q=80" 
            alt="Our story"
            className="rounded-xl h-full object-cover"
          />
        </div>
      </div>
      
      {/* Our Values */}
      <div className="mt-16">
        <h2 className="font-playfair text-3xl mb-8 text-center">Our Values</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((value) => (
            <div key={value.id} className="bg-slate-50 p-6 rounded-xl">
              <h3 className="font-playfair text-xl mb-3">{value.title}</h3>
              <p className="text-gray-600">{value.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default About
