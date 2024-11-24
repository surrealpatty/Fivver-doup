import { sequelize } from '../config/database';  // Import the sequelize instance
import User from './user';  // Default import for User model
import Service from './service';  // Default import for Service model
import Order from './order';  // Default import for Order model
import Review from './review';  // Default import for Review model

// Associations between models
User.hasMany(Service, { foreignKey: 'userId' });
Service.belongsTo(User, { foreignKey: 'userId' });

Service.hasMany(Order, { foreignKey: 'serviceId' });
Order.belongsTo(Service, { foreignKey: 'serviceId' });

Service.hasMany(Review, { foreignKey: 'serviceId' });
Review.belongsTo(Service, { foreignKey: 'serviceId' });

// Add models to Sequelize instance
sequelize.addModels([User, Service, Order, Review]);

// Export the models for use in other parts of the application
export { User, Service, Order, Review };
