import { sequelize } from '../config/database';  // Correct import path for sequelize
import User from './user';  // Default import for User model
import Service from './services';  // Default import for Service model
import Order from './order';  // Default import for Order model

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

// Test the database connection and sync the models
sequelize.authenticate()
  .then(() => {
    console.log('Database connected');
    return sequelize.sync({ alter: true });  // Sync models with the database (alter if needed)
  })
  .then(() => {
    console.log('Database synced');
  })
  .catch((err: Error) => {
    console.error('Database connection failed:', err);
  });

// Explicitly export models so they are accessible elsewhere
export { models, User, Service, Order, sequelize };
