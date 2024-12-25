import { Sequelize } from 'sequelize'; // Import only Sequelize

// Define the database configuration for different environments (development, production, etc.)
const config = {
  development: {
    username: 'root',
    password: 'f0^:8t1#qaC7',
    database: 'fivver_doup',
    host: '127.0.0.1', // Use '127.0.0.1' for localhost
    dialect: 'mysql' as const, // Cast 'mysql' as a literal type
    dialectOptions: {
      charset: 'utf8mb4', // Ensure correct character set for MySQL
      ssl: false, // Disable SSL if not necessary
    },
    logging: false, // Disable logging if unnecessary
  },
  // You can add configurations for other environments (production, test) here
};

// Create and export the Sequelize instance with the development configuration
const sequelize = new Sequelize(config.development);

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

// Export the Sequelize instance for use in models
export { sequelize };
