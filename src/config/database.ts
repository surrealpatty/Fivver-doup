import { Sequelize } from 'sequelize';

// Initialize sequelize instance
export const sequelize = new Sequelize({
  dialect: 'mysql', // Use your database dialect here (e.g., mysql, postgres, etc.)
  host: 'localhost', // Host for your database
  username: 'root',  // Your database username
  password: 'password', // Your database password
  database: 'fivver_doup_db', // Your database name
});

// Define and export testConnection function to verify the database connection
export const testConnection = async () => {
  try {
    // Attempt to authenticate the database connection
    await sequelize.authenticate();
    console.log('Database connection has been established successfully.');
  } catch (error: unknown) {
    // Check if error is an instance of Error and then access its message
    if (error instanceof Error) {
      console.error('Unable to connect to the database:', error.message);
    } else {
      console.error('An unknown error occurred during the database connection.');
    }
  }
};
