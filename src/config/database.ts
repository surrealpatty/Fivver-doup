import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
import config from './config'; // Assuming this is the correct import

dotenv.config();

// Type for the configuration object
type DBConfig = {
  development: {
    username: string | undefined;
    password: string | undefined;
    database: string | undefined;
    host: string;
    dialect: string;
    logging: boolean;
    dialectOptions: {
      charset: string;
    };
  };
  test: {
    username: string | undefined;
    password: string | undefined;
    database: string | undefined;
    host: string;
    dialect: string;
    dialectOptions: {
      charset: string;
    };
  };
  production: {
    username: string | undefined;
    password: string | undefined;
    database: string | undefined;
    host: string;
    dialect: string;
    dialectOptions: {
      charset: string;
      ssl: boolean | { rejectUnauthorized: boolean };
    };
  };
};

// Get the environment from the process
const environment = process.env.NODE_ENV || 'development';

// Ensure TypeScript knows that config is of the correct type
const dbConfig: DBConfig[keyof DBConfig] = config[environment];

const sequelize = new Sequelize({
  username: dbConfig.username,
  password: dbConfig.password,
  database: dbConfig.database,
  host: dbConfig.host,
  dialect: dbConfig.dialect,
  dialectOptions: dbConfig.dialectOptions,
});

export { sequelize };
