import User from './user'; // Import User model
import Service from './service'; // Import Service model
import Order from './order'; // Import Order model

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

// Ensure the models are associated correctly by calling the function
defineAssociations();

// Export the associations for later use in the app
export default defineAssociations;
