import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

// Load environment variables from the .env file
dotenv.config();

// Destructure environment variables
const {
  DB_NAME,
  DB_USER,
  DB_PASSWORD,
  DB_HOST,
  DB_DIALECT,
  DB_SSL,
  NODE_ENV,
  JWT_SECRET, // Assuming you also want JWT_SECRET here
} = process.env;

// Ensure required environment variables are present
if (!DB_NAME || !DB_USER || !DB_PASSWORD || !DB_HOST || !DB_DIALECT || !JWT_SECRET) {
  throw new Error('Missing required environment variables');
}

// Convert DB_SSL to a boolean value if it's set to 'true' or 'false'
const useSSL = DB_SSL === 'true';

// Cast DB_DIALECT to a valid Sequelize dialect
const dialect = DB_DIALECT as 'mysql' | 'postgres' | 'sqlite' | 'mariadb'; // Replace with all valid dialects you support

// Create a new Sequelize instance
const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
  host: DB_HOST,
  dialect, // Use the type-cast dialect here
  logging: NODE_ENV === 'development' ? console.log : false, // Enable logging only in development

  dialectOptions: {
    ssl: useSSL, // Use SSL if DB_SSL is 'true'
    rejectUnauthorized: false, // Disable verification if using self-signed certificates
  },
});

// Test the database connection
const testConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log('Database connection established successfully');
  } catch (err) {
    console.error('Unable to connect to the database:', err.message || err);
    // Do not call process.exit(1) in a test environment
    if (NODE_ENV !== 'test') {
      process.exit(1); // Exit the process only if it's not a test environment
    }
  }
};

// Only call testConnection if it's not in a test environment
if (NODE_ENV !== 'test') {
  testConnection();
}

// Export the config object and sequelize instance
export default {
  DB_NAME,
  DB_USER,
  DB_PASSWORD,
  DB_HOST,
  DB_DIALECT,
  DB_SSL,
  NODE_ENV,
  JWT_SECRET,
  sequelize,
  testConnection,
};
