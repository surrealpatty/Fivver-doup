const winston = require('winston'); // Example logging library

// Get the environment, default to 'development' if not set
const environment = process.env.NODE_ENV || 'development';

// Configure the log level based on the environment
const logLevel = environment === 'production' ? 'warn' : 'info'; // In production, only log 'warn' and above

// Create the logger
const logger = winston.createLogger({
    level: logLevel, // Use dynamic log level based on environment
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.errors({ stack: true }), // Capture stack trace in log entries
        winston.format.splat(),
        winston.format.json() // Log in JSON format
    ),
    transports: [
        // Console transport for development and production
        new winston.transports.Console({
            format: winston.format.combine(
                winston.format.colorize(), // Add color for console output
                winston.format.simple() // Log in a human-readable format
            ),
        }),
        // File transport for error-level logs
        new winston.transports.File({
            filename: 'logs/error.log',
            level: 'error', // Only log error-level messages to this file
            maxsize: 1000000, // Max size of log file before rotating
            maxFiles: 5, // Keep the last 5 log files
        }),
    ],
});

// Optionally, handle uncaught exceptions
logger.exceptions.handle(
    new winston.transports.Console({
        format: winston.format.combine(
            winston.format.colorize(),
            winston.format.simple()
        ),
    }),
    new winston.transports.File({ filename: 'logs/uncaughtExceptions.log' })
);

// Optionally, handle unhandled promise rejections
logger.rejections.handle(
    new winston.transports.Console({
        format: winston.format.combine(
            winston.format.colorize(),
            winston.format.simple()
        ),
    }),
    new winston.transports.File({ filename: 'logs/unhandledRejections.log' })
);

module.exports = logger;
