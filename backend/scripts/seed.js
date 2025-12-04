import dotenv from 'dotenv';
import mongoose from 'mongoose';
import User from '../models/User.js';
import Hotel from '../models/Hotel.js';
import Room from '../models/Room.js';

// Use the same .env file as the main server (backend/.env)
dotenv.config();

const hotelSeeds = [
  {
    name: 'Urbanza Suites',
    city: 'New York',
    address: '123 Main Street, Manhattan, NY 10001',
    contact: '+1 (212) 555-0198',
    description: 'Boutique luxury stay in the heart of Manhattan with skyline views.',
    images: [
      'https://images.unsplash.com/photo-1501117716987-c8e1ecb210cc?q=80&w=1200&auto=format&fit=crop'
    ],
    rating: 4.8
  },
  {
    name: 'Marina Bay Suites',
    city: 'Singapore',
    address: '8 Bayfront Avenue, Marina Bay',
    contact: '+65 6123 4567',
    description: 'Skyline suites overlooking the Marina Bay waterfront with award-winning service.',
    images: [
      'https://images.unsplash.com/photo-1505691938895-1758d7feb511?q=80&w=1200&auto=format&fit=crop'
    ],
    rating: 4.7
  },
  {
    name: 'Thames View Hotel',
    city: 'London',
    address: '25 Riverside Walk, Westminster, London',
    contact: '+44 20 7946 0234',
    description: 'Timeless European charm with modern comforts beside the River Thames.',
    images: [
      'https://images.unsplash.com/photo-1469796466635-455ede028aca?q=80&w=1200&auto=format&fit=crop'
    ],
    rating: 4.6
  }
];

