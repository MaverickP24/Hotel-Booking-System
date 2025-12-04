import dotenv from 'dotenv';
import mongoose from 'mongoose';
import Hotel from '../models/Hotel.js';
import Room from '../models/Room.js';

// Load environment variables from parent directory
dotenv.config({ path: '../.env' });

// Conversion rate: 1 USD = 83 INR (approximately)
const USD_TO_INR = 83;

// New unique hotel names (Indian themed)
const hotelNames = [
    'The Royal Taj Palace',
    'Emerald Gardens Resort',
    'Golden Crown Heritage Hotel',
    'Sapphire Bay Retreat',
    'Maharaja Grand Hotel',
    'Pearl Oasis Inn',
    'Lotus Pavilion Suites',
    'Imperial Palace Hotel',
    'Riverside Regency',
    'Sunset Paradise Resort',
    'Silver Oak Manor',
    'Diamond Heights Hotel',
    'Peacock Plaza',
    'Amber Fort Residency',
    'Crystal Waters Hotel'
];

const updateHotelsAndPrices = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected to MongoDB');

        // Get all hotels
        const hotels = await Hotel.find({});
        console.log(`Found ${hotels.length} hotels`);

        // Rename hotels with unique names
        for (let i = 0; i < hotels.length; i++) {
            const hotel = hotels[i];
            const newName = hotelNames[i % hotelNames.length];

            // If there are more hotels than names, append a number
            const finalName = i >= hotelNames.length ? `${newName} ${Math.floor(i / hotelNames.length) + 1}` : newName;

            hotel.name = finalName;
            await hotel.save();
            console.log(`Updated hotel: ${finalName}`);
        }

        // Get all rooms and convert prices
        const rooms = await Room.find({});
        console.log(`\nFound ${rooms.length} rooms`);

        for (const room of rooms) {
            const oldPrice = room.pricePerNight;
            const newPrice = Math.round(oldPrice * USD_TO_INR);

            room.pricePerNight = newPrice;
            await room.save();

            const hotel = await Hotel.findById(room.hotel);
            console.log(`Updated room in ${hotel?.name || 'Unknown'}: $${oldPrice} → ₹${newPrice}`);
        }

        console.log('\n✓ All hotels renamed and prices converted to INR!');
        process.exit(0);
    } catch (error) {
        console.error('Error:', error);
        process.exit(1);
    }
};

updateHotelsAndPrices();
