import { Sequelize } from 'sequelize';

// Create and export the Sequelize instance with configuration details
const sequelize = new Sequelize('fivver_doup', 'root', 'f0^:8t1#qaC7', {
  host: '127.0.0.1', // Use '127.0.0.1' for localhost
  dialect: 'mysql',
  logging: false, // Disable logging if unnecessary
});

// Function to test the connection
export const testConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log('Database connection successful');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
    throw new Error('Database connection failed');
  }
};

// Export the Sequelize instance
export { sequelize };
