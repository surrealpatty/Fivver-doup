import { Sequelize } from 'sequelize';

// Create a new Sequelize instance to connect to your database
export const sequelize = new Sequelize(
  'fivver_doup', // Replace with your database name
  'root',        // Replace with your username (e.g., 'root' for local MySQL)
  'password',    // Replace with your password
  {
    host: 'localhost',
    dialect: 'mysql', // Change this if you're using a different database (e.g., 'postgres', 'sqlite')
    logging: false,   // Set to `true` to log SQL queries, `false` to disable logging
  }
);

// Function to test database connection
export const testConnection = async (): Promise<void> => {
  try {
    await sequelize.authenticate();
    console.log('Database connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};
