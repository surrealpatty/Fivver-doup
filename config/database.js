module.exports = {
  development: {
    username: 'root',  // Your MySQL username
    password: 'your_password',  // Your MySQL password
    database: 'fivver_doup_db',  // The correct database
    host: 'localhost',  // Your database host (usually localhost)
    dialect: 'mysql',
    dialectOptions: {
      charset: 'utf8mb4',  // Charset for handling full Unicode
    },
  },
  production: {
    username: 'root',  // Your MySQL username
    password: 'your_password',  // Your MySQL password
    database: 'fivver_doup_db',  // The correct database
    host: 'localhost',  // Your database host (usually localhost)
    dialect: 'mysql',
    dialectOptions: {
      charset: 'utf8mb4',  // Charset for handling full Unicode
    },
  },
};
