import { Sequelize } from 'sequelize-typescript'; // Import from sequelize-typescript
import User from './user'; // Import the default export from the User model
import Service from './service'; // Import the default export from the Service model
import Review from './review'; // Import the default export from the Review model

// Create an instance of Sequelize with sequelize-typescript configuration
const sequelize = new Sequelize({
  dialect: 'mysql',
  host: 'localhost', // Adjust as necessary
  database: 'fivver_doup', // Adjust as necessary
  username: 'root', // Adjust as necessary
  password: 'password', // Adjust as necessary
  models: [User, Service, Review], // Register models here using sequelize-typescript
  logging: false, // Optional: disable logging if not needed
});

// Initialize associations between models
User.hasMany(Review, { foreignKey: 'userId', as: 'reviews' });
Review.belongsTo(User, { foreignKey: 'userId', as: 'user' });

Service.hasMany(Review, { foreignKey: 'serviceId', as: 'reviews' });
Review.belongsTo(Service, { foreignKey: 'serviceId', as: 'service' });

// Sync associations and ensure models are exported
const initModels = async () => {
  try {
    // Sync models with the database (use `sequelize.sync()` to sync your models)
    await sequelize.sync({ force: false }); // Set `force: true` if you want to drop tables
    console.log('Models synchronized with the database');
  } catch (error) {
    console.error('Error syncing models:', error);
  }
};

// Export all models and the sequelize instance
export { sequelize, User, Service, Review, initModels };
