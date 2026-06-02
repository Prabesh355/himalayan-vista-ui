<<<<<<< HEAD
const express = require("express");
const router = express.Router();
const reviewController = require("../controllers/reviewController");
const { protect, authorize } = require("../middleware/auth");

// Public Routes
router.get("/", reviewController.getAllReviews);
router.get("/package/:packageId", reviewController.getPackageReviews);
router.get("/package-slug/:slug", reviewController.getPackageReviewsBySlug);

// Private Routes (Users)
router.post("/", protect, reviewController.createReview);
router.put("/:id", protect, reviewController.updateReview);
router.delete("/:id", protect, reviewController.deleteReview);

// Admin Routes
router.put("/:id/approve", protect, authorize("admin"), reviewController.approveReview);
=======
const express = require('express');
const router = express.Router();
const reviewController = require('../controllers/reviewController');
const { protect, authorize } = require('../middleware/auth');

// Public Routes
router.get('/', reviewController.getAllReviews);
router.get('/package/:packageId', reviewController.getPackageReviews);
router.get('/package-slug/:slug', reviewController.getPackageReviewsBySlug);

// Private Routes (Users)
router.post('/', protect, reviewController.createReview);
router.put('/:id', protect, reviewController.updateReview);
router.delete('/:id', protect, reviewController.deleteReview);

// Admin Routes
router.put('/:id/approve', protect, authorize('admin'), reviewController.approveReview);
>>>>>>> ff1035069d14f891f4a70ea6c8f2721597241763

module.exports = router;
