// src/models/associations.ts
import { Sequelize } from 'sequelize-typescript';  // Import Sequelize for correct initialization
import User from './user';  // Import User model
import Service from './service';  // Import Service model
import Order from './order';  // Import Order model

// Define associations between the models
const defineAssociations = () => {
  // User <-> Service Association
  // A user can have many services
  User.hasMany(Service, { foreignKey: 'userId' });
  Service.belongsTo(User, { foreignKey: 'userId' });

  // Service <-> Order Association
  // A service has many orders
  Service.hasMany(Order, { foreignKey: 'serviceId' });
  Order.belongsTo(Service, { foreignKey: 'serviceId' });

  // User <-> Order Association
  // A user can have many orders
  User.hasMany(Order, { foreignKey: 'userId' });
  Order.belongsTo(User, { foreignKey: 'userId' });
};

// Call defineAssociations function to establish the relationships
defineAssociations();

// Export the associations for later use in the app
export default defineAssociations;
