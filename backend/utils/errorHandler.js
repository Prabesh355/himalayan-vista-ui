const logger = require('./logger');

class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;

    Error.captureStackTrace(this, this.constructor);
  }
}

// Centralized Error Handler Middleware
const errorHandler = (err, req, res) => {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || 'Internal Server Error';

  logger.error(`Error: ${err.message} | Status: ${err.statusCode}`);

  // Invalid identifier / lookup error
  if (err.name === 'CastError' || err.code === '22P02') {
    const message = `Resource not found. Invalid: ${err.path || 'identifier'}`;
    err = new AppError(message, 400);
  }

  // Duplicate key error (Mongo or Postgres)
  if (err.code === 11000 || err.code === '23505') {
    const field = Object.keys(err.keyValue)[0];
    const message = `${field} already exists`;
    err = new AppError(message, 400);
  }

  // JWT errors
  if (err.name === 'JsonWebTokenError') {
    const message = 'Invalid token. Please try again';
    err = new AppError(message, 400);
  }

  if (err.name === 'TokenExpiredError') {
    const message = 'Token has expired. Please login again';
    err = new AppError(message, 401);
  }

  // Validation errors
  if (err.name === 'ValidationError') {
    const message = Object.values(err.errors)
      .map((val) => val.message)
      .join(', ');
    err = new AppError(message, 400);
  }

  if (
    /cloudinary|cloud name|api key|api secret|missing required configuration/i.test(err.message || '') ||
    err.name === 'CloudinaryError'
  ) {
    err = new AppError(
      'Image upload failed because Cloudinary is not configured correctly on the server.',
      503,
    );
  }

  if (err.name === 'MulterError' || err.code === 'LIMIT_FILE_SIZE' || err.code === 'LIMIT_UNEXPECTED_FILE') {
    let message = 'Invalid upload request';

    if (err.code === 'LIMIT_FILE_SIZE') {
      const maxMb = Math.max(1, Math.round((Number(process.env.MAX_FILE_SIZE) || 15 * 1024 * 1024) / (1024 * 1024)));
      message = `File too large. Maximum size is ${maxMb}MB`;
    } else if (err.code === 'LIMIT_UNEXPECTED_FILE') {
      message = 'Unexpected file field. Please upload using the file field.';
    }

    err = new AppError(message, 400);
  }

  res.status(err.statusCode).json({
    success: false,
    message: err.message,
    ...(err.fieldErrors ? { fieldErrors: err.fieldErrors } : {}),
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
  });
};

module.exports = { AppError, errorHandler };
