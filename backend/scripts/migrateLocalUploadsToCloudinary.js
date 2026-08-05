const fs = require('fs');
const path = require('path');
const slugify = require('slugify');
const Package = require('../models/Package');
const { cloudinary, hasCloudinaryCredentials, isCloudinaryUrl } = require('../services/cloudinaryService');

function isLocalUploadUrl(value) {
  const url = String(value || '').trim();
  if (!url) return false;
  if (isCloudinaryUrl(url)) return false;
  return /(^|\/)(uploads\/|.*\/uploads\/)/i.test(url) || /^https?:\/\/(localhost|127\.0\.0\.1|0\.0\.0\.0)(:\d+)?\/uploads\//i.test(url);
}

function resolveLocalUploadPath(value) {
  const url = String(value || '').trim();
  if (!url) return null;
  const filename = decodeURIComponent(url.split('/').pop() || '');
  if (!filename) return null;
  return path.join(__dirname, '..', 'uploads', filename);
}

function buildPublicId(pkg, field, index = 0) {
  const base = slugify(String(pkg.title || pkg.slug || 'package'), { lower: true, strict: true }) || 'package';
  const suffix = `${Date.now()}-${index}`;
  return field === 'routeMapImage' ? `route-maps/${base}/${suffix}` : `packages/${base}/${field}/${suffix}`;
}

async function uploadLocalFile(filePath, publicId) {
  const result = await cloudinary.uploader.upload(filePath, {
    folder: process.env.CLOUDINARY_FOLDER || 'himalayan-vista',
    public_id: publicId,
    resource_type: 'image',
    format: 'webp',
    transformation: [{ quality: 'auto:good' }],
  });
  return result.secure_url || result.url;
}

async function migratePackage(pkg) {
  let changed = false;
  const next = { ...pkg.toObject() };

  const updateImageField = async (field, value, index = 0) => {
    if (!isLocalUploadUrl(value)) return value;

    const filePath = resolveLocalUploadPath(value);
    if (!filePath || !fs.existsSync(filePath)) {
      console.warn(`[skip] ${pkg.title} ${field} local file not found: ${value}`);
      return value;
    }

    const uploadedUrl = await uploadLocalFile(filePath, buildPublicId(pkg, field, index));
    changed = true;
    return uploadedUrl;
  };

  next.image = await updateImageField('image', next.image);

  if (Array.isArray(next.images)) {
    const images = [];
    for (let i = 0; i < next.images.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      images.push(await updateImageField('images', next.images[i], i));
    }
    next.images = images;
  }

  next.routeMapImage = await updateImageField('routeMapImage', next.routeMapImage);
  if (next.routeMapImage) {
    next.routeMapEnabled = true;
  }

  if (changed) {
    await Package.findByIdAndUpdate(pkg.id || pkg._id, next, { new: true, runValidators: false });
    console.log(`[updated] ${pkg.title}`);
  }
}

async function main() {
  if (!hasCloudinaryCredentials()) {
    console.error('Cloudinary credentials are required before running this migration.');
    process.exit(1);
  }

  const packages = await Package.find({}).exec();
  console.log(`Found ${packages.length} packages`);
  for (const pkg of packages) {
    // eslint-disable-next-line no-await-in-loop
    await migratePackage(pkg);
  }
  console.log('Migration complete');
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});