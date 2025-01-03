import { Sequelize } from 'sequelize-typescript';
import User from '../models/user'; // Ensure this path is correct
import Service from '../models/services'; // Ensure this path is correct
import Order from '../models/order'; // Ensure the Order model is correctly defined
import { Review } from '../models/review'; // Ensure the Review model is correctly defined

const sequelize = new Sequelize({
  username: process.env.DB_USERNAME || 'root', // Use environment variables for security
  password: process.env.DB_PASSWORD || 'password', // Replace 'password' with the correct password
  database: process.env.DB_NAME || 'fivver_doup',
  host: process.env.DB_HOST || '127.0.0.1', // '127.0.0.1' is preferred for localhost
  dialect: 'mysql',
  models: [User, Service, Order, Review], // Register models here
  logging: process.env.NODE_ENV === 'development' ? console.log : false, // Log SQL in development mode
  define: {
    freezeTableName: true, // Prevent table name pluralization
  },
  pool: {
    max: 10, // Max connections
    min: 0, // Min connections
    acquire: 30000, // Max wait time for a connection in ms
    idle: 10000, // Max idle time in ms
  },
  dialectOptions: {
    ssl: process.env.DB_USE_SSL === 'true'
      ? { require: true, rejectUnauthorized: false }
      : undefined, // Enable SSL if required
  },
});

// Test database connection
sequelize.authenticate()
  .then(() => console.log('Database connection established successfully.'))
  .catch((err) => console.error('Unable to connect to the database:', err));

// Export sequelize instance for use across the app
export { sequelize };
