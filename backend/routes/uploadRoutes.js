const express = require('express');
const rateLimit = require('express-rate-limit');
const router = express.Router();
const upload = require('../middleware/multer');
const { protect, authorize } = require('../middleware/auth');
const { AppError } = require('../utils/errorHandler');
const { hasCloudinaryCredentials } = require('../services/cloudinaryService');
const { uploadFile } = require('../controllers/uploadController');

const uploadLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 20,
  message: 'Too many upload requests from this IP, please try again after 15 minutes',
  standardHeaders: true,
  legacyHeaders: false,
});

function requireCloudinaryConfigured(req, res, next) {
  if (!hasCloudinaryCredentials()) {
    return next(
      new AppError(
        'Image uploads are not configured on the server yet. Please set the Cloudinary environment variables on Render and redeploy.',
        503,
      ),
    );
  }

  return next();
}

// Admins and vendors can upload package images from the package management panel.
router.post(
  '/',
  protect,
  authorize('admin', 'vendor'),
  uploadLimiter,
  requireCloudinaryConfigured,
  upload.single('file'),
  uploadFile,
);

module.exports = router;
