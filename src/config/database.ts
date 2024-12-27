import dotenv from 'dotenv';
import { Sequelize, Dialect } from 'sequelize';

// Determine the environment
const environment = process.env.NODE_ENV || 'development';

// Load environment variables based on the environment
if (environment === 'test') {
  dotenv.config({ path: '.env.test' });
} else {
  dotenv.config();
}

// Add these console logs for debugging
console.log("NODE_ENV:", process.env.NODE_ENV);
console.log("DB_USER:", process.env.DB_USER);
console.log("DB_PASSWORD:", process.env.DB_PASSWORD);
console.log("DB_NAME:", process.env.DB_NAME);
console.log("TEST_DB_USER:", process.env.TEST_DB_USER);
console.log("TEST_DB_PASSWORD:", process.env.TEST_DB_PASSWORD);
console.log("TEST_DB_NAME:", process.env.TEST_DB_NAME);
console.log("DB_HOST:", process.env.DB_HOST);
console.log("DB_PORT:", process.env.DB_PORT);

interface SequelizeConfig {
  username?: string;
  password?: string;
  database?: string;
  host?: string;
  dialect: Dialect;
  dialectOptions?: { charset: string; ssl?: boolean };
  logging?: boolean;
  port?: number;
  uri?: string;
}

const sequelizeConfig: { [key: string]: SequelizeConfig } = {
  development: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST || '127.0.0.1',
    port: Number(process.env.DB_PORT) || 3306,
    dialect: 'mysql',
    dialectOptions: { charset: 'utf8mb4' },
    logging: process.env.NODE_ENV === 'development',
  },
  production: {
    uri: process.env.DATABASE_URL,
    dialect: 'mysql',
    dialectOptions: { charset: 'utf8mb4', ssl: true },
    logging: false,
  },
  test: {
    username: process.env.TEST_DB_USER,
    password: process.env.TEST_DB_PASSWORD,
    database: process.env.TEST_DB_NAME,
    host: process.env.TEST_DB_HOST || '127.0.0.1',
    port: Number(process.env.TEST_DB_PORT) || 3306,
    dialect: 'mysql',
    logging: false,
  },
};

const currentConfig = sequelizeConfig[environment];

if (!currentConfig) {
  throw new Error(`Invalid NODE_ENV: ${environment}`);
}

const sequelize = currentConfig.uri
  ? new Sequelize(currentConfig.uri, currentConfig)
  : new Sequelize(currentConfig);

const initializeDatabase = async (): Promise<void> => {
  try {
    await sequelize.authenticate();
    console.log('Database connection successful');
  } catch (error) {
    console.error('Unable to connect to the database:', error instanceof Error ? error.message : error);
    process.exit(1); // Exit the process if unable to connect
  }
};

export { sequelize, initializeDatabase };
