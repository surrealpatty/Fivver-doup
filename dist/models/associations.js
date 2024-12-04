"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Review = exports.Order = exports.Service = exports.User = void 0;
const user_1 = require("./user"); // Import the User model
Object.defineProperty(exports, "User", { enumerable: true, get: function () { return user_1.User; } });
const services_1 = require("./services"); // Import the Service model (fixing the import to match the model path)
Object.defineProperty(exports, "Service", { enumerable: true, get: function () { return services_1.Service; } });
const order_1 = require("./order"); // Import the Order model
Object.defineProperty(exports, "Order", { enumerable: true, get: function () { return order_1.Order; } });
const review_1 = require("./review"); // Import the Review model
Object.defineProperty(exports, "Review", { enumerable: true, get: function () { return review_1.Review; } });
const database_1 = require("@config/database"); // Import the sequelize instance
// Define associations after registering models
// User can have many services (a user can post many services)
user_1.User.hasMany(services_1.Service, { foreignKey: 'userId' }); // Foreign key will be userId in Service
services_1.Service.belongsTo(user_1.User, { foreignKey: 'userId' }); // A service belongs to one user
// User can have many reviews (a user can leave many reviews)
user_1.User.hasMany(review_1.Review, { foreignKey: 'userId' }); // Foreign key will be userId in Review
review_1.Review.belongsTo(user_1.User, { foreignKey: 'userId' }); // A review belongs to one user
// Service can have many reviews (a service can have many reviews)
services_1.Service.hasMany(review_1.Review, { foreignKey: 'serviceId' }); // Foreign key will be serviceId in Review
review_1.Review.belongsTo(services_1.Service, { foreignKey: 'serviceId' }); // A review belongs to one service
// Order belongs to a user and a service (an order is linked to one user and one service)
order_1.Order.belongsTo(user_1.User, { foreignKey: 'userId' }); // An order belongs to one user
order_1.Order.belongsTo(services_1.Service, { foreignKey: 'serviceId' }); // An order belongs to one service
// Optionally, sync models to the database
database_1.sequelize.sync({ force: false }).then(() => {
    console.log('Model associations are successfully set up.');
});
//# sourceMappingURL=associations.js.map