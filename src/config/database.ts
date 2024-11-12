import { Sequelize } from 'sequelize';

// Ensure these environment variables are set in your .env file
const sequelize = new Sequelize(
  process.env.DB_NAME!, // The database name
  process.env.DB_USER!, // The username
  process.env.DB_PASSWORD!, // The password
  {
    host: process.env.DB_HOST || 'localhost', // The database host (default to 'localhost')
    dialect: 'mysql', // Database dialect (MySQL)
    port: 3306, // Explicitly set the port to 3306 (default MySQL port)
    logging: console.log, // Optional: log SQL queries to console for debugging
  }
);

export { sequelize };
