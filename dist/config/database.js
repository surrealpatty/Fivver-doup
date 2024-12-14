"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sequelize = void 0;
const sequelize_1 = require("sequelize");
const dotenv_1 = __importDefault(require("dotenv"));
// Load environment variables from .env file
dotenv_1.default.config();
// Ensure that environment variables are loaded properly
const { DB_HOST = 'localhost', // Default to 'localhost' if DB_HOST is not set
DB_USER = 'root', // Default to 'root' if DB_USER is not set
DB_PASSWORD = '', // Default to empty string if DB_PASSWORD is not set
DB_NAME = 'fivver_doup', // Default to 'fivver_doup' if DB_NAME is not set
 } = process.env;
const sequelize = new sequelize_1.Sequelize({
    dialect: 'mysql',
    host: DB_HOST,
    username: DB_USER,
    password: DB_PASSWORD,
    database: DB_NAME,
    logging: false, // Disable query logging (set to true for debugging)
    define: {
        timestamps: true, // Enable createdAt and updatedAt automatically
        freezeTableName: true, // Disable pluralization of table names
    },
    dialectOptions: {
        supportBigNumbers: true,
        bigNumberStrings: true,
    },
});
exports.sequelize = sequelize;
//# sourceMappingURL=database.js.map