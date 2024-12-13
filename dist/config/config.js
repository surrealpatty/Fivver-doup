"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
// Load environment variables from the .env file
dotenv_1.default.config();
// Destructure and validate environment variables with defaults
const { DB_HOST = 'localhost', DB_USER = 'root', DB_PASSWORD = '', DB_NAME = 'fivver_doup', DB_PORT = '3306', NODE_ENV = 'development', JWT_SECRET = 'your-secret-key', // Default value for JWT_SECRET
JWT_EXPIRATION = '1h', // Default value for JWT_EXPIRATION
 } = process.env;
// Validate critical environment variables
if (NODE_ENV !== 'test' &&
    (!DB_HOST || !DB_USER || !DB_NAME || !DB_PORT || !JWT_SECRET)) {
    console.error('Missing required environment variables. Check your .env file.');
    process.exit(1); // Exit the process if critical variables are missing
}
// Ensure that DB_PORT is an integer
const parsedDBPort = parseInt(DB_PORT, 10);
if (isNaN(parsedDBPort)) {
    console.error('DB_PORT must be a valid number.');
    process.exit(1);
}
// Config object for the application
const config = {
    db: {
        host: DB_HOST, // Explicitly cast to string
        user: DB_USER, // Explicitly cast to string
        password: DB_PASSWORD, // Explicitly cast to string
        database: DB_NAME, // Explicitly cast to string
        port: parsedDBPort, // Use parsed value from DB_PORT
    },
    nodeEnv: NODE_ENV, // Explicitly cast to string
    JWT_SECRET, // Use as-is since it's required and a string
    JWT_EXPIRATION, // Use as-is since it's already a string
};
exports.default = config;
//# sourceMappingURL=config.js.map