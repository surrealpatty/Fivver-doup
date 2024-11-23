import { Sequelize } from 'sequelize';

// Define Sequelize instance
const sequelize = new Sequelize({
  dialect: 'mysql',
  host: 'localhost',
  username: 'root',
  password: 'password',
  database: 'fivver_doup',
  logging: false,
});

export default sequelize;
