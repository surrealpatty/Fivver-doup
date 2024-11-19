// src/config/database.ts
import { Sequelize } from 'sequelize';

export const sequelize = new Sequelize(
  'database', // Replace with your database name
  'username', // Replace with your username
  'password', // Replace with your password
  {
    host: 'localhost',
    dialect: 'mysql', // Or any other database you are using
  }
);
