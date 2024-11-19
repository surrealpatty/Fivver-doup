import { sequelize } from '../config/database';
import User from './user';       // Named import
import Service from './services';  // Named import
import Order from './order';     // Named import
import Review from './review';   // Named import

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
