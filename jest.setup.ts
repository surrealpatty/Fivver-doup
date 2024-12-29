import { Sequelize } from 'sequelize';

const sequelize = new Sequelize(
  process.env.DB_NAME || 'fivver_doup_test',
  process.env.DB_USER || 'testuser',
  process.env.DB_PASSWORD || 'testpassword',
  {
    host: process.env.DB_HOST || '127.0.0.1',
    dialect: 'mysql',
    port: Number(process.env.DB_PORT) || 3306,
  }
);

sequelize.authenticate()
  .then(() => console.log('Test database connection established successfully.'))
  .catch((error) => {
    console.error('Unable to connect to the database:', error);
    throw error; // Propagate the error to fail the tests
  });
