import { Sequelize } from 'sequelize';

// Initialize Sequelize instance with database configuration
export const sequelize = new Sequelize({
  dialect: 'mysql', // Specify your database dialect
  host: 'localhost', // Host for your database
  username: 'root', // Database username
  password: 'password', // Database password
  database: 'fivver_doup_db', // Database name
  logging: false, // Disable logging; set to `true` or provide a custom logger if needed
});

// Define and export `testConnection` function to verify the database connection
export const testConnection = async (): Promise<void> => {
  try {
    await sequelize.authenticate(); // Attempt to authenticate the database connection
    console.log('Database connection has been established successfully.');
  } catch (error) {
    if (error instanceof Error) {
      // Handle standard Error instances
      console.error('Unable to connect to the database:', error.message);
    } else {
      // Handle non-standard errors
      console.error('An unknown error occurred during the database connection.');
    }
  }
};
