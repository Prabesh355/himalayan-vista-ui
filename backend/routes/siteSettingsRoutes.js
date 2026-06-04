const express = require('express');
const router = express.Router();
const SiteSettings = require('../models/SiteSettings');
const { protect, authorize } = require('../middleware/auth');

async function getSettingsDocument() {
  let settings = await SiteSettings.findOne();
  if (!settings) {
    settings = await SiteSettings.create({});
  }
  return settings;
}

router.get('/', async (req, res, next) => {
  try {
    const settings = await getSettingsDocument();
    res.status(200).json({
      success: true,
      data: settings,
    });
  } catch (error) {
    next(error);
  }
});

router.put('/', protect, authorize('admin'), async (req, res, next) => {
  try {
    const settings = await getSettingsDocument();
    const allowedFields = [
      'siteName',
      'logoUrl',
      'faviconUrl',
      'contactEmail',
      'contactPhone',
      'address',
      'googleMapsUrl',
      'copyrightText',
      'socialLinks',
      'navbarItems',
      'footerTagline',
      'footerColumns',
      'seo',
      'promotionalBanner',
    ];

    for (const field of allowedFields) {
      if (Object.prototype.hasOwnProperty.call(req.body, field)) {
        settings[field] = req.body[field];
      }
    }

    await settings.save();

    res.status(200).json({
      success: true,
      message: 'Site settings updated successfully',
      data: settings,
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
