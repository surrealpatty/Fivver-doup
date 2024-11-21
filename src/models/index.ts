import { sequelize } from '../config/database'; // Import sequelize instance
import { Model } from 'sequelize';  // Import the Sequelize Model class
import { User } from './user';  // Named import for User model
import { Service } from './services'; // Named import for Service model
import { Order } from './order'; // Named import for Order model
import { Review } from './review'; // Named import for Review model

// Define the models interface for association typing
interface ModelWithAssociations extends Model {
  associate?: (models: { [key: string]: typeof Model }) => void;
}

// Initialize models with proper typing
const models: { [key: string]: ModelWithAssociations } = {
  User,
  Service,
  Order,
  Review,
};

// Set up associations if the associate method exists
Object.values(models).forEach((model) => {
  if (model.associate) {
    model.associate(models); // Call associate if it exists
  }
});

// Export models and sequelize instance
export { sequelize, models };

// Add types for models to ensure proper inference and usage in other parts of your app
export type { User, Service, Order, Review };
