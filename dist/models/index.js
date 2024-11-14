"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.models = void 0;
const user_1 = require("./user"); // Import the User model
// Import other models like Service and Order if they exist
// import { Service } from './service';
// import { Order } from './order';
const database_1 = require("../config/database"); // Make sure sequelize is properly imported
// Initialize models with Sequelize instance
const models = {
    User: user_1.User.init(database_1.sequelize),
    // Initialize other models if they exist
    // Service: Service.init(sequelize),
    // Order: Order.init(sequelize),
};
exports.models = models;
//# sourceMappingURL=index.js.map