const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middleware/auth');

// Admin Dashboard Routes
// These routes are protected and require admin role

router.get('/dashboard/stats', protect, authorize('admin'), async (req, res, next) => {
  try {
    const User = require('../models/UserPg');
    const Package = require('../models/Package');
    const Booking = require('../models/Booking');
    const Inquiry = require('../models/Inquiry');
    const Review = require('../models/Review');

    const stats = await Promise.all([
      User.countDocuments(),
      Package.countDocuments({ isActive: true }),
      Booking.countDocuments(),
      Inquiry.countDocuments({ status: 'new' }),
      Review.countDocuments({ status: 'pending' }),
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
router.get('/users', protect, authorize('admin'), async (req, res, next) => {
  try {
    const User = require('../models/UserPg');
    const users = await User.find().select('-password').sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: users.length,
      users,
    });
  } catch (error) {
    next(error);
  }
});

router.put('/users/:id/role', protect, authorize('admin'), async (req, res, next) => {
  try {
    const User = require('../models/UserPg');
    const { role } = req.body;

    if (!['user', 'admin', 'vendor'].includes(role)) {
      return res.status(400).json({ success: false, message: 'Invalid role' });
    }

    const user = await User.findByIdAndUpdate(req.params.id, { role }, { new: true });

    res.status(200).json({
      success: true,
      message: 'User role updated',
      user: user.toJSON(),
    });
  } catch (error) {
    next(error);
  }
});

// System Logs Route (Placeholder)
router.get('/logs', protect, authorize('admin'), (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Logs feature coming soon',
  });
});

module.exports = router;
