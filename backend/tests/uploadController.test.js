const fs = require('fs');
const os = require('os');
const path = require('path');

jest.mock('../models/Package', () => ({
  findById: jest.fn(),
}));

const Package = require('../models/Package');
const { uploadFile } = require('../controllers/uploadController');
const { AppError } = require('../utils/errorHandler');

describe('uploadFile controller', () => {
  let tempDir;

  beforeAll(() => {
    tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'upload-test-'));
  });

  afterAll(() => {
    fs.rmSync(tempDir, { recursive: true, force: true });
  });

  beforeEach(() => {
    jest.clearAllMocks();
    delete process.env.MAX_IMAGES_PER_PACKAGE;
  });

  function createRequest(fileName, fileBuffer, packageId) {
    const filePath = path.join(tempDir, fileName);
    fs.writeFileSync(filePath, fileBuffer);

    return {
      file: {
        path: filePath,
        filename: fileName,
        mimetype: 'image/jpeg',
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
    const req = createRequest('valid.jpg', Buffer.from([0xff, 0xd8, 0xff, 0x00]));
    const res = createResponse();
    const next = jest.fn();

    await uploadFile(req, res, next);

    expect(next).not.toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.status().json).toHaveBeenCalledWith(
      expect.objectContaining({
        success: true,
        fileUrl: expect.stringContaining('http://localhost:5000/uploads/valid.jpg'),
        filename: 'valid.jpg',
      })
    );
  });

  it('rejects an upload with invalid image content', async () => {
    const req = createRequest('invalid.jpg', Buffer.from('not-an-image'));
    const res = createResponse();
    const next = jest.fn();

    await uploadFile(req, res, next);

    expect(next).toHaveBeenCalledTimes(1);
    const err = next.mock.calls[0][0];
    expect(err).toBeInstanceOf(AppError);
    expect(err.message).toMatch(/Invalid image file content/);
    expect(fs.existsSync(req.file.path)).toBe(false);
  });

  it('rejects an upload when package image limit is reached', async () => {
    process.env.MAX_IMAGES_PER_PACKAGE = '1';
    Package.findById.mockResolvedValue({ images: ['https://example.com/one.jpg'] });

    const req = createRequest('limit.jpg', Buffer.from([0xff, 0xd8, 0xff, 0x00]), 'package-123');
    const res = createResponse();
    const next = jest.fn();

    await uploadFile(req, res, next);

    expect(next).toHaveBeenCalledTimes(1);
    const err = next.mock.calls[0][0];
    expect(err).toBeInstanceOf(AppError);
    expect(err.message).toMatch(/limit is 1/);
    expect(fs.existsSync(req.file.path)).toBe(false);
  });
});
