const multer = require('multer');
const { AppError } = require('../utils/errorHandler');

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

// Create multer instance. We keep uploads in memory and let the controller
// stream them to Cloudinary so nothing is written to local disk.
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: Number(process.env.MAX_FILE_SIZE) || 15 * 1024 * 1024, // 15MB default
  },
  fileFilter: fileFilter,
});

module.exports = upload;
