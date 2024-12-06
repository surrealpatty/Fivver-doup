import { Sequelize } from 'sequelize';

// Create a new Sequelize instance
const sequelize = new Sequelize({
  dialect: 'mysql',
  host: 'localhost',
  username: 'root',
  password: 'password',
  database: 'fivver_doup',
});

export default sequelize;  // Default export of sequelize instance
