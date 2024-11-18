// src/config/sequelize-config.mjs
import { config } from './config.mjs'; // Adjust the path as needed

export default {
  development: {
    username: 'root', // Example username
    password: '',
    database: 'fivver_doup',
    host: 'localhost',
    dialect: 'mysql',
    jwtSecret: config.JWT_SECRET, // Example usage of config values
  },
  production: {
    // Production config
  },
};
