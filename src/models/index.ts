import { Sequelize } from 'sequelize';
import User from './user';  // Import the User model
import Service from './service';  // Import the Service model
import Review from './review';  // Import the Review model

// Create an instance of Sequelize (make sure to adjust the database connection details as needed)
const sequelize = new Sequelize({
  dialect: 'mysql',
  host: 'localhost', // Adjust as necessary
  database: 'fivver_doup', // Adjust as necessary
  username: 'root', // Adjust as necessary
  password: 'password', // Adjust as necessary
});

// Define associations between models (if required)
User.hasMany(Review, { foreignKey: 'userId' });
Review.belongsTo(User, { foreignKey: 'userId' });

Service.hasMany(Review, { foreignKey: 'serviceId' });
Review.belongsTo(Service, { foreignKey: 'serviceId' });

// Export all models and the sequelize instance
export { sequelize, User, Service, Review };
