const logger = require('./logger');

class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;

    Error.captureStackTrace(this, this.constructor);
  }
}

// Centralized Error Handler Middleware
const errorHandler = (err, req, res, next) => {
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

  res.status(err.statusCode).json({
    success: false,
    message: err.message,
    ...(err.fieldErrors ? { fieldErrors: err.fieldErrors } : {}),
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
  });
};

module.exports = { AppError, errorHandler };
