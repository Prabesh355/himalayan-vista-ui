const multer = require('multer');
const crypto = require('crypto');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const { AppError } = require('../utils/errorHandler');
const { cloudinary } = require('../services/cloudinaryService');

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: process.env.CLOUDINARY_FOLDER || 'himalayan-vista',
    resource_type: 'image',
    public_id: (req, file) => {
      const suffix = crypto.randomBytes(12).toString('hex');
      return `${file.fieldname}-${Date.now()}-${suffix}`;
    },
  },
});

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
  storage: storage,
  limits: {
    fileSize: Number(process.env.MAX_FILE_SIZE) || 15 * 1024 * 1024, // 15MB default
  },
  fileFilter: fileFilter,
});

module.exports = upload;
