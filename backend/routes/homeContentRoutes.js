const express = require('express');
const router = express.Router();
const HomeContent = require('../models/HomeContent');
const { protect, authorize } = require('../middleware/auth');

// @desc    Get homepage dynamic content
// @route   GET /api/home-content
// @access  Public
router.get('/', async (req, res, next) => {
  try {
    let content = await HomeContent.findOne();
    if (!content) {
      // Create with default values if none exists
      content = await HomeContent.create({});
    }
    res.status(200).json({
      success: true,
      data: content,
    });
  } catch (error) {
    next(error);
  }
});

// @desc    Update homepage dynamic content
// @route   PUT /api/home-content
// @access  Private/Admin
router.put('/', protect, authorize('admin'), async (req, res, next) => {
  try {
    let content = await HomeContent.findOne();
    if (!content) {
      content = new HomeContent({});
    }

    const { hero, stats, why, testimonials, cta } = req.body;

    if (hero) content.hero = hero;
    if (stats) content.stats = stats;
    if (why) content.why = why;
    if (testimonials) content.testimonials = testimonials;
    if (cta) content.cta = cta;

    await content.save();

    res.status(200).json({
      success: true,
      message: 'Homepage content updated successfully',
      data: content,
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
