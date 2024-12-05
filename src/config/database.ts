import { Sequelize } from 'sequelize';

// Initialize Sequelize instance
export const sequelize = new Sequelize({
  dialect: 'mysql',  // or your database dialect
  host: 'localhost', // your database host
  username: 'root',  // your database username
  password: '',      // your database password
  database: 'fiverr_doup', // your database name
});

