// Import the Sequelize models correctly
import  User from './user';
import  Service  from './services';
import  Order  from './order';

// Define the associations correctly
User.hasMany(Service, { foreignKey: 'userId' }); // A user has many services
Service.belongsTo(User, { foreignKey: 'userId' }); // A service belongs to a user
Service.hasMany(Order, { foreignKey: 'serviceId' }); // A service has many orders
Order.belongsTo(Service, { foreignKey: 'serviceId' }); // An order belongs to a service
User.hasMany(Order, { foreignKey: 'userId' }); // A user has many orders
Order.belongsTo(User, { foreignKey: 'userId' }); // An order belongs to a user
