import { Sequelize } from 'sequelize';

// Database configuration (example, adjust as per your setup)
const sequelize = new Sequelize({
  dialect: 'mysql', // Adjust based on your database type (mysql, postgres, etc.)
  host: process.env.DB_HOST || 'localhost', // Database host
  username: process.env.DB_USERNAME || 'root', // Database username
  password: process.env.DB_PASSWORD || '', // Database password
  database: process.env.DB_NAME || 'fivver_doup', // Database name
  logging: false, // Optional: Disable logging for clean output
});

// Export sequelize as a named export
export { sequelize };
