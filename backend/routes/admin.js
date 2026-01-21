import express from 'express';
import User from '../models/User.js';
import Hotel from '../models/Hotel.js';
import Room from '../models/Room.js';
import Booking from '../models/Booking.js';
import { protect, isAdmin } from '../middleware/auth.js';

const router = express.Router();

// Apply protect and isAdmin middleware to all routes
router.use(protect);
router.use(isAdmin);

// ==================== USER MANAGEMENT ====================

// @route   GET /api/admin/users
// @desc    Get all users with filters
// @access  Private/Admin
router.get('/users', async (req, res) => {
    try {
        const { role, search, status } = req.query;

        let query = {};

        // Filter by role
        if (role && role !== 'all') {
            query.role = role;
        }

        // Search by username or email
        if (search) {
            query.$or = [
                { username: { $regex: search, $options: 'i' } },
                { email: { $regex: search, $options: 'i' } }
            ];
        }

        const users = await User.find(query)
            .select('-password')
            .sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            count: users.length,
            data: users
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message
        });
    }
});

// @route   GET /api/admin/users/:id
// @desc    Get specific user details
// @access  Private/Admin
router.get('/users/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id).select('-password');

        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }

        res.status(200).json({
            success: true,
            data: user
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message
        });
    }
});

// @route   POST /api/admin/users
// @desc    Create new user (any role)
// @access  Private/Admin
router.post('/users', async (req, res) => {
    try {
        const { username, email, password, role } = req.body;

        // Check if user already exists
        const existingUser = await User.findOne({ $or: [{ email }, { username }] });
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: 'User with this email or username already exists'
            });
        }

        const user = await User.create({
            username,
            email,
            password,
            role: role || 'user',
            authProvider: 'local'
        });

        const userResponse = await User.findById(user._id).select('-password');

        res.status(201).json({
            success: true,
            message: 'User created successfully',
            data: userResponse
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message
        });
    }
});

// @route   PUT /api/admin/users/:id
// @desc    Update user details
// @access  Private/Admin
router.put('/users/:id', async (req, res) => {
    try {
        const { username, email, role } = req.body;

        const user = await User.findByIdAndUpdate(
            req.params.id,
            { username, email, role },
            { new: true, runValidators: true }
        ).select('-password');

        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }

        res.status(200).json({
            success: true,
            message: 'User updated successfully',
            data: user
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message
        });
    }
});

// @route   DELETE /api/admin/users/:id
// @desc    Delete user
// @access  Private/Admin
router.delete('/users/:id', async (req, res) => {
    try {
        // Prevent admin from deleting themselves
        if (req.params.id === req.user._id.toString()) {
            return res.status(400).json({
                success: false,
                message: 'You cannot delete your own account'
            });
        }

        const user = await User.findByIdAndDelete(req.params.id);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }

        res.status(200).json({
            success: true,
            message: 'User deleted successfully'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message
        });
    }
});

// ==================== HOTEL OWNER MANAGEMENT ====================

// @route   GET /api/admin/hotel-owners
// @desc    Get all hotel owners
// @access  Private/Admin
router.get('/hotel-owners', async (req, res) => {
    try {
        const hotelOwners = await User.find({ role: 'hotelOwner' })
            .select('-password')
            .sort({ createdAt: -1 });

        // Get hotel count for each owner
        const ownersWithHotels = await Promise.all(
            hotelOwners.map(async (owner) => {
                const hotelCount = await Hotel.countDocuments({ owner: owner._id });
                return {
                    ...owner.toObject(),
                    hotelCount
                };
            })
        );

        res.status(200).json({
            success: true,
            count: ownersWithHotels.length,
            data: ownersWithHotels
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message
        });
    }
});

// ==================== HOTEL & ROOM MANAGEMENT ====================

// @route   GET /api/admin/hotels
// @desc    Get all hotels
// @access  Private/Admin
router.get('/hotels', async (req, res) => {
    try {
        const hotels = await Hotel.find()
            .populate('owner', 'username email')
            .sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            count: hotels.length,
            data: hotels
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message
        });
    }
});

// @route   PUT /api/admin/hotels/:id
// @desc    Update any hotel
// @access  Private/Admin
router.put('/hotels/:id', async (req, res) => {
    try {
        const hotel = await Hotel.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        ).populate('owner', 'username email');

        if (!hotel) {
            return res.status(404).json({
                success: false,
                message: 'Hotel not found'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Hotel updated successfully',
            data: hotel
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message
        });
    }
});

// @route   DELETE /api/admin/hotels/:id
// @desc    Delete any hotel
// @access  Private/Admin
router.delete('/hotels/:id', async (req, res) => {
    try {
        const hotel = await Hotel.findByIdAndDelete(req.params.id);

        if (!hotel) {
            return res.status(404).json({
                success: false,
                message: 'Hotel not found'
            });
        }

        // Delete all rooms associated with this hotel
        await Room.deleteMany({ hotel: req.params.id });

        res.status(200).json({
            success: true,
            message: 'Hotel and associated rooms deleted successfully'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message
        });
    }
});

// @route   GET /api/admin/rooms
// @desc    Get all rooms
// @access  Private/Admin
router.get('/rooms', async (req, res) => {
    try {
        const rooms = await Room.find()
            .populate('hotel', 'name city')
            .sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            count: rooms.length,
            data: rooms
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message
        });
    }
});

// @route   PUT /api/admin/rooms/:id
// @desc    Update any room
// @access  Private/Admin
router.put('/rooms/:id', async (req, res) => {
    try {
        const room = await Room.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        ).populate('hotel', 'name city');

        if (!room) {
            return res.status(404).json({
                success: false,
                message: 'Room not found'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Room updated successfully',
            data: room
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message
        });
    }
});

