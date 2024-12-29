// test/setup.js

const { sequelize } = require('../src/config/database');
const config = require('../src/config/config').default;

beforeAll(async () => {
  console.log("Using test database configuration:", config.test);

  try {
    // Test database connection
    await sequelize.authenticate();
    console.log('Database connection established successfully');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
    throw error;
  }
});

afterAll(async () => {
  await sequelize.close();
});
