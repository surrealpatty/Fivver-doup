import { sequelize } from '../config/database';
import User from './user';
import Service from './services';
import Order from './order';
import Review from './review'; // Default import

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
