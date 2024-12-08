import { Sequelize } from 'sequelize';

// Initialize Sequelize with configuration
export const sequelize = new Sequelize({
  dialect: 'mysql',           // Database dialect
  host: 'localhost',          // Database host
  username: 'root',           // MySQL username
  password: 'password',       // MySQL password
  database: 'fivver_doup',    // Database name
  logging: false,             // Optional: Disable logging for production
});

// Optional: Test the connection
(async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
})();
