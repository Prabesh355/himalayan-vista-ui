<<<<<<< HEAD
const jwt = require("jsonwebtoken");
const User = require("../models/UserPg");
const { AppError } = require("../utils/errorHandler");
const logger = require("../utils/logger");
=======
const jwt = require('jsonwebtoken');
const User = require('../models/UserPg');
const { AppError } = require('../utils/errorHandler');
const logger = require('../utils/logger');
>>>>>>> ff1035069d14f891f4a70ea6c8f2721597241763

// Protect route - verify JWT token
exports.protect = async (req, res, next) => {
  try {
    let token;

    // Get token from header or cookies
<<<<<<< HEAD
    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
      token = req.headers.authorization.split(" ")[1];
=======
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
>>>>>>> ff1035069d14f891f4a70ea6c8f2721597241763
    } else if (req.cookies && req.cookies.token) {
      token = req.cookies.token;
    }

    // Check if token exists
    if (!token) {
<<<<<<< HEAD
      return next(new AppError("Not authorized to access this route", 401));
=======
      return next(new AppError('Not authorized to access this route', 401));
>>>>>>> ff1035069d14f891f4a70ea6c8f2721597241763
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id);

    if (!req.user) {
<<<<<<< HEAD
      return next(new AppError("User not found", 404));
=======
      return next(new AppError('User not found', 404));
>>>>>>> ff1035069d14f891f4a70ea6c8f2721597241763
    }

    next();
  } catch (error) {
    logger.error(`Auth middleware error: ${error.message}`);
<<<<<<< HEAD
    next(new AppError("Not authorized to access this route", 401));
=======
    next(new AppError('Not authorized to access this route', 401));
>>>>>>> ff1035069d14f891f4a70ea6c8f2721597241763
  }
};

// Authorize specific roles
exports.authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
<<<<<<< HEAD
      return next(new AppError("User not authenticated", 401));
=======
      return next(new AppError('User not authenticated', 401));
>>>>>>> ff1035069d14f891f4a70ea6c8f2721597241763
    }

    if (!roles.includes(req.user.role)) {
      return next(
<<<<<<< HEAD
        new AppError(`User role "${req.user.role}" is not authorized to access this route`, 403),
=======
        new AppError(
          `User role "${req.user.role}" is not authorized to access this route`,
          403
        )
>>>>>>> ff1035069d14f891f4a70ea6c8f2721597241763
      );
    }

    next();
  };
};

// Check if user is authenticated (optional)
exports.isAuthenticated = async (req, res, next) => {
  try {
    let token;

<<<<<<< HEAD
    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
      token = req.headers.authorization.split(" ")[1];
=======
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
>>>>>>> ff1035069d14f891f4a70ea6c8f2721597241763
    } else if (req.cookies && req.cookies.token) {
      token = req.cookies.token;
    }

    if (token) {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.id);
    }
  } catch (error) {
    req.user = null;
  }
  next();
};
