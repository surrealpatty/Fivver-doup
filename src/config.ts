module.exports = {
  development: {
    username: 'root', // Replace with your MySQL username
    password: 'f0^:8t1#qaC7', // Replace with your actual MySQL password
    database: 'fivver_doup', // Replace with your actual database name
    host: 'localhost',
    dialect: 'mysql',
  },
  test: {
    username: 'root', // Same for test environment
    password: 'f0^:8t1#qaC7', // Ensure the correct test database password
    database: 'fivver_doup_test', // Test database name (adjust if separate)
    host: 'localhost',
    dialect: 'mysql',
  },
  production: {
    username: 'root', // Same for production
    password: 'f0^:8t1#qaC7', // Ensure the correct password for production
    database: 'fivver_doup_production', // Production database (if separate)
    host: 'localhost',
    dialect: 'mysql',
  },
};
