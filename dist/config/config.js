// src/config/config.ts
import dotenv from 'dotenv';
dotenv.config();
const { DB_HOST = 'localhost', DB_USER = 'root', DB_PASSWORD = 'f0^:8t1#qa7', DB_NAME = 'fivver_doup', DB_PORT = '3306', // Default MySQL port
NODE_ENV = 'development', // Default to 'development' if not set
JWT_SECRET = 'your-secret-key', // Default JWT secret
JWT_EXPIRATION = '1h', // Default expiration time for JWT
 } = process.env;
// Ensure DB_PORT is a valid number
const parsedDBPort = parseInt(DB_PORT, 10);
if (isNaN(parsedDBPort)) {
    console.error('DB_PORT must be a valid number.');
    process.exit(1);
}
// Configuration object
const config = {
    DB_HOST,
    DB_USER,
    DB_PASSWORD,
    DB_NAME,
    DB_PORT: parsedDBPort,
    NODE_ENV,
    JWT_SECRET,
    JWT_EXPIRATION,
};
// Export the configuration as the default export
export default config;
