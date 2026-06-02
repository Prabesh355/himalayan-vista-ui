<<<<<<< HEAD
const express = require("express");
const router = express.Router();
const inquiryController = require("../controllers/inquiryController");
const { protect, authorize } = require("../middleware/auth");

// Public Routes
router.post("/", inquiryController.createInquiry);

// Admin Routes
router.get("/", protect, authorize("admin"), inquiryController.getAllInquiries);
router.get("/stats", protect, authorize("admin"), inquiryController.getInquiryStats);
router.get("/:id", protect, authorize("admin"), inquiryController.getInquiry);
router.put("/:id", protect, authorize("admin"), inquiryController.updateInquiry);
router.post("/:id/respond", protect, authorize("admin"), inquiryController.respondToInquiry);
router.delete("/:id", protect, authorize("admin"), inquiryController.deleteInquiry);
=======
const express = require('express');
const router = express.Router();
const inquiryController = require('../controllers/inquiryController');
const { protect, authorize } = require('../middleware/auth');

// Public Routes
router.post('/', inquiryController.createInquiry);

// Admin Routes
router.get('/', protect, authorize('admin'), inquiryController.getAllInquiries);
router.get('/stats', protect, authorize('admin'), inquiryController.getInquiryStats);
router.get('/:id', protect, authorize('admin'), inquiryController.getInquiry);
router.put('/:id', protect, authorize('admin'), inquiryController.updateInquiry);
router.post('/:id/respond', protect, authorize('admin'), inquiryController.respondToInquiry);
router.delete('/:id', protect, authorize('admin'), inquiryController.deleteInquiry);
>>>>>>> ff1035069d14f891f4a70ea6c8f2721597241763

module.exports = router;
