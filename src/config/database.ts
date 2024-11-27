import { Sequelize } from 'sequelize';

// Create and export the Sequelize instance
export const sequelize = new Sequelize({
  dialect: 'mysql',
  host: 'localhost', // Adjust host if needed
  username: 'root', // Replace with actual DB username
  password: '', // Replace with actual DB password
  database: 'fivver_doup', // Replace with actual DB name
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
