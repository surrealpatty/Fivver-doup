const { Sequelize } = require('sequelize');
<<<<<<< HEAD
<<<<<<< HEAD
require('dotenv').config(); // Load environment variables from .env file

// Define configuration for different environments
const config = {
    development: {
        database: process.env.DB_NAME || 'default_dev_db',
        username: process.env.DB_USER || 'default_user',
        password: process.env.DB_PASSWORD || 'default_password',
        host: process.env.DB_HOST || 'localhost',
        dialect: 'mysql',
        logging: console.log, 
    },
    production: {
        database: process.env.DB_NAME,
        username: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        host: process.env.DB_HOST,
        dialect: 'mysql',
        logging: false, 
    }
};

// Determine the current environment and select the appropriate configuration
const env = process.env.NODE_ENV || 'development';
const dbConfig = config[env];

// Initialize Sequelize with the selected configuration
=======
=======
>>>>>>> feature-name
require('dotenv').config(); 


const config = {
    development: {
        database: process.env.DB_NAME || 'default_dev_db',
        username: process.env.DB_USER || 'default_user',
        password: process.env.DB_PASSWORD || 'default_password',
        host: process.env.DB_HOST || 'localhost',
        dialect: 'mysql',
        logging: console.log, 
    },
    production: {
        database: process.env.DB_NAME,
        username: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        host: process.env.DB_HOST,
        dialect: 'mysql',
        logging: false, 
    }
};

const env = process.env.NODE_ENV || 'development';

const dbConfig = config[env];
<<<<<<< HEAD
>>>>>>> origin/feature-name
=======
>>>>>>> feature-name
const sequelize = new Sequelize(dbConfig.database, dbConfig.username, dbConfig.password, {
    host: dbConfig.host,
    dialect: dbConfig.dialect,
    logging: dbConfig.logging,
});

sequelize.authenticate()
    .then(() => {
        console.log(`Database connection established successfully in ${env} mode.`);
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err.message);
<<<<<<< HEAD
<<<<<<< HEAD
        process.exit(1); // Exit if unable to connect to the database
=======
        process.exit(1); 
>>>>>>> origin/feature-name
=======
        process.exit(1); 
>>>>>>> feature-name
    });

module.exports = sequelize;
