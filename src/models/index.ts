import { Sequelize } from 'sequelize';
import { User } from './user';  // Import the User model
// Import other models like Service and Order if they exist
// import { Service } from './service';
// import { Order } from './order';
import { sequelize } from '../config/database'; // Make sure sequelize is properly imported

// Initialize models with Sequelize instance
const models = {
  User: User.init(sequelize),
  // Initialize other models if they exist
  // Service: Service.init(sequelize),
  // Order: Order.init(sequelize),
};

// Set up associations if any (e.g., associations between User and Order, etc.)
// Example: models.User.hasMany(models.Order);
// models.Order.belongsTo(models.User);

export { models };
