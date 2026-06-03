const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const rateLimit = require('express-rate-limit');
const { errorHandler } = require('./utils/errorHandler');
const logger = require('./utils/logger');

const app = express();

// Security Middleware
app.use(helmet());
// CORS setup: allowlist from ALLOWED_ORIGINS env (comma-separated). If not set,
// fall back to FRONTEND_URL or localhost for development.
const allowedOriginsEnv = process.env.ALLOWED_ORIGINS || process.env.FRONTEND_URL || 'https://nomadsnavigatenepal.com,https://www.nomadsnavigatenepal.com,http://localhost:5173,http://localhost:3000,http://localhost:8080';
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

// Rate Limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again after 15 minutes',
});

// Apply rate limiting to API routes
app.use('/api/', limiter);

// Health check route
app.get('/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Server is healthy',
    timestamp: new Date().toISOString(),
  });
});

// Root route
app.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Himalayan Vista backend is running',
    health: '/health',
  });
});

// API Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/packages', require('./routes/packageRoutes'));
app.use('/api/bookings', require('./routes/bookingRoutes'));
app.use('/api/blogs', require('./routes/blogRoutes'));
app.use('/api/reviews', require('./routes/reviewRoutes'));
app.use('/api/inquiries', require('./routes/inquiryRoutes'));
app.use('/api/admin', require('./routes/adminRoutes'));
app.use('/api/home-content', require('./routes/homeContentRoutes'));
// File uploads (serve static uploads and upload endpoint)
const path = require('path');
const uploadDir = process.env.UPLOAD_DIR || path.join(__dirname, 'uploads');
const isS3UploadsEnabled = Boolean(process.env.S3_BUCKET_NAME || process.env.AWS_S3_BUCKET);
if (!isS3UploadsEnabled) {
  app.use('/uploads', require('express').static(uploadDir));
}
app.use('/api/uploads', require('./routes/uploadRoutes'));

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found',
  });
});

// Centralized Error Handler
app.use(errorHandler);

module.exports = app;
