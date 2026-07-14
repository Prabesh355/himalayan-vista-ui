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
    public_id: (req, file) => {
      const suffix = crypto.randomBytes(12).toString('hex');
      return `${file.fieldname}-${Date.now()}-${suffix}`;
    },
  },
});

const localStorage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, uploadsDir);
  },
  filename: (_req, file, cb) => {
    const suffix = crypto.randomBytes(12).toString('hex');
    const ext = path.extname(file.originalname || '').toLowerCase();
    cb(null, `${file.fieldname}-${Date.now()}-${suffix}${ext}`);
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
  storage: hasCloudinaryCredentials() ? cloudinaryStorage : localStorage,
  limits: {
    fileSize: Number(process.env.MAX_FILE_SIZE) || 15 * 1024 * 1024, // 15MB default
  },
  fileFilter: fileFilter,
});

module.exports = upload;
