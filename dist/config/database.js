"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.testConnection = exports.sequelize = void 0;
const sequelize_typescript_1 = require("sequelize-typescript"); // Correct import for sequelize-typescript
const path_1 = __importDefault(require("path"));
// Initialize Sequelize instance with sequelize-typescript
exports.sequelize = new sequelize_typescript_1.Sequelize({
    dialect: 'mysql', // Use the MySQL dialect
    host: 'localhost', // Your database host (e.g., localhost)
    username: 'root', // Your database username
    password: '', // Your database password
    database: 'fiverr_doup', // Your database name
    models: [path_1.default.join(__dirname, '../models')], // Ensure the path to models is correct (relative to config folder)
});
exports.testConnection = exports.sequelize.authenticate;
//# sourceMappingURL=database.js.map