const { body, validationResult } = require('express-validator');
const { AppError } = require('../utils/errorHandler');

// Middleware to handle validation errors
const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const errorMessages = errors.array().map(err => ({
      field: err.param,
      message: err.msg,
    }));
    const appErr = new AppError(`Validation failed: ${errorMessages.map(e => e.message).join(', ')}`, 400);
    // attach structured field errors for clients to display inline
    appErr.fieldErrors = errorMessages;
    return next(appErr);
  }
  next();
};

// Validation rules for creating a package
exports.validatePackage = [
  body('title')
    .trim()
    .notEmpty()
    .withMessage('Package title is required')
    .isLength({ min: 5, max: 100 })
    .withMessage('Title must be between 5 and 100 characters'),
  
  body('description')
    .trim()
    .notEmpty()
    .withMessage('Description is required')
    .isLength({ min: 20 })
    .withMessage('Description must be at least 20 characters'),
  
  body('destination')
    .trim()
    .notEmpty()
    .withMessage('Destination is required')
    .isLength({ min: 2 })
    .withMessage('Destination must be at least 2 characters'),
  
  body('price')
    .notEmpty()
    .withMessage('Price is required')
    .isNumeric()
    .withMessage('Price must be a number')
    .custom(value => value > 0)
    .withMessage('Price must be greater than 0'),
  
  body('discountPrice')
    .optional()
    .isNumeric()
    .withMessage('Discount price must be a number')
    .custom((value, { req }) => {
      if (value && req.body.price && value >= req.body.price) {
        throw new Error('Discount price must be less than regular price');
      }
      return true;
    }),
  
  body('duration.days')
    .notEmpty()
    .withMessage('Duration days is required')
    .isInt({ min: 1 })
    .withMessage('Duration must be at least 1 day'),
  
  body('duration.nights')
    .notEmpty()
    .withMessage('Duration nights is required')
    .isInt({ min: 0 })
    .withMessage('Nights cannot be negative'),
  
  body('images')
    .isArray({ min: 1 })
    .withMessage('At least one image is required')
    .custom(images => {
      if (!Array.isArray(images) || images.length === 0) {
        throw new Error('Images array must not be empty');
      }
      return true;
    }),
  
  body('groupSize.min')
    .notEmpty()
    .withMessage('Minimum group size is required')
    .isInt({ min: 1 })
    .withMessage('Minimum group size must be at least 1'),
  
  body('groupSize.max')
    .notEmpty()
    .withMessage('Maximum group size is required')
    .isInt({ min: 1 })
    .withMessage('Maximum group size must be at least 1')
    .custom((value, { req }) => {
      if (value < req.body.groupSize.min) {
        throw new Error('Maximum group size must be greater than or equal to minimum');
      }
      return true;
    }),
  
  body('difficulty')
    .optional()
    .isIn(['easy', 'moderate', 'difficult', 'expert'])
    .withMessage('Difficulty must be one of: easy, moderate, difficult, expert'),
  
  body('category')
    .optional()
    .isIn(['trekking', 'cultural', 'adventure', 'luxury', 'wildlife'])
    .withMessage('Category must be one of: trekking, cultural, adventure, luxury, wildlife'),
  
  body('featured')
    .optional()
    .isBoolean()
    .withMessage('Featured must be a boolean value'),
  
  body('itinerary')
    .optional(),
  
  body('highlights')
    .optional()
    .isArray()
    .withMessage('Highlights must be an array'),
  
  body('inclusions')
    .optional()
    .isArray()
    .withMessage('Inclusions must be an array'),
  
  body('exclusions')
    .optional()
    .isArray()
    .withMessage('Exclusions must be an array'),
  
  body('bestSeason')
    .optional()
    .isArray()
    .withMessage('Best season must be an array'),

  handleValidationErrors,
];

// Validation rules for updating a package
exports.validatePackageUpdate = [
  body('title')
    .optional()
    .trim()
    .isLength({ min: 5, max: 100 })
    .withMessage('Title must be between 5 and 100 characters'),
  
  body('description')
    .optional()
    .trim()
    .isLength({ min: 20 })
    .withMessage('Description must be at least 20 characters'),
  
  body('destination')
    .optional()
    .trim()
    .isLength({ min: 2 })
    .withMessage('Destination must be at least 2 characters'),
  
  body('price')
    .optional()
    .isNumeric()
    .withMessage('Price must be a number')
    .custom(value => value > 0)
    .withMessage('Price must be greater than 0'),
  
  body('discountPrice')
    .optional()
    .isNumeric()
    .withMessage('Discount price must be a number')
    .custom((value, { req }) => {
      if (value && req.body.price && value >= req.body.price) {
        throw new Error('Discount price must be less than regular price');
      }
      return true;
    }),
  
  body('duration.days')
    .optional()
    .isInt({ min: 1 })
    .withMessage('Duration must be at least 1 day'),
  
  body('duration.nights')
    .optional()
    .isInt({ min: 0 })
    .withMessage('Nights cannot be negative'),
  
  body('images')
    .optional()
    .isArray({ min: 1 })
    .withMessage('At least one image is required'),
  
  body('groupSize.min')
    .optional()
    .isInt({ min: 1 })
    .withMessage('Minimum group size must be at least 1'),
  
  body('groupSize.max')
    .optional()
    .isInt({ min: 1 })
    .withMessage('Maximum group size must be at least 1')
    .custom((value, { req }) => {
      const minSize = req.body.groupSize?.min;
      if (minSize && value < minSize) {
        throw new Error('Maximum group size must be greater than or equal to minimum');
      }
      return true;
    }),
  
  body('difficulty')
    .optional()
    .isIn(['easy', 'moderate', 'difficult', 'expert'])
    .withMessage('Difficulty must be one of: easy, moderate, difficult, expert'),
  
  body('category')
    .optional()
    .isIn(['trekking', 'cultural', 'adventure', 'luxury', 'wildlife'])
    .withMessage('Category must be one of: trekking, cultural, adventure, luxury, wildlife'),
  
  body('featured')
    .optional()
    .isBoolean()
    .withMessage('Featured must be a boolean value'),
  
  body('itinerary')
    .optional(),
  
  body('highlights')
    .optional()
    .isArray()
    .withMessage('Highlights must be an array'),
  
  body('inclusions')
    .optional()
    .isArray()
    .withMessage('Inclusions must be an array'),
  
  body('exclusions')
    .optional()
    .isArray()
    .withMessage('Exclusions must be an array'),
  
  body('bestSeason')
    .optional()
    .isArray()
    .withMessage('Best season must be an array'),

  handleValidationErrors,
];
