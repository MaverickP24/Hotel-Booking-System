import express from 'express';
import Room from '../models/Room.js';
import Hotel from '../models/Hotel.js';
import { protect, isHotelOwner } from '../middleware/auth.js';

const router = express.Router();

// @route   GET /api/rooms
// @desc    Get all rooms
// @access  Public
router.get('/', async (req, res) => {
  try {
    const { city, minPrice, maxPrice, roomType, available } = req.query;
    let query = {};
    
    // Filter by availability
    if (available !== undefined) {
      query.isAvailable = available === 'true';
    }
    
    // Filter by room type
    if (roomType) {
      query.roomType = roomType;
    }
    
    // Filter by price range
    if (minPrice || maxPrice) {
      query.pricePerNight = {};
      if (minPrice) query.pricePerNight.$gte = Number(minPrice);
      if (maxPrice) query.pricePerNight.$lte = Number(maxPrice);
    }
    
    let rooms = await Room.find(query).populate({
      path: 'hotel',
      populate: { path: 'owner', select: 'username email' }
    });
    
    // Filter by city if provided
    if (city) {
      rooms = rooms.filter(room => room.hotel.city === city);
    }
    
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

// @route   GET /api/rooms/:id
// @desc    Get single room
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const room = await Room.findById(req.params.id).populate({
      path: 'hotel',
      populate: { path: 'owner', select: 'username email' }
    });
    
    if (!room) {
      return res.status(404).json({
        success: false,
        message: 'Room not found'
      });
    }
    
    res.status(200).json({
      success: true,
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

// @route   POST /api/rooms
// @desc    Create a room
// @access  Private/HotelOwner
router.post('/', protect, isHotelOwner, async (req, res) => {
  try {
    const { hotel, roomType, pricePerNight, amenities, images, maxGuests, description } = req.body;
    
    // Check if hotel exists and user owns it
    const hotelDoc = await Hotel.findById(hotel);
    if (!hotelDoc) {
      return res.status(404).json({
        success: false,
        message: 'Hotel not found'
      });
    }
    
    if (hotelDoc.owner.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to add rooms to this hotel'
      });
    }
    
    const room = await Room.create({
      hotel,
      roomType,
      pricePerNight,
      amenities,
      images,
      maxGuests,
      description
    });
    
    const populatedRoom = await Room.findById(room._id).populate('hotel');
    
    res.status(201).json({
      success: true,
      message: 'Room created successfully',
      data: populatedRoom
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
});

// @route   PUT /api/rooms/:id
// @desc    Update a room
// @access  Private/HotelOwner
router.put('/:id', protect, isHotelOwner, async (req, res) => {
  try {
    let room = await Room.findById(req.params.id).populate('hotel');
    
    if (!room) {
      return res.status(404).json({
        success: false,
        message: 'Room not found'
      });
    }
    
    // Check if user owns the hotel
    if (room.hotel.owner.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to update this room'
      });
    }
    
    room = await Room.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    }).populate('hotel');
    
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

// @route   DELETE /api/rooms/:id
// @desc    Delete a room
// @access  Private/HotelOwner
router.delete('/:id', protect, isHotelOwner, async (req, res) => {
  try {
    const room = await Room.findById(req.params.id).populate('hotel');
    
    if (!room) {
      return res.status(404).json({
        success: false,
        message: 'Room not found'
      });
    }
    
    // Check if user owns the hotel
    if (room.hotel.owner.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to delete this room'
      });
    }
    
    await room.deleteOne();
    
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

// @route   GET /api/rooms/hotel/:hotelId
// @desc    Get all rooms for a specific hotel
// @access  Public
router.get('/hotel/:hotelId', async (req, res) => {
  try {
    const rooms = await Room.find({ hotel: req.params.hotelId }).populate('hotel');
    
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

export default router;

