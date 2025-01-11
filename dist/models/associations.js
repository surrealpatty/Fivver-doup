"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Review = exports.Order = exports.Service = exports.User = void 0;
// src/models/associations.ts
const database_1 = require("../config/database"); // Correct import of sequelize instance
const user_1 = __importDefault(require("./user")); // Correct import of the User model class
exports.User = user_1.default;
const services_1 = require("./services"); // Correct import of the Service model class
Object.defineProperty(exports, "Service", { enumerable: true, get: function () { return services_1.Service; } });
const order_1 = require("./order"); // Correct import of the Order model class
Object.defineProperty(exports, "Order", { enumerable: true, get: function () { return order_1.Order; } });
const review_1 = require("./review"); // Correct import of the Review model class
Object.defineProperty(exports, "Review", { enumerable: true, get: function () { return review_1.Review; } });
// Register models with Sequelize
database_1.sequelize.addModels([user_1.default, services_1.Service, order_1.Order, review_1.Review]);
// User can have many services (a user can post many services)
user_1.default.hasMany(services_1.Service, { foreignKey: 'userId' }); // Foreign key in Service will be userId
services_1.Service.belongsTo(user_1.default, { foreignKey: 'userId' }); // A service belongs to one user
// User can have many reviews (a user can leave many reviews)
user_1.default.hasMany(review_1.Review, { foreignKey: 'userId' }); // Foreign key in Review will be userId
review_1.Review.belongsTo(user_1.default, { foreignKey: 'userId' }); // A review belongs to one user
// Service can have many reviews (a service can have many reviews)
services_1.Service.hasMany(review_1.Review, { foreignKey: 'serviceId' }); // Foreign key in Review will be serviceId
review_1.Review.belongsTo(services_1.Service, { foreignKey: 'serviceId' }); // A review belongs to one service
// Order belongs to a user and a service (an order is linked to one user and one service)
order_1.Order.belongsTo(user_1.default, { foreignKey: 'userId' }); // An order belongs to one user
order_1.Order.belongsTo(services_1.Service, { foreignKey: 'serviceId' }); // An order belongs to one service
// Optionally, you can sync models here if needed (but this should typically be done in a separate initialization file)
(async () => {
    try {
        await database_1.sequelize.sync({ force: false }); // Use { force: false } to avoid overwriting existing data
        console.log('Model associations are successfully set up.');
    }
    catch (error) {
        console.error('Error setting up model associations:', error);
    }
})();
