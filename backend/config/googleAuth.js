import dotenv from 'dotenv';
dotenv.config(); // Load env vars immediately when this file is imported

import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import User from '../models/User.js';

// Configure Google OAuth Strategy
passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: process.env.GOOGLE_CALLBACK_URL || 'http://localhost:5000/api/auth/google/callback'
        },
        async (accessToken, refreshToken, profile, done) => {
            try {
                // Extract user data from Google profile
                const { id, displayName, emails, photos } = profile;
                const email = emails[0].value;
                const profileImage = photos[0]?.value || 'https://via.placeholder.com/150';

                // Check if user exists with this email
                let user = await User.findOne({ email });

                if (user) {
                    // User exists - update their Google ID if not already set
                    if (!user.googleId) {
                        user.googleId = id;
                        user.authProvider = 'google';
                        user.image = profileImage;
                        await user.save();
                    }

                    return done(null, user);
                }

                // Create new user from Google profile
                const username = email.split('@')[0] + '_' + id.slice(0, 6); // Generate unique username

                user = await User.create({
                    username,
                    email,
                    googleId: id,
                    authProvider: 'google',
                    image: profileImage,
                    role: 'user'
                    // No password needed for Google OAuth users
                });

                done(null, user);
            } catch (error) {
                console.error('Google OAuth Strategy Error:', error);
                done(error, null);
            }
        }
    )
);

// Serialize user for session (not used in stateless JWT, but required by passport)
passport.serializeUser((user, done) => {
    done(null, user._id);
});

// Deserialize user from session
passport.deserializeUser(async (id, done) => {
    try {
        const user = await User.findById(id);
        done(null, user);
    } catch (error) {
        done(error, null);
    }
});

export default passport;
