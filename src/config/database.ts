import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
import { User } from '../models/user'; // Correct relative path to User model
import  Service  from '../models/services'; // Correct relative path to Service model

// Load environment variables from .env file
dotenv.config();

// Initialize Sequelize instance with database configuration
const sequelize = new Sequelize({
  dialect: 'mysql',
  host: process.env.DB_HOST || 'localhost', // Use the environment variable or fallback to localhost
  username: process.env.DB_USER || '',      // Use environment variable for DB user
  password: process.env.DB_PASSWORD || '',  // Use environment variable for DB password
  database: process.env.DB_NAME || '',      // Use environment variable for DB name
  logging: false,                           // Disable SQL query logging
  define: {
    timestamps: true,                       // Enable timestamps for models (createdAt, updatedAt)
    freezeTableName: true,                  // Prevent Sequelize from pluralizing table names
  },
  dialectOptions: {
    supportBigNumbers: true,                // Support big numbers in MySQL
    bigNumberStrings: true,                 // Ensure that big numbers are returned as strings
    allowInvalidDates: true,                // Allow invalid dates
  },
});

// Sync database models with the schema
sequelize.sync({ alter: true })  // 'alter' will modify the schema to match models
  .then(() => {
    console.log('Database synced');
  })
  .catch((err) => {
    console.error('Error syncing database:', err);
  });

// Define model associations (e.g., User hasMany Service, Service belongsTo User)
User.hasMany(Service, { foreignKey: 'userId' });
Service.belongsTo(User, { foreignKey: 'userId' });

// Export the sequelize instance to be used in other files
export { sequelize };
