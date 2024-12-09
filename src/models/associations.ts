import { User } from './user';         // Import the User model
import Service from './services';     // Import the Service model (ensure this matches the export in services.ts)
import { Order } from './order';      // Import the Order model
import { Review } from './review';    // Import the Review model
import { sequelize } from '@config/database';  // Use the correct alias

// Define associations

// User can have many services (a user can post many services)
User.hasMany(Service, { foreignKey: 'userId' });  // Foreign key will be userId in Service
Service.belongsTo(User, { foreignKey: 'userId' }); // A service belongs to one user

// User can have many reviews (a user can leave many reviews)
User.hasMany(Review, { foreignKey: 'userId' });  // Foreign key will be userId in Review
Review.belongsTo(User, { foreignKey: 'userId' }); // A review belongs to one user

// Service can have many reviews (a service can have many reviews)
Service.hasMany(Review, { foreignKey: 'serviceId' });  // Foreign key will be serviceId in Review
Review.belongsTo(Service, { foreignKey: 'serviceId' }); // A review belongs to one service

// Order belongs to a user and a service (an order is linked to one user and one service)
Order.belongsTo(User, { foreignKey: 'userId' }); // An order belongs to one user
Order.belongsTo(Service, { foreignKey: 'serviceId' }); // An order belongs to one service

// Sync models with the database
(async () => {
  try {
    await sequelize.sync({ force: false }); // Use { force: false } to avoid overwriting existing data
    console.log('Model associations are successfully set up.');
  } catch (error) {
    console.error('Error setting up model associations:', error);
  }
})();

// Export the models with their associations
export { User, Service, Order, Review };
