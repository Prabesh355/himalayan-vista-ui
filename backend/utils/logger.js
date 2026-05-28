const fs = require('fs');
const path = require('path');

const logsDir = path.join(__dirname, '../logs');

// Create logs directory if it doesn't exist
if (!fs.existsSync(logsDir)) {
  fs.mkdirSync(logsDir, { recursive: true });
}

const getTimestamp = () => {
  return new Date().toISOString();
};

const logger = {
  info: (message) => {
    const logMessage = `[${getTimestamp()}] INFO: ${message}`;
    console.log(`\x1b[36m${logMessage}\x1b[0m`);
    writeToFile(logMessage, 'info');
  },

  error: (message) => {
    const logMessage = `[${getTimestamp()}] ERROR: ${message}`;
    console.error(`\x1b[31m${logMessage}\x1b[0m`);
    writeToFile(logMessage, 'error');
  },

  warn: (message) => {
    const logMessage = `[${getTimestamp()}] WARN: ${message}`;
    console.warn(`\x1b[33m${logMessage}\x1b[0m`);
    writeToFile(logMessage, 'warn');
  },

  debug: (message) => {
    if (process.env.LOG_LEVEL === 'debug') {
      const logMessage = `[${getTimestamp()}] DEBUG: ${message}`;
      console.log(`\x1b[35m${logMessage}\x1b[0m`);
      writeToFile(logMessage, 'debug');
    }
  },
};

const writeToFile = (message, type) => {
  const logFile = path.join(logsDir, `${type}.log`);
  fs.appendFile(logFile, message + '\n', (err) => {
    if (err) console.error('Error writing to log file:', err);
  });
};

module.exports = logger;
