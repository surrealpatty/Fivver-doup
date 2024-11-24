// src/config/database.ts
import { Sequelize } from 'sequelize';

// Initialize Sequelize instance
const sequelize = new Sequelize({
  dialect: 'mysql',  // Make sure the correct dialect is set (mysql, postgres, etc.)
  host: 'localhost',  // Your database host
  database: 'fivver_doup',  // Database name
  username: 'root',  // Your database username
  password: '',  // Your database password
});

// Export the sequelize instance for use in models
export { sequelize };
