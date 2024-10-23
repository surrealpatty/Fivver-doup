// config/config.js
module.exports = {
  development: {
      username: 'root', // Update with your MySQL username
      password: 'X^SE4Jzp$qfd1Fs2qfT*', // Update with your MySQL password
      database: 'fivver_doup_db', // Your database name
      host: 'localhost', // Database host
      dialect: 'mysql', // Database dialect (mysql, sqlite, postgres, etc.)
  },
  production: {
      username: 'root', // Update with your production MySQL username
      password: 'X^SE4Jzp$qfd1Fs2qfT*', // Update with your production MySQL password
      database: 'fivver_doup_db', // Your production database name
      host: 'localhost', // Production database host
      dialect: 'mysql', // Production database dialect
  },
  // Add more environments if needed
};
