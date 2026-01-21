import dotenv from 'dotenv';
import mongoose from 'mongoose';
import User from '../models/User.js';

// Load environment variables
dotenv.config();

const createSuperuser = async () => {
    try {
        // Connect to MongoDB
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('✅ Connected to MongoDB');

        // Get credentials from environment variables
        const username = process.env.ADMIN_USERNAME || 'admin';
        const email = process.env.ADMIN_EMAIL || 'admin@apnastays.com';
        const password = process.env.ADMIN_PASSWORD || 'Admin@123456';

        // Check if admin already exists
        const existingAdmin = await User.findOne({ email });
        if (existingAdmin) {
            console.log('⚠️  Superuser already exists with this email');
            console.log(`Email: ${existingAdmin.email}`);
            console.log(`Username: ${existingAdmin.username}`);
            process.exit(0);
        }

        // Create superuser
        const superuser = await User.create({
            username,
            email,
            password,
            role: 'admin',
            authProvider: 'local'
        });

        console.log('✅ Superuser created successfully!');
        console.log('==========================================');
        console.log(`Username: ${superuser.username}`);
        console.log(`Email: ${superuser.email}`);
        console.log(`Role: ${superuser.role}`);
        console.log('==========================================');
        console.log('You can now login with these credentials');

        process.exit(0);
    } catch (error) {
        console.error('❌ Error creating superuser:', error.message);
        process.exit(1);
    }
};

createSuperuser();
