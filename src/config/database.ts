import { Sequelize, Dialect } from 'sequelize';
import dotenv from 'dotenv';
import config from './config'; // Assuming this is the correct import

dotenv.config();

// Define the DBConfig type with specific environments
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

// Get the environment from the process (defaults to 'development' if not set)
const environment = process.env.NODE_ENV as keyof DBConfig || 'development';

// Ensure TypeScript knows that config is of the correct type
const dbConfig = config[environment];

// Cast dialect to the correct type (Dialect)
const sequelize = new Sequelize({
  username: dbConfig.username,
  password: dbConfig.password,
  database: dbConfig.database,
  host: dbConfig.host,
  dialect: dbConfig.dialect as Dialect, // Correct type for dialect
  dialectOptions: dbConfig.dialectOptions,
});

export { sequelize };
