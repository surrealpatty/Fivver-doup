import { Sequelize } from 'sequelize';

// Define the Sequelize instance
const sequelize = new Sequelize({
  dialect: 'mysql',
  host: 'localhost',
  username: 'root',
  password: 'password',
  database: 'fivver_doup',
  logging: false,
});

// Named export for sequelize instance
export { sequelize };
