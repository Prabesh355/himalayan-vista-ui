<<<<<<< HEAD
const express = require("express");
const router = express.Router();
const { protect, authorize } = require("../middleware/auth");
=======
const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middleware/auth');
>>>>>>> ff1035069d14f891f4a70ea6c8f2721597241763

// Admin Dashboard Routes
// These routes are protected and require admin role

<<<<<<< HEAD
router.get("/dashboard/stats", protect, authorize("admin"), async (req, res, next) => {
  try {
    const User = require("../models/UserPg");
    const Package = require("../models/Package");
    const Booking = require("../models/Booking");
    const Inquiry = require("../models/Inquiry");
    const Review = require("../models/Review");
=======
router.get('/dashboard/stats', protect, authorize('admin'), async (req, res, next) => {
  try {
    const User = require('../models/UserPg');
    const Package = require('../models/Package');
    const Booking = require('../models/Booking');
    const Inquiry = require('../models/Inquiry');
    const Review = require('../models/Review');
>>>>>>> ff1035069d14f891f4a70ea6c8f2721597241763

    const stats = await Promise.all([
      User.countDocuments(),
      Package.countDocuments({ isActive: true }),
      Booking.countDocuments(),
<<<<<<< HEAD
      Inquiry.countDocuments({ status: "new" }),
      Review.countDocuments({ status: "pending" }),
=======
      Inquiry.countDocuments({ status: 'new' }),
      Review.countDocuments({ status: 'pending' }),
>>>>>>> ff1035069d14f891f4a70ea6c8f2721597241763
    ]);

    res.status(200).json({
      success: true,
      stats: {
        totalUsers: stats[0],
        activePackages: stats[1],
        totalBookings: stats[2],
        newInquiries: stats[3],
        pendingReviews: stats[4],
      },
    });
  } catch (error) {
    next(error);
  }
});

// User Management Routes
<<<<<<< HEAD
router.get("/users", protect, authorize("admin"), async (req, res, next) => {
  try {
    const User = require("../models/UserPg");
    const users = await User.find().select("-password").sort({ createdAt: -1 });
=======
router.get('/users', protect, authorize('admin'), async (req, res, next) => {
  try {
    const User = require('../models/UserPg');
    const users = await User.find().select('-password').sort({ createdAt: -1 });
>>>>>>> ff1035069d14f891f4a70ea6c8f2721597241763

    res.status(200).json({
      success: true,
      count: users.length,
      users,
    });
  } catch (error) {
    next(error);
  }
});

<<<<<<< HEAD
router.put("/users/:id/role", protect, authorize("admin"), async (req, res, next) => {
  try {
    const User = require("../models/UserPg");
    const { role } = req.body;

    if (!["user", "admin", "vendor"].includes(role)) {
      return res.status(400).json({ success: false, message: "Invalid role" });
=======
router.put('/users/:id/role', protect, authorize('admin'), async (req, res, next) => {
  try {
    const User = require('../models/UserPg');
    const { role } = req.body;

    if (!['user', 'admin', 'vendor'].includes(role)) {
      return res.status(400).json({ success: false, message: 'Invalid role' });
>>>>>>> ff1035069d14f891f4a70ea6c8f2721597241763
    }

    const user = await User.findByIdAndUpdate(req.params.id, { role }, { new: true });

    res.status(200).json({
      success: true,
<<<<<<< HEAD
      message: "User role updated",
=======
      message: 'User role updated',
>>>>>>> ff1035069d14f891f4a70ea6c8f2721597241763
      user: user.toJSON(),
    });
  } catch (error) {
    next(error);
  }
});

<<<<<<< HEAD
router.get("/reviews", protect, authorize("admin"), async (req, res, next) => {
  try {
    const Review = require("../models/Review");
    const reviews = await Review.find()
      .populate("user", "firstName lastName email")
      .populate("package", "title destination")
      .sort({ createdAt: -1 });
=======
router.put('/users/:id/status', protect, authorize('admin'), async (req, res, next) => {
  try {
    const User = require('../models/UserPg');
    const { isActive } = req.body;

    if (typeof isActive !== 'boolean') {
      return res.status(400).json({ success: false, message: 'Invalid status' });
    }

    const user = await User.findByIdAndUpdate(req.params.id, { isActive }, { new: true });

    res.status(200).json({
      success: true,
      message: 'User status updated',
      user: user.toJSON(),
    });
  } catch (error) {
    next(error);
  }
});

router.get('/reviews', protect, authorize('admin'), async (req, res, next) => {
  try {
    const Review = require('../models/Review');
    const reviews = await Review.find().populate('user', 'firstName lastName email').populate('package', 'title destination').sort({ createdAt: -1 });
>>>>>>> ff1035069d14f891f4a70ea6c8f2721597241763

    res.status(200).json({
      success: true,
      count: reviews.length,
      reviews,
    });
  } catch (error) {
    next(error);
  }
});

<<<<<<< HEAD
router.put("/reviews/:id/approve", protect, authorize("admin"), async (req, res, next) => {
  try {
    const Review = require("../models/Review");
    const review = await Review.findByIdAndUpdate(
      req.params.id,
      { status: "approved" },
      { new: true },
    );

    if (!review) {
      return res.status(404).json({ success: false, message: "Review not found" });
=======
router.put('/reviews/:id/approve', protect, authorize('admin'), async (req, res, next) => {
  try {
    const Review = require('../models/Review');
    const review = await Review.findByIdAndUpdate(req.params.id, { status: 'approved' }, { new: true });

    if (!review) {
      return res.status(404).json({ success: false, message: 'Review not found' });
>>>>>>> ff1035069d14f891f4a70ea6c8f2721597241763
    }

    res.status(200).json({
      success: true,
<<<<<<< HEAD
      message: "Review approved",
=======
      message: 'Review approved',
>>>>>>> ff1035069d14f891f4a70ea6c8f2721597241763
      review,
    });
  } catch (error) {
    next(error);
  }
});

<<<<<<< HEAD
router.delete("/reviews/:id", protect, authorize("admin"), async (req, res, next) => {
  try {
    const Review = require("../models/Review");
=======
router.delete('/reviews/:id', protect, authorize('admin'), async (req, res, next) => {
  try {
    const Review = require('../models/Review');
>>>>>>> ff1035069d14f891f4a70ea6c8f2721597241763
    await Review.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
<<<<<<< HEAD
      message: "Review deleted",
=======
      message: 'Review deleted',
>>>>>>> ff1035069d14f891f4a70ea6c8f2721597241763
    });
  } catch (error) {
    next(error);
  }
});

// System Logs Route (Placeholder)
<<<<<<< HEAD
router.get("/logs", protect, authorize("admin"), (req, res) => {
  res.status(200).json({
    success: true,
    message: "Logs feature coming soon",
=======
router.get('/logs', protect, authorize('admin'), (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Logs feature coming soon',
>>>>>>> ff1035069d14f891f4a70ea6c8f2721597241763
  });
});

module.exports = router;
