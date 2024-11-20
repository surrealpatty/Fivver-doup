// Import the Sequelize models correctly
import  User from './user';
import Service from '../models/services';
import  Order  from './order';

import Service from './services'; // Import Service from the model file
User.hasMany(Service, { foreignKey: 'userId' });
import User from './user'; // Ensure User model is imported
Service.belongsTo(User, { foreignKey: 'userId' });
Service.hasMany(Order, { foreignKey: 'serviceId' }); // A service has many orders
Order.belongsTo(Service, { foreignKey: 'serviceId' }); // An order belongs to a service
User.hasMany(Order, { foreignKey: 'userId' }); // A user has many orders
Order.belongsTo(User, { foreignKey: 'userId' }); // An order belongs to a user
