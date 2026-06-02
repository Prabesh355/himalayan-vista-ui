<<<<<<< HEAD
require("dotenv").config();
const app = require("./app");
const connectDB = require("./config/db");
const logger = require("./utils/logger");
=======
require('dotenv').config();
const app = require('./app');
const connectDB = require('./config/db');
const logger = require('./utils/logger');
>>>>>>> ff1035069d14f891f4a70ea6c8f2721597241763

const PORT = process.env.PORT || 5000;

async function start() {
  try {
    await connectDB({ retries: 5, retryDelay: 2000 });

    // Admin seeding - supports multiple admins via ADMIN_EMAILS and ADMIN_PASSWORDS (comma-separated)
    try {
<<<<<<< HEAD
      const User = require("./models/UserPg");
      const adminEmailsRaw =
        process.env.ADMIN_EMAILS || process.env.ADMIN_EMAIL || "nomadsnavigatenepal5@gmail.com";
      const adminPasswordsRaw = process.env.ADMIN_PASSWORDS || process.env.ADMIN_PASSWORD || "";
      const adminFirstName = process.env.ADMIN_FIRST_NAME || "Nomads";
      const adminLastName = process.env.ADMIN_LAST_NAME || "Admin";

      const adminEmails = adminEmailsRaw
        .split(",")
        .map((s) => s.trim().toLowerCase())
        .filter(Boolean);
      const adminPasswords = adminPasswordsRaw.split(",").map((s) => s.trim());

      for (let i = 0; i < adminEmails.length; i++) {
        const email = adminEmails[i];
        const password =
          adminPasswords[i] || adminPasswords[0] || process.env.ADMIN_PASSWORD || "Admin@1234";
=======
      const User = require('./models/UserPg');
      const adminEmailsRaw = process.env.ADMIN_EMAILS || process.env.ADMIN_EMAIL || 'nomadsnavigatenepal5@gmail.com';
      const adminPasswordsRaw = process.env.ADMIN_PASSWORDS || process.env.ADMIN_PASSWORD || '';
      const adminFirstName = process.env.ADMIN_FIRST_NAME || 'Nomads';
      const adminLastName = process.env.ADMIN_LAST_NAME || 'Admin';

      const adminEmails = adminEmailsRaw.split(',').map(s => s.trim().toLowerCase()).filter(Boolean);
      const adminPasswords = adminPasswordsRaw.split(',').map(s => s.trim());

      for (let i = 0; i < adminEmails.length; i++) {
        const email = adminEmails[i];
        const password = adminPasswords[i] || adminPasswords[0] || process.env.ADMIN_PASSWORD || 'Admin@1234';
>>>>>>> ff1035069d14f891f4a70ea6c8f2721597241763

        let adminUser = await User.findOne({ email });

        if (!adminUser) {
          adminUser = await User.create({
            firstName: adminFirstName,
            lastName: adminLastName,
            email,
            password,
<<<<<<< HEAD
            role: "admin",
            isEmailVerified: true,
          });
          logger.info(`Admin user created: ${email}`);
        } else if (adminUser.role !== "admin") {
          adminUser.role = "admin";
          await adminUser.save();
          logger.info(`Admin role granted to existing user: ${email}`);
        } else {
          logger.info(`Admin user already present: ${email}`);
        }
      }
      logger.info(
        "Use the ADMIN_PASSWORD(S) environment variable(s) to change the initial admin password(s) if needed.",
      );
=======
            role: 'admin',
            isEmailVerified: true,
          });
          logger.info(`Admin user created: ${email}`);
        } else {
          let changed = false;

          if (adminUser.role !== 'admin') {
            adminUser.role = 'admin';
            changed = true;
          }

          if (adminUser.password !== password) {
            adminUser.password = password;
            changed = true;
          }

          if (!adminUser.isEmailVerified) {
            adminUser.isEmailVerified = true;
            changed = true;
          }

          if (changed) {
            await adminUser.save();
            logger.info(`Admin user updated: ${email}`);
          } else {
            logger.info(`Admin user already present: ${email}`);
          }
        }
      }
      logger.info('Admin seed synced from ADMIN_EMAILS and ADMIN_PASSWORDS.');
>>>>>>> ff1035069d14f891f4a70ea6c8f2721597241763
    } catch (error) {
      logger.error(`Admin seeding error: ${error.message}`);
    }

    const server = app.listen(PORT, () => {
      logger.info(`🚀 Server running on port ${PORT}`);
      logger.info(`Environment: ${process.env.NODE_ENV}`);
    });

    // Handle unhandled promise rejections
<<<<<<< HEAD
    process.on("unhandledRejection", (err, promise) => {
=======
    process.on('unhandledRejection', (err, promise) => {
>>>>>>> ff1035069d14f891f4a70ea6c8f2721597241763
      logger.error(`Unhandled Rejection at: ${promise}, reason: ${err?.message || err}`);
      server.close(() => process.exit(1));
    });

    // Handle uncaught exceptions
<<<<<<< HEAD
    process.on("uncaughtException", (err) => {
=======
    process.on('uncaughtException', (err) => {
>>>>>>> ff1035069d14f891f4a70ea6c8f2721597241763
      logger.error(`Uncaught Exception: ${err?.message || err}`);
      server.close(() => process.exit(1));
    });

    // Graceful shutdown
<<<<<<< HEAD
    process.on("SIGTERM", () => {
      logger.info("SIGTERM signal received: closing HTTP server");
      server.close(() => {
        logger.info("HTTP server closed");
=======
    process.on('SIGTERM', () => {
      logger.info('SIGTERM signal received: closing HTTP server');
      server.close(() => {
        logger.info('HTTP server closed');
>>>>>>> ff1035069d14f891f4a70ea6c8f2721597241763
        process.exit(0);
      });
    });
  } catch (error) {
    logger.error(`Failed to start server: ${error.message}`);
    // Exit after a short delay to let logs flush
    setTimeout(() => process.exit(1), 500);
  }
}

start();
