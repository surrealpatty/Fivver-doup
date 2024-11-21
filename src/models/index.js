"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.models = exports.sequelize = void 0;
var database_1 = require("../config/database");
Object.defineProperty(exports, "sequelize", { enumerable: true, get: function () { return database_1.sequelize; } });
var user_1 = require("./user"); // Default import for User
var services_1 = require("./services"); // Named import for Service
var order_1 = require("./order"); // Default import for Order
var review_1 = require("./review"); // Default import for Review
// Initialize models with the correct types
var models = {
    User: user_1.default,
    Service: services_1.default,
    Order: order_1.default,
    Review: review_1.default,
};
exports.models = models;
// Set up associations only if the associate method exists
Object.values(models).forEach(function (model) {
    if (model.associate) {
        model.associate(models); // Call associate if it exists
    }
});
