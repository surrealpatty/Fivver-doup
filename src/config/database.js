// src/config/database.js
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('mysql://your_username:your_password@localhost:3306/your_database_name', {
  dialect: 'mysql',
  dialectOptions: {
    charset: 'utf8mb4', // Set the charset to utf8mb4 for compatibility
  },
  logging: false,  // Optionally disable logging for better performance
});

module.exports = {
  sequelize, // Export the sequelize instance
  development: {
    username: 'your_username',
    password: 'your_password',
    database: 'your_database_name',
    host: 'localhost',
    dialect: 'mysql',
    dialectOptions: {
      charset: 'utf8mb4',  // Ensure compatibility with utf8mb4
    },
    logging: false,  // Optionally disable logging for better performance
  },
  production: {
    username: 'your_username',
    password: 'your_password',
    database: 'your_database_name',
    host: 'your_production_host',
    dialect: 'mysql',
    dialectOptions: {
      charset: 'utf8mb4',  // Ensure this is also set for production
    },
    logging: false,
  },
};
