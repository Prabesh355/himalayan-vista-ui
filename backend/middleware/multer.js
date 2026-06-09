const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { AppError } = require('../utils/errorHandler');

// Create uploads directory if it doesn't exist
const uploadDir = process.env.UPLOAD_DIR || './uploads';
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Configure storage
const crypto = require('crypto');
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    // Use a cryptographically strong random name and preserve extension
    const ext = path.extname(file.originalname) || '';
    const name = crypto.randomBytes(16).toString('hex');
    const safeName = `${file.fieldname}-${name}${ext}`;
    cb(null, safeName);
  },
});

// File filter
const fileFilter = (req, file, cb) => {
  const allowedMimes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];

  if (allowedMimes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(
      new AppError('Invalid file type. Only images are allowed', 400),
      false
    );
  }
};

// Create multer instance
const upload = multer({
  storage: storage,
  limits: {
    fileSize: parseInt(process.env.MAX_FILE_SIZE) || 15 * 1024 * 1024, // 15MB default
  },
  fileFilter: fileFilter,
});

module.exports = upload;
