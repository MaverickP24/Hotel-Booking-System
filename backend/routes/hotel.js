import express from 'express';
import Hotel from '../models/Hotel.js';
import { protect, isHotelOwner } from '../middleware/auth.js';

const router = express.Router();

// @route   GET /api/hotels
// @desc    Get all hotels
// @access  Public
router.get('/', async (req, res) => {
  try {
    const { city, search } = req.query;
    let query = {};
    
    if (city) {
      query.city = city;
    }
    
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { address: { $regex: search, $options: 'i' } }
      ];
    }
    
    const hotels = await Hotel.find(query).populate('owner', 'username email');
    
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

// @route   GET /api/hotels/:id
// @desc    Get single hotel
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const hotel = await Hotel.findById(req.params.id).populate('owner', 'username email');
    
    if (!hotel) {
      return res.status(404).json({
        success: false,
        message: 'Hotel not found'
      });
    }
    
    res.status(200).json({
      success: true,
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

// @route   POST /api/hotels
// @desc    Create a hotel
// @access  Private/HotelOwner
router.post('/', protect, isHotelOwner, async (req, res) => {
  try {
    const { name, address, city, contact, description, images } = req.body;
    
    const hotel = await Hotel.create({
      name,
      address,
      city,
      contact,
      description,
      images,
      owner: req.user._id
    });
    
    res.status(201).json({
      success: true,
      message: 'Hotel created successfully',
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

// @route   PUT /api/hotels/:id
// @desc    Update a hotel
// @access  Private/HotelOwner
router.put('/:id', protect, isHotelOwner, async (req, res) => {
  try {
    let hotel = await Hotel.findById(req.params.id);
    
    if (!hotel) {
      return res.status(404).json({
        success: false,
        message: 'Hotel not found'
      });
    }
    
    // Check if user owns the hotel
    if (hotel.owner.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to update this hotel'
      });
    }
    
    hotel = await Hotel.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    
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

// @route   DELETE /api/hotels/:id
// @desc    Delete a hotel
// @access  Private/HotelOwner
router.delete('/:id', protect, isHotelOwner, async (req, res) => {
  try {
    const hotel = await Hotel.findById(req.params.id);
    
    if (!hotel) {
      return res.status(404).json({
        success: false,
        message: 'Hotel not found'
      });
    }
    
    // Check if user owns the hotel
    if (hotel.owner.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to delete this hotel'
      });
    }
    
    await hotel.deleteOne();
    
    res.status(200).json({
      success: true,
      message: 'Hotel deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
});

// @route   GET /api/hotels/owner/my-hotels
// @desc    Get hotels owned by logged in user
// @access  Private/HotelOwner
router.get('/owner/my-hotels', protect, isHotelOwner, async (req, res) => {
  try {
    const hotels = await Hotel.find({ owner: req.user._id });
    
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

export default router;

