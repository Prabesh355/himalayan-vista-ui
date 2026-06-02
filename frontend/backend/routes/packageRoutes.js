<<<<<<< HEAD
const express = require("express");
const router = express.Router();
const packageController = require("../controllers/packageController");
const { protect, authorize } = require("../middleware/auth");
const { validatePackage, validatePackageUpdate } = require("../validations/packageValidation");

// Public Routes
router.get("/search", packageController.searchPackages);
router.get("/featured", packageController.getFeaturedPackages);
router.get("/destination/:destination", packageController.getPackagesByDestination);
router.get("/", packageController.getAllPackages);
router.get(
  "/admin/all",
  protect,
  authorize("admin", "vendor"),
  packageController.getAllPackagesAdmin,
);
router.get("/:id", packageController.getPackage);

// Private Routes (Admin/Vendor)
router.post(
  "/",
  protect,
  authorize("admin", "vendor"),
  validatePackage,
  packageController.createPackage,
);
router.put(
  "/:id",
  protect,
  authorize("admin", "vendor"),
  validatePackageUpdate,
  packageController.updatePackage,
);
router.delete("/:id", protect, authorize("admin", "vendor"), packageController.deletePackage);
=======
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
router.get('/:id', packageController.getPackage);

// Private Routes (Admin/Vendor)
router.post('/', protect, authorize('admin', 'vendor'), validatePackage, packageController.createPackage);
router.put('/:id', protect, authorize('admin', 'vendor'), validatePackageUpdate, packageController.updatePackage);
router.delete('/:id', protect, authorize('admin', 'vendor'), packageController.deletePackage);
>>>>>>> ff1035069d14f891f4a70ea6c8f2721597241763

module.exports = router;
