"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Import the Sequelize models correctly
var user_1 = require("./user");
var services_1 = require("./services"); // Correct path for importing Service
var order_1 = require("./order"); // Correct path for importing Order
// Define the associations
user_1.default.hasMany(services_1.default, { foreignKey: 'userId' }); // A user can have many services
services_1.default.belongsTo(user_1.default, { foreignKey: 'userId' }); // A service belongs to one user
services_1.default.hasMany(order_1.default, { foreignKey: 'serviceId' }); // A service has many orders
order_1.default.belongsTo(services_1.default, { foreignKey: 'serviceId' }); // An order belongs to a service
user_1.default.hasMany(order_1.default, { foreignKey: 'userId' }); // A user can have many orders
order_1.default.belongsTo(user_1.default, { foreignKey: 'userId' }); // An order belongs to a user
