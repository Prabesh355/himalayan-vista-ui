<<<<<<< HEAD
const express = require("express");
const router = express.Router();
const blogController = require("../controllers/blogController");
const { protect, authorize } = require("../middleware/auth");

// Public Routes
router.get("/", blogController.getAllBlogs);
router.get("/category/:category", blogController.getBlogsByCategory);
router.get("/:slug", blogController.getBlog);

// Private Routes (Admin only)
router.post("/", protect, authorize("admin"), blogController.createBlog);
router.put("/:id", protect, authorize("admin"), blogController.updateBlog);
router.delete("/:id", protect, authorize("admin"), blogController.deleteBlog);

// User Routes
router.post("/:id/like", protect, blogController.likeBlog);
=======
const express = require('express');
const router = express.Router();
const blogController = require('../controllers/blogController');
const { protect, authorize } = require('../middleware/auth');

// Public Routes
router.get('/', blogController.getAllBlogs);
router.get('/category/:category', blogController.getBlogsByCategory);
router.get('/:slug', blogController.getBlog);

// Private Routes (Admin only)
router.post('/', protect, authorize('admin'), blogController.createBlog);
router.put('/:id', protect, authorize('admin'), blogController.updateBlog);
router.delete('/:id', protect, authorize('admin'), blogController.deleteBlog);

// User Routes
router.post('/:id/like', protect, blogController.likeBlog);
>>>>>>> ff1035069d14f891f4a70ea6c8f2721597241763

module.exports = router;
