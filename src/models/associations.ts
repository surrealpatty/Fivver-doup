// In src/models/associations.ts
import { sequelize } from '../config/database';  // Import the sequelize instance
import User from './user'; // Import User model (ensure it’s the default export)
import Service from './service'; // Import Service model (ensure it’s the default export)
import Order from './order'; // Import Order model (ensure it’s the default export)
import Review from './review'; // Import Review model (ensure it’s the default export)

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
