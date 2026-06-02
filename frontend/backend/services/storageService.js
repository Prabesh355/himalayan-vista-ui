const fs = require('fs');

const bucketName = process.env.S3_BUCKET_NAME || process.env.AWS_S3_BUCKET;
const region = process.env.S3_REGION || process.env.AWS_REGION || 'us-east-1';
const endpoint = process.env.S3_ENDPOINT;
const publicUrl = process.env.S3_PUBLIC_URL;
const uploadPrefix = process.env.S3_UPLOAD_PREFIX ? process.env.S3_UPLOAD_PREFIX.replace(/^\/+|\/+$/g, '') : '';

function isS3Enabled() {
  return Boolean(bucketName);
}

function getS3Client() {
  if (!bucketName) return null;
  const { S3Client } = require('@aws-sdk/client-s3');
  return new S3Client({
    region,
    endpoint: endpoint || undefined,
  });
}

function getS3Key(filename) {
  return uploadPrefix ? `${uploadPrefix}/${filename}` : filename;
}

function getPublicUrl(filename) {
  const encodedName = encodeURIComponent(getS3Key(filename));
  if (publicUrl) {
    return `${publicUrl.replace(/\/$/, '')}/${encodedName}`;
  }

  if (!bucketName) return null;
  if (endpoint) {
    return `${endpoint.replace(/\/$/, '')}/${encodedName}`;
  }

  return `https://${bucketName}.s3.${region}.amazonaws.com/${encodedName}`;
}

async function uploadToS3(filePath, filename, contentType) {
  if (!bucketName) {
    throw new Error('S3 uploads are not enabled');
  }

  const client = getS3Client();
  const { PutObjectCommand } = require('@aws-sdk/client-s3');
  const body = fs.readFileSync(filePath);

  const key = getS3Key(filename);
  await client.send(new PutObjectCommand({
    Bucket: bucketName,
    Key: key,
    Body: body,
    ContentType: contentType,
    ACL: process.env.S3_ACL || 'public-read',
  }));

  return getPublicUrl(filename);
}

function resolveLocalFileUrl(filename, req) {
  const protocol = req.protocol;
  const host = req.get('host');
  return `${protocol}://${host}/uploads/${encodeURIComponent(filename)}`;
}

function removeLocalFile(filePath) {
  try {
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }
  } catch (error) {
    // swallow cleanup errors; upload may still have succeeded
  }
}

module.exports = {
  isS3Enabled,
  uploadToS3,
  resolveLocalFileUrl,
  removeLocalFile,
};
