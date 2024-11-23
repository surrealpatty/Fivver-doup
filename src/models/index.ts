import { Sequelize } from 'sequelize';
import defineUser from './user';  // Function that defines User model
import defineService from './services';  // Function that defines Service model
import defineOrder from './order';  // Function that defines Order model

// Initialize Sequelize instance
const sequelize = new Sequelize({
  dialect: 'mysql',
  host: 'localhost',
  database: 'fivver_doup',
  username: 'root',
  password: '',
});

// Define models using the factory functions (pass only `sequelize`)
const User = defineUser(sequelize);
const Service = defineService(sequelize); // Define the Service model
const Order = defineOrder(sequelize); // Define the Order model

// Define associations between models
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

export { sequelize, User, Service, Order };
