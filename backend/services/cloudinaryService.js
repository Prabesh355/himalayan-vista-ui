const { v2: cloudinary } = require('cloudinary');

let configured = false;

function configureCloudinary() {
  if (!configured) {
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
      secure: true,
    });
    configured = true;
  }

  return cloudinary;
}

function hasCloudinaryCredentials() {
  return Boolean(
    process.env.CLOUDINARY_CLOUD_NAME &&
      process.env.CLOUDINARY_API_KEY &&
      process.env.CLOUDINARY_API_SECRET,
  );
}

function isCloudinaryUrl(value) {
  const url = String(value || '').trim();
  if (!url) return false;

  try {
    const parsed = new URL(url);
    return /cloudinary\.com$/i.test(parsed.hostname) && parsed.pathname.includes('/upload/');
  } catch {
    return false;
  }
}

function extractCloudinaryPublicId(value) {
  if (!isCloudinaryUrl(value)) return null;

  try {
    const parsed = new URL(String(value).trim());
    const uploadMarker = '/upload/';
    const uploadIndex = parsed.pathname.indexOf(uploadMarker);
    if (uploadIndex === -1) return null;

    const afterUpload = parsed.pathname.slice(uploadIndex + uploadMarker.length);
    const segments = afterUpload.split('/').filter(Boolean);
    if (!segments.length) return null;

    const versionIndex = segments.findIndex((segment) => /^v\d+$/i.test(segment));
    const publicSegments = versionIndex >= 0 ? segments.slice(versionIndex + 1) : segments;
    if (!publicSegments.length) return null;

    const publicIdWithExtension = publicSegments.join('/');
    return decodeURIComponent(publicIdWithExtension.replace(/\.[^./]+$/, ''));
  } catch {
    return null;
  }
}

async function deleteCloudinaryAssetByPublicId(publicId) {
  if (!publicId) return false;

  await configureCloudinary().uploader.destroy(publicId, {
    resource_type: 'image',
    invalidate: true,
  });

  return true;
}

async function deleteCloudinaryAsset(value) {
  const publicId = extractCloudinaryPublicId(value);
  if (!publicId) return false;

  return deleteCloudinaryAssetByPublicId(publicId);
}

module.exports = {
  cloudinary: configureCloudinary(),
  configureCloudinary,
  hasCloudinaryCredentials,
  isCloudinaryUrl,
  extractCloudinaryPublicId,
  deleteCloudinaryAsset,
  deleteCloudinaryAssetByPublicId,
};