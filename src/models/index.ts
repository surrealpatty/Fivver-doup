import { sequelize } from '../config/database'; // Import sequelize instance
import { Model, Sequelize } from 'sequelize'; // Import Sequelize classes
import User from './user'; // Import User model
import Service from './services'; // Import Service model
import Order from './order'; // Import Order model
import Review from './review'; // Import Review model

// Define an interface for models with associations
interface ModelWithAssociations extends Model {
  associate?: (models: Record<string, typeof Model>) => void;
}

// Initialize models
const models: Record<string, typeof ModelWithAssociations> = {
  User: User,
  Service: Service,
  Order: Order,
  Review: Review,
};

// Set up associations for each model if the `associate` method exists
Object.values(models).forEach((model) => {
  if (typeof model.associate === 'function') {
    model.associate(models);
  }
});

// Export models and the Sequelize instance
export { sequelize, models };

// Add types for the models to ensure proper usage in other parts of your app
export type { User, Service, Order, Review };
