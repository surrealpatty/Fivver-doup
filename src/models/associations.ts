z
import { User } from './user'; // Correct named import for User model
import { Service } from './service'; // Correct named import for Service model
import Order from './order';
import Review from './review';

// Define associations between models
User.hasMany(Service, { foreignKey: 'userId' }); // User has many services
Service.belongsTo(User, { foreignKey: 'userId' }); // Service belongs to user

Service.hasMany(Order, { foreignKey: 'serviceId' }); // Service has many orders
Order.belongsTo(Service, { foreignKey: 'serviceId' }); // Order belongs to service

Service.hasMany(Review, { foreignKey: 'serviceId' }); // Service has many reviews
Review.belongsTo(Service, { foreignKey: 'serviceId' }); // Review belongs to service

// Models are automatically added to sequelize.models when they are imported.
// No need for addModels() in this case.

// Export models for use elsewhere
export { User, Service, Order, Review };
