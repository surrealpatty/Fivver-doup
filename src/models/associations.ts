// Import the Sequelize models correctly
import { User } from './user';  // Correct path for importing User
import { Service } from './services';  // Correct path for importing Service
import { Order } from './order';  // Correct path for importing Order

// Define the associations
User.hasMany(Service, { foreignKey: 'userId' }); // A user can have many services
Service.belongsTo(User, { foreignKey: 'userId' }); // A service belongs to one user

Service.hasMany(Order, { foreignKey: 'serviceId' }); // A service has many orders
Order.belongsTo(Service, { foreignKey: 'serviceId' }); // An order belongs to a service

User.hasMany(Order, { foreignKey: 'userId' }); // A user can have many orders
Order.belongsTo(User, { foreignKey: 'userId' }); // An order belongs to a user
