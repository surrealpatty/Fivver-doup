"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sequelize = exports.models = void 0;
const database_1 = require("../config/database");
Object.defineProperty(exports, "sequelize", { enumerable: true, get: function () { return database_1.sequelize; } });
const user_1 = __importDefault(require("./user"));
const services_1 = __importDefault(require("./services"));
const order_1 = __importDefault(require("./order"));
// Initialize models
const models = {
    User: user_1.default,
    Service: services_1.default,
    Order: order_1.default,
};
exports.models = models;
// Set up associations
// Make sure each model has an 'associate' method to set up relationships
user_1.default.associate(models); // Calls the associate method in the User model
services_1.default.associate(models); // Calls the associate method in the Service model
order_1.default.associate(models); // Calls the associate method in the Order model
//# sourceMappingURL=index.js.map