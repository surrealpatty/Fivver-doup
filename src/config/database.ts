import { Sequelize } from 'sequelize';

// Sequelize instance for database connection
export const sequelize = new Sequelize({
  dialect: 'mysql',
  host: 'localhost',
  username: 'root',
  password: 'password',
  database: 'fivver_doup',
  logging: false, // Disable logging
});

// Function to test the database connection
export const testConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log('Database connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};
