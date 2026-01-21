import dotenv from 'dotenv';

// CRITICAL: Load environment variables FIRST
dotenv.config();

import express from 'express';
import cors from 'cors';
import connectDB from './config/db.js';
import passport from './config/googleAuth.js';
import authRoutes from './routes/auth.js';
import userRoutes from './routes/user.js';
import hotelRoutes from './routes/hotel.js';
import roomRoutes from './routes/room.js';
import bookingRoutes from './routes/booking.js';
import paymentRoutes from './routes/payment.js';
import adminRoutes from './routes/admin.js';

// Initialize express app
const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(passport.initialize());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/hotels', hotelRoutes);
app.use('/api/rooms', roomRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/payment', paymentRoutes);
app.use('/api/admin', adminRoutes);

// Health check route
app.get('/api/health', (req, res) => {
  res.json({
    status: 'OK',
    message: 'Hotel Booking API is running',
    timestamp: new Date().toISOString()
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal Server Error',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found'
  });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV}`);
});

export default app;

