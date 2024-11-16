"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sequelize = exports.Order = exports.Service = exports.User = exports.models = void 0;
const database_1 = require("../config/database"); // Correct import path for sequelize
Object.defineProperty(exports, "sequelize", { enumerable: true, get: function () { return database_1.sequelize; } });
const user_1 = __importDefault(require("./user")); // Default import for User model
exports.User = user_1.default;
const services_1 = __importDefault(require("./services")); // Default import for Service model
exports.Service = services_1.default;
const order_1 = __importDefault(require("./order")); // Default import for Order model
exports.Order = order_1.default;
// Initialize models
const models = {
    User: user_1.default,
    Service: services_1.default,
    Order: order_1.default,
};
exports.models = models;
// Set up associations
user_1.default.associate(models); // Calls the associate method in the User model
services_1.default.associate(models); // Calls the associate method in the Service model
order_1.default.associate(models); // Calls the associate method in the Order model
// Test the database connection and sync the models
database_1.sequelize.authenticate()
    .then(() => {
    console.log('Database connected');
    return database_1.sequelize.sync({ alter: true }); // Sync models with the database (alter if needed)
})
    .then(() => {
    console.log('Database synced');
})
    .catch((err) => {
    console.error('Database connection failed:', err);
});
//# sourceMappingURL=index.js.map