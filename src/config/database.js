"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sequelize = void 0;
const sequelize_typescript_1 = require("sequelize-typescript"); // Import Sequelize from sequelize-typescript
const user_1 = __importDefault(require("../models/user")); // Import User model
const service_1 = __importDefault(require("../models/service")); // Import Service model
const order_1 = __importDefault(require("../models/order")); // Import Order model
const review_1 = __importDefault(require("../models/review")); // Import Review model
// Initialize sequelize with sequelize-typescript options
const sequelize = new sequelize_typescript_1.Sequelize({
    dialect: 'mysql',
    host: 'localhost',
    username: 'root',
    password: 'password',
    database: 'fivver_doup_db',
    models: [user_1.default, service_1.default, order_1.default, review_1.default], // Add models directly in initialization
    // Optionally, you can add other sequelize configuration like logging, timezone, etc.
});
exports.sequelize = sequelize;
