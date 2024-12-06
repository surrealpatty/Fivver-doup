// src/config/database.ts
import { Sequelize } from 'sequelize';

const sequelize = new Sequelize({
  dialect: 'mysql',
  host: 'localhost',
  username: 'root',
  password: 'password',
  database: 'fivver_doup',
});

export default sequelize;  // Default export for sequelize
