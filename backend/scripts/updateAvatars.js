import dotenv from 'dotenv';
import mongoose from 'mongoose';
import User from '../models/User.js';

dotenv.config();

const updateAvatars = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to MongoDB...');

        const oldPlaceholder = 'https://via.placeholder.com/150';

        // Find users with the old placeholder or no image
        const users = await User.find({
            $or: [
                { image: oldPlaceholder },
                { image: { $exists: false } },
                { image: null },
                { image: '' }
            ]
        });

        console.log(`Found ${users.length} users needing avatar updates.`);

        for (const user of users) {
            user.image = `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.username || Math.random().toString(36).substring(7)}`;
            await user.save();
            console.log(`Updated avatar for user: ${user.username}`);
        }

        console.log('Avatar migration completed successfully!');
        process.exit(0);
    } catch (error) {
        console.error('Migration error:', error.message);
        process.exit(1);
    }
};

updateAvatars();