// @route   DELETE /api/admin/rooms/:id
// @desc    Delete any room
// @access  Private/Admin
router.delete('/rooms/:id', async (req, res) => {
    try {
        const room = await Room.findByIdAndDelete(req.params.id);

        if (!room) {
            return res.status(404).json({
                success: false,
                message: 'Room not found'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Room deleted successfully'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message
        });
    }
});

// ==================== BOOKING MANAGEMENT ====================

// @route   GET /api/admin/bookings
// @desc    Get all bookings with filters
// @access  Private/Admin
router.get('/bookings', async (req, res) => {
    try {
        const { status, search } = req.query;

        let query = {};

        if (status && status !== 'all') {
            query.status = status;
        }

        const bookings = await Booking.find(query)
            .populate('user', 'username email')
            .populate('hotel', 'name city')
            .populate('room', 'roomType pricePerNight')
            .sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            count: bookings.length,
            data: bookings
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message
        });
    }
});

// @route   PUT /api/admin/bookings/:id/status
// @desc    Override booking status
// @access  Private/Admin
router.put('/bookings/:id/status', async (req, res) => {
    try {
        const { status } = req.body;

        const booking = await Booking.findByIdAndUpdate(
            req.params.id,
            { status },
            { new: true, runValidators: true }
        )
            .populate('user', 'username email')
            .populate('hotel', 'name city')
            .populate('room', 'roomType pricePerNight');

        if (!booking) {
            return res.status(404).json({
                success: false,
                message: 'Booking not found'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Booking status updated successfully',
            data: booking
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message
        });
    }
});

// @route   DELETE /api/admin/bookings/:id
// @desc    Delete booking
// @access  Private/Admin
router.delete('/bookings/:id', async (req, res) => {
    try {
        const booking = await Booking.findByIdAndDelete(req.params.id);

        if (!booking) {
            return res.status(404).json({
                success: false,
                message: 'Booking not found'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Booking deleted successfully'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message
        });
    }
});

// ==================== ANALYTICS ====================

// @route   GET /api/admin/analytics
// @desc    Get platform-wide analytics
// @access  Private/Admin
router.get('/analytics', async (req, res) => {
    try {
        // Total counts
        const totalUsers = await User.countDocuments({ role: 'user' });
        const totalHotelOwners = await User.countDocuments({ role: 'hotelOwner' });
        const totalAdmins = await User.countDocuments({ role: 'admin' });
        const totalHotels = await Hotel.countDocuments();
        const totalRooms = await Room.countDocuments();
        const totalBookings = await Booking.countDocuments();

        // Booking statistics
        const confirmedBookings = await Booking.countDocuments({ status: 'confirmed' });
        const pendingBookings = await Booking.countDocuments({ status: 'pending' });
        const cancelledBookings = await Booking.countDocuments({ status: 'cancelled' });
        const completedBookings = await Booking.countDocuments({ status: 'completed' });

        // Revenue calculation
        const paidBookings = await Booking.find({ isPaid: true });
        const totalRevenue = paidBookings.reduce((sum, booking) => sum + booking.totalPrice, 0);

        // Recent bookings
        const recentBookings = await Booking.find()
            .populate('user', 'username email')
            .populate('hotel', 'name')
            .sort({ createdAt: -1 })
            .limit(10);

        // Monthly revenue (last 6 months)
        const sixMonthsAgo = new Date();
        sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);

        const monthlyBookings = await Booking.aggregate([
            {
                $match: {
                    createdAt: { $gte: sixMonthsAgo },
                    isPaid: true
                }
            },
            {
                $group: {
                    _id: {
                        year: { $year: '$createdAt' },
                        month: { $month: '$createdAt' }
                    },
                    revenue: { $sum: '$totalPrice' },
                    count: { $sum: 1 }
                }
            },
            {
                $sort: { '_id.year': 1, '_id.month': 1 }
            }
        ]);

        res.status(200).json({
            success: true,
            data: {
                overview: {
                    totalUsers,
                    totalHotelOwners,
                    totalAdmins,
                    totalHotels,
                    totalRooms,
                    totalBookings,
                    totalRevenue
                },
                bookings: {
                    confirmed: confirmedBookings,
                    pending: pendingBookings,
                    cancelled: cancelledBookings,
                    completed: completedBookings
                },
                recentBookings,
                monthlyRevenue: monthlyBookings
            }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message
        });
    }
});

// ==================== SUPERUSER MANAGEMENT ====================

// @route   GET /api/admin/superusers
// @desc    Get all superusers
// @access  Private/Admin
router.get('/superusers', async (req, res) => {
    try {
        const superusers = await User.find({ role: 'admin' })
            .select('-password')
            .sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            count: superusers.length,
            data: superusers
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message
        });
    }
});

// @route   POST /api/admin/superusers
// @desc    Create new superuser (admin only)
// @access  Private/Admin
router.post('/superusers', async (req, res) => {
    try {
        const { username, email, password } = req.body;

        // Check if user already exists
        const existingUser = await User.findOne({ $or: [{ email }, { username }] });
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: 'User with this email or username already exists'
            });
        }

        const superuser = await User.create({
            username,
            email,
            password,
            role: 'admin',
            authProvider: 'local'
        });

        const superuserResponse = await User.findById(superuser._id).select('-password');

        res.status(201).json({
            success: true,
            message: 'Superuser created successfully',
            data: superuserResponse
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message
        });
    }
});

export default router;
