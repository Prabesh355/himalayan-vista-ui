const { AppError } = require('../utils/errorHandler');
const logger = require('../utils/logger');
const {
  deleteCloudinaryAssetByPublicId,
} = require('../services/cloudinaryService');

function getUploadedFileUrl(file) {
  return file?.secure_url || file?.path || file?.url || '';
}

async function cleanupUploadedAsset(file) {
  if (!file?.filename) return;

  try {
    await deleteCloudinaryAssetByPublicId(file.filename);
  } catch (error) {
    logger.warn(`Failed to clean up uploaded Cloudinary asset ${file.filename}: ${error.message}`);
  }
}

exports.uploadFile = async (req, res, next) => {
  try {
    if (!req.file) {
      return next(new AppError('No file uploaded', 400));
    }

    if (!String(req.file.mimetype || '').startsWith('image/')) {
      await cleanupUploadedAsset(req.file);
      return next(new AppError('Invalid image file type', 400));
    }

    const fileUrl = getUploadedFileUrl(req.file);
    if (!fileUrl) {
      await cleanupUploadedAsset(req.file);
      return next(new AppError('Uploaded file could not be processed', 500));
    }

    const maxImages = Number(process.env.MAX_IMAGES_PER_PACKAGE || 12);
    const packageId = req.body?.packageId || req.query?.packageId;
    if (packageId) {
      try {
        const Package = require('../models/Package');
        const existing = await Package.findById(packageId);
        const existingCount = (existing && Array.isArray(existing.images)) ? existing.images.length : 0;
        if (existingCount + 1 > maxImages) {
          await cleanupUploadedAsset(req.file);
          return next(new AppError(`Package already has ${existingCount} images; limit is ${maxImages}`, 400));
        }
      } catch (err) {
        // ignore model errors - treat as non-fatal for upload
      }
    }

    res.status(201).json({
      success: true,
      fileUrl,
      filename: req.file.filename,
      publicId: req.file.filename,
      secureUrl: req.file.secure_url || fileUrl,
    });
  } catch (error) {
    if (req.file) {
      await cleanupUploadedAsset(req.file);
    }
    next(error);
  }
};
