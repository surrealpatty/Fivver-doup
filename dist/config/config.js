"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var dotenv_1 = require("dotenv");
// Load environment variables from the .env file
dotenv_1.default.config();
// Destructure and validate environment variables with defaults
var _a = process.env, _b = _a.DB_HOST, DB_HOST = _b === void 0 ? 'localhost' : _b, _c = _a.DB_USER, DB_USER = _c === void 0 ? 'root' : _c, _d = _a.DB_PASSWORD, DB_PASSWORD = _d === void 0 ? '' : _d, _e = _a.DB_NAME, DB_NAME = _e === void 0 ? 'fivver_doup' : _e, _f = _a.DB_PORT, DB_PORT = _f === void 0 ? '3306' : _f, _g = _a.NODE_ENV, NODE_ENV = _g === void 0 ? 'development' : _g, _h = _a.JWT_SECRET, JWT_SECRET = _h === void 0 ? 'your-secret-key' : _h, // Default value for JWT_SECRET
_j = _a.JWT_EXPIRATION, // Default value for JWT_SECRET
JWT_EXPIRATION = _j === void 0 ? '1h' : _j;
// Validate critical environment variables
if (NODE_ENV !== 'test' &&
    (!DB_HOST || !DB_USER || !DB_NAME || !DB_PORT || !JWT_SECRET)) {
    console.error('Missing required environment variables. Check your .env file.');
    process.exit(1); // Exit the process if critical variables are missing
}
// Ensure that DB_PORT is an integer
var parsedDBPort = parseInt(DB_PORT, 10);
if (isNaN(parsedDBPort)) {
    console.error('DB_PORT must be a valid number.');
    process.exit(1);
}
// Config object for the application
var config = {
    db: {
        host: DB_HOST, // Explicitly cast to string
        user: DB_USER, // Explicitly cast to string
        password: DB_PASSWORD, // Explicitly cast to string
        database: DB_NAME, // Explicitly cast to string
        port: parsedDBPort, // Use parsed value from DB_PORT
    },
    nodeEnv: NODE_ENV, // Explicitly cast to string
    JWT_SECRET: JWT_SECRET, // Use as-is since it's required and a string
    JWT_EXPIRATION: JWT_EXPIRATION,
};
// Export the configuration
exports.default = config;
