const { Sequelize } = require('sequelize');

// Replace with your database configuration
const sequelize = new Sequelize('fivver_doup', 'root', 'f0^:8t1#qaC7', {
  host: 'localhost',
  dialect: 'mysql',
  port: 3306, // Default MySQL port
});

sequelize
  .authenticate()
  .then(() => {
    console.log('Database connected successfully!');
  })
  .catch((error) => {
    console.error('Unable to connect to the database:', error);
  });
