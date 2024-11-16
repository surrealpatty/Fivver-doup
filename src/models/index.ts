import { sequelize } from '../config/database'; // Correct import path for sequelize
import User from './user'; // Default import for User model
import Service from './services'; // Default import for Service model
import Order from './order'; // Default import for Order model

// Define a type for models with optional associate methods
type Models = {
  User: typeof User & { associate?: (models: Models) => void };
  Service: typeof Service & { associate?: (models: Models) => void };
  Order: typeof Order & { associate?: (models: Models) => void };
};

// Initialize models
const models: Models = {
  User,
  Service,
  Order,
};

// Set up associations (only if the associate method is defined)
Object.values(models).forEach((model) => {
  if (model.associate) {
    model.associate(models);
  }
});

// Test the database connection and sync the models
sequelize
  .authenticate()
  .then(() => {
    console.log('Database connected');
    return sequelize.sync({ alter: true }); // Sync models with the database (alter if needed)
  })
  .then(() => {
    console.log('Database synced');
  })
  .catch((err: Error) => {
    console.error('Database connection failed:', err);
  });

// Explicitly export models so they are accessible elsewhere
export { models, User, Service, Order, sequelize };
