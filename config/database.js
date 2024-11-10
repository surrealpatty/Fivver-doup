// Manually define a string union type for valid dialects
type ValidDialect = 'mysql' | 'postgres' | 'sqlite' | 'mariadb' | 'mssql' | 'db2' | 'snowflake' | 'oracle';

// Type guard function to check if a string is a valid dialect
function isValidDialect(dialect: string | undefined): dialect is ValidDialect {
  return dialect !== undefined && 
         ['mysql', 'postgres', 'sqlite', 'mariadb', 'mssql', 'db2', 'snowflake', 'oracle'].includes(dialect);
}

import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

// Destructure environment variables
const { DB_NAME, DB_USER, DB_PASSWORD, DB_HOST, DB_DIALECT, DB_SSL, NODE_ENV } = process.env;

// Ensure required environment variables are defined
if (!DB_NAME || !DB_USER || !DB_PASSWORD || !DB_HOST || !DB_DIALECT) {
  throw new Error('Missing required database environment variables');
}

// Ensure DB_DIALECT is a valid dialect using the type guard
if (!isValidDialect(DB_DIALECT)) {
  throw new Error(`Invalid DB_DIALECT value: ${DB_DIALECT}`);
}

// Optional: check if DB_SSL is a valid string for boolean conversion
const useSSL = DB_SSL === 'true';

// Create a new Sequelize instance
const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
  host: DB_HOST,
  dialect: DB_DIALECT,  // Now it's correctly validated as a ValidDialect
  logging: NODE_ENV === 'development' ? console.log : false,  // Enable logging only in development
  dialectOptions: {
    ssl: useSSL,  // Use SSL if DB_SSL is 'true'
    rejectUnauthorized: false,  // Disable verification if using self-signed certs
  },
});

// Ensure the database connection works
sequelize.authenticate()
  .then(() => {
    console.log('Database connection established successfully');
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
    process.exit(1);  // Exit the process if the connection fails
  });

export { sequelize };
