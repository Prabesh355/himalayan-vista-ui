<<<<<<< HEAD
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const rateLimit = require("express-rate-limit");
const { errorHandler } = require("./utils/errorHandler");
const logger = require("./utils/logger");
=======
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const rateLimit = require('express-rate-limit');
const { errorHandler } = require('./utils/errorHandler');
const logger = require('./utils/logger');
>>>>>>> ff1035069d14f891f4a70ea6c8f2721597241763

const app = express();

// Security Middleware
app.use(helmet());
<<<<<<< HEAD
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    credentials: true,
  }),
);
app.use(cookieParser());
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));

// Logging
app.use(morgan("dev"));
=======
// CORS setup: allowlist from ALLOWED_ORIGINS env (comma-separated). If not set,
// fall back to FRONTEND_URL or localhost for development.
const allowedOriginsEnv = process.env.ALLOWED_ORIGINS || process.env.FRONTEND_URL || 'http://localhost:5173';
const allowedOrigins = allowedOriginsEnv
  .split(',')
  .map((s) => s.trim())
  .filter(Boolean);

console.log('CORS allowed origins:', allowedOrigins);

app.use(
  cors({
    origin: (origin, callback) => {
      // allow requests with no origin (like curl, server-to-server)
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) return callback(null, true);
      console.warn('Blocked CORS origin:', origin);
      return callback(new Error('CORS origin not allowed'));
    },
    credentials: true,
  })
);

app.options('*', cors());
app.use(cookieParser());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));

// Logging
app.use(morgan('dev'));
>>>>>>> ff1035069d14f891f4a70ea6c8f2721597241763

// Rate Limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
<<<<<<< HEAD
  message: "Too many requests from this IP, please try again after 15 minutes",
});

// Apply rate limiting to API routes
app.use("/api/", limiter);

// Health check route
app.get("/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Server is healthy",
=======
  message: 'Too many requests from this IP, please try again after 15 minutes',
});

// Apply rate limiting to API routes
app.use('/api/', limiter);

// Health check route
app.get('/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Server is healthy',
>>>>>>> ff1035069d14f891f4a70ea6c8f2721597241763
    timestamp: new Date().toISOString(),
  });
});

// Root route
<<<<<<< HEAD
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Himalayan Vista backend is running",
    health: "/health",
=======
app.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Himalayan Vista backend is running',
    health: '/health',
>>>>>>> ff1035069d14f891f4a70ea6c8f2721597241763
  });
});

// API Routes
<<<<<<< HEAD
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/packages", require("./routes/packageRoutes"));
app.use("/api/bookings", require("./routes/bookingRoutes"));
app.use("/api/blogs", require("./routes/blogRoutes"));
app.use("/api/reviews", require("./routes/reviewRoutes"));
app.use("/api/inquiries", require("./routes/inquiryRoutes"));
app.use("/api/admin", require("./routes/adminRoutes"));
=======
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/packages', require('./routes/packageRoutes'));
app.use('/api/bookings', require('./routes/bookingRoutes'));
app.use('/api/blogs', require('./routes/blogRoutes'));
app.use('/api/reviews', require('./routes/reviewRoutes'));
app.use('/api/inquiries', require('./routes/inquiryRoutes'));
app.use('/api/admin', require('./routes/adminRoutes'));
// File uploads (serve static uploads and upload endpoint)
const path = require('path');
const uploadDir = process.env.UPLOAD_DIR || path.join(__dirname, 'uploads');
const isS3UploadsEnabled = Boolean(process.env.S3_BUCKET_NAME || process.env.AWS_S3_BUCKET);
if (!isS3UploadsEnabled) {
  app.use('/uploads', require('express').static(uploadDir));
}
app.use('/api/uploads', require('./routes/uploadRoutes'));
>>>>>>> ff1035069d14f891f4a70ea6c8f2721597241763

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
<<<<<<< HEAD
    message: "Route not found",
=======
    message: 'Route not found',
>>>>>>> ff1035069d14f891f4a70ea6c8f2721597241763
  });
});

// Centralized Error Handler
app.use(errorHandler);

module.exports = app;
