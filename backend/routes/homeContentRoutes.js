const express = require('express');
const router = express.Router();
const HomeContent = require('../models/HomeContent');
const { protect, authorize } = require('../middleware/auth');
const {
  deleteCloudinaryAsset,
  isCloudinaryUrl,
} = require('../services/cloudinaryService');

function collectHomeContentImages(content) {
  const urls = [];

  if (content?.hero?.backgroundImage) {
    urls.push(content.hero.backgroundImage);
  }

  if (Array.isArray(content?.testimonials)) {
    for (const testimonial of content.testimonials) {
      if (testimonial?.avatar) {
        urls.push(testimonial.avatar);
      }
    }
  }

  return [...new Set(urls.filter(Boolean))];
}

async function cleanupRemovedImages(previousUrls, currentUrls) {
  const currentSet = new Set((currentUrls || []).filter(Boolean));
  const removed = (previousUrls || []).filter((url) => !currentSet.has(url));

  await Promise.allSettled(
    removed.map(async (url) => {
      if (!isCloudinaryUrl(url)) return;

      try {
        await deleteCloudinaryAsset(url);
      } catch (error) {
        // allow content updates to succeed even if cleanup fails
      }
    }),
  );
}

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

    const previousImages = collectHomeContentImages(content);

    const { hero, stats, why, testimonials, cta } = req.body;

    if (hero) content.hero = hero;
    if (stats) content.stats = stats;
    if (why) content.why = why;
    if (testimonials) content.testimonials = testimonials;
    if (cta) content.cta = cta;

    await content.save();
    await cleanupRemovedImages(previousImages, collectHomeContentImages(content));

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
