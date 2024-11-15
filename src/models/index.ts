import { Sequelize } from 'sequelize'; // Ensure you're importing Sequelize if needed
import User from './user';
import Service from './services';
import Order from './order';
import { sequelize } from '../config/database';

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

// Set up associations (ensure each model file has an associate method)
User.associate(models);  // Assuming `associate` is defined in the User model
Service.associate(models);  // Assuming `associate` is defined in the Service model
Order.associate(models);  // Assuming `associate` is defined in the Order model

// Export models and sequelize
export { models, sequelize };
