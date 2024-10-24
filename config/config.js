module.exports = {
  development: {
    username: process.env.DB_USERNAME || 'root', // Use environment variable or default to 'root'
    password: process.env.DB_PASSWORD || 'X^SE4Jzp$qfd1Fs2qfT*', // Environment variable for the password
    database: process.env.DB_NAME || 'fivver_doup_db', // Environment variable or default to database name
    host: process.env.DB_HOST || 'localhost', // Environment variable for the host
    dialect: 'mysql', // Database dialect
  },
  production: {
    username: process.env.DB_USERNAME || 'root', // Same for production environment
    password: process.env.DB_PASSWORD || 'X^SE4Jzp$qfd1Fs2qfT*',
    database: process.env.DB_NAME || 'fivver_doup_db',
    host: process.env.DB_HOST || 'localhost',
    dialect: 'mysql',
  },
  jwt: {
    secret: process.env.JWT_SECRET || 'yourSuperSecretKeyHere' // Add JWT secret here for token verification
  }
};
