import { Sequelize } from 'sequelize';
import config from './config'; // Import configuration values
import User from '../models/user'; // Import your models

// Initialize Sequelize with the configuration values
const sequelize = new Sequelize({
  dialect: 'mysql',
  host: config.DB_HOST,
  username: config.DB_USER,
  password: config.DB_PASSWORD,
  database: config.DB_NAME,
  port: config.DB_PORT,
  dialectOptions: {
    charset: 'utf8mb4', // Use utf8mb4 for better Unicode support
    collate: 'utf8mb4_general_ci', // Collation for MySQL to support multilingual data
  },
});

// Manually add models to sequelize instance (if necessary)
sequelize.models.User = User; // You can directly associate models like this

// Export the sequelize instance
export { sequelize };
