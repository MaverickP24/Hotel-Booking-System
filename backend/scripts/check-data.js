import dotenv from 'dotenv';
import mongoose from 'mongoose';
import Hotel from '../models/Hotel.js';
import Room from '../models/Room.js';

dotenv.config();

const checkData = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');

    const hotels = await Hotel.find({}).populate('owner');
    console.log('\n=== HOTELS ===');
    console.log(JSON.stringify(hotels, null, 2));

    const rooms = await Room.find({}).populate('hotel');
    console.log('\n=== ROOMS ===');
    console.log(JSON.stringify(rooms, null, 2));

    process.exit(0);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
};

checkData();
