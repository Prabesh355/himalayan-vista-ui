<<<<<<< HEAD
const express = require("express");
const router = express.Router();
const bookingController = require("../controllers/bookingController");
const { protect, authorize } = require("../middleware/auth");
const {
  validateBooking,
  validateBookingCancel,
  handleValidationErrors,
} = require("../validations/bookingValidation");
=======
const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/bookingController');
const { protect, authorize } = require('../middleware/auth');
const { validateBooking, validateBookingCancel, handleValidationErrors } = require('../validations/bookingValidation');
>>>>>>> ff1035069d14f891f4a70ea6c8f2721597241763

/**
 * PUBLIC/PROTECTED ROUTES
 */

// Admin only - Analytics endpoints (place before other routes)
<<<<<<< HEAD
router.get("/stats/overview", protect, authorize("admin"), bookingController.getBookingStats);
router.get("/history/analytics", protect, authorize("admin"), bookingController.getBookingHistory);

// Admin only - Get all bookings
router.get("/admin/all", protect, authorize("admin"), bookingController.getAllBookings);

// User routes
router.post("/", protect, validateBooking, handleValidationErrors, bookingController.createBooking);
router.get("/", protect, bookingController.getUserBookings);
router.get("/:id", protect, bookingController.getBooking);
router.put("/:id", protect, bookingController.updateBooking);
router.put(
  "/:id/cancel",
  protect,
  validateBookingCancel,
  handleValidationErrors,
  bookingController.cancelBooking,
);

// Admin only - Status update
router.put("/:id/status", protect, authorize("admin"), bookingController.updateBookingStatus);

module.exports = router;
=======
router.get('/stats/overview', protect, authorize('admin'), bookingController.getBookingStats);
router.get('/history/analytics', protect, authorize('admin'), bookingController.getBookingHistory);

// Admin only - Get all bookings
router.get('/admin/all', protect, authorize('admin'), bookingController.getAllBookings);

// User routes
router.post('/', protect, validateBooking, handleValidationErrors, bookingController.createBooking);
router.get('/', protect, bookingController.getUserBookings);
router.get('/:id', protect, bookingController.getBooking);
router.put('/:id', protect, bookingController.updateBooking);
router.put('/:id/cancel', protect, validateBookingCancel, handleValidationErrors, bookingController.cancelBooking);

// Admin only - Status update
router.put('/:id/status', protect, authorize('admin'), bookingController.updateBookingStatus);

module.exports = router;

>>>>>>> ff1035069d14f891f4a70ea6c8f2721597241763
