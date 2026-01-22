import express from 'express';
import Room from '../models/Room.js';
import Hotel from '../models/Hotel.js';
import { protect, isHotelOwner } from '../middleware/auth.js';

const router = express.Router();

// @route   GET /api/rooms
// @desc    Get all rooms
// @access  Public
// @route   GET /api/rooms
// @desc    Get all rooms with pagination, sorting and filtering
// @access  Public
router.get('/', async (req, res) => {
  try {
    const {
      city,
      minPrice,
      maxPrice,
      roomType,
      available,
      amenities,
      hotel,
      page = 1,
      limit = 9,
      sortBy = 'name',
      sortOrder = 'asc',
      search
    } = req.query;

    const query = {};

    // Basic filters
    if (hotel) query.hotel = hotel;
    if (available !== undefined) query.isAvailable = available === 'true';
    if (roomType) query.roomType = roomType;

    // Price range filter
    if (minPrice || maxPrice) {
      query.pricePerNight = {};
      if (minPrice) query.pricePerNight.$gte = Number(minPrice);
      if (maxPrice) query.pricePerNight.$lte = Number(maxPrice);
    }

    // Amenities filter
    if (amenities) {
      const amenitiesArray = Array.isArray(amenities)
        ? amenities
        : amenities.split(',').map(item => item.trim()).filter(Boolean);
      if (amenitiesArray.length) {
        query.amenities = { $all: amenitiesArray };
      }
    }

    // Search logic (requires looking up hotels first if searching by hotel name/city)
    let hotelIds = null;
    if (search || city) {
      const hotelQuery = {};

      if (search) {
        const searchRegex = new RegExp(search, 'i');
        hotelQuery.$or = [
          { name: searchRegex },
          { city: searchRegex }
        ];
      }

      if (city) {
        hotelQuery.city = city;
      }

      const matchingHotels = await Hotel.find(hotelQuery).select('_id');
      hotelIds = matchingHotels.map(h => h._id);

      // If we searched but found no hotels, we might still want to search room descriptions?
      // For now, let's assume search is primarily for Hotel Name/City as per original frontend logic.
      // However, if 'hotel' param was also passed, we need to intersect.

      if (query.hotel) {
        // If specific hotel requested, check if it's in our search results
        if (!hotelIds.some(id => id.toString() === query.hotel)) {
          // Conflict: requested hotel doesn't match search/city criteria
          return res.status(200).json({
            success: true,
            count: 0,
            pagination: { total: 0, page: Number(page), pages: 0 },
            data: []
          });
        }
        // query.hotel is already set, so we don't need to override it, 
        // but we verified it matches the search criteria.
      } else {
        query.hotel = { $in: hotelIds };
      }
    }

    // Pagination setup
    const pageNum = Number(page);
    const limitNum = Number(limit);
    const skip = (pageNum - 1) * limitNum;

    // Sorting setup
    let sortOptions = {};
    if (sortBy === 'price') {
      sortOptions.pricePerNight = sortOrder === 'desc' ? -1 : 1;
    } else if (sortBy === 'name') {
      // Sorting by hotel name is tricky because it's in a referenced collection.
      // Standard mongoose .sort() won't work for populated fields directly.
      // We'll handle this case separately or default to creation date if too complex for now.
      // For this implementation, let's sort by createdAt if name is requested, 
      // or we'd need an aggregation pipeline.
      // To keep it simple and robust without aggregation for now:
      sortOptions.createdAt = -1;
    } else {
      sortOptions.createdAt = -1;
    }

    // Execute Query
    // Note: If sorting by hotel name is strictly required, we must use aggregate.
    // Given the prompt asked to move logic to backend, let's try to support it if possible,
    // but standard find() is safer for now. We will stick to find() and sort by price or date.
    // If the user specifically requested 'name' sort, we might need to fetch all and sort in memory 
    // (bad for perf) or use aggregate. 
    // Let's use aggregate to support proper sorting and pagination in one go.

    const pipeline = [
      { $match: query },
      {
        $lookup: {
          from: 'hotels',
          localField: 'hotel',
          foreignField: '_id',
          as: 'hotelData'
        }
      },
      { $unwind: '$hotelData' },
      {
        $lookup: {
          from: 'users',
          localField: 'hotelData.owner',
          foreignField: '_id',
          as: 'hotelData.owner'
        }
      },
      { $unwind: { path: '$hotelData.owner', preserveNullAndEmptyArrays: true } }
    ];

    // Apply sorting
    if (sortBy === 'name') {
      pipeline.push({ $sort: { 'hotelData.name': sortOrder === 'desc' ? -1 : 1 } });
    } else if (sortBy === 'price') {
      pipeline.push({ $sort: { pricePerNight: sortOrder === 'desc' ? -1 : 1 } });
    } else {
      pipeline.push({ $sort: { createdAt: -1 } });
    }

    // Pagination with Facet to get count and data
    pipeline.push({
      $facet: {
        metadata: [{ $count: 'total' }],
        data: [
          { $skip: skip },
          { $limit: limitNum },
          // Reconstruct the structure expected by frontend (hotel populated in 'hotel' field)
          {
            $project: {
              _id: 1,
              roomType: 1,
              pricePerNight: 1,
              amenities: 1,
              images: 1,
              isAvailable: 1,
              maxGuests: 1,
              description: 1,
              createdAt: 1,
              updatedAt: 1,
              hotel: '$hotelData'
            }
          }
        ]
      }
    });

    const result = await Room.aggregate(pipeline);

    const metadata = result[0].metadata[0] || { total: 0 };
    const rooms = result[0].data;
    const total = metadata.total;
    const pages = Math.ceil(total / limitNum);

    res.status(200).json({
      success: true,
      count: rooms.length,
      pagination: {
        total,
        page: pageNum,
        pages
      },
      data: rooms
    });

  } catch (error) {
    console.error('Error in GET /api/rooms:', error);
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

import upload from '../middleware/upload.js';

// ... existing code ...

// @route   POST /api/rooms
// @desc    Create a room
// @access  Private/HotelOwner
router.post('/', protect, isHotelOwner, upload.array('images', 5), async (req, res) => {
  try {
    const { hotel, roomType, pricePerNight, amenities, maxGuests, description } = req.body;
    let images = req.body.images ? (Array.isArray(req.body.images) ? req.body.images : [req.body.images]) : [];

    // Add Cloudinary URLs if files were uploaded
    if (req.files && req.files.length > 0) {
      const uploadedUrls = req.files.map(file => file.path);
      images = [...images, ...uploadedUrls];
    }

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
router.put('/:id', protect, isHotelOwner, upload.array('images', 5), async (req, res) => {
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

    const updateData = { ...req.body };

    // Handle images array
    if (updateData.images) {
      updateData.images = Array.isArray(updateData.images) ? updateData.images : [updateData.images];
    } else {
      updateData.images = room.images;
    }

    // Add Cloudinary URLs if files were uploaded
    if (req.files && req.files.length > 0) {
      const uploadedUrls = req.files.map(file => file.path);
      updateData.images = [...updateData.images, ...uploadedUrls];
    }

    room = await Room.findByIdAndUpdate(req.params.id, updateData, {
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

