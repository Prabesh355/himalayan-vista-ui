<<<<<<< HEAD
const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const { protect } = require("../middleware/auth");

// Public Routes
router.post("/register", authController.register);
router.post("/login", authController.login);
router.post("/forgot-password", authController.forgotPassword);
router.post("/reset-password/:token", authController.resetPassword);

// Private Routes
router.get("/me", protect, authController.getMe);
router.post("/logout", protect, authController.logout);
router.put("/profile", protect, authController.updateProfile);
router.put("/change-password", protect, authController.changePassword);
=======
const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { protect } = require('../middleware/auth');

// Public Routes
router.post('/register', authController.register);
router.post('/login', authController.login);
router.post('/forgot-password', authController.forgotPassword);
router.post('/reset-password/:token', authController.resetPassword);

// Private Routes
router.get('/me', protect, authController.getMe);
router.post('/logout', protect, authController.logout);
router.put('/profile', protect, authController.updateProfile);
router.put('/change-password', protect, authController.changePassword);
>>>>>>> ff1035069d14f891f4a70ea6c8f2721597241763

module.exports = router;
