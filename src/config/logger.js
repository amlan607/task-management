const path = require('path');
const fs = require('fs');
const { createLogger, format, transports } = require('winston');

// Ensure logs directory exists
const logsDir = path.join(__dirname, '../../logs');
if (!fs.existsSync(logsDir)) fs.mkdirSync(logsDir, { recursive: true });

const logger = createLogger({
  level: 'error',
  format: format.combine(
    format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    format.errors({ stack: true }),
    format.json()
  ),
  transports: [
    new transports.File({ filename: path.join(logsDir, 'error.log'), level: 'error' }),
    new transports.Console({ format: format.simple() })
  ],
});

module.exports = logger;
