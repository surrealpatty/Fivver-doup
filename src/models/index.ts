import { Sequelize } from 'sequelize';
import { User } from './user'; // Import the User model
import { Service } from './service'; // Import the Service model
import { Review } from './review'; // Import the Review model

// Create an instance of Sequelize (adjust the database connection details as necessary)
const sequelize = new Sequelize({
  dialect: 'mysql',
  host: 'localhost', // Adjust as necessary
  database: 'fivver_doup', // Adjust as necessary
  username: 'root', // Adjust as necessary
  password: 'password', // Adjust as necessary
});

// Initialize associations between models
User.hasMany(Review, { foreignKey: 'userId', as: 'reviews' });
Review.belongsTo(User, { foreignKey: 'userId', as: 'user' });

Service.hasMany(Review, { foreignKey: 'serviceId', as: 'reviews' });
Review.belongsTo(Service, { foreignKey: 'serviceId', as: 'service' });

// Sync associations and ensure models are exported
const initModels = () => {
  sequelize.addModels([User, Service, Review]); // If using sequelize-typescript
};

// Export all models and the sequelize instance
export { sequelize, User, Service, Review, initModels };
