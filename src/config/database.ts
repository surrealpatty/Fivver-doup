// src/config/database.ts
import { Sequelize } from 'sequelize-typescript';
import User from '../models/user';

// Initialize Sequelize with the models directory
const sequelize = new Sequelize({
  dialect: 'mysql', // Replace with your DB dialect
  host: 'localhost', // Your host
  username: 'root', // Your DB username
  password: 'password', // Your DB password
  database: 'fivver_doup', // Your DB name
  models: [User], // Automatically load models
});

export { sequelize };
