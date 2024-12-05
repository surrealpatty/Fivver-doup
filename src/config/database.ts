import { Sequelize } from 'sequelize';

// Define your database connection here
const sequelize = new Sequelize({
  dialect: 'mysql',
  host: 'localhost',
  username: 'root',   // Your MySQL username
  password: '',       // Your MySQL password (empty in your case)
  database: 'fiverr_clone',  // Your database name
});

// Export sequelize instance for use in other parts of the application
export { sequelize };

// Function to test the database connection
export const testConnection = async () => {
  try {
    await sequelize.authenticate(); // Test the database connection
    console.log('Connection established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};
