import { Sequelize } from 'sequelize';

// Initialize Sequelize with configuration
const sequelize = new Sequelize({
  dialect: 'mysql',
  host: 'localhost',
  username: 'root',
  password: 'password',
  database: 'fivver_doup',
});

// Export sequelize instance for use in other parts of your application
export default sequelize;
