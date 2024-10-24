module.exports = {
  development: {
      username: 'root',
      password: 'X^SE4Jzp$qfd1Fs2qfT*',
      database: 'fivver_doup_db',
      host: 'localhost',
      dialect: 'mysql',
      jwt: {
          secret: 'yourDevelopmentJWTSecret', // Development JWT secret
      },
  },
  production: {
      username: 'root',
      password: 'X^SE4Jzp$qfd1Fs2qfT*',
      database: 'fivver_doup_db',
      host: 'localhost',
      dialect: 'mysql',
      jwt: {
          secret: 'yourProductionJWTSecret', // Production JWT secret
      },
  },
};
