import User from './user';
import Service from './services';
import Order from './order';
import { sequelize } from '../config/database';

// Initialize models
const models = {
  User,
  Service,
  Order,
};

// Set up associations
User.associate(models);
Service.associate(models);
Order.associate(models);  // This now works since `associate` is defined in Order

export { models, sequelize };
