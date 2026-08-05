const crypto = require('crypto');
const { AppError } = require('../utils/errorHandler');
const logger = require('../utils/logger');
const {
  cloudinary,
  deleteCloudinaryAssetByPublicId,
  hasCloudinaryCredentials,
} = require('../services/cloudinaryService');

function buildCloudinaryPublicId(file, assetType, packageId) {
  const originalName = String(file?.originalname || 'upload')
    .split('.')[0]
    .replace(/[^a-zA-Z0-9]/g, '-')
    .toLowerCase();
  const suffix = crypto.randomBytes(4).toString('hex');
  const safePackageId = String(packageId || '').trim().replace(/[^a-zA-Z0-9_-]/g, '');

  if (assetType === 'route-map' && safePackageId) {
    return `route-maps/${safePackageId}/${Date.now()}-${suffix}`;
  }

  return `img-${originalName}-${suffix}`;
}

async function cleanupUploadedAsset(publicId) {
  if (!publicId || !hasCloudinaryCredentials()) return;

  try {
    await deleteCloudinaryAssetByPublicId(publicId);
  } catch (error) {
    logger.warn(`Failed to clean up uploaded Cloudinary asset ${publicId}: ${error.message}`);
  }
}

function toDataUri(buffer, mimetype) {
  return `data:${mimetype || 'image/jpeg'};base64,${buffer.toString('base64')}`;
}

exports.uploadFile = async (req, res, next) => {
  try {
    if (!req.file) {
      return next(new AppError('No file uploaded', 400));
    }

    if (!String(req.file.mimetype || '').startsWith('image/')) {
      return next(new AppError('Invalid image file type', 400));
    }

    if (!hasCloudinaryCredentials()) {
      return next(
        new AppError('Image upload failed because Cloudinary is not configured correctly on the server.', 503),
      );
    }

    const assetType = String(req.body?.assetType || '').trim();
    const packageId = req.body?.packageId || req.query?.packageId;
    const publicId = buildCloudinaryPublicId(req.file, assetType, packageId);

    let blurDataURL = '';
    const maxImages = Number(process.env.MAX_IMAGES_PER_PACKAGE || 12);
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

    const uploaded = await cloudinary.uploader.upload(toDataUri(req.file.buffer, req.file.mimetype), {
      folder: process.env.CLOUDINARY_FOLDER || 'himalayan-vista',
      public_id: publicId,
      resource_type: 'image',
      format: 'webp',
      transformation: [{ quality: 'auto:good' }],
    });

    const fileUrl = uploaded.secure_url || uploaded.url;
    if (fileUrl.includes('/upload/')) {
      const parts = fileUrl.split('/upload/');
      if (parts.length === 2) {
        blurDataURL = `${parts[0]}/upload/w_20,e_blur:1000,f_webp,q_1/${parts[1]}`;
      }
    }

    res.status(201).json({
      success: true,
      fileUrl,
      filename: req.file.originalname || uploaded.public_id || publicId,
      publicId: uploaded.public_id || publicId,
      secureUrl: uploaded.secure_url || fileUrl,
      storage: 'cloudinary',
      blurDataURL,
    });
  } catch (error) {
    if (req.file) {
      await cleanupUploadedAsset(req.file.filename || req.file.public_id);
    }
    next(error);
  }
};
