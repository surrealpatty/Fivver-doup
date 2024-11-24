import { Sequelize } from 'sequelize-typescript';  // Import Sequelize from sequelize-typescript

// Define your Sequelize instance
const sequelize = new Sequelize({
  dialect: 'mysql',               // Use MySQL
  host: 'localhost',              // MySQL host
  username: 'root',               // Database username
  password: 'password',           // Database password
  database: 'fivver_doup_db',     // Database name
  models: [__dirname + '/../models'], // Specify the path to your models directory
  logging: false,                 // Disable SQL logging (set to true for debugging)
});

// Function to test the database connection
export const testConnection = async (): Promise<void> => {
  try {
    await sequelize.authenticate();  // Try to authenticate the connection
    console.log('Database connection has been established successfully.');
  } catch (error) {
    if (error instanceof Error) {
      console.error('Unable to connect to the database:', error.message);
    } else {
      console.error('An unknown error occurred during the database connection.');
    }
  }
};

// Export the sequelize instance to be used in other files
export { sequelize };
