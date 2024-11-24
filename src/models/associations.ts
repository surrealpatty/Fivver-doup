import { sequelize } from '../config/database'; // Import the sequelize instance
import User from './user'; // Default import for User model
import Service from './service'; // Default import for Service model
import Order from './order'; // Default import for Order model
import Review from './review'; // Default import for Review model
import { ModelCtor } from 'sequelize'; // Use ModelCtor for typing

// Define associations between models
User.hasMany(Service, { foreignKey: 'userId' });  // User has many services
Service.belongsTo(User, { foreignKey: 'userId' });  // Service belongs to user

Service.hasMany(Order, { foreignKey: 'serviceId' });  // Service has many orders
Order.belongsTo(Service, { foreignKey: 'serviceId' });  // Order belongs to service

Service.hasMany(Review, { foreignKey: 'serviceId' });  // Service has many reviews
Review.belongsTo(Service, { foreignKey: 'serviceId' });  // Review belongs to service

// Add models to Sequelize instance
sequelize.addModels([User, Service, Order, Review]);

// Export models for use elsewhere
export { User, Service, Order, Review };
