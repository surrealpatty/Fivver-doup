import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const {
  DB_NAME,
  DB_USER,
  DB_PASSWORD,
  DB_HOST,
  DB_DIALECT,
  DB_SSL,
  NODE_ENV,
} = process.env;

// Ensure required environment variables are present
if (!DB_NAME || !DB_USER || !DB_PASSWORD || !DB_HOST || !DB_DIALECT) {
  throw new Error('Missing required database environment variables');
}

// Convert DB_SSL to a boolean if it's set to 'true'
const useSSL = DB_SSL === 'true';

// Create a new Sequelize instance with the given environment variables
const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
  host: DB_HOST,
  dialect: DB_DIALECT as 'mysql' | 'postgres' | 'sqlite' | 'mssql',
  logging: NODE_ENV === 'development' ? console.log : false,
  dialectOptions: {
    ssl: useSSL ? { rejectUnauthorized: false } : false,  // Use SSL only if DB_SSL is true
    charset: 'utf8mb4',  // Ensure correct charset to avoid encoding issues
  },
  define: {
    freezeTableName: true,
    charset: 'utf8mb4',
    collate: 'utf8mb4_unicode_ci',
  },
  pool: {
    acquire: 30000,
    idle: 10000,
  },
});

// Test the database connection and sync models
const testConnection = async (): Promise<void> => {
  try {
    await sequelize.authenticate();
    console.log('Database connection has been established successfully.');

    if (NODE_ENV !== 'test') {  // Avoid syncing during Jest tests
      await sequelize.sync({ alter: true });
      console.log('Database tables synced.');
    }
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error('Unable to connect to the database:', error.message);
    } else {
      console.error('Unable to connect to the database:', error);
    }
    // Avoid process.exit in tests to prevent teardown issues
    if (NODE_ENV !== 'test') {
      process.exit(1);
    }
  }
};

// Test connection and sync if not running tests
if (NODE_ENV !== 'test') {
  testConnection();
}

export { sequelize, testConnection };
