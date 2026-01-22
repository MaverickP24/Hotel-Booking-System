import express from 'express';
import User from '../models/User.js';
import { protect, isAdmin } from '../middleware/auth.js';

const router = express.Router();

// @route   GET /api/users/profile
// @desc    Get user profile
// @access  Private
router.get('/profile', protect, async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

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

import upload from '../middleware/upload.js';

// ... existing code ...

// @route   PUT /api/users/profile
// @desc    Update user profile
// @access  Private
router.put('/profile', protect, upload.single('image'), async (req, res) => {
  try {
    const { username, email, recentSearchedCities } = req.body;
    let image = req.body.image;

    // Use Cloudinary URL if file was uploaded
    if (req.file) {
      image = req.file.path;
    }

    const user = await User.findById(req.user._id);

    if (username) user.username = username;
    if (email) user.email = email;
    if (image) user.image = image;
    if (recentSearchedCities) user.recentSearchedCities = recentSearchedCities;

    const updatedUser = await user.save();

    res.status(200).json({
      success: true,
      message: 'Profile updated successfully',
      data: updatedUser
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
});

// @route   PUT /api/users/password
// @desc    Update user password
// @access  Private
router.put('/password', protect, async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;

    // Get user from DB with password
    const user = await User.findById(req.user._id).select('+password');

    if (!user.password) {
      return res.status(400).json({
        success: false,
        message: 'Password not set for this account (likely Google OAuth). Please set a password first.'
      });
    }

    // Verify current password
    const isMatch = await user.comparePassword(currentPassword);
    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: 'Invalid current password'
      });
    }

    // Set new password (will be hashed by pre-save middleware)
    user.password = newPassword;
    await user.save();

    res.status(200).json({
      success: true,
      message: 'Password updated successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
});

// @route   GET /api/users
// @desc    Get all users (admin only)
// @access  Private/Admin
router.get('/', protect, isAdmin, async (req, res) => {
  try {
    const users = await User.find({});

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

export default router;

