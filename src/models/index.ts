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

// Set up associations (each model associates with others)
User.associate(models);
Service.associate(models);
Order.associate(models);  // This now works since `associate` is defined in Order

export { models, sequelize };
