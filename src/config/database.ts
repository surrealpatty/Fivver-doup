// src/config/database.ts

import { Sequelize } from 'sequelize';
import Service from '../models/services'; // Default import

// Define your database connection here
const sequelize = new Sequelize({
  dialect: 'mysql',
  host: 'localhost',
  username: 'root',
  password: '',
  database: 'fiverr_clone',
});

export { sequelize };
