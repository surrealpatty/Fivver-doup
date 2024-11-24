import { Sequelize } from 'sequelize-typescript'; // Ensure you're using sequelize-typescript
import User from './user'; // Import the default export from the User model
import Service from './service'; // Import the default export from the Service model
import Review from './review'; // Import the default export from the Review model

// Create an instance of Sequelize (adjust the database connection details as necessary)
const sequelize = new Sequelize({
  dialect: 'mysql',
  host: 'localhost', // Adjust as necessary
  database: 'fivver_doup', // Adjust as necessary
  username: 'root', // Adjust as necessary
  password: 'password', // Adjust as necessary
  models: [User, Service, Review], // Register models here if using sequelize-typescript
});

// Initialize associations between models
User.hasMany(Review, { foreignKey: 'userId', as: 'reviews' });
Review.belongsTo(User, { foreignKey: 'userId', as: 'user' });

Service.hasMany(Review, { foreignKey: 'serviceId', as: 'reviews' });
Review.belongsTo(Service, { foreignKey: 'serviceId', as: 'service' });

// Sync associations and ensure models are exported
const initModels = () => {
  // You can skip the addModels method if you're using models array during initialization
  sequelize.sync(); // Syncing models (not needed if sync is done elsewhere)
};

// Export all models and the sequelize instance
export { sequelize, User, Service, Review, initModels };
