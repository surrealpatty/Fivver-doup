"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sequelize = void 0;
const sequelize_1 = require("sequelize");
const dotenv_1 = __importDefault(require("dotenv"));
const user_1 = require("models/user"); // Correct named import
const services_1 = require("@models/services"); // If the file is named services.ts
// Load environment variables from .env file
dotenv_1.default.config();
// Initialize Sequelize instance with the database configuration
const sequelize = new sequelize_1.Sequelize({
    dialect: 'mysql',
    host: process.env.DB_HOST || 'localhost',
    username: process.env.DB_USER || '',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || '',
    logging: false,
    define: {
        timestamps: true,
        freezeTableName: true,
    },
    dialectOptions: {
        supportBigNumbers: true,
        bigNumberStrings: true,
        allowInvalidDates: true,
    },
});
exports.sequelize = sequelize;
// Sync database models with the schema
sequelize.sync({ alter: true })
    .then(() => {
    console.log('Database synced');
})
    .catch((err) => {
    console.error('Error syncing database:', err);
});
// Ensure that associations between models (like User and Service) are established here
user_1.User.hasMany(services_1.Service, { foreignKey: 'userId' });
services_1.Service.belongsTo(user_1.User, { foreignKey: 'userId' });
//# sourceMappingURL=database.js.map