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

import upload from '../middleware/upload.js';

// ... existing code ...

// @route   POST /api/hotels
// @desc    Create a hotel
// @access  Private/HotelOwner
router.post('/', protect, isHotelOwner, upload.array('images', 5), async (req, res) => {
  try {
    const { name, address, city, contact, description } = req.body;
    let images = req.body.images ? (Array.isArray(req.body.images) ? req.body.images : [req.body.images]) : [];

    // Add Cloudinary URLs if files were uploaded
    if (req.files && req.files.length > 0) {
      const uploadedUrls = req.files.map(file => file.path);
      images = [...images, ...uploadedUrls];
    }

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
router.put('/:id', protect, isHotelOwner, upload.array('images', 5), async (req, res) => {
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

    const updateData = { ...req.body };

    // Handle images array from body (could be existing URLs)
    if (updateData.images) {
      updateData.images = Array.isArray(updateData.images) ? updateData.images : [updateData.images];
    } else {
      updateData.images = hotel.images; // Keep current images if none provided in body
    }

    // Add new Cloudinary URLs if files were uploaded
    if (req.files && req.files.length > 0) {
      const uploadedUrls = req.files.map(file => file.path);
      updateData.images = [...updateData.images, ...uploadedUrls];
    }

    hotel = await Hotel.findByIdAndUpdate(req.params.id, updateData, {
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

