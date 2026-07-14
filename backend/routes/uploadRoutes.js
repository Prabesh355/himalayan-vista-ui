const express = require('express');
const rateLimit = require('express-rate-limit');
const router = express.Router();
const upload = require('../middleware/multer');
const { protect, authorize } = require('../middleware/auth');
const { uploadFile } = require('../controllers/uploadController');

const uploadLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 20,
  message: 'Too many upload requests from this IP, please try again after 15 minutes',
  standardHeaders: true,
  legacyHeaders: false,
});

// Admins and vendors can upload images from the CMS. Cloudinary is used in production;
// local disk storage is used automatically when Cloudinary credentials are missing.
router.post(
  '/',
  protect,
  authorize('admin', 'vendor'),
  uploadLimiter,
  upload.single('file'),
  uploadFile,
);

module.exports = router;
