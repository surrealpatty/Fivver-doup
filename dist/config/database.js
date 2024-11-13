"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.testConnection = exports.sequelize = void 0;
const sequelize_1 = require("sequelize");
const dotenv_1 = __importDefault(require("dotenv"));
// Load environment variables
dotenv_1.default.config();
const { DB_NAME, DB_USER, DB_PASSWORD, DB_HOST, DB_DIALECT, DB_SSL, NODE_ENV, } = process.env;
// Ensure required environment variables are present
if (!DB_NAME || !DB_USER || !DB_PASSWORD || !DB_HOST || !DB_DIALECT) {
    throw new Error('Missing required database environment variables');
}
// Convert DB_SSL to a boolean if it's set to 'true'
const useSSL = DB_SSL === 'true';
// Create a new Sequelize instance with the given environment variables
const sequelize = new sequelize_1.Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
    host: DB_HOST,
    dialect: DB_DIALECT,
    logging: NODE_ENV === 'development' ? console.log : false,
    dialectOptions: {
        ssl: useSSL ? { rejectUnauthorized: false } : false, // Use SSL only if DB_SSL is true
        charset: 'utf8mb4', // Ensure correct charset to avoid encoding issues
    },
    define: {
        freezeTableName: true,
        charset: 'utf8mb4',
        collate: 'utf8mb4_unicode_ci',
    },
    pool: {
        acquire: 30000,
        idle: 10000,
    },
});
exports.sequelize = sequelize;
// Test the database connection and sync models
const testConnection = async () => {
    try {
        await sequelize.authenticate();
        console.log('Database connection has been established successfully.');
        if (NODE_ENV !== 'test') { // Avoid syncing during Jest tests
            await sequelize.sync({ alter: true });
            console.log('Database tables synced.');
        }
    }
    catch (error) {
        console.error('Unable to connect to the database:', error instanceof Error ? error.message : error);
        // Avoid process.exit in tests to prevent teardown issues
        if (NODE_ENV !== 'test') {
            process.exit(1);
        }
    }
};
exports.testConnection = testConnection;
// Test connection and sync if not running tests
if (NODE_ENV !== 'test') {
    testConnection();
}
//# sourceMappingURL=database.js.map