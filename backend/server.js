require('dotenv').config();
const app = require('./app');
const connectDB = require('./config/db');
const logger = require('./utils/logger');

const PORT = process.env.PORT || 5000;

// Connect to database and start server
connectDB().then(async () => {
  try {
    const User = require('./models/User');
    const adminEmail = (process.env.ADMIN_EMAIL || 'nomadsnavigatenepal5@gmail.com').toLowerCase();
    const adminPassword = process.env.ADMIN_PASSWORD || 'Admin@1234';
    const adminFirstName = process.env.ADMIN_FIRST_NAME || 'Nomads';
    const adminLastName = process.env.ADMIN_LAST_NAME || 'Admin';

    let adminUser = await User.findOne({ email: adminEmail });

    if (!adminUser) {
      adminUser = await User.create({
        firstName: adminFirstName,
        lastName: adminLastName,
        email: adminEmail,
        password: adminPassword,
        role: 'admin',
        isEmailVerified: true,
      });
      logger.info(`Admin user created: ${adminEmail}`);
      logger.info('Use the ADMIN_PASSWORD environment variable to change the initial admin password if needed.');
    } else if (adminUser.role !== 'admin') {
      adminUser.role = 'admin';
      await adminUser.save();
      logger.info(`Admin role granted to existing user: ${adminEmail}`);
    } else {
      logger.info(`Admin user already present: ${adminEmail}`);
    }
  } catch (error) {
    logger.error(`Admin seeding error: ${error.message}`);
  }
});

const server = app.listen(PORT, () => {
  logger.info(`🚀 Server running on port ${PORT}`);
  logger.info(`Environment: ${process.env.NODE_ENV}`);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
  logger.error(`Unhandled Rejection at: ${promise}, reason: ${err.message}`);
  server.close(() => process.exit(1));
});

// Handle uncaught exceptions
process.on('uncaughtException', (err) => {
  logger.error(`Uncaught Exception: ${err.message}`);
  server.close(() => process.exit(1));
});

// Graceful shutdown
process.on('SIGTERM', () => {
  logger.info('SIGTERM signal received: closing HTTP server');
  server.close(() => {
    logger.info('HTTP server closed');
    process.exit(0);
  });
});
