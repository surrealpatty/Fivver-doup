import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config(); // Ensure .env is loaded at the start

// Database configurations for different environments
const development = {
    username: process.env.DB_USER || 'default_dev_user',
    password: process.env.DB_PASSWORD || 'default_dev_password',
    database: process.env.DB_NAME || 'fivver_doup_db',
    host: process.env.DB_HOST || 'localhost',
    dialect: process.env.DB_DIALECT || 'mysql',
    logging: console.log,
};

const production = {
    username: process.env.PROD_DB_USER || 'default_prod_user',
    password: process.env.PROD_DB_PASSWORD || 'default_prod_password',
    database: process.env.PROD_DB_NAME || 'fivver_doup_db',
    host: process.env.PROD_DB_HOST || 'localhost',
    dialect: process.env.DB_DIALECT || 'mysql',
    logging: false,
};

const test = {
    username: process.env.TEST_DB_USER || 'test_user',
    password: process.env.TEST_DB_PASSWORD || 'test_password',
    database: process.env.TEST_DB_NAME || 'test_db',
    host: process.env.TEST_DB_HOST || 'localhost',
    dialect: process.env.DB_DIALECT || 'mysql',
    logging: false,
};

// Determine the current environment and select the appropriate config
const env = process.env.NODE_ENV || 'development';
const dbConfig = { development, production, test }[env];

// Sequelize setup and connection
const sequelize = new Sequelize(dbConfig.database, dbConfig.username, dbConfig.password, {
    host: dbConfig.host,
    dialect: dbConfig.dialect,
    logging: dbConfig.logging,
});

// Export the sequelize instance for use in other parts of the application
export default sequelize;
