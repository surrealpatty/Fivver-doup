module.exports = {
    development: {
      username: 'your_username',
      password: 'your_password',
      database: 'fivver_doup_db',
      host: 'localhost',
      dialect: 'mysql',
      logging: false,  // Disable logging or change this to true for detailed logs
    },
    test: {
      username: 'your_username',
      password: 'your_password',
      database: 'fivver_doup_db_test',
      host: 'localhost',
      dialect: 'mysql',
    },
    production: {
      username: 'your_username',
      password: 'your_password',
      database: 'fivver_doup_db',
      host: 'localhost',
      dialect: 'mysql',
    },
  };
  