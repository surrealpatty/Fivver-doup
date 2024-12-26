import dotenv from 'dotenv';
import { Sequelize, Dialect } from 'sequelize';

dotenv.config();

interface SequelizeConfig {
  username?: string; // Make optional as they might be in URI
  password?: string;
  database?: string;
  host?: string;
  dialect: Dialect;
  dialectOptions?: {
    charset: string;
    ssl?: boolean;
  };
  logging?: boolean;
  port?: number;
  uri?:string; // Add uri for connection strings
}

const sequelizeConfig: { [key: string]: SequelizeConfig } = {
  development: {
    username: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'fivver_doup',
    host: process.env.DB_HOST || '127.0.0.1',
    port: Number(process.env.DB_PORT) || 3306,
    dialect: 'mysql',
    dialectOptions: {
      charset: 'utf8mb4',
    },
    logging: process.env.NODE_ENV === 'development',
  },
  production: {
    uri: process.env.DATABASE_URL,
    dialect: 'mysql',
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
    host: process.env.TEST_DB_HOST || '127.0.0.1',
    port: Number(process.env.TEST_DB_PORT) || 3306,
    dialect: 'mysql',
    logging: false,
  },
};

const environment = process.env.NODE_ENV || 'development';
const currentConfig = sequelizeConfig[environment];

if (!currentConfig) {
  throw new Error(`Invalid NODE_ENV: ${environment}`);
}

let sequelize: Sequelize;
if (currentConfig.uri) {
    sequelize = new Sequelize(currentConfig.uri, currentConfig);
} else {
    sequelize = new Sequelize(currentConfig);
}


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