// src/models/associations.ts
import { sequelize } from '../config/database';
import User from './user'; // Default import for User model
import { Service } from './service'; // Default import for Service model
import Order from './order'; // Default import for Order model
import Review from './review'; // Default import for Review model

// Define associations between models
User.hasMany(Service, { foreignKey: 'userId' }); // User has many services
Service.belongsTo(User, { foreignKey: 'userId' }); // Service belongs to user

Service.hasMany(Order, { foreignKey: 'serviceId' }); // Service has many orders
Order.belongsTo(Service, { foreignKey: 'serviceId' }); // Order belongs to service

Service.hasMany(Review, { foreignKey: 'serviceId' }); // Service has many reviews
Review.belongsTo(Service, { foreignKey: 'serviceId' }); // Review belongs to service

// Models are automatically added to sequelize.models when they are imported.
// So no need for addModels() in this case.

// Export models for use elsewhere
export { User, Service, Order, Review };
