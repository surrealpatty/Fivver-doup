import { sequelize } from '../config/database';
import User from './user';
import Service from './services';
import Order from './order';
import { Review } from './review';

// Initialize the models with their attributes and options
const models = {
  User: User,
  Service: Service,
  Order: Order,
  Review: Review,
};

// Set up associations between models
User.associate(models);
Service.associate(models);
Order.associate(models);
Review.associate(models);

// Export models and Sequelize instance
export { sequelize, models };
