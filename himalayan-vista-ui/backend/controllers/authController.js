const User = require('../models/User');
const { AppError } = require('../utils/errorHandler');
const logger = require('../utils/logger');

// @desc Register a user
// @route POST /api/auth/register
// @access Public
exports.register = async (req, res, next) => {
  try {
    const { firstName, lastName, email, password, passwordConfirm } = req.body;

    // Check if passwords match
    if (password !== passwordConfirm) {
      return next(new AppError('Passwords do not match', 400));
    }

    // Check if user exists
    const userExists = await User.findOne({ email: email.toLowerCase() });
    if (userExists) {
      return next(new AppError('Email is already registered', 400));
    }

    // Create user
    const user = await User.create({
      firstName,
      lastName,
      email: email.toLowerCase(),
      password,
    });

    // Get token
    const token = user.getSignedJwtToken();

    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      token,
      user: user.toJSON(),
    });

    logger.info(`User registered: ${email}`);
  } catch (error) {
    logger.error(`Registration error: ${error.message}`);
    next(error);
  }
};

// @desc Login user
// @route POST /api/auth/login
// @access Public
exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Validate inputs
    if (!email || !password) {
      return next(new AppError('Please provide email and password', 400));
    }

    // Check for user
    const user = await User.findOne({ email: email.toLowerCase() }).select('+password');

    if (!user) {
      return next(new AppError('Invalid credentials', 401));
    }

    // Check if password matches
    const isMatch = await user.matchPassword(password);

    if (!isMatch) {
      return next(new AppError('Invalid credentials', 401));
    }

    // Update last login
    user.lastLogin = new Date();
    await user.save();

    // Get token
    const token = user.getSignedJwtToken();

    // Set cookie
    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: parseInt(process.env.JWT_COOKIE_EXPIRE) * 24 * 60 * 60 * 1000,
    });

    res.status(200).json({
      success: true,
      message: 'Logged in successfully',
      token,
      user: user.toJSON(),
    });

    logger.info(`User logged in: ${email}`);
  } catch (error) {
    logger.error(`Login error: ${error.message}`);
    next(error);
  }
};

// @desc Get current logged-in user
// @route GET /api/auth/me
// @access Private
exports.getMe = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);

    res.status(200).json({
      success: true,
      user: user.toJSON(),
    });
  } catch (error) {
    logger.error(`Get me error: ${error.message}`);
    next(error);
  }
};

// @desc Logout user
// @route POST /api/auth/logout
// @access Private
exports.logout = (req, res, next) => {
  res.clearCookie('token');

  res.status(200).json({
    success: true,
    message: 'Logged out successfully',
  });

  logger.info(`User logged out: ${req.user.email}`);
};

// @desc Update user profile
// @route PUT /api/auth/profile
// @access Private
exports.updateProfile = async (req, res, next) => {
  try {
    const { firstName, lastName, phone, address } = req.body;

    const user = await User.findByIdAndUpdate(
      req.user.id,
      {
        firstName,
        lastName,
        phone,
        address,
      },
      { new: true, runValidators: true }
    );

    res.status(200).json({
      success: true,
      message: 'Profile updated successfully',
      user: user.toJSON(),
    });

    logger.info(`User profile updated: ${req.user.email}`);
  } catch (error) {
    logger.error(`Update profile error: ${error.message}`);
    next(error);
  }
};

// @desc Change password
// @route PUT /api/auth/change-password
// @access Private
exports.changePassword = async (req, res, next) => {
  try {
    const { currentPassword, newPassword, confirmPassword } = req.body;

    // Validate inputs
    if (!currentPassword || !newPassword || !confirmPassword) {
      return next(new AppError('Please provide all password fields', 400));
    }

    if (newPassword !== confirmPassword) {
      return next(new AppError('New passwords do not match', 400));
    }

    const user = await User.findById(req.user.id).select('+password');

    // Check current password
    const isMatch = await user.matchPassword(currentPassword);
    if (!isMatch) {
      return next(new AppError('Current password is incorrect', 401));
    }

    // Update password
    user.password = newPassword;
    await user.save();

    const token = user.getSignedJwtToken();

    res.status(200).json({
      success: true,
      message: 'Password changed successfully',
      token,
    });

    logger.info(`User changed password: ${req.user.email}`);
  } catch (error) {
    logger.error(`Change password error: ${error.message}`);
    next(error);
  }
};

// @desc Forgot password
// @route POST /api/auth/forgot-password
// @access Public
exports.forgotPassword = async (req, res, next) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email: email.toLowerCase() });

    if (!user) {
      return next(new AppError('User not found with that email', 404));
    }

    // Get reset token
    const resetToken = user.getResetPasswordToken();
    await user.save({ validateBeforeSave: false });

    res.status(200).json({
      success: true,
      message: 'Password reset token sent to email',
      resetToken, // In production, send this via email
    });

    logger.info(`Password reset requested: ${email}`);
  } catch (error) {
    logger.error(`Forgot password error: ${error.message}`);
    next(error);
  }
};

// @desc Reset password
// @route POST /api/auth/reset-password/:token
// @access Public
exports.resetPassword = async (req, res, next) => {
  try {
    const { token } = req.params;
    const { password, passwordConfirm } = req.body;

    // Validate passwords
    if (password !== passwordConfirm) {
      return next(new AppError('Passwords do not match', 400));
    }

    // Hash reset token
    const resetPasswordToken = require('crypto')
      .createHash('sha256')
      .update(token)
      .digest('hex');

    const user = await User.findOne({
      resetPasswordToken,
      resetPasswordExpiry: { $gt: Date.now() },
    });

    if (!user) {
      return next(new AppError('Invalid or expired reset token', 400));
    }

    // Set new password
    user.password = password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpiry = undefined;
    await user.save();

    const jwtToken = user.getSignedJwtToken();

    res.status(200).json({
      success: true,
      message: 'Password reset successfully',
      token: jwtToken,
    });

    logger.info(`Password reset successful: ${user.email}`);
  } catch (error) {
    logger.error(`Reset password error: ${error.message}`);
    next(error);
  }
};
