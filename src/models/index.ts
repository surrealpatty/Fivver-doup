import { sequelize } from '../config/database';
import User from './user';       // Default import for User
import { Service } from './services'; // Named import for Service
import Order from './order';     // Default import for Order
import Review from './review';   // Default import for Review

// Initialize models with the correct types
const models = {
  User,
  Service,
  Order,
  Review,
};

// Set up associations only if the associate method exists
Object.values(models).forEach((model: any) => {
  if (model.associate) {
    model.associate(models); // Call associate if it exists
  }
});

// Export models and sequelize instance
export { sequelize, models };
