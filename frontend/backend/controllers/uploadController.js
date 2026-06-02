const fs = require('fs');
const { AppError } = require('../utils/errorHandler');
const {
  isS3Enabled,
  uploadToS3,
  resolveLocalFileUrl,
  removeLocalFile,
} = require('../services/storageService');

function isValidImageBuffer(buf) {
  if (!buf || buf.length < 4) return false;
  if (buf[0] === 0xff && buf[1] === 0xd8 && buf[2] === 0xff) return true;
  if (buf[0] === 0x89 && buf[1] === 0x50 && buf[2] === 0x4e && buf[3] === 0x47) return true;
  if (buf.slice(0, 3).toString('ascii') === 'GIF') return true;
  if (buf.slice(0, 4).toString('ascii') === 'RIFF' && buf.slice(8, 12).toString('ascii') === 'WEBP') return true;
  return false;
}

exports.uploadFile = async (req, res, next) => {
  try {
    if (!req.file) {
      return next(new AppError('No file uploaded', 400));
    }

    const filePath = req.file.path;
    const filename = req.file.filename;

    let buffer;
    try {
      buffer = fs.readFileSync(filePath);
    } catch (err) {
      removeLocalFile(filePath);
      return next(new AppError('Uploaded file could not be processed', 500));
    }

    if (!isValidImageBuffer(buffer)) {
      removeLocalFile(filePath);
      return next(new AppError('Invalid image file content', 400));
    }

    const maxImages = Number(process.env.MAX_IMAGES_PER_PACKAGE || 12);
    const packageId = req.body?.packageId || req.query?.packageId;
    if (packageId) {
      try {
        const Package = require('../models/Package');
        const existing = await Package.findById(packageId);
        const existingCount = (existing && Array.isArray(existing.images)) ? existing.images.length : 0;
        if (existingCount + 1 > maxImages) {
          removeLocalFile(filePath);
          return next(new AppError(`Package already has ${existingCount} images; limit is ${maxImages}`, 400));
        }
      } catch (err) {
        // ignore model errors - treat as non-fatal for upload
      }
    }

    const useS3 = isS3Enabled();
    let fileUrl;

    if (useS3) {
      try {
        fileUrl = await uploadToS3(filePath, filename, req.file.mimetype);
        removeLocalFile(filePath);
      } catch (err) {
        removeLocalFile(filePath);
        return next(new AppError('Failed to store file in cloud storage', 500));
      }
    } else {
      fileUrl = resolveLocalFileUrl(filename, req);
    }

    res.status(201).json({ success: true, fileUrl, filename });
  } catch (error) {
    next(error);
  }
};
