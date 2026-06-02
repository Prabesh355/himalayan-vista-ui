<<<<<<< HEAD
const { validationResult } = require("express-validator");
const { AppError } = require("../utils/errorHandler");
=======
const { validationResult } = require('express-validator');
const { AppError } = require('../utils/errorHandler');
>>>>>>> ff1035069d14f891f4a70ea6c8f2721597241763

// Middleware to handle validation errors
const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const formattedErrors = errors.array().map((error) => ({
      field: error.param,
      message: error.msg,
    }));

    return res.status(400).json({
      success: false,
<<<<<<< HEAD
      message: "Validation errors",
=======
      message: 'Validation errors',
>>>>>>> ff1035069d14f891f4a70ea6c8f2721597241763
      errors: formattedErrors,
    });
  }

  next();
};

module.exports = { handleValidationErrors };
