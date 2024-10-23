module.exports = {
    development: {
      username: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || 'your_dev_password',
      database: process.env.DB_NAME || 'fivver_doup',
      host: process.env.DB_HOST || '127.0.0.1',
      dialect: 'mysql',
    },
    test: {
      username: process.env.TEST_DB_USER || 'root',
      password: process.env.TEST_DB_PASSWORD || 'your_test_password',
      database: process.env.TEST_DB_NAME || 'fivver_doup_test',
      host: process.env.TEST_DB_HOST || '127.0.0.1',
      dialect: 'mysql',
    },
    production: {
      username: process.env.PROD_DB_USER || 'root',
      password: process.env.PROD_DB_PASSWORD || 'your_prod_password',
      database: process.env.PROD_DB_NAME || 'fivver_doup_prod',
      host: process.env.PROD_DB_HOST || 'localhost',
      dialect: 'mysql',
    },
  };
  