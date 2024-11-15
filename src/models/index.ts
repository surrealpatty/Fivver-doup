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
User.associate(models);  // Calls the associate method in the User model
Service.associate(models);  // Calls the associate method in the Service model
Order.associate(models);  // Calls the associate method in the Order model

// Explicitly export models so they are accessible elsewhere
export { models, User, Service, Order, sequelize };
