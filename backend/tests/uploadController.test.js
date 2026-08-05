jest.mock('../models/Package', () => ({
  findById: jest.fn(),
}));

jest.mock('../services/cloudinaryService', () => ({
  cloudinary: {
    uploader: {
      upload: jest.fn(),
    },
  },
  deleteCloudinaryAssetByPublicId: jest.fn().mockResolvedValue(true),
  hasCloudinaryCredentials: jest.fn(() => true),
  isCloudinaryUrl: jest.fn((value) => typeof value === 'string' && /cloudinary\.com/i.test(value)),
}));

const Package = require('../models/Package');
const { uploadFile } = require('../controllers/uploadController');
const { AppError } = require('../utils/errorHandler');
const { cloudinary, deleteCloudinaryAssetByPublicId } = require('../services/cloudinaryService');

describe('uploadFile controller', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    delete process.env.MAX_IMAGES_PER_PACKAGE;
    cloudinary.uploader.upload.mockResolvedValue({
      secure_url: 'https://res.cloudinary.com/demo/image/upload/v1234567890/valid.webp',
      url: 'https://res.cloudinary.com/demo/image/upload/v1234567890/valid.webp',
      public_id: 'himalayan-vista/valid',
    });
  });

  function createRequest(fileName, packageId, mimetype = 'image/jpeg') {
    return {
      file: {
        buffer: Buffer.from('fake-image-bytes'),
        filename: fileName,
        originalname: fileName,
        mimetype,
      },
      body: packageId ? { packageId } : {},
      query: {},
      protocol: 'http',
      get: jest.fn(() => 'localhost:5000'),
    };
  }

  function createResponse() {
    const json = jest.fn();
    const status = jest.fn(() => ({ json }));
    return { status, json };
  }

  it('returns a successful URL for a valid image upload', async () => {
    const req = createRequest('valid.jpg');
    const res = createResponse();
    const next = jest.fn();

    await uploadFile(req, res, next);

    expect(next).not.toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.status().json).toHaveBeenCalledWith(
      expect.objectContaining({
        success: true,
        fileUrl: expect.stringContaining('res.cloudinary.com/demo/image/upload/'),
        filename: 'valid.jpg',
        storage: 'cloudinary',
      })
    );
    expect(cloudinary.uploader.upload).toHaveBeenCalledTimes(1);
  });

  it('rejects an upload with invalid image content', async () => {
    const req = createRequest('invalid.jpg', null, 'text/plain');
    const res = createResponse();
    const next = jest.fn();

    await uploadFile(req, res, next);

    expect(next).toHaveBeenCalledTimes(1);
    const err = next.mock.calls[0][0];
    expect(err).toBeInstanceOf(AppError);
    expect(err.message).toMatch(/Invalid image file type/);
  });

  it('rejects an upload when package image limit is reached', async () => {
    process.env.MAX_IMAGES_PER_PACKAGE = '1';
    Package.findById.mockResolvedValue({ images: ['https://example.com/one.jpg'] });

    const req = createRequest('limit.jpg', 'package-123');
    const res = createResponse();
    const next = jest.fn();

    await uploadFile(req, res, next);

    expect(next).toHaveBeenCalledTimes(1);
    const err = next.mock.calls[0][0];
    expect(err).toBeInstanceOf(AppError);
    expect(err.message).toMatch(/limit is 1/);
    expect(cloudinary.uploader.upload).not.toHaveBeenCalled();
  });
});
