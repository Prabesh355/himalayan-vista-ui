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

module.exports = router;
