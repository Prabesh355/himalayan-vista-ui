const multer = require('multer');
const crypto = require('crypto');
const fs = require('fs');
const path = require('path');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const { AppError } = require('../utils/errorHandler');
const { cloudinary, hasCloudinaryCredentials } = require('../services/cloudinaryService');

const uploadsDir = path.join(__dirname, '..', 'uploads');

if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

const cloudinaryStorage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: process.env.CLOUDINARY_FOLDER || 'himalayan-vista',
    resource_type: 'image',
    format: 'webp', // Convert to WebP
    transformation: [{ quality: 'auto:good' }], // Compress
    public_id: (req, file) => {
      const originalName = file.originalname.split('.')[0].replace(/[^a-zA-Z0-9]/g, '-').toLowerCase();
      const suffix = crypto.randomBytes(4).toString('hex');
      const assetType = String(req.body?.assetType || '').trim();
      const packageId = String(req.body?.packageId || '').trim().replace(/[^a-zA-Z0-9_-]/g, '');

      // Route maps are package-specific assets. A package-scoped public ID prevents
      // Cloudinary from ever reusing or overwriting another package's route map.
      if (assetType === 'route-map' && packageId) {
        return `route-maps/${packageId}/${Date.now()}-${suffix}`;
      }

      return `img-${originalName}-${suffix}`;
    },
  },
});

const localStorage = multer.memoryStorage();

// File filter
const fileFilter = (req, file, cb) => {
  const allowedMimes = [
    'image/jpeg',
    'image/jpg',
    'image/png',
    'image/gif',
    'image/webp',
    'image/bmp',
    'image/avif',
    'image/svg+xml',
  ];

  if (allowedMimes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(
      new AppError('Invalid file type. Only image uploads are allowed', 400),
      false
    );
  }
};

// Create multer instance
const upload = multer({
  storage: hasCloudinaryCredentials() ? cloudinaryStorage : localStorage,
  limits: {
    fileSize: Number(process.env.MAX_FILE_SIZE) || 15 * 1024 * 1024, // 15MB default
  },
  fileFilter: fileFilter,
});

module.exports = upload;
