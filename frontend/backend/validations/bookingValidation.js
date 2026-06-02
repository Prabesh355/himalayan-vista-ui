<<<<<<< HEAD
const { body, validationResult } = require("express-validator");
const AppError = require("../utils/errorHandler");
=======
const { body, validationResult } = require('express-validator');
const AppError = require('../utils/errorHandler');
>>>>>>> ff1035069d14f891f4a70ea6c8f2721597241763

/**
 * Validate Booking Creation
 * @route   POST /api/bookings
 */
const validateBooking = [
<<<<<<< HEAD
  body("packageId")
    .notEmpty()
    .withMessage("Package ID is required")
    .isMongoId()
    .withMessage("Invalid package ID"),

  body("travelDate")
    .notEmpty()
    .withMessage("Travel date is required")
    .isISO8601()
    .withMessage("Travel date must be a valid date")
=======
  body('packageId')
    .notEmpty()
    .withMessage('Package ID is required')
    .isMongoId()
    .withMessage('Invalid package ID'),

  body('travelDate')
    .notEmpty()
    .withMessage('Travel date is required')
    .isISO8601()
    .withMessage('Travel date must be a valid date')
>>>>>>> ff1035069d14f891f4a70ea6c8f2721597241763
    .custom((value) => {
      const travelDate = new Date(value);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (travelDate <= today) {
<<<<<<< HEAD
        throw new Error("Travel date must be in the future");
=======
        throw new Error('Travel date must be in the future');
>>>>>>> ff1035069d14f891f4a70ea6c8f2721597241763
      }
      return true;
    }),

<<<<<<< HEAD
  body("endDate")
    .notEmpty()
    .withMessage("End date is required")
    .isISO8601()
    .withMessage("End date must be a valid date")
=======
  body('endDate')
    .notEmpty()
    .withMessage('End date is required')
    .isISO8601()
    .withMessage('End date must be a valid date')
>>>>>>> ff1035069d14f891f4a70ea6c8f2721597241763
    .custom((value, { req }) => {
      const endDate = new Date(value);
      const travelDate = new Date(req.body.travelDate);
      if (endDate <= travelDate) {
<<<<<<< HEAD
        throw new Error("End date must be after travel date");
=======
        throw new Error('End date must be after travel date');
>>>>>>> ff1035069d14f891f4a70ea6c8f2721597241763
      }
      return true;
    }),

<<<<<<< HEAD
  body("numberOfTravelers")
    .notEmpty()
    .withMessage("Number of travelers is required")
    .isInt({ min: 1, max: 100 })
    .withMessage("Number of travelers must be between 1 and 100"),

  body("travelers").isArray({ min: 1 }).withMessage("At least one traveler is required"),

  body("travelers.*.firstName")
    .trim()
    .notEmpty()
    .withMessage("Traveler first name is required")
    .isLength({ min: 2, max: 50 })
    .withMessage("First name must be between 2 and 50 characters"),

  body("travelers.*.lastName")
    .trim()
    .notEmpty()
    .withMessage("Traveler last name is required")
    .isLength({ min: 2, max: 50 })
    .withMessage("Last name must be between 2 and 50 characters"),

  body("travelers.*.email")
    .optional()
    .isEmail()
    .withMessage("Invalid email format")
    .normalizeEmail(),

  body("travelers.*.phone").optional().isMobilePhone().withMessage("Invalid phone number"),

  body("travelers.*.dateOfBirth")
    .optional()
    .isISO8601()
    .withMessage("Invalid date of birth")
    .custom((value) => {
      const age = new Date().getFullYear() - new Date(value).getFullYear();
      if (age < 0 || age > 150) {
        throw new Error("Invalid age");
=======
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
>>>>>>> ff1035069d14f891f4a70ea6c8f2721597241763
      }
      return true;
    }),

<<<<<<< HEAD
  body("travelers.*.nationality")
    .optional()
    .trim()
    .isLength({ min: 2 })
    .withMessage("Nationality must be at least 2 characters"),

  body("travelers.*.idNumber")
    .optional()
    .trim()
    .isLength({ min: 5 })
    .withMessage("ID number must be at least 5 characters"),

  body("paymentMethod")
    .optional()
    .isIn(["credit_card", "debit_card", "bank_transfer", "wallet", "cash"])
    .withMessage("Invalid payment method"),

  body("specialRequests")
    .optional()
    .trim()
    .isLength({ max: 500 })
    .withMessage("Special requests must not exceed 500 characters"),
=======
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
>>>>>>> ff1035069d14f891f4a70ea6c8f2721597241763
];

/**
 * Validate Booking Cancellation
 * @route   PUT /api/bookings/:id/cancel
 */
const validateBookingCancel = [
<<<<<<< HEAD
  body("cancellationReason")
    .optional()
    .trim()
    .isLength({ max: 300 })
    .withMessage("Cancellation reason must not exceed 300 characters"),
=======
  body('cancellationReason')
    .optional()
    .trim()
    .isLength({ max: 300 })
    .withMessage('Cancellation reason must not exceed 300 characters'),
>>>>>>> ff1035069d14f891f4a70ea6c8f2721597241763
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
<<<<<<< HEAD
      new AppError(`Validation failed: ${formattedErrors.map((e) => e.message).join(", ")}`, 400),
=======
      new AppError(
        `Validation failed: ${formattedErrors.map((e) => e.message).join(', ')}`,
        400
      )
>>>>>>> ff1035069d14f891f4a70ea6c8f2721597241763
    );
  }

  next();
};

module.exports = {
  validateBooking,
  validateBookingCancel,
  handleValidationErrors,
};
