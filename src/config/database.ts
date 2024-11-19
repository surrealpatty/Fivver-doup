import { Sequelize } from 'sequelize';

// Initialize sequelize instance
export const sequelize = new Sequelize({
  dialect: 'mysql',
  host: 'localhost',
  username: 'root', // replace with your username
  password: '', // replace with your password
  database: 'fiverr_clone', // your database name
});
