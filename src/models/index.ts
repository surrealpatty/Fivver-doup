import sequelize from '../config/database'; // Import default sequelize instance
import { Sequelize, Model, DataTypes } from 'sequelize'; // Import Sequelize and Model classes
import User from './user'; // Import User model
import Service from './services'; // Import Service model
import Order from './order'; // Import Order model
import Review from './review'; // Import Review model

// Define an interface for models with optional associations
interface ModelWithAssociations extends typeof Model {
  associate?: (models: Record<string, typeof Model>) => void; // Optional associate function for defining relationships
}

// Initialize models with their respective classes
const models: Record<string, ModelWithAssociations> = {
  User,
  Service,
  Order,
  Review,
};

// Set up associations for each model if the `associate` method exists
Object.keys(models).forEach((modelName) => {
  const model = models[modelName];
  if (model.associate) {
    model.associate(models); // Call associate method to define relationships
  }
});

// Export models and the Sequelize instance
export { sequelize, User, Service, Order, Review };
export default models; // Export models as a default object
