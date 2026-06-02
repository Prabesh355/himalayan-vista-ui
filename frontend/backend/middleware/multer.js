<<<<<<< HEAD
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const { AppError } = require("../utils/errorHandler");

// Create uploads directory if it doesn't exist
const uploadDir = process.env.UPLOAD_DIR || "./uploads";
=======
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { AppError } = require('../utils/errorHandler');

// Create uploads directory if it doesn't exist
const uploadDir = process.env.UPLOAD_DIR || './uploads';
>>>>>>> ff1035069d14f891f4a70ea6c8f2721597241763
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Configure storage
<<<<<<< HEAD
=======
const crypto = require('crypto');
>>>>>>> ff1035069d14f891f4a70ea6c8f2721597241763
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
<<<<<<< HEAD
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname));
=======
    // Use a cryptographically strong random name and preserve extension
    const ext = path.extname(file.originalname) || '';
    const name = crypto.randomBytes(16).toString('hex');
    const safeName = `${file.fieldname}-${name}${ext}`;
    cb(null, safeName);
>>>>>>> ff1035069d14f891f4a70ea6c8f2721597241763
  },
});

// File filter
const fileFilter = (req, file, cb) => {
<<<<<<< HEAD
  const allowedMimes = ["image/jpeg", "image/png", "image/gif", "image/webp"];
=======
  const allowedMimes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
>>>>>>> ff1035069d14f891f4a70ea6c8f2721597241763

  if (allowedMimes.includes(file.mimetype)) {
    cb(null, true);
  } else {
<<<<<<< HEAD
    cb(new AppError("Invalid file type. Only images are allowed", 400), false);
=======
    cb(
      new AppError('Invalid file type. Only images are allowed', 400),
      false
    );
>>>>>>> ff1035069d14f891f4a70ea6c8f2721597241763
  }
};

// Create multer instance
const upload = multer({
  storage: storage,
  limits: {
    fileSize: parseInt(process.env.MAX_FILE_SIZE) || 5 * 1024 * 1024, // 5MB default
  },
  fileFilter: fileFilter,
});

module.exports = upload;
