import { Sequelize } from 'sequelize';

const sequelize = new Sequelize({
  dialect: 'mysql',
  host: 'localhost',
  username: 'root',
  password: 'password',  // Adjust this to your password if needed
  database: 'fivver_doup',  // Your database name
});

export default sequelize;
