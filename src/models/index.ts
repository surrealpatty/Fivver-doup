import { sequelize } from '../config/database';
import User from './user';
import Service from './services';
import Order from './order';

// Define a type for models
type Models = {
  User: typeof User;
  Service: typeof Service;
  Order: typeof Order;
};

// Initialize models
const models: Models = {
  User,
  Service,
  Order,
};

// Set up associations
// Make sure each model has an 'associate' method to set up relationships
User.associate(models);  // Calls the associate method in the User model
Service.associate(models);  // Calls the associate method in the Service model
Order.associate(models);  // Calls the associate method in the Order model

// Export models and sequelize instance
export { models, sequelize };
