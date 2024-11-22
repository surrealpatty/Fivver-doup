// Import the Sequelize models correctly with named imports
import  User  from './user'; // Correct import for named export User
import  Service  from './services'; // Correct import for named export Service
import  Order  from './order'; // Correct import for named export Order

// Define associations between the models
const defineAssociations = () => {
  // User <-> Service Association
  User.hasMany(Service, { foreignKey: 'userId' }); // A user can have many services
  Service.belongsTo(User, { foreignKey: 'userId' }); // A service belongs to one user

  // Service <-> Order Association
  Service.hasMany(Order, { foreignKey: 'serviceId' }); // A service has many orders
  Order.belongsTo(Service, { foreignKey: 'serviceId' }); // An order belongs to a service

  // User <-> Order Association
  User.hasMany(Order, { foreignKey: 'userId' }); // A user can have many orders
  Order.belongsTo(User, { foreignKey: 'userId' }); // An order belongs to a user
};

// Call defineAssociations function to establish the relationships
defineAssociations();

export default defineAssociations;
