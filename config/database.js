import { Sequelize } from 'sequelize';

// Create a Sequelize instance and connect to the database
const sequelize = new Sequelize({
  dialect: 'mysql',
  host: 'localhost', // Your DB host
  username: 'root', // Your DB username
  password: 'yourpassword', // Your DB password
  database: 'fivver_doup', // Your DB name
  dialectOptions: {
    charset: 'utf8mb4', // Use utf8mb4 instead of cesu8 to avoid encoding issues
  },
  logging: false, // Disable logging if needed, can help with test performance
});

// Test the database connection
const testConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection to the database has been established successfully.');
  } catch (error) {
    if (error instanceof Error) {
      console.error('Unable to connect to the database:', error.message);
    } else {
      console.error('Unable to connect to the database:', error);
    }
    process.exit(1);  // Exit the process if the connection fails
  }
};

export { sequelize, testConnection };
