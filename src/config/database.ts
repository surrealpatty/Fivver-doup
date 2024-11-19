import { Sequelize } from 'sequelize';
import * as dotenv from 'dotenv';

// Load environment variables from .env file
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
} = process.env;

// Validate required environment variables
if (!DB_NAME || !DB_USER || !DB_PASSWORD || !DB_HOST || !DB_DIALECT) {
  throw new Error(
    'Missing one or more required database environment variables (DB_NAME, DB_USER, DB_PASSWORD, DB_HOST, DB_DIALECT).'
  );
}

// Validate dialect
const validDialects = ['mysql', 'postgres', 'sqlite', 'mssql'];
if (!validDialects.includes(DB_DIALECT)) {
  throw new Error(
    `Invalid DB_DIALECT: ${DB_DIALECT}. Supported values are ${validDialects.join(', ')}.`
  );
}

// Parse SSL usage
const useSSL = DB_SSL === 'true';

// Sequelize instance
const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
  host: DB_HOST,
  dialect: DB_DIALECT as 'mysql' | 'postgres' | 'sqlite' | 'mssql', // Narrow typing for Sequelize dialects
  logging: NODE_ENV === 'development' ? console.log : false, // Enable logging only in development mode
  dialectOptions:
    DB_DIALECT === 'mysql' || DB_DIALECT === 'postgres'
      ? useSSL
        ? {
            ssl: {
              rejectUnauthorized: false, // Allow self-signed certificates
            },
            charset: 'utf8mb4',
          }
        : { charset: 'utf8mb4' }
      : {}, // sqlite and mssql do not require specific dialectOptions
  define: {
    freezeTableName: true, // Prevent automatic pluralization of table names
    charset: 'utf8mb4',
    collate: 'utf8mb4_unicode_ci',
  },
  pool: {
    max: 5, // Maximum number of connections in the pool
    min: 0, // Minimum number of connections in the pool
    acquire: 30000, // Maximum time (ms) to try acquiring a connection
    idle: 10000, // Maximum time (ms) a connection can be idle before being released
  },
});

// Test connection and sync function
const testConnection = async (): Promise<void> => {
  try {
    await sequelize.authenticate();
    console.log('Database connection has been established successfully.');

    // Sync models only outside of test environments
    if (NODE_ENV !== 'test') {
      await sequelize.sync({ alter: true }); // Alter database to match models (use cautiously in production)
      console.log('Database tables synced successfully.');
    }
  } catch (error) {
    console.error('Unable to connect to the database:', error);
    if (NODE_ENV !== 'test') {
      process.exit(1); // Exit process in non-test environments if connection fails
    }
  }
};

export { sequelize, testConnection };
