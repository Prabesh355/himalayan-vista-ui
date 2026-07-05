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

    res.status(200).json({
      success: true,
      count: reviews.length,
      reviews,
    });
  } catch (error) {
    next(error);
  }
});

router.post('/reviews', protect, authorize('admin'), async (req, res, next) => {
  try {
    const Review = require('../models/Review');
    const { guestName, guestEmail, title, rating, comment, status, package: packageId } = req.body;
    const review = await Review.create({
      guestName,
      guestEmail,
      title,
      rating,
      comment,
      package: packageId || undefined,
      status: status || 'approved',
      verifiedPurchase: false,
    });

    res.status(201).json({
      success: true,
      message: 'Review created',
      review,
    });
  } catch (error) {
    next(error);
  }
});

router.put('/reviews/:id', protect, authorize('admin'), async (req, res, next) => {
  try {
    const Review = require('../models/Review');
    const allowed = {};
    ['guestName', 'guestEmail', 'title', 'rating', 'comment', 'status', 'package'].forEach((field) => {
      if (Object.prototype.hasOwnProperty.call(req.body, field)) {
        allowed[field] = req.body[field] || undefined;
      }
    });

    const review = await Review.findByIdAndUpdate(req.params.id, allowed, { new: true, runValidators: true });

    if (!review) {
      return res.status(404).json({ success: false, message: 'Review not found' });
    }

    res.status(200).json({
      success: true,
      message: 'Review updated',
      review,
    });
  } catch (error) {
    next(error);
  }
});

router.put('/reviews/:id/approve', protect, authorize('admin'), async (req, res, next) => {
  try {
    const Review = require('../models/Review');
    const review = await Review.findByIdAndUpdate(req.params.id, { status: 'approved' }, { new: true });

    if (!review) {
      return res.status(404).json({ success: false, message: 'Review not found' });
    }

    res.status(200).json({
      success: true,
      message: 'Review approved',
      review,
    });
  } catch (error) {
    next(error);
  }
});

router.delete('/reviews/:id', protect, authorize('admin'), async (req, res, next) => {
  try {
    const Review = require('../models/Review');
    await Review.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: 'Review deleted',
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
