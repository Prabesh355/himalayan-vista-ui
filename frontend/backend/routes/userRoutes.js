const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middleware/auth');
const User = require('../models/UserPg');
const { AppError } = require('../utils/errorHandler');
const logger = require('../utils/logger');

// @desc Get all users (Admin only)
// @route GET /api/users
// @access Private
router.get('/', protect, authorize('admin'), async (req, res, next) => {
  try {
    const users = await User.find().select('-password').sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: users.length,
      users,
    });
  } catch (error) {
    logger.error(`Get users error: ${error.message}`);
    next(error);
  }
});

// @desc Get single user
// @route GET /api/users/:id
// @access Private
router.get('/:id', protect, async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id).select('-password');

    if (!user) {
      return next(new AppError('User not found', 404));
    }

    // Check ownership or admin
    if (user._id.toString() !== req.user.id && req.user.role !== 'admin') {
      return next(new AppError('Not authorized to view this profile', 403));
    }

    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    logger.error(`Get user error: ${error.message}`);
    next(error);
  }
});

// @desc Update user (Admin only)
// @route PUT /api/users/:id
// @access Private
router.put('/:id', protect, authorize('admin'), async (req, res, next) => {
  try {
    const { firstName, lastName, email, phone, role, isActive } = req.body;

    const user = await User.findByIdAndUpdate(
      req.params.id,
      { firstName, lastName, email, phone, role, isActive },
      { new: true, runValidators: true }
    ).select('-password');

    res.status(200).json({
      success: true,
      message: 'User updated successfully',
      user,
    });

    logger.info(`User updated by admin: ${req.params.id}`);
  } catch (error) {
    logger.error(`Update user error: ${error.message}`);
    next(error);
  }
});

// @desc Delete user (Admin only)
// @route DELETE /api/users/:id
// @access Private
router.delete('/:id', protect, authorize('admin'), async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return next(new AppError('User not found', 404));
    }

    await User.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: 'User deleted successfully',
    });

    logger.info(`User deleted by admin: ${req.params.id}`);
  } catch (error) {
    logger.error(`Delete user error: ${error.message}`);
    next(error);
  }
});

module.exports = router;
