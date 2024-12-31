import dotenv from 'dotenv';
dotenv.config();
const { DB_HOST = 'localhost', DB_USER = 'root', DB_PASSWORD = 'X^SE4Jzp$qfd1Fs2qfT*', DB_NAME = 'fivver_doup', DB_PORT = '3306', // Default MySQL port
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
// MySQL connection configuration with charset and collation
export const sequelizeConfig = {
    dialect: 'mysql',
    host: config.DB_HOST,
    username: config.DB_USER,
    password: config.DB_PASSWORD,
    database: config.DB_NAME,
    port: config.DB_PORT,
    dialectOptions: {
        charset: 'utf8mb4', // Use utf8mb4 for better Unicode support
        collate: 'utf8mb4_general_ci', // Collation for MySQL to support multilingual data
    },
};