const roomSeeds = [
  // Urbanza Suites (New York)
  {
    hotelIndex: 0,
    roomType: 'Double Bed',
    pricePerNight: 399,
    amenities: ['Free WiFi', 'Free Breakfast', 'Room Service', 'Pool Access'],
    images: [
      'https://images.unsplash.com/photo-1616594039964-c2b7013f1a49?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1540518614846-7eded433c457?q=80&w=1200&auto=format&fit=crop'
    ],
    maxGuests: 2,
    description: 'Modern double room with curated interiors, work desk, and marble bathroom.'
  },
  {
    hotelIndex: 0,
    roomType: 'Suite',
    pricePerNight: 549,
    amenities: ['Free WiFi', 'Room Service', 'Mountain View', 'Pool Access'],
    images: [
      'https://images.unsplash.com/photo-1496417263034-38ec4f0b665a?q=80&w=1200&auto=format&fit=crop'
    ],
    maxGuests: 3,
    description: 'Corner suite with panoramic skyline views and a dedicated living area.'
  },
  {
    hotelIndex: 0,
    roomType: 'Deluxe',
    pricePerNight: 319,
    amenities: ['Free WiFi', 'Room Service'],
    images: [
      'https://images.unsplash.com/photo-1520256862855-398228c41684?q=80&w=1200&auto=format&fit=crop'
    ],
    maxGuests: 2,
    description: 'Cozy deluxe room ideal for business travelers with high-speed WiFi.'
  },
  {
    hotelIndex: 0,
    roomType: 'Single Bed',
    pricePerNight: 249,
    amenities: ['Free WiFi', 'Room Service'],
    images: [
      'https://images.unsplash.com/photo-1484100356142-db6ab6244067?q=80&w=1200&auto=format&fit=crop'
    ],
    maxGuests: 1,
    description: 'Compact single room with all essentials for a short city stay.'
  },
  {
    hotelIndex: 0,
    roomType: 'Presidential Suite',
    pricePerNight: 999,
    amenities: ['Free WiFi', 'Free Breakfast', 'Room Service', 'Pool Access'],
    images: [
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=1200&auto=format&fit=crop'
    ],
    maxGuests: 4,
    description: 'Top-floor presidential suite with terrace and private lounge.'
  },
  {
    hotelIndex: 0,
    roomType: 'Suite',
    pricePerNight: 579,
    amenities: ['Free WiFi', 'Free Breakfast', 'Pool Access'],
    images: [
      'https://images.unsplash.com/photo-1545239351-1141bd82e8a6?q=80&w=1200&auto=format&fit=crop'
    ],
    maxGuests: 3,
    description: 'Light-filled suite with floor-to-ceiling windows and city views.'
  },
  {
    hotelIndex: 0,
    roomType: 'Double Bed',
    pricePerNight: 369,
    amenities: ['Free WiFi', 'Room Service', 'Pool Access'],
    images: [
      'https://images.unsplash.com/photo-1522708323590-535bf50be5f5?q=80&w=1200&auto=format&fit=crop'
    ],
    maxGuests: 2,
    description: 'Spacious double room with lounge chair and reading nook.'
  },

  // Marina Bay Suites (Singapore)
  {
    hotelIndex: 1,
    roomType: 'Deluxe',
    pricePerNight: 449,
    amenities: ['Free WiFi', 'Free Breakfast', 'Room Service'],
    images: [
      'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?q=80&w=1200&auto=format&fit=crop'
    ],
    maxGuests: 2,
    description: 'High-floor deluxe room with bay views and rainfall shower.'
  },
  {
    hotelIndex: 1,
    roomType: 'Presidential Suite',
    pricePerNight: 899,
    amenities: ['Free WiFi', 'Free Breakfast', 'Room Service', 'Pool Access'],
    images: [
      'https://images.unsplash.com/photo-1505691723518-36a5ac3be353?q=80&w=1200&auto=format&fit=crop'
    ],
    maxGuests: 4,
    description: 'Expansive presidential suite with private lounge and 24/7 butler service.'
  },
  {
    hotelIndex: 1,
    roomType: 'Single Bed',
    pricePerNight: 259,
    amenities: ['Free WiFi'],
    images: [
      'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?q=80&w=1200&auto=format&fit=crop'
    ],
    maxGuests: 1,
    description: 'Minimalist single room designed for solo business travelers.'
  },
  {
    hotelIndex: 1,
    roomType: 'Suite',
    pricePerNight: 599,
    amenities: ['Free WiFi', 'Free Breakfast', 'Room Service', 'Pool Access'],
    images: [
      'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?q=80&w=1200&auto=format&fit=crop'
    ],
    maxGuests: 3,
    description: 'Corner suite with panoramic view of Marina Bay and infinity pool access.'
  },
  {
    hotelIndex: 1,
    roomType: 'Double Bed',
    pricePerNight: 389,
    amenities: ['Free WiFi', 'Room Service'],
    images: [
      'https://images.unsplash.com/photo-1489171078254-c3365d6e359f?q=80&w=1200&auto=format&fit=crop'
    ],
    maxGuests: 2,
    description: 'Elegant double room with bay window seating and city skyline views.'
  },
  {
    hotelIndex: 1,
    roomType: 'Deluxe',
    pricePerNight: 479,
    amenities: ['Free WiFi', 'Free Breakfast', 'Pool Access'],
    images: [
      'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=1200&auto=format&fit=crop'
    ],
    maxGuests: 2,
    description: 'Deluxe bayfront room with balcony and lounge access.'
  },

  // Thames View Hotel (London)
  {
    hotelIndex: 2,
    roomType: 'Double Bed',
    pricePerNight: 329,
    amenities: ['Free WiFi', 'Room Service', 'Mountain View'],
    images: [
      'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=1200&auto=format&fit=crop'
    ],
    maxGuests: 2,
    description: 'Classic double room overlooking the Thames with artisan furnishings.'
  },
  {
    hotelIndex: 2,
    roomType: 'Suite',
    pricePerNight: 579,
    amenities: ['Free WiFi', 'Free Breakfast', 'Pool Access'],
    images: [
      'https://images.unsplash.com/photo-1505691938895-1758d7feb511?q=80&w=1200&auto=format&fit=crop'
    ],
    maxGuests: 3,
    description: 'Riverside suite featuring private balcony seating and soaking tub.'
  },
  {
    hotelIndex: 2,
    roomType: 'Single Bed',
    pricePerNight: 219,
    amenities: ['Free WiFi'],
    images: [
      'https://images.unsplash.com/photo-1522708323590-535bf50be5f5?q=80&w=1200&auto=format&fit=crop'
    ],
    maxGuests: 1,
    description: 'Charming attic single room with skylight and work desk.'
  },
  {
    hotelIndex: 2,
    roomType: 'Deluxe',
    pricePerNight: 359,
    amenities: ['Free WiFi', 'Room Service'],
    images: [
      'https://images.unsplash.com/photo-1417962790929-5342b1346a4f?q=80&w=1200&auto=format&fit=crop'
    ],
    maxGuests: 2,
    description: 'Deluxe river-view room with vintage-inspired decor.'
  },
  {
    hotelIndex: 2,
    roomType: 'Suite',
    pricePerNight: 609,
    amenities: ['Free WiFi', 'Free Breakfast', 'Room Service'],
    images: [
      'https://images.unsplash.com/photo-1552566626-52f8b828add9?q=80&w=1200&auto=format&fit=crop'
    ],
    maxGuests: 3,
    description: 'Executive suite with separate living area and workspace.'
  },
  {
    hotelIndex: 2,
    roomType: 'Presidential Suite',
    pricePerNight: 949,
    amenities: ['Free WiFi', 'Free Breakfast', 'Room Service', 'Pool Access'],
    images: [
      'https://images.unsplash.com/photo-1519710884009-856f4ea28eab?q=80&w=1200&auto=format&fit=crop'
    ],
    maxGuests: 4,
    description: 'Presidential suite with panoramic Thames views and private dining room.'
  }
];

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');

    await Room.deleteMany();
    await Hotel.deleteMany();
    console.log('Cleared existing hotel and room data');

    let owner = await User.findOne({ email: 'owner@example.com' });
    if (!owner) {
      owner = await User.create({
        username: 'demo_owner',
        email: 'owner@example.com',
        password: 'Owner@123',
        role: 'hotelOwner'
      });
      console.log('Created demo hotel owner (owner@example.com / Owner@123)');
    } else {
      console.log('Using existing owner account:', owner.email);
    }

    const hotels = await Hotel.insertMany(
      hotelSeeds.map((hotel) => ({
        ...hotel,
        owner: owner._id
      }))
    );

    await Room.insertMany(
      roomSeeds.map((room) => ({
        hotel: hotels[room.hotelIndex]._id,
        roomType: room.roomType,
        pricePerNight: room.pricePerNight,
        amenities: room.amenities,
        images: room.images,
        maxGuests: room.maxGuests,
        description: room.description,
        isAvailable: true
      }))
    );

    console.log('Database seeded successfully ✅');
    process.exit(0);
  } catch (error) {
    console.error('Seeding failed ❌', error);
    process.exit(1);
  }
};

seedDatabase();

