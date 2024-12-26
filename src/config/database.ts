import dotenv from 'dotenv';
import { Sequelize, Dialect } from 'sequelize';

dotenv.config();

interface SequelizeConfig {
  username: string;
  password: string;
  database: string;
  host: string;
  dialect: Dialect; // Correct type here
  dialectOptions?: {
    charset: string;
    ssl?: boolean;
  };
  logging?: boolean;
  port?: number;
}

const sequelizeConfig: { [key: string]: SequelizeConfig } = {
  development: {
    username: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'fivver_doup',
    host: process.env.DB_HOST || '127.0.0.1',
    dialect: 'mysql', // Correct type here
    dialectOptions: {
      charset: 'utf8mb4',
    },
    logging: process.env.NODE_ENV === 'development',
  },
  production: {
    username: process.env.PROD_DB_USER || 'your_prod_username',
    password: process.env.PROD_DB_PASSWORD || '',
    database: process.env.PROD_DB_NAME || 'your_prod_database',
    host: process.env.PROD_DB_HOST || 'your_prod_host',
    dialect: 'mysql', // Correct type here
    dialectOptions: {
      charset: 'utf8mb4',
      ssl: true,
    },
    logging: false,
  },
  test: {
    username: process.env.TEST_DB_USER || 'root',
    password: process.env.TEST_DB_PASSWORD || '',
    database: process.env.TEST_DB_NAME || 'fivver_doup_test',
    host: process.env.DB_HOST || '127.0.0.1',
    dialect: 'mysql', // Correct type here
    logging: false,
  },
};

const environment = process.env.NODE_ENV || 'development';
const currentConfig = sequelizeConfig[environment];

if (!currentConfig) {
  throw new Error(`Invalid NODE_ENV: ${environment}`);
}

const sequelize = new Sequelize(
  currentConfig.database,
  currentConfig.username,
  currentConfig.password,
  {
    ...currentConfig,
    dialect: currentConfig.dialect as Dialect, // Type assertion here
  }
);

const testConnection = async (): Promise<boolean> => {
  try {
    await sequelize.authenticate();
    console.log('Database connection successful');
    return true;
  } catch (error) {
    console.error('Unable to connect to the database:', error instanceof Error ? error.message : error);
    return false;
  }
};

export { sequelize, testConnection };