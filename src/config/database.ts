import { Sequelize } from 'sequelize-typescript';  // Import Sequelize from sequelize-typescript
import path from 'path';  // Import path module for resolving directories

// Initialize Sequelize instance with sequelize-typescript
export const sequelize = new Sequelize({
  dialect: 'mysql',                          // Specify the database dialect
  host: 'localhost',                         // Database host (e.g., localhost)
  username: 'root',                          // MySQL username
  password: 'password',                      // MySQL password
  database: 'fivver_doup',                   // Database name
  logging: true,                             // Enable logging in development
  models: [path.join(__dirname, '..', 'models')],  // Dynamically load all models in the 'models' directory
});

// Optional: Test the connection
(async () => {
  try {
    await sequelize.authenticate();  // Test the connection to the database
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);  // Catch connection errors
  }
})();

export default sequelize;
