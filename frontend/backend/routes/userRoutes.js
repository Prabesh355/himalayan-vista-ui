<<<<<<< HEAD
const express = require("express");
const router = express.Router();
const { protect, authorize } = require("../middleware/auth");
const User = require("../models/UserPg");
const { AppError } = require("../utils/errorHandler");
const logger = require("../utils/logger");
=======
const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middleware/auth');
const User = require('../models/UserPg');
const { AppError } = require('../utils/errorHandler');
const logger = require('../utils/logger');
>>>>>>> ff1035069d14f891f4a70ea6c8f2721597241763

// @desc Get all users (Admin only)
// @route GET /api/users
// @access Private
<<<<<<< HEAD
router.get("/", protect, authorize("admin"), async (req, res, next) => {
  try {
    const users = await User.find().select("-password").sort({ createdAt: -1 });
=======
router.get('/', protect, authorize('admin'), async (req, res, next) => {
  try {
    const users = await User.find().select('-password').sort({ createdAt: -1 });
>>>>>>> ff1035069d14f891f4a70ea6c8f2721597241763

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
<<<<<<< HEAD
router.get("/:id", protect, async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id).select("-password");

    if (!user) {
      return next(new AppError("User not found", 404));
    }

    // Check ownership or admin
    if (user._id.toString() !== req.user.id && req.user.role !== "admin") {
      return next(new AppError("Not authorized to view this profile", 403));
=======
router.get('/:id', protect, async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id).select('-password');

    if (!user) {
      return next(new AppError('User not found', 404));
    }

    // Check ownership or admin
    if (user._id.toString() !== req.user.id && req.user.role !== 'admin') {
      return next(new AppError('Not authorized to view this profile', 403));
>>>>>>> ff1035069d14f891f4a70ea6c8f2721597241763
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
<<<<<<< HEAD
router.put("/:id", protect, authorize("admin"), async (req, res, next) => {
=======
router.put('/:id', protect, authorize('admin'), async (req, res, next) => {
>>>>>>> ff1035069d14f891f4a70ea6c8f2721597241763
  try {
    const { firstName, lastName, email, phone, role, isActive } = req.body;

    const user = await User.findByIdAndUpdate(
      req.params.id,
      { firstName, lastName, email, phone, role, isActive },
<<<<<<< HEAD
      { new: true, runValidators: true },
    ).select("-password");

    res.status(200).json({
      success: true,
      message: "User updated successfully",
=======
      { new: true, runValidators: true }
    ).select('-password');

    res.status(200).json({
      success: true,
      message: 'User updated successfully',
>>>>>>> ff1035069d14f891f4a70ea6c8f2721597241763
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
<<<<<<< HEAD
router.delete("/:id", protect, authorize("admin"), async (req, res, next) => {
=======
router.delete('/:id', protect, authorize('admin'), async (req, res, next) => {
>>>>>>> ff1035069d14f891f4a70ea6c8f2721597241763
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
<<<<<<< HEAD
      return next(new AppError("User not found", 404));
=======
      return next(new AppError('User not found', 404));
>>>>>>> ff1035069d14f891f4a70ea6c8f2721597241763
    }

    await User.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
<<<<<<< HEAD
      message: "User deleted successfully",
=======
      message: 'User deleted successfully',
>>>>>>> ff1035069d14f891f4a70ea6c8f2721597241763
    });

    logger.info(`User deleted by admin: ${req.params.id}`);
  } catch (error) {
    logger.error(`Delete user error: ${error.message}`);
    next(error);
  }
});

module.exports = router;
