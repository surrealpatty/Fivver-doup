// src/models/associations.ts
import sequelize from '../config/database';  // Correct way to import default export
import User from './user';        // Import the User model
import { Service } from './services'; // Import the Service model
import Order from './order';      // Import the Order model
import { Review } from './review';    // Import the Review model

// Register models with Sequelize
sequelize.addModels([User, Service, Order, Review]);

// User can have many services (a user can post many services)
User.hasMany(Service, { foreignKey: 'userId' });   // Foreign key in Service will be userId
Service.belongsTo(User, { foreignKey: 'userId' });  // A service belongs to one user

// User can have many reviews (a user can leave many reviews)
User.hasMany(Review, { foreignKey: 'userId' });    // Foreign key in Review will be userId
Review.belongsTo(User, { foreignKey: 'userId' });  // A review belongs to one user

// Service can have many reviews (a service can have many reviews)
Service.hasMany(Review, { foreignKey: 'serviceId' }); // Foreign key in Review will be serviceId
Review.belongsTo(Service, { foreignKey: 'serviceId' }); // A review belongs to one service

// Order belongs to a user and a service (an order is linked to one user and one service)
Order.belongsTo(User, { foreignKey: 'userId' });   // An order belongs to one user
Order.belongsTo(Service, { foreignKey: 'serviceId' }); // An order belongs to one service

// Optionally, you can sync models here if needed (but this should typically be done in a separate initialization file)
(async () => {
  try {
    await sequelize.sync({ force: false });  // Use { force: false } to avoid overwriting existing data
    console.log('Model associations are successfully set up.');
  } catch (error) {
    console.error('Error setting up model associations:', error);
  }
})();

// Export the models with their associations
export { User, Service, Order, Review };
