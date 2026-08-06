const express = require('express');
const router = express.Router();
const packageController = require('../controllers/packageController');
const { protect, authorize } = require('../middleware/auth');
const { validatePackage, validatePackageUpdate } = require('../validations/packageValidation');

// Public Routes
router.get('/search', packageController.searchPackages);
router.get('/featured', packageController.getFeaturedPackages);
router.get('/destination/:destination', packageController.getPackagesByDestination);
router.get('/slug/:slug', packageController.getPackageBySlug);
router.get('/', packageController.getAllPackages);
router.get('/admin/all', protect, authorize('admin', 'vendor'), packageController.getAllPackagesAdmin);
router.get('/:id/itinerary-days', protect, authorize('admin', 'vendor'), packageController.getItineraryDays);
router.get('/:id', packageController.getPackage);

// Private Routes (Admin/Vendor)
router.post('/', protect, authorize('admin', 'vendor'), validatePackage, packageController.createPackage);
router.put('/:id', protect, authorize('admin', 'vendor'), validatePackageUpdate, packageController.updatePackage);
router.put('/:id/itinerary-days', protect, authorize('admin', 'vendor'), packageController.replaceItineraryDays);
router.delete('/:id', protect, authorize('admin', 'vendor'), packageController.deletePackage);

module.exports = router;
