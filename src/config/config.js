import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Destructure environment variables from the .env file with types
const {
  DB_NAME, 
  DB_USER, 
  DB_PASSWORD, 
  DB_HOST, 
  DB_DIALECT, 
  DB_SSL, 
  NODE_ENV
} = process.env;

// Ensure required environment variables are present
if (!DB_NAME || !DB_USER || !DB_PASSWORD || !DB_HOST || !DB_DIALECT) {
  throw new Error('Missing required database environment variables');
}

// Convert DB_SSL to a boolean value if it's set to 'true'
const useSSL = DB_SSL === 'true';

// Create a new Sequelize instance with sha256_password authentication plugin
const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
  host: DB_HOST,
  dialect: DB_DIALECT as 'mysql' | 'postgres' | 'sqlite' | 'mssql', // Ensure correct dialect type
  logging: NODE_ENV === 'development' ? console.log : false, // Enable logging only in development
  
  dialectOptions: {
    ssl: useSSL, // Use SSL if DB_SSL is 'true'
    rejectUnauthorized: false, // Disable verification if using self-signed certs
    authPlugins: {
      sha256_password: {
        password: DB_PASSWORD, // Specify the password for the sha256_password plugin
      },
    },
  },
});

// Ensure the database connection works
sequelize.authenticate()
  .then(() => {
    console.log('Database connection established successfully');
  })
  .catch((err: Error) => {
    console.error('Unable to connect to the database:', err.message || err);
    process.exit(1); // Exit the process if the connection fails
  });

export default sequelize;
