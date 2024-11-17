"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sequelize = exports.Order = exports.Service = exports.User = exports.models = void 0;
var database_1 = require("../config/database"); // Correct import path for sequelize
Object.defineProperty(exports, "sequelize", { enumerable: true, get: function () { return database_1.sequelize; } });
var user_1 = require("./user"); // Default import for User model
exports.User = user_1.default;
var services_1 = require("./services"); // Default import for Service model
exports.Service = services_1.default;
var order_1 = require("./order"); // Default import for Order model
exports.Order = order_1.default;
// Initialize models
var models = {
    User: user_1.default,
    Service: services_1.default,
    Order: order_1.default,
};
exports.models = models;
// Set up associations (only if the associate method is defined)
Object.values(models).forEach(function (model) {
    if (model.associate) {
        model.associate(models);
    }
});
// Test the database connection and sync the models
database_1.sequelize
    .authenticate()
    .then(function () {
    console.log('Database connected');
    return database_1.sequelize.sync({ alter: true }); // Sync models with the database (alter if needed)
})
    .then(function () {
    console.log('Database synced');
})
    .catch(function (err) {
    console.error('Database connection failed:', err);
});
