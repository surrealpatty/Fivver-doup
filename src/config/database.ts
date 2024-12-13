import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

// Initialize Sequelize instance with database configuration
const sequelize = new Sequelize({
  dialect: 'mysql',
  host: process.env.DB_HOST || 'localhost',        // Use environment variable or fallback to localhost
  username: process.env.DB_USER || 'root',         // Use environment variable or fallback to 'root'
  password: process.env.DB_PASSWORD || '',        // Use environment variable or fallback to empty string
  database: process.env.DB_NAME || 'fivver_doup', // Use environment variable or fallback to 'fivver_doup'
  logging: false,                                 // Disable SQL query logging
  define: {
    timestamps: true,                             // Enable timestamps for models (createdAt, updatedAt)
    freezeTableName: true,                        // Prevent Sequelize from pluralizing table names
  },
  dialectOptions: {
    supportBigNumbers: true,                      // Support big numbers in MySQL
    bigNumberStrings: true,                       // Ensure that big numbers are returned as strings
    allowInvalidDates: true,                      // Allow invalid dates
  },
});

// Sync database models with the schema (alter will adjust schema to match models)
sequelize.sync({ alter: true })
  .then(() => {
    console.log('Database synced');
  })
  .catch((err) => {
    console.error('Error syncing database:', err);
  });

// Export the sequelize instance to be used in other files
export { sequelize }; // Ensure the sequelize instance is properly exported
