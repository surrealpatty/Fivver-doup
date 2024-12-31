import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

// Sequelize connection configuration
const sequelize = new Sequelize({
  dialect: 'mysql',
  host: process.env.DB_HOST, // Ensure these environment variables are set correctly
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: Number(process.env.DB_PORT), // Ensure that DB_PORT is set in your environment variables
  dialectOptions: {
    charset: 'utf8mb4', // utf8mb4 is the best choice for modern MySQL applications
    // Removed the collate option to avoid the warning
  },
  logging: false, // Disable logging of SQL queries, set to `true` if you want to see them
});

// Authenticate the Sequelize connection to ensure it works
sequelize.authenticate()
  .then(() => {
    console.log('Database connected successfully!');
  })
  .catch((error) => {
    console.error('Unable to connect to the database:', error);
  });

export { sequelize }; // Named export
