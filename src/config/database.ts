import { Sequelize } from 'sequelize';

// Create and export the Sequelize instance with configuration details
const sequelize = new Sequelize('fivver_doup', 'root', 'f0^:8t1#qaC7', {
  host: '127.0.0.1', // Use '127.0.0.1' for localhost
  dialect: 'mysql',
  logging: false, // Disable logging if unnecessary
});

// Function to test the database connection
export const testConnection = async (): Promise<boolean> => {
  try {
    // Use sequelize.authenticate() for the connection test
    await sequelize.authenticate();
    console.log('Database connection successful');
    return true; // Return true on successful connection
  } catch (error) {
    // Log the error and handle it appropriately
    console.error(
      'Unable to connect to the database:',
      error instanceof Error ? error.message : error
    );
    return false; // Return false to indicate failure
  }
};

// Export the Sequelize instance
export { sequelize };
