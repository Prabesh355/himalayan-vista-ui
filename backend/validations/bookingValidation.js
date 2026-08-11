const { body, validationResult } = require('express-validator');
const { AppError } = require('../utils/errorHandler');

/**
 * Validate Booking Creation
 * @route   POST /api/bookings
 */
const validateBooking = [
  body('packageId')
    .notEmpty()
    .withMessage('Package ID is required')
    .custom((value) => {
      const isMongoId = /^[a-fA-F\d]{24}$/.test(value);
      const isUuid = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-5][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}$/.test(value);
      if (!isMongoId && !isUuid) {
        throw new Error('Invalid package ID');
      }
      return true;
    }),

  body('travelDate')
    .notEmpty()
    .withMessage('Travel date is required')
    .isISO8601()
    .withMessage('Travel date must be a valid date')
    .custom((value) => {
      const travelDate = new Date(value);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (travelDate <= today) {
        throw new Error('Travel date must be in the future');
      }
      return true;
    }),

  body('endDate')
    .notEmpty()
    .withMessage('End date is required')
    .isISO8601()
    .withMessage('End date must be a valid date')
    .custom((value, { req }) => {
      const endDate = new Date(value);
      const travelDate = new Date(req.body.travelDate);
      if (endDate <= travelDate) {
        throw new Error('End date must be after travel date');
      }
      return true;
    }),

  body('numberOfTravelers')
    .notEmpty()
    .withMessage('Number of travelers is required')
    .isInt({ min: 1, max: 100 })
    .withMessage('Number of travelers must be between 1 and 100'),

  body('travelers')
    .isArray({ min: 1 })
    .withMessage('At least one traveler is required'),

  body('travelers.*.firstName')
    .trim()
    .notEmpty()
    .withMessage('Traveler first name is required')
    .isLength({ min: 2, max: 50 })
    .withMessage('First name must be between 2 and 50 characters'),

  body('travelers.*.lastName')
    .trim()
    .notEmpty()
    .withMessage('Traveler last name is required')
    .isLength({ min: 2, max: 50 })
    .withMessage('Last name must be between 2 and 50 characters'),

  body('travelers.*.email')
    .optional()
    .isEmail()
    .withMessage('Invalid email format')
    .normalizeEmail(),

  body('travelers.*.phone')
    .optional()
    .isMobilePhone()
    .withMessage('Invalid phone number'),

  body('travelers.*.dateOfBirth')
    .optional()
    .isISO8601()
    .withMessage('Invalid date of birth')
    .custom((value) => {
      const age = new Date().getFullYear() - new Date(value).getFullYear();
      if (age < 0 || age > 150) {
        throw new Error('Invalid age');
      }
      return true;
    }),

  body('travelers.*.nationality')
    .optional()
    .trim()
    .isLength({ min: 2 })
    .withMessage('Nationality must be at least 2 characters'),

  body('travelers.*.idNumber')
    .optional()
    .trim()
    .isLength({ min: 5 })
    .withMessage('ID number must be at least 5 characters'),

  body('paymentMethod')
    .optional()
    .isIn(['credit_card', 'debit_card', 'bank_transfer', 'wallet', 'cash'])
    .withMessage('Invalid payment method'),

  body('specialRequests')
    .optional()
    .trim()
    .isLength({ max: 500 })
    .withMessage('Special requests must not exceed 500 characters'),

  body('termsAccepted')
    .optional()
    .isBoolean()
    .withMessage('Terms acceptance must be a boolean')
    .custom((value) => {
      if (value === false) {
        throw new Error('Terms and Conditions must be accepted');
      }
      return true;
    }),
];

/**
 * Validate Booking Cancellation
 * @route   PUT /api/bookings/:id/cancel
 */
const validateBookingCancel = [
  body('cancellationReason')
    .optional()
    .trim()
    .isLength({ max: 300 })
    .withMessage('Cancellation reason must not exceed 300 characters'),
];

/**
 * Validation Error Handler Middleware
 */
const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const formattedErrors = errors.array().map((error) => ({
      field: error.param,
      message: error.msg,
    }));

    return next(
      new AppError(
        `Validation failed: ${formattedErrors.map((e) => e.message).join(', ')}`,
        400
      )
    );
  }

  next();
};

module.exports = {
  validateBooking,
  validateBookingCancel,
  handleValidationErrors,
};
