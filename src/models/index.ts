import { sequelize } from '../config/database'; // Import sequelize instance
import User from './user';  // Default import for User
import Service from './services'; // Default import for Service
import Order from './order'; // Default import for Order
import Review from './review'; // Default import for Review

// Initialize models
const models = {
  User,
  Service,
  Order,
  Review,
};

// Set up associations if the associate method exists
Object.values(models).forEach((model: any) => {
  if (model.associate) {
    model.associate(models); // Call associate if it exists
  }
});

// Export models and sequelize instance
export { sequelize, models };

// Add types for models to ensure proper inference and usage in other parts of your app
export type { User, Service, Order, Review };
