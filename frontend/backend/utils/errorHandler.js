<<<<<<< HEAD
const logger = require("./logger");
=======
const logger = require('./logger');
>>>>>>> ff1035069d14f891f4a70ea6c8f2721597241763

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
<<<<<<< HEAD
  err.message = err.message || "Internal Server Error";
=======
  err.message = err.message || 'Internal Server Error';
>>>>>>> ff1035069d14f891f4a70ea6c8f2721597241763

  logger.error(`Error: ${err.message} | Status: ${err.statusCode}`);

  // Invalid identifier / lookup error
<<<<<<< HEAD
  if (err.name === "CastError" || err.code === "22P02") {
    const message = `Resource not found. Invalid: ${err.path || "identifier"}`;
=======
  if (err.name === 'CastError' || err.code === '22P02') {
    const message = `Resource not found. Invalid: ${err.path || 'identifier'}`;
>>>>>>> ff1035069d14f891f4a70ea6c8f2721597241763
    err = new AppError(message, 400);
  }

  // Duplicate key error (Mongo or Postgres)
<<<<<<< HEAD
  if (err.code === 11000 || err.code === "23505") {
=======
  if (err.code === 11000 || err.code === '23505') {
>>>>>>> ff1035069d14f891f4a70ea6c8f2721597241763
    const field = Object.keys(err.keyValue)[0];
    const message = `${field} already exists`;
    err = new AppError(message, 400);
  }

  // JWT errors
<<<<<<< HEAD
  if (err.name === "JsonWebTokenError") {
    const message = "Invalid token. Please try again";
    err = new AppError(message, 400);
  }

  if (err.name === "TokenExpiredError") {
    const message = "Token has expired. Please login again";
=======
  if (err.name === 'JsonWebTokenError') {
    const message = 'Invalid token. Please try again';
    err = new AppError(message, 400);
  }

  if (err.name === 'TokenExpiredError') {
    const message = 'Token has expired. Please login again';
>>>>>>> ff1035069d14f891f4a70ea6c8f2721597241763
    err = new AppError(message, 401);
  }

  // Validation errors
<<<<<<< HEAD
  if (err.name === "ValidationError") {
    const message = Object.values(err.errors)
      .map((val) => val.message)
      .join(", ");
=======
  if (err.name === 'ValidationError') {
    const message = Object.values(err.errors)
      .map((val) => val.message)
      .join(', ');
>>>>>>> ff1035069d14f891f4a70ea6c8f2721597241763
    err = new AppError(message, 400);
  }

  res.status(err.statusCode).json({
    success: false,
    message: err.message,
<<<<<<< HEAD
    ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
=======
    ...(err.fieldErrors ? { fieldErrors: err.fieldErrors } : {}),
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
>>>>>>> ff1035069d14f891f4a70ea6c8f2721597241763
  });
};

module.exports = { AppError, errorHandler };
