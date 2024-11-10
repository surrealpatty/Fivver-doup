"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/models/order.js
const sequelize_1 = require("sequelize"); // Use ES module import syntax
const database_js_1 = __importDefault(require("../config/database.js")); // Correct path to the sequelize instance
// Define the Order model
const Order = database_js_1.default.define('Order', {
    order_id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    user_id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    service_id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    status: {
        type: sequelize_1.DataTypes.STRING,
        defaultValue: 'pending',
    },
    // Add more fields as needed
});
// Export the Order model
exports.default = Order;
//# sourceMappingURL=order.js.map